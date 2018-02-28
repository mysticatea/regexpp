import {
    AlternativeElement,
    AnyCharacterSet,
    Assertion,
    Backreference,
    CapturingGroup,
    Character,
    CharacterClass,
    CharacterClassRange,
    Disjunction,
    Element,
    EscapeCharacterSet,
    Flags,
    Group,
    RegExpLiteral,
    LookaroundAssertion,
    Pattern,
    QuantifiableElement,
    Quantifier,
    UnicodePropertyCharacterSet,
} from "./ast"
import { assert, last } from "./util"
import { RegExpValidator } from "./validator"

type AppendableNode =
    | Pattern
    | Disjunction
    | Group
    | CapturingGroup
    | CharacterClass
    | LookaroundAssertion

const DummyPattern = {} as Pattern
const DummyFlags = {} as Flags
const DummyCapturingGroup = {} as CapturingGroup

/**
 * Convert given elements to an alternative.
 * This doesn't clone the array, so the return value is `elements` itself.
 * @param elements Elements to convert.
 */
function elementsToAlternative(
    elements: Element[],
    parent: Disjunction,
): AlternativeElement[] {
    for (const element of elements) {
        assert(element.type !== "Disjunction")
        element.parent = parent
    }
    return elements as AlternativeElement[]
}

function addAlternativeElement(
    parent:
        | Pattern
        | Disjunction
        | Group
        | CapturingGroup
        | LookaroundAssertion,
    node:
        | Group
        | CapturingGroup
        | Quantifier
        | CharacterClass
        | Assertion
        | AnyCharacterSet
        | Backreference,
): void {
    if (parent.type === "Disjunction") {
        last(parent.alternatives)!.push(node)
    } else {
        parent.elements.push(node)
    }
}

function addCommonElement(
    parent: AppendableNode,
    node: EscapeCharacterSet | UnicodePropertyCharacterSet | Character,
): void {
    if (parent.type === "Disjunction") {
        last(parent.alternatives)!.push(node)
    } else if (parent.type === "CharacterClass") {
        parent.elements.push(node)
    } else {
        parent.elements.push(node)
    }
}

class RegExpParserState {
    readonly strict: boolean
    readonly ecmaVersion: 5 | 2015 | 2016 | 2017 | 2018
    private _node: AppendableNode = DummyPattern
    private _flags: Flags = DummyFlags
    private _disjunctionStartStack: number[] = []
    private _backreferences: Backreference[] = []
    private _capturingGroups: CapturingGroup[] = []

    source: string = ""

    constructor(options?: RegExpParser.Options) {
        this.strict = Boolean(options && options.strict)
        this.ecmaVersion = (options && options.ecmaVersion) || 2018
    }

    get pattern(): Pattern {
        if (this._node.type !== "Pattern") {
            throw new Error("UnknownError")
        }
        return this._node
    }

    get flags(): Flags {
        if (this._flags.type !== "Flags") {
            throw new Error("UnknownError")
        }
        return this._flags
    }

    onFlags(
        start: number,
        end: number,
        global: boolean,
        ignoreCase: boolean,
        multiline: boolean,
        unicode: boolean,
        sticky: boolean,
        dotAll: boolean,
    ): void {
        this._flags = {
            type: "Flags",
            parent: null,
            start,
            end,
            raw: this.source.slice(start, end),
            global,
            ignoreCase,
            multiline,
            unicode,
            sticky,
            dotAll,
        }
    }

    onPatternEnter(start: number): void {
        this._node = {
            type: "Pattern",
            parent: null,
            start,
            end: start,
            raw: "",
            elements: [],
        }
        this._backreferences.length = 0
        this._capturingGroups.length = 0
    }

    onPatternLeave(start: number, end: number): void {
        this._node.end = end
        this._node.raw = this.source.slice(start, end)

        for (const reference of this._backreferences) {
            const ref = reference.ref
            const group =
                typeof ref === "number"
                    ? this._capturingGroups[ref - 1]
                    : this._capturingGroups.find(g => g.name === ref)!
            reference.resolved = group
            group.references.push(reference)
        }
    }

    onDisjunctionEnter(start: number): void {
        this._disjunctionStartStack.push(start)
    }

    onDisjunctionLeave(start: number, end: number): void {
        this._disjunctionStartStack.pop()
    }

