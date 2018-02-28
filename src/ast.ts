/**
 * The type which includes all nodes.
 */
export type Node = BranchNode | LeafNode

/**
 * The type which includes all branch nodes.
 */
export type BranchNode =
    | RegExpLiteral
    | Pattern
    | Disjunction
    | Group
    | CapturingGroup
    | Quantifier
    | CharacterClass
    | LookaroundAssertion
    | CharacterClassRange

/**
 * The type which includes all leaf nodes.
 */
export type LeafNode =
    | BoundaryAssertion
    | CharacterSet
    | Character
    | Backreference
    | Flags

/**
 * The type which includes all atom nodes.
 */
export type Element =
    | Disjunction
    | Group
    | CapturingGroup
    | Quantifier
    | CharacterClass
    | Assertion
    | CharacterSet
    | Character
    | Backreference

/**
 * The type which includes all character class atom nodes.
 */
export type CharacterClassElement =
    | EscapeCharacterSet
    | UnicodePropertyCharacterSet
    | Character
    | CharacterClassRange

/**
 * The type which includes all atom nodes that Alternative node can have as children.
 */
export type AlternativeElement =
    | Group
    | CapturingGroup
    | Quantifier
    | CharacterClass
    | Assertion
    | CharacterSet
    | Character
    | Backreference

/**
 * The type which includes all atom nodes that Quantifier node can have as children.
 */
export type QuantifiableElement =
    | Group
    | CapturingGroup
    | CharacterClass
    | LookaheadAssertion
    | CharacterSet
    | Character
    | Backreference

/**
 * The type which defines common properties for all node types.
 */
export interface NodeBase {
    /** The node type. */
    type: Node["type"]
    /** The parent node. */
    parent: Node["parent"]
    /** The 0-based index that this node starts. */
    start: number
    /** The 0-based index that this node ends. */
    end: number
    /** The raw text of this node. */
    raw: string
}

/**
 * The root node.
 */
export interface RegExpLiteral extends NodeBase {
    type: "RegExpLiteral"
    parent: null
    pattern: Pattern
    flags: Flags
}

/**
 * The pattern.
 */
export interface Pattern extends NodeBase {
    type: "Pattern"
    parent: RegExpLiteral | null
    elements: Element[]
}

/**
 * The disjunction.
 * E.g. `a|b`
 */
export interface Disjunction extends NodeBase {
    type: "Disjunction"
    parent: Pattern | Group | CapturingGroup | LookaroundAssertion
    alternatives: AlternativeElement[][]
}

/**
 * The uncapturing group.
 * E.g. `(?:ab)`
 */
export interface Group extends NodeBase {
    type: "Group"
    parent:
        | Pattern
        | Disjunction
        | Group
        | CapturingGroup
        | Quantifier
        | LookaroundAssertion
    elements: Element[]
}

/**
 * The capturing group.
 * E.g. `(ab)`, `(?<name>ab)`
 */
export interface CapturingGroup extends NodeBase {
    type: "CapturingGroup"
    parent:
        | Pattern
        | Disjunction
        | Group
        | CapturingGroup
        | Quantifier
        | LookaroundAssertion
    name: string | null
    elements: Element[]
    references: Backreference[]
}

/**
 * The lookaround assertion.
 */
export type LookaroundAssertion = LookaheadAssertion | LookbehindAssertion

/**
 * The lookahead assertion.
 * E.g. `(?=ab)`, `(?!ab)`
 */
export interface LookaheadAssertion extends NodeBase {
    type: "Assertion"
    parent:
        | Pattern
        | Disjunction
        | Group
        | CapturingGroup
        | Quantifier
        | LookaroundAssertion
    kind: "lookahead"
    negate: boolean
    elements: Element[]
}

/**
 * The lookbehind assertion.
 * E.g. `(?<=ab)`, `(?<!ab)`
 */
export interface LookbehindAssertion extends NodeBase {
    type: "Assertion"
    parent: Pattern | Disjunction | Group | CapturingGroup | LookaroundAssertion
    kind: "lookbehind"
    negate: boolean
    elements: Element[]
}

/**
 * The quantifier.
 * E.g. `a?`, `a*`, `a+`, `a{1,2}`, `a??`, `a*?`, `a+?`, `a{1,2}?`
 */
