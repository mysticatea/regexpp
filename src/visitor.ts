import {
    Alternative,
    Assertion,
    Backreference,
    CapturingGroup,
    Character,
    CharacterClass,
    CharacterClassRange,
    CharacterSet,
    Flags,
    Group,
    Node,
    Pattern,
    Quantifier,
    RegExpLiteral,
} from "./ast"

/**
 * The visitor to walk on AST.
 */
export class RegExpVisitor {
    private readonly _handlers: RegExpVisitor.Handlers

    /**
     * Initialize this visitor.
     * @param handlers Callbacks for each node.
     */
    public constructor(handlers: RegExpVisitor.Handlers) {
        this._handlers = handlers
    }

    /**
     * Visit a given node and descendant nodes.
     * @param node The root node to visit tree.
     */
    public visit(node: Node): void {
        this.visitWithParents(node, [])
    }

    private visitWithParents(node: Node, parents: Node[]): void {
        switch (node.type) {
            case "Alternative":
                this.visitAlternative(node, parents)
                break
            case "Assertion":
                this.visitAssertion(node, parents)
                break
            case "Backreference":
                this.visitBackreference(node, parents)
                break
            case "CapturingGroup":
                this.visitCapturingGroup(node, parents)
                break
            case "Character":
                this.visitCharacter(node, parents)
                break
            case "CharacterClass":
                this.visitCharacterClass(node, parents)
                break
            case "CharacterClassRange":
                this.visitCharacterClassRange(node, parents)
                break
            case "CharacterSet":
                this.visitCharacterSet(node, parents)
                break
            case "Flags":
                this.visitFlags(node, parents)
                break
            case "Group":
                this.visitGroup(node, parents)
                break
            case "Pattern":
                this.visitPattern(node, parents)
                break
            case "Quantifier":
                this.visitQuantifier(node, parents)
                break
            case "RegExpLiteral":
                this.visitRegExpLiteral(node, parents)
                break
            default:
                throw new Error(`Unknown type: ${(node as any).type}`)
        }
    }

    private visitAlternative(node: Alternative, parents: Node[]): void {
        if (this._handlers.onAlternativeEnter) {
            this._handlers.onAlternativeEnter(node, parents)
        }
        parents.push(node)
        for (const child of node.elements) {
            this.visitWithParents(child, parents)
        }
        parents.pop()
        if (this._handlers.onAlternativeLeave) {
            this._handlers.onAlternativeLeave(node, parents)
        }
    }
    private visitAssertion(node: Assertion, parents: Node[]): void {
        if (this._handlers.onAssertionEnter) {
            this._handlers.onAssertionEnter(node, parents)
        }
        if (node.kind === "lookahead" || node.kind === "lookbehind") {
            parents.push(node)
            for (const child of node.alternatives) {
                this.visitWithParents(child, parents)
            }
            parents.pop()
        }
        if (this._handlers.onAssertionLeave) {
            this._handlers.onAssertionLeave(node, parents)
        }
    }
    private visitBackreference(node: Backreference, parents: Node[]): void {
        if (this._handlers.onBackreferenceEnter) {
            this._handlers.onBackreferenceEnter(node, parents)
        }
        if (this._handlers.onBackreferenceLeave) {
            this._handlers.onBackreferenceLeave(node, parents)
        }
    }
    private visitCapturingGroup(node: CapturingGroup, parents: Node[]): void {
        if (this._handlers.onCapturingGroupEnter) {
            this._handlers.onCapturingGroupEnter(node, parents)
        }
        parents.push(node)
        for (const child of node.alternatives) {
            this.visitWithParents(child, parents)
        }
        parents.pop()
        if (this._handlers.onCapturingGroupLeave) {
            this._handlers.onCapturingGroupLeave(node, parents)
        }
    }
    private visitCharacter(node: Character, parents: Node[]): void {
        if (this._handlers.onCharacterEnter) {
            this._handlers.onCharacterEnter(node, parents)
        }
        if (this._handlers.onCharacterLeave) {
            this._handlers.onCharacterLeave(node, parents)
        }
    }
    private visitCharacterClass(node: CharacterClass, parents: Node[]): void {
        if (this._handlers.onCharacterClassEnter) {
            this._handlers.onCharacterClassEnter(node, parents)
        }
        parents.push(node)
        for (const child of node.elements) {
            this.visitWithParents(child, parents)
        }
        parents.pop()
        if (this._handlers.onCharacterClassLeave) {
            this._handlers.onCharacterClassLeave(node, parents)
        }
    }
    private visitCharacterClassRange(
        node: CharacterClassRange,
        parents: Node[],
    ): void {
        if (this._handlers.onCharacterClassRangeEnter) {
            this._handlers.onCharacterClassRangeEnter(node, parents)
        }
        parents.push(node)
        this.visitCharacter(node.min, parents)
        this.visitCharacter(node.max, parents)
        parents.pop()
        if (this._handlers.onCharacterClassRangeLeave) {
            this._handlers.onCharacterClassRangeLeave(node, parents)
        }
    }
    private visitCharacterSet(node: CharacterSet, parents: Node[]): void {
        if (this._handlers.onCharacterSetEnter) {
            this._handlers.onCharacterSetEnter(node, parents)
        }
        if (this._handlers.onCharacterSetLeave) {
            this._handlers.onCharacterSetLeave(node, parents)
        }
    }
    private visitFlags(node: Flags, parents: Node[]): void {
        if (this._handlers.onFlagsEnter) {
            this._handlers.onFlagsEnter(node, parents)
        }
        if (this._handlers.onFlagsLeave) {
            this._handlers.onFlagsLeave(node, parents)
        }
    }
    private visitGroup(node: Group, parents: Node[]): void {
        if (this._handlers.onGroupEnter) {
            this._handlers.onGroupEnter(node, parents)
        }
        parents.push(node)
        for (const child of node.alternatives) {
            this.visitWithParents(child, parents)
        }
        parents.pop()
        if (this._handlers.onGroupLeave) {
            this._handlers.onGroupLeave(node, parents)
        }
    }
    private visitPattern(node: Pattern, parents: Node[]): void {
        if (this._handlers.onPatternEnter) {
            this._handlers.onPatternEnter(node, parents)
        }
        parents.push(node)
        for (const child of node.alternatives) {
            this.visitWithParents(child, parents)
        }
        parents.pop()
        if (this._handlers.onPatternLeave) {
            this._handlers.onPatternLeave(node, parents)
        }
    }
    private visitQuantifier(node: Quantifier, parents: Node[]): void {
        if (this._handlers.onQuantifierEnter) {
            this._handlers.onQuantifierEnter(node, parents)
        }
        parents.push(node)
        this.visitWithParents(node.element, parents)
        parents.pop()
        if (this._handlers.onQuantifierLeave) {
            this._handlers.onQuantifierLeave(node, parents)
        }
    }
    private visitRegExpLiteral(node: RegExpLiteral, parents: Node[]): void {
        if (this._handlers.onRegExpLiteralEnter) {
            this._handlers.onRegExpLiteralEnter(node, parents)
        }
        parents.push(node)
        this.visitWithParents(node.pattern, parents)
        this.visitWithParents(node.flags, parents)
        parents.pop()
        if (this._handlers.onRegExpLiteralLeave) {
            this._handlers.onRegExpLiteralLeave(node, parents)
        }
    }
}