    onAlternativeEnter(start: number, index: number): void {
        if (index === 0) {
            return
        }

        const parentNode = this._node
        if (
            parentNode.type === "Disjunction" ||
            parentNode.type === "CharacterClass"
        ) {
            throw new Error("UnknownError")
        }

        const prevNode = last(parentNode.elements)
        if (prevNode != null && prevNode.type === "Disjunction") {
            this._node = prevNode
            prevNode.alternatives.push([])
        } else {
            this._node = {
                type: "Disjunction",
                parent: parentNode,
                start: last(this._disjunctionStartStack)!,
                end: start,
                raw: "",
                alternatives: [],
            }
            const elements = elementsToAlternative(
                parentNode.elements,
                this._node,
            )
            this._node.alternatives.push(elements, [])
            parentNode.elements = [this._node]
        }
    }

    onAlternativeLeave(start: number, end: number, index: number): void {
        if (index === 0) {
            return
        }
        this._node.end = end
        this._node.raw = this.source.slice(this._node.start, end)
        this._node = this._node.parent as AppendableNode
    }

    onGroupEnter(start: number): void {
        const parentNode = this._node
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError")
        }

        this._node = {
            type: "Group",
            parent: parentNode,
            start,
            end: start,
            raw: "",
            elements: [],
        }
        addAlternativeElement(parentNode, this._node)
    }

    onGroupLeave(start: number, end: number): void {
        this._node.end = end
        this._node.raw = this.source.slice(start, end)
        this._node = this._node.parent as AppendableNode
    }

    onCapturingGroupEnter(start: number, name: string | null): void {
        const parentNode = this._node
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError")
        }

        this._node = {
            type: "CapturingGroup",
            parent: parentNode,
            start,
            end: start,
            raw: "",
            name,
            elements: [],
            references: [],
        }
        addAlternativeElement(parentNode, this._node)
        this._capturingGroups.push(this._node)
    }

    onCapturingGroupLeave(
        start: number,
        end: number,
        name: string | null,
    ): void {
        this._node.end = end
        this._node.raw = this.source.slice(start, end)
        this._node = this._node.parent as AppendableNode
    }

    onQuantifier(
        start: number,
        end: number,
        min: number,
        max: number,
        greedy: boolean,
    ): void {
        const parentNode = this._node
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError")
        }

        // Replace the last element.
        const elements =
            parentNode.type === "Disjunction"
                ? last(parentNode.alternatives)!
                : parentNode.elements
        const prevNode = elements.pop()!
        const node: Quantifier = {
            type: "Quantifier",
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            min,
            max,
            greedy,
            element: prevNode as QuantifiableElement,
        }
        elements.push(node)
        prevNode.parent = node
    }

    onLookaroundAssertionEnter(
        start: number,
        kind: "lookahead" | "lookbehind",
        negate: boolean,
    ): void {
        const parentNode = this._node
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError")
        }

        this._node = {
            type: "Assertion",
            parent: parentNode,
            start,
            end: start,
            raw: "",
            kind,
            negate,
            elements: [],
        } as LookaroundAssertion
        addAlternativeElement(parentNode, this._node)
    }

    onLookaroundAssertionLeave(
        start: number,
        end: number,
        kind: "lookahead" | "lookbehind",
        negate: boolean,
    ): void {
        this._node.end = end
        this._node.raw = this.source.slice(start, end)
        this._node = this._node.parent as AppendableNode
    }

    onEdgeAssertion(start: number, end: number, kind: "start" | "end"): void {
        const parentNode = this._node
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError")
        }

        addAlternativeElement(parentNode, {
            type: "Assertion",
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            kind,
        })
    }

    onWordBoundaryAssertion(
        start: number,
        end: number,
        kind: "word",
        negate: boolean,
    ): void {
        const parentNode = this._node
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError")
        }

        addAlternativeElement(parentNode, {
            type: "Assertion",
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            kind,
            negate,
        })
    }

    onAnyCharacterSet(start: number, end: number, kind: "any"): void {
        const parentNode = this._node
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError")
        }

        addAlternativeElement(parentNode, {
            type: "CharacterSet",
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            kind,
        })
    }

    onEscapeCharacterSet(
        start: number,
        end: number,
        kind: "digit" | "space" | "word",
        negate: boolean,
    ): void {
        addCommonElement(this._node, {
            type: "CharacterSet",
            parent: this._node,
            start,
            end,
            raw: this.source.slice(start, end),
            kind,
            negate,
        })
    }

    onUnicodePropertyCharacterSet(
        start: number,
        end: number,
        kind: "property",
        key: string,
        value: string | null,
        negate: boolean,
    ): void {
        addCommonElement(this._node, {
            type: "CharacterSet",
            parent: this._node,
            start,
            end,
            raw: this.source.slice(start, end),
            kind,
            key,
            value,
            negate,
        })
    }

    onCharacter(start: number, end: number, value: number): void {
        addCommonElement(this._node, {
            type: "Character",
            parent: this._node,
            start,
            end,
            raw: this.source.slice(start, end),
            value,
        })
    }

    onBackreference(start: number, end: number, ref: number | string): void {
        const parentNode = this._node
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError")
        }

        const node: Backreference = {
            type: "Backreference",
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            ref,
            resolved: DummyCapturingGroup,
        }
        addAlternativeElement(parentNode, node)
        this._backreferences.push(node)
    }

    onCharacterClassEnter(start: number, negate: boolean): void {
        const parentNode = this._node
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError")
        }

        this._node = {
            type: "CharacterClass",
            parent: parentNode,
            start,
            end: start,
            raw: "",
            negate,
            elements: [],
        }
        addAlternativeElement(parentNode, this._node)
    }

    onCharacterClassLeave(start: number, end: number, negate: boolean): void {
        this._node.end = end
        this._node.raw = this.source.slice(start, end)
        this._node = this._node.parent as AppendableNode
    }

    onCharacterClassRange(
        start: number,
        end: number,
        min: number,
        max: number,
    ): void {
        const parentNode = this._node
        if (parentNode.type !== "CharacterClass") {
            throw new Error("UnknownError")
        }

        // Replace the last three elements.
        const elements = parentNode.elements
        const rightNode = elements.pop() as Character
        elements.pop() // hyphen
        const leftNode = elements.pop() as Character
        const node: CharacterClassRange = {
            type: "CharacterClassRange",
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            min: leftNode,
            max: rightNode,
        }
        assert(leftNode != null && leftNode.type === "Character")
        assert(rightNode != null && rightNode.type === "Character")
        leftNode.parent = node
        rightNode.parent = node
        elements.push(node)
    }
}