export interface Quantifier extends NodeBase {
    type: "Quantifier"
    parent: Pattern | Disjunction | Group | CapturingGroup | LookaroundAssertion
    min: number
    max: number // can be Number.POSITIVE_INFINITY
    greedy: boolean
    element: QuantifiableElement
}

/**
 * The character class.
 * E.g. `[ab]`, `[^ab]`
 */
export interface CharacterClass extends NodeBase {
    type: "CharacterClass"
    parent:
        | Pattern
        | Disjunction
        | Group
        | CapturingGroup
        | Quantifier
        | LookaroundAssertion
    negate: boolean
    elements: CharacterClassElement[]
}

/**
 * The character class.
 * E.g. `[a-b]`
 */
export interface CharacterClassRange extends NodeBase {
    type: "CharacterClassRange"
    parent: CharacterClass
    min: Character
    max: Character
}

/**
 * The assertion.
 */
export type Assertion = BoundaryAssertion | LookaroundAssertion

/**
 * The boundary assertion.
 */
export type BoundaryAssertion = EdgeAssertion | WordBoundaryAssertion

/**
 * The edge boundary assertion.
 * E.g. `^`, `$`
 */
export interface EdgeAssertion extends NodeBase {
    type: "Assertion"
    parent:
        | Pattern
        | Disjunction
        | Group
        | CapturingGroup
        | Quantifier
        | LookaroundAssertion
    kind: "start" | "end"
}

/**
 * The word bondary assertion.
 * E.g. `\b`, `\B`
 */
export interface WordBoundaryAssertion extends NodeBase {
    type: "Assertion"
    parent:
        | Pattern
        | Disjunction
        | Group
        | CapturingGroup
        | Quantifier
        | LookaroundAssertion
    kind: "word"
    negate: boolean
}

/**
 * The character set.
 */
export type CharacterSet =
    | AnyCharacterSet
    | EscapeCharacterSet
    | UnicodePropertyCharacterSet

/**
 * The dot.
 * E.g. `.`
 */
export interface AnyCharacterSet extends NodeBase {
    type: "CharacterSet"
    parent:
        | Pattern
        | Disjunction
        | Group
        | CapturingGroup
        | Quantifier
        | LookaroundAssertion
    kind: "any"
}

/**
 * The character class escape.
 * E.g. `\d`, `\s`, `\w`, `\D`, `\S`, `\W`
 */
export interface EscapeCharacterSet extends NodeBase {
    type: "CharacterSet"
    parent:
        | Pattern
        | Disjunction
        | Group
        | CapturingGroup
        | Quantifier
        | CharacterClass
        | LookaroundAssertion
    kind: "digit" | "space" | "word"
    negate: boolean
}

/**
 * The unicode property escape.
 * E.g. `\p{ASCII}`, `\P{ASCII}`, `\p{Script=Hiragana}`
 */
export interface UnicodePropertyCharacterSet extends NodeBase {
    type: "CharacterSet"
    parent:
        | Pattern
        | Disjunction
        | Group
        | CapturingGroup
        | Quantifier
        | CharacterClass
        | LookaroundAssertion
    kind: "property"
    key: string
    value: string | null
    negate: boolean
}

/**
 * The character.
 * This includes escape sequences which mean a character.
 * E.g. `a`, `あ`, `✿`, `\x65`, `\u0065`, `\u{65}`, `\/`
 */
export interface Character extends NodeBase {
    type: "Character"
    parent:
        | Pattern
        | Disjunction
        | Group
        | CapturingGroup
        | Quantifier
        | CharacterClass
        | LookaroundAssertion
        | CharacterClassRange
    value: number // a code point.
}

/**
 * The backreference.
 * E.g. `\1`, `\k<name>`
 */
export interface Backreference extends NodeBase {
    type: "Backreference"
    parent:
        | Pattern
        | Disjunction
        | Group
        | CapturingGroup
        | Quantifier
        | LookaroundAssertion
    ref: number | string
    resolved: CapturingGroup
}

/**
 * The flags.
 */
export interface Flags extends NodeBase {
    type: "Flags"
    parent: RegExpLiteral | null
    dotAll: boolean
    global: boolean
    ignoreCase: boolean
    multiline: boolean
    sticky: boolean
    unicode: boolean
}