export namespace RegExpVisitor {
    export interface Handlers {
        onAlternativeEnter?(node: Alternative, parents: readonly Node[]): void
        onAlternativeLeave?(node: Alternative, parents: readonly Node[]): void
        onAssertionEnter?(node: Assertion, parents: readonly Node[]): void
        onAssertionLeave?(node: Assertion, parents: readonly Node[]): void
        onBackreferenceEnter?(
            node: Backreference,
            parents: readonly Node[],
        ): void
        onBackreferenceLeave?(
            node: Backreference,
            parents: readonly Node[],
        ): void
        onCapturingGroupEnter?(
            node: CapturingGroup,
            parents: readonly Node[],
        ): void
        onCapturingGroupLeave?(
            node: CapturingGroup,
            parents: readonly Node[],
        ): void
        onCharacterEnter?(node: Character, parents: readonly Node[]): void
        onCharacterLeave?(node: Character, parents: readonly Node[]): void
        onCharacterClassEnter?(
            node: CharacterClass,
            parents: readonly Node[],
        ): void
        onCharacterClassLeave?(
            node: CharacterClass,
            parents: readonly Node[],
        ): void
        onCharacterClassRangeEnter?(
            node: CharacterClassRange,
            parents: readonly Node[],
        ): void
        onCharacterClassRangeLeave?(
            node: CharacterClassRange,
            parents: readonly Node[],
        ): void
        onCharacterSetEnter?(node: CharacterSet, parents: readonly Node[]): void
        onCharacterSetLeave?(node: CharacterSet, parents: readonly Node[]): void
        onFlagsEnter?(node: Flags, parents: readonly Node[]): void
        onFlagsLeave?(node: Flags, parents: readonly Node[]): void
        onGroupEnter?(node: Group, parents: readonly Node[]): void
        onGroupLeave?(node: Group, parents: readonly Node[]): void
        onPatternEnter?(node: Pattern, parents: readonly Node[]): void
        onPatternLeave?(node: Pattern, parents: readonly Node[]): void
        onQuantifierEnter?(node: Quantifier, parents: readonly Node[]): void
        onQuantifierLeave?(node: Quantifier, parents: readonly Node[]): void
        onRegExpLiteralEnter?(
            node: RegExpLiteral,
            parents: readonly Node[],
        ): void
        onRegExpLiteralLeave?(
            node: RegExpLiteral,
            parents: readonly Node[],
        ): void
    }
}