export namespace RegExpParser {
    /**
     * The options for RegExpParser construction.
     */
    export interface Options {
        /**
         * The flag to disable Annex B syntax. Default is `false`.
         */
        strict?: boolean

        /**
         * ECMAScript version. Default is `2018`.
         * - `2015` added `u` and `y` flags.
         * - `2018` added `s` flag, Named Capturing Group, Lookbehind Assertion,
         *   and Unicode Property Escape.
         */
        ecmaVersion?: 5 | 2015 | 2016 | 2017 | 2018
    }
}

export class RegExpParser {
    private _state: RegExpParserState
    private _validator: RegExpValidator

    /**
     * Initialize this parser.
     * @param options The options of parser.
     */
    constructor(options?: RegExpParser.Options) {
        this._state = new RegExpParserState(options)
        this._validator = new RegExpValidator(this._state)
    }

    /**
     * Parse a regular expression literal. E.g. "/abc/g"
     * @param source The source code to parse.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     * @returns The AST of the given regular expression.
     */
    parseLiteral(
        source: string,
        start: number = 0,
        end: number = source.length,
    ): RegExpLiteral {
        this._state.source = source
        this._validator.validateLiteral(source, start, end)
        const pattern = this._state.pattern
        const flags = this._state.flags
        const literal: RegExpLiteral = {
            type: "RegExpLiteral",
            parent: null,
            start,
            end,
            raw: source,
            pattern,
            flags,
        }
        pattern.parent = literal
        flags.parent = literal
        return literal
    }

    /**
     * Parse a regular expression flags. E.g. "gim"
     * @param source The source code to parse.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     * @returns The AST of the given flags.
     */
    parseFlags(
        source: string,
        start: number = 0,
        end: number = source.length,
    ): Flags {
        this._state.source = source
        this._validator.validateFlags(source, start, end)
        return this._state.flags
    }

    /**
     * Parse a regular expression pattern. E.g. "abc"
     * @param source The source code to parse.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     * @param uFlag The flag to set unicode mode.
     * @returns The AST of the given pattern.
     */
    parsePattern(
        source: string,
        start: number = 0,
        end: number = source.length,
        uFlag: boolean = false,
    ): Pattern {
        this._state.source = source
        this._validator.validatePattern(source, start, end, uFlag)
        return this._state.pattern
    }
}
