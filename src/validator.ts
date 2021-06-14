import { EcmaVersion } from "./ecma-versions"
import { Reader } from "./reader"
import { RegExpSyntaxError } from "./regexp-syntax-error"
import {
    Asterisk,
    Backspace,
    CarriageReturn,
    CharacterTabulation,
    CircumflexAccent,
    Colon,
    Comma,
    DigitNine,
    DigitOne,
    digitToInt,
    DigitZero,
    DollarSign,
    EqualsSign,
    ExclamationMark,
    FormFeed,
    FullStop,
    GreaterThanSign,
    HyphenMinus,
    LatinCapitalLetterB,
    LatinCapitalLetterD,
    LatinCapitalLetterP,
    LatinCapitalLetterS,
    LatinCapitalLetterW,
    LatinSmallLetterB,
    LatinSmallLetterC,
    LatinSmallLetterD,
    LatinSmallLetterF,
    LatinSmallLetterG,
    LatinSmallLetterI,
    LatinSmallLetterK,
    LatinSmallLetterM,
    LatinSmallLetterN,
    LatinSmallLetterP,
    LatinSmallLetterR,
    LatinSmallLetterS,
    LatinSmallLetterT,
    LatinSmallLetterU,
    LatinSmallLetterV,
    LatinSmallLetterW,
    LatinSmallLetterX,
    LatinSmallLetterY,
    LeftCurlyBracket,
    LeftParenthesis,
    LeftSquareBracket,
    LessThanSign,
    LineFeed,
    LineTabulation,
    LowLine,
    PlusSign,
    QuestionMark,
    ReverseSolidus,
    RightCurlyBracket,
    RightParenthesis,
    RightSquareBracket,
    Solidus,
    VerticalLine,
    ZeroWidthJoiner,
    ZeroWidthNonJoiner,
    combineSurrogatePair,
    isDecimalDigit,
    isHexDigit,
    isIdContinue,
    isIdStart,
    isLatinLetter,
    isLeadSurrogate,
    isLineTerminator,
    isOctalDigit,
    isTrailSurrogate,
    isValidLoneUnicodeProperty,
    isValidUnicodeProperty,
    isValidUnicode,
} from "./unicode"

function isSyntaxCharacter(cp: number): boolean {
    return (
        cp === CircumflexAccent ||
        cp === DollarSign ||
        cp === ReverseSolidus ||
        cp === FullStop ||
        cp === Asterisk ||
        cp === PlusSign ||
        cp === QuestionMark ||
        cp === LeftParenthesis ||
        cp === RightParenthesis ||
        cp === LeftSquareBracket ||
        cp === RightSquareBracket ||
        cp === LeftCurlyBracket ||
        cp === RightCurlyBracket ||
        cp === VerticalLine
    )
}

function isRegExpIdentifierStart(cp: number): boolean {
    return isIdStart(cp) || cp === DollarSign || cp === LowLine
}

function isRegExpIdentifierPart(cp: number): boolean {
    return (
        isIdContinue(cp) ||
        cp === DollarSign ||
        cp === LowLine ||
        cp === ZeroWidthNonJoiner ||
        cp === ZeroWidthJoiner
    )
}

function isUnicodePropertyNameCharacter(cp: number): boolean {
    return isLatinLetter(cp) || cp === LowLine
}

function isUnicodePropertyValueCharacter(cp: number): boolean {
    return isUnicodePropertyNameCharacter(cp) || isDecimalDigit(cp)
}

export namespace RegExpValidator {
    /**
     * The options for RegExpValidator construction.
     */
    export interface Options {
        /**
         * The flag to disable Annex B syntax. Default is `false`.
         */
        strict?: boolean

        /**
         * ECMAScript version. Default is `2022`.
         * - `2015` added `u` and `y` flags.
         * - `2018` added `s` flag, Named Capturing Group, Lookbehind Assertion,
         *   and Unicode Property Escape.
         * - `2019`, `2020`, and `2021` added more valid Unicode Property Escapes.
         * - `2022` added `d` flag.
         */
        ecmaVersion?: EcmaVersion

        /**
         * A function that is called when the validator entered a RegExp literal.
         * @param start The 0-based index of the first character.
         */
        onLiteralEnter?(start: number): void

        /**
         * A function that is called when the validator left a RegExp literal.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         */
        onLiteralLeave?(start: number, end: number): void

        /**
         * A function that is called when the validator found flags.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param global `g` flag.
         * @param ignoreCase `i` flag.
         * @param multiline `m` flag.
         * @param unicode `u` flag.
         * @param sticky `y` flag.
         * @param dotAll `s` flag.
         * @param hasIndices `d` flag.
         */
        onFlags?(
            start: number,
            end: number,
            global: boolean,
            ignoreCase: boolean,
            multiline: boolean,
            unicode: boolean,
            sticky: boolean,
            dotAll: boolean,
            hasIndices: boolean,
        ): void

        /**
         * A function that is called when the validator entered a pattern.
         * @param start The 0-based index of the first character.
         */
        onPatternEnter?(start: number): void

        /**
         * A function that is called when the validator left a pattern.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         */
        onPatternLeave?(start: number, end: number): void

        /**
         * A function that is called when the validator entered a disjunction.
         * @param start The 0-based index of the first character.
         */
        onDisjunctionEnter?(start: number): void

        /**
         * A function that is called when the validator left a disjunction.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         */
        onDisjunctionLeave?(start: number, end: number): void

        /**
         * A function that is called when the validator entered an alternative.
         * @param start The 0-based index of the first character.
         * @param index The 0-based index of alternatives in a disjunction.
         */
        onAlternativeEnter?(start: number, index: number): void

        /**
         * A function that is called when the validator left an alternative.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param index The 0-based index of alternatives in a disjunction.
         */
        onAlternativeLeave?(start: number, end: number, index: number): void

        /**
         * A function that is called when the validator entered an uncapturing group.
         * @param start The 0-based index of the first character.
         */
        onGroupEnter?(start: number): void

        /**
         * A function that is called when the validator left an uncapturing group.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         */
        onGroupLeave?(start: number, end: number): void

        /**
         * A function that is called when the validator entered a capturing group.
         * @param start The 0-based index of the first character.
         * @param name The group name.
         */
        onCapturingGroupEnter?(start: number, name: string | null): void

        /**
         * A function that is called when the validator left a capturing group.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param name The group name.
         */
        onCapturingGroupLeave?(
            start: number,
            end: number,
            name: string | null,
        ): void

        /**
         * A function that is called when the validator found a quantifier.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param min The minimum number of repeating.
         * @param max The maximum number of repeating.
         * @param greedy The flag to choose the longest matching.
         */
        onQuantifier?(
            start: number,
            end: number,
            min: number,
            max: number,
            greedy: boolean,
        ): void

        /**
         * A function that is called when the validator entered a lookahead/lookbehind assertion.
         * @param start The 0-based index of the first character.
         * @param kind The kind of the assertion.
         * @param negate The flag which represents that the assertion is negative.
         */
        onLookaroundAssertionEnter?(
            start: number,
            kind: "lookahead" | "lookbehind",
            negate: boolean,
        ): void

        /**
         * A function that is called when the validator left a lookahead/lookbehind assertion.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param kind The kind of the assertion.
         * @param negate The flag which represents that the assertion is negative.
         */
        onLookaroundAssertionLeave?(
            start: number,
            end: number,
            kind: "lookahead" | "lookbehind",
            negate: boolean,
        ): void

        /**
         * A function that is called when the validator found an edge boundary assertion.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param kind The kind of the assertion.
         */
        onEdgeAssertion?(
            start: number,
            end: number,
            kind: "start" | "end",
        ): void

        /**
         * A function that is called when the validator found a word boundary assertion.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param kind The kind of the assertion.
         * @param negate The flag which represents that the assertion is negative.
         */
        onWordBoundaryAssertion?(
            start: number,
            end: number,
            kind: "word",
            negate: boolean,
        ): void

        /**
         * A function that is called when the validator found a dot.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param kind The kind of the character set.
         */
        onAnyCharacterSet?(start: number, end: number, kind: "any"): void

        /**
         * A function that is called when the validator found a character set escape.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param kind The kind of the character set.
         * @param negate The flag which represents that the character set is negative.
         */
        onEscapeCharacterSet?(
            start: number,
            end: number,
            kind: "digit" | "space" | "word",
            negate: boolean,
        ): void

        /**
         * A function that is called when the validator found a Unicode proerty escape.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param kind The kind of the character set.
         * @param key The property name.
         * @param value The property value.
         * @param negate The flag which represents that the character set is negative.
         */
        onUnicodePropertyCharacterSet?(
            start: number,
            end: number,
            kind: "property",
            key: string,
            value: string | null,
            negate: boolean,
        ): void

        /**
         * A function that is called when the validator found a character.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param value The code point of the character.
         */
        onCharacter?(start: number, end: number, value: number): void

        /**
         * A function that is called when the validator found a backreference.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param ref The key of the referred capturing group.
         */
        onBackreference?(start: number, end: number, ref: number | string): void

        /**
         * A function that is called when the validator entered a character class.
         * @param start The 0-based index of the first character.
         * @param negate The flag which represents that the character class is negative.
         */
        onCharacterClassEnter?(start: number, negate: boolean): void

        /**
         * A function that is called when the validator left a character class.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param negate The flag which represents that the character class is negative.
         */
        onCharacterClassLeave?(
            start: number,
            end: number,
            negate: boolean,
        ): void

        /**
         * A function that is called when the validator found a character class range.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param min The minimum code point of the range.
         * @param max The maximum code point of the range.
         */
        onCharacterClassRange?(
            start: number,
            end: number,
            min: number,
            max: number,
        ): void
    }
}

/**
 * The regular expression validator.
 */
export class RegExpValidator {
    private readonly _options: RegExpValidator.Options
    private readonly _reader = new Reader()
    private _uFlag = false
    private _nFlag = false
    private _lastIntValue = 0
    private _lastMinValue = 0
    private _lastMaxValue = 0
    private _lastStrValue = ""
    private _lastKeyValue = ""
    private _lastValValue = ""
    private _lastAssertionIsQuantifiable = false
    private _numCapturingParens = 0
    private _groupNames = new Set<string>()
    private _backreferenceNames = new Set<string>()

    /**
     * Initialize this validator.
     * @param options The options of validator.
     */
    public constructor(options?: RegExpValidator.Options) {
        this._options = options || {}
    }

    /**
     * Validate a regular expression literal. E.g. "/abc/g"
     * @param source The source code to validate.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     */
    public validateLiteral(
        source: string,
        start = 0,
        end: number = source.length,
    ): void {
        this._uFlag = this._nFlag = false
        this.reset(source, start, end)

        this.onLiteralEnter(start)
        if (this.eat(Solidus) && this.eatRegExpBody() && this.eat(Solidus)) {
            const flagStart = this.index
            const uFlag = source.includes("u", flagStart)
            this.validateFlags(source, flagStart, end)
            this.validatePattern(source, start + 1, flagStart - 1, uFlag)
        } else if (start >= end) {
            this.raise("Empty")
        } else {
            const c = String.fromCodePoint(this.currentCodePoint)
            this.raise(`Unexpected character '${c}'`)
        }
        this.onLiteralLeave(start, end)
    }

    /**
     * Validate a regular expression flags. E.g. "gim"
     * @param source The source code to validate.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     */
    public validateFlags(
        source: string,
        start = 0,
        end: number = source.length,
    ): void {
        const existingFlags = new Set<number>()
        let global = false
        let ignoreCase = false
        let multiline = false
        let sticky = false
        let unicode = false
        let dotAll = false
        let hasIndices = false
        for (let i = start; i < end; ++i) {
            const flag = source.charCodeAt(i)

            if (existingFlags.has(flag)) {
                this.raise(`Duplicated flag '${source[i]}'`)
            }
            existingFlags.add(flag)

            if (flag === LatinSmallLetterG) {
                global = true
            } else if (flag === LatinSmallLetterI) {
                ignoreCase = true
            } else if (flag === LatinSmallLetterM) {
                multiline = true
            } else if (flag === LatinSmallLetterU && this.ecmaVersion >= 2015) {
                unicode = true
            } else if (flag === LatinSmallLetterY && this.ecmaVersion >= 2015) {
                sticky = true
            } else if (flag === LatinSmallLetterS && this.ecmaVersion >= 2018) {
                dotAll = true
            } else if (flag === LatinSmallLetterD && this.ecmaVersion >= 2022) {
                hasIndices = true
            } else {
                this.raise(`Invalid flag '${source[i]}'`)
            }
        }
        this.onFlags(
            start,
            end,
            global,
            ignoreCase,
            multiline,
            unicode,
            sticky,
            dotAll,
            hasIndices,
        )
    }

    /**
     * Validate a regular expression pattern. E.g. "abc"
     * @param source The source code to validate.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     * @param uFlag The flag to set unicode mode.
     */
    public validatePattern(
        source: string,
        start = 0,
        end: number = source.length,
        uFlag = false,
    ): void {
        this._uFlag = uFlag && this.ecmaVersion >= 2015
        this._nFlag = uFlag && this.ecmaVersion >= 2018
        this.reset(source, start, end)
        this.consumePattern()

        if (
            !this._nFlag &&
            this.ecmaVersion >= 2018 &&
            this._groupNames.size > 0
        ) {
            this._nFlag = true
            this.rewind(start)
            this.consumePattern()
        }
    }

    // #region Delegate for Options

    private get strict() {
        return Boolean(this._options.strict || this._uFlag)
    }

    private get ecmaVersion() {
        return this._options.ecmaVersion || 2022
    }

    private onLiteralEnter(start: number): void {
        if (this._options.onLiteralEnter) {
            this._options.onLiteralEnter(start)
        }
    }

    private onLiteralLeave(start: number, end: number): void {
        if (this._options.onLiteralLeave) {
            this._options.onLiteralLeave(start, end)
        }
    }

    private onFlags(
        start: number,
        end: number,
        global: boolean,
        ignoreCase: boolean,
        multiline: boolean,
        unicode: boolean,
        sticky: boolean,
        dotAll: boolean,
        hasIndices: boolean,
    ): void {
        if (this._options.onFlags) {
            this._options.onFlags(
                start,
                end,
                global,
                ignoreCase,
                multiline,
                unicode,
                sticky,
                dotAll,
                hasIndices,
            )
        }
    }

    private onPatternEnter(start: number): void {
        if (this._options.onPatternEnter) {
            this._options.onPatternEnter(start)
        }
    }

    private onPatternLeave(start: number, end: number): void {
        if (this._options.onPatternLeave) {
            this._options.onPatternLeave(start, end)
        }
    }

    private onDisjunctionEnter(start: number): void {
        if (this._options.onDisjunctionEnter) {
            this._options.onDisjunctionEnter(start)
        }
    }

    private onDisjunctionLeave(start: number, end: number): void {
        if (this._options.onDisjunctionLeave) {
            this._options.onDisjunctionLeave(start, end)
        }
    }

    private onAlternativeEnter(start: number, index: number): void {
        if (this._options.onAlternativeEnter) {
            this._options.onAlternativeEnter(start, index)
        }
    }

    private onAlternativeLeave(
        start: number,
        end: number,
        index: number,
    ): void {
        if (this._options.onAlternativeLeave) {
            this._options.onAlternativeLeave(start, end, index)
        }
    }

    private onGroupEnter(start: number): void {
        if (this._options.onGroupEnter) {
            this._options.onGroupEnter(start)
        }
    }

    private onGroupLeave(start: number, end: number): void {
        if (this._options.onGroupLeave) {
            this._options.onGroupLeave(start, end)
        }
    }

    private onCapturingGroupEnter(start: number, name: string | null): void {
        if (this._options.onCapturingGroupEnter) {
            this._options.onCapturingGroupEnter(start, name)
        }
    }

    private onCapturingGroupLeave(
        start: number,
        end: number,
        name: string | null,
    ): void {
        if (this._options.onCapturingGroupLeave) {
            this._options.onCapturingGroupLeave(start, end, name)
        }
    }

    private onQuantifier(
        start: number,
        end: number,
        min: number,
        max: number,
        greedy: boolean,
    ): void {
        if (this._options.onQuantifier) {
            this._options.onQuantifier(start, end, min, max, greedy)
        }
    }

    private onLookaroundAssertionEnter(
        start: number,
        kind: "lookahead" | "lookbehind",
        negate: boolean,
    ): void {
        if (this._options.onLookaroundAssertionEnter) {
            this._options.onLookaroundAssertionEnter(start, kind, negate)
        }
    }

    private onLookaroundAssertionLeave(
        start: number,
        end: number,
        kind: "lookahead" | "lookbehind",
        negate: boolean,
    ): void {
        if (this._options.onLookaroundAssertionLeave) {
            this._options.onLookaroundAssertionLeave(start, end, kind, negate)
        }
    }

    private onEdgeAssertion(
        start: number,
        end: number,
        kind: "start" | "end",
    ): void {
        if (this._options.onEdgeAssertion) {
            this._options.onEdgeAssertion(start, end, kind)
        }
    }

    private onWordBoundaryAssertion(
        start: number,
        end: number,
        kind: "word",
        negate: boolean,
    ): void {
        if (this._options.onWordBoundaryAssertion) {
            this._options.onWordBoundaryAssertion(start, end, kind, negate)
        }
    }

    private onAnyCharacterSet(start: number, end: number, kind: "any"): void {
        if (this._options.onAnyCharacterSet) {
            this._options.onAnyCharacterSet(start, end, kind)
        }
    }

    private onEscapeCharacterSet(
        start: number,
        end: number,
        kind: "digit" | "space" | "word",
        negate: boolean,
    ): void {
        if (this._options.onEscapeCharacterSet) {
            this._options.onEscapeCharacterSet(start, end, kind, negate)
        }
    }

    private onUnicodePropertyCharacterSet(
        start: number,
        end: number,
        kind: "property",
        key: string,
        value: string | null,
        negate: boolean,
    ): void {
        if (this._options.onUnicodePropertyCharacterSet) {
            this._options.onUnicodePropertyCharacterSet(
                start,
                end,
                kind,
                key,
                value,
                negate,
            )
        }
    }

    private onCharacter(start: number, end: number, value: number): void {
        if (this._options.onCharacter) {
            this._options.onCharacter(start, end, value)
        }
    }

    private onBackreference(
        start: number,
        end: number,
        ref: number | string,
    ): void {
        if (this._options.onBackreference) {
            this._options.onBackreference(start, end, ref)
        }
    }

    private onCharacterClassEnter(start: number, negate: boolean): void {
        if (this._options.onCharacterClassEnter) {
            this._options.onCharacterClassEnter(start, negate)
        }
    }

    private onCharacterClassLeave(
        start: number,
        end: number,
        negate: boolean,
    ): void {
        if (this._options.onCharacterClassLeave) {
            this._options.onCharacterClassLeave(start, end, negate)
        }
    }

    private onCharacterClassRange(
        start: number,
        end: number,
        min: number,
        max: number,
    ): void {
        if (this._options.onCharacterClassRange) {
            this._options.onCharacterClassRange(start, end, min, max)
        }
    }

    // #endregion

    // #region Delegate for Reader

    private get source(): string {
        return this._reader.source
    }

    private get index(): number {
        return this._reader.index
    }

    private get currentCodePoint(): number {
        return this._reader.currentCodePoint
    }

    private get nextCodePoint(): number {
        return this._reader.nextCodePoint
    }

    private get nextCodePoint2(): number {
        return this._reader.nextCodePoint2
    }

    private get nextCodePoint3(): number {
        return this._reader.nextCodePoint3
    }

    private reset(source: string, start: number, end: number): void {
        this._reader.reset(source, start, end, this._uFlag)
    }

    private rewind(index: number): void {
        this._reader.rewind(index)
    }

    private advance(): void {
        this._reader.advance()
    }

    private eat(cp: number): boolean {
        return this._reader.eat(cp)
    }

    private eat2(cp1: number, cp2: number): boolean {
        return this._reader.eat2(cp1, cp2)
    }

    private eat3(cp1: number, cp2: number, cp3: number): boolean {
        return this._reader.eat3(cp1, cp2, cp3)
    }

    // #endregion

    private raise(message: string): never {
        throw new RegExpSyntaxError(
            this.source,
            this._uFlag,
            this.index,
            message,
        )
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-RegularExpressionBody
    private eatRegExpBody(): boolean {
        const start = this.index
        let inClass = false
        let escaped = false

        for (;;) {
            const cp = this.currentCodePoint
            if (cp === -1 || isLineTerminator(cp)) {
                const kind = inClass ? "character class" : "regular expression"
                this.raise(`Unterminated ${kind}`)
            }
            if (escaped) {
                escaped = false
            } else if (cp === ReverseSolidus) {
                escaped = true
            } else if (cp === LeftSquareBracket) {
                inClass = true
            } else if (cp === RightSquareBracket) {
                inClass = false
            } else if (
                (cp === Solidus && !inClass) ||
                (cp === Asterisk && this.index === start)
            ) {
                break
            }
            this.advance()
        }

        return this.index !== start
    }

    /**
     * Validate the next characters as a RegExp `Pattern` production.
     * ```
     * Pattern[U, N]::
     *      Disjunction[?U, ?N]
     * ```
     */
    private consumePattern(): void {
        const start = this.index
        this._numCapturingParens = this.countCapturingParens()
        this._groupNames.clear()
        this._backreferenceNames.clear()

        this.onPatternEnter(start)
        this.consumeDisjunction()

        const cp = this.currentCodePoint
        if (this.currentCodePoint !== -1) {
            if (cp === RightParenthesis) {
                this.raise("Unmatched ')'")
            }
            if (cp === ReverseSolidus) {
                this.raise("\\ at end of pattern")
            }
            if (cp === RightSquareBracket || cp === RightCurlyBracket) {
                this.raise("Lone quantifier brackets")
            }
            const c = String.fromCodePoint(cp)
            this.raise(`Unexpected character '${c}'`)
        }
        for (const name of this._backreferenceNames) {
            if (!this._groupNames.has(name)) {
                this.raise("Invalid named capture referenced")
            }
        }
        this.onPatternLeave(start, this.index)
    }

    /**
     * Count capturing groups in the current source code.
     * @returns The number of capturing groups.
     */
    private countCapturingParens(): number {
        const start = this.index
        let inClass = false
        let escaped = false
        let count = 0
        let cp = 0

        while ((cp = this.currentCodePoint) !== -1) {
            if (escaped) {
                escaped = false
            } else if (cp === ReverseSolidus) {
                escaped = true
            } else if (cp === LeftSquareBracket) {
                inClass = true
            } else if (cp === RightSquareBracket) {
                inClass = false
            } else if (
                cp === LeftParenthesis &&
                !inClass &&
                (this.nextCodePoint !== QuestionMark ||
                    (this.nextCodePoint2 === LessThanSign &&
                        this.nextCodePoint3 !== EqualsSign &&
                        this.nextCodePoint3 !== ExclamationMark))
            ) {
                count += 1
            }
            this.advance()
        }

        this.rewind(start)
        return count
    }

    /**
     * Validate the next characters as a RegExp `Disjunction` production.
     * ```
     * Disjunction[U, N]::
     *      Alternative[?U, ?N]
     *      Alternative[?U, ?N] `|` Disjunction[?U, ?N]
     * ```
     */
    private consumeDisjunction(): void {
        const start = this.index
        let i = 0

        this.onDisjunctionEnter(start)
        do {
            this.consumeAlternative(i++)
        } while (this.eat(VerticalLine))

        if (this.consumeQuantifier(true)) {
            this.raise("Nothing to repeat")
        }
        if (this.eat(LeftCurlyBracket)) {
            this.raise("Lone quantifier brackets")
        }
        this.onDisjunctionLeave(start, this.index)
    }

    /**
     * Validate the next characters as a RegExp `Alternative` production.
     * ```
     * Alternative[U, N]::
     *      ε
     *      Alternative[?U, ?N] Term[?U, ?N]
     * ```
     */
    private consumeAlternative(i: number): void {
        const start = this.index

        this.onAlternativeEnter(start, i)
        while (this.currentCodePoint !== -1 && this.consumeTerm()) {
            // do nothing.
        }
        this.onAlternativeLeave(start, this.index, i)
    }

    /**
     * Validate the next characters as a RegExp `Term` production if possible.
     * ```
     * Term[U, N]::
     *      [strict] Assertion[+U, ?N]
     *      [strict] Atom[+U, ?N]
     *      [strict] Atom[+U, ?N] Quantifier
     *      [annexB][+U] Assertion[+U, ?N]
     *      [annexB][+U] Atom[+U, ?N]
     *      [annexB][+U] Atom[+U, ?N] Quantifier
     *      [annexB][~U] QuantifiableAssertion[?N] Quantifier
     *      [annexB][~U] Assertion[~U, ?N]
     *      [annexB][~U] ExtendedAtom[?N] Quantifier
     *      [annexB][~U] ExtendedAtom[?N]
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeTerm(): boolean {
        if (this._uFlag || this.strict) {
            return (
                this.consumeAssertion() ||
                (this.consumeAtom() && this.consumeOptionalQuantifier())
            )
        }
        return (
            (this.consumeAssertion() &&
                (!this._lastAssertionIsQuantifiable ||
                    this.consumeOptionalQuantifier())) ||
            (this.consumeExtendedAtom() && this.consumeOptionalQuantifier())
        )
    }
    private consumeOptionalQuantifier(): boolean {
        this.consumeQuantifier()
        return true
    }

    /**
     * Validate the next characters as a RegExp `Term` production if possible.
     * Set `this._lastAssertionIsQuantifiable` if the consumed assertion was a
     * `QuantifiableAssertion` production.
     * ```
     * Assertion[U, N]::
     *      `^`
     *      `$`
     *      `\b`
     *      `\B`
     *      [strict] `(?=` Disjunction[+U, ?N] `)`
     *      [strict] `(?!` Disjunction[+U, ?N] `)`
     *      [annexB][+U] `(?=` Disjunction[+U, ?N] `)`
     *      [annexB][+U] `(?!` Disjunction[+U, ?N] `)`
     *      [annexB][~U] QuantifiableAssertion[?N]
     *      `(?<=` Disjunction[?U, ?N] `)`
     *      `(?<!` Disjunction[?U, ?N] `)`
     * QuantifiableAssertion[N]::
     *      `(?=` Disjunction[~U, ?N] `)`
     *      `(?!` Disjunction[~U, ?N] `)`
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeAssertion(): boolean {
        const start = this.index
        this._lastAssertionIsQuantifiable = false

        // ^, $, \B \b
        if (this.eat(CircumflexAccent)) {
            this.onEdgeAssertion(start, this.index, "start")
            return true
        }
        if (this.eat(DollarSign)) {
            this.onEdgeAssertion(start, this.index, "end")
            return true
        }
        if (this.eat2(ReverseSolidus, LatinCapitalLetterB)) {
            this.onWordBoundaryAssertion(start, this.index, "word", true)
            return true
        }
        if (this.eat2(ReverseSolidus, LatinSmallLetterB)) {
            this.onWordBoundaryAssertion(start, this.index, "word", false)
            return true
        }

        // Lookahead / Lookbehind
        if (this.eat2(LeftParenthesis, QuestionMark)) {
            const lookbehind =
                this.ecmaVersion >= 2018 && this.eat(LessThanSign)
            let negate = false
            if (this.eat(EqualsSign) || (negate = this.eat(ExclamationMark))) {
                const kind = lookbehind ? "lookbehind" : "lookahead"
                this.onLookaroundAssertionEnter(start, kind, negate)
                this.consumeDisjunction()
                if (!this.eat(RightParenthesis)) {
                    this.raise("Unterminated group")
                }
                this._lastAssertionIsQuantifiable = !lookbehind && !this.strict
                this.onLookaroundAssertionLeave(start, this.index, kind, negate)
                return true
            }
            this.rewind(start)
        }

        return false
    }

    /**
     * Validate the next characters as a RegExp `Quantifier` production if
     * possible.
     * ```
     * Quantifier::
     *      QuantifierPrefix
     *      QuantifierPrefix `?`
     * QuantifierPrefix::
     *      `*`
     *      `+`
     *      `?`
     *      `{` DecimalDigits `}`
     *      `{` DecimalDigits `,}`
     *      `{` DecimalDigits `,` DecimalDigits `}`
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeQuantifier(noConsume = false): boolean {
        const start = this.index
        let min = 0
        let max = 0
        let greedy = false

        // QuantifierPrefix
        if (this.eat(Asterisk)) {
            min = 0
            max = Number.POSITIVE_INFINITY
        } else if (this.eat(PlusSign)) {
            min = 1
            max = Number.POSITIVE_INFINITY
        } else if (this.eat(QuestionMark)) {
            min = 0
            max = 1
        } else if (this.eatBracedQuantifier(noConsume)) {
            min = this._lastMinValue
            max = this._lastMaxValue
        } else {
            return false
        }

        // `?`
        greedy = !this.eat(QuestionMark)

        if (!noConsume) {
            this.onQuantifier(start, this.index, min, max, greedy)
        }
        return true
    }

    /**
     * Eat the next characters as the following alternatives if possible.
     * Set `this._lastMinValue` and `this._lastMaxValue` if it consumed the next
     * characters successfully.
     * ```
     *      `{` DecimalDigits `}`
     *      `{` DecimalDigits `,}`
     *      `{` DecimalDigits `,` DecimalDigits `}`
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private eatBracedQuantifier(noError: boolean): boolean {
        const start = this.index
        if (this.eat(LeftCurlyBracket)) {
            this._lastMinValue = 0
            this._lastMaxValue = Number.POSITIVE_INFINITY
            if (this.eatDecimalDigits()) {
                this._lastMinValue = this._lastMaxValue = this._lastIntValue
                if (this.eat(Comma)) {
                    this._lastMaxValue = this.eatDecimalDigits()
                        ? this._lastIntValue
                        : Number.POSITIVE_INFINITY
                }
                if (this.eat(RightCurlyBracket)) {
                    if (!noError && this._lastMaxValue < this._lastMinValue) {
                        this.raise("numbers out of order in {} quantifier")
                    }
                    return true
                }
            }
            if (!noError && (this._uFlag || this.strict)) {
                this.raise("Incomplete quantifier")
            }
            this.rewind(start)
        }
        return false
    }

    /**
     * Validate the next characters as a RegExp `Atom` production if possible.
     * ```
     * Atom[U, N]::
     *      PatternCharacter
     *      `.`
     *      `\\` AtomEscape[?U, ?N]
     *      CharacterClass[?U]
     *      `(?:` Disjunction[?U, ?N] )
     *      `(` GroupSpecifier[?U] Disjunction[?U, ?N] `)`
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeAtom(): boolean {
        return (
            this.consumePatternCharacter() ||
            this.consumeDot() ||
            this.consumeReverseSolidusAtomEscape() ||
            this.consumeCharacterClass() ||
            this.consumeUncapturingGroup() ||
            this.consumeCapturingGroup()
        )
    }

    /**
     * Validate the next characters as the following alternatives if possible.
     * ```
     *      `.`
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeDot(): boolean {
        if (this.eat(FullStop)) {
            this.onAnyCharacterSet(this.index - 1, this.index, "any")
            return true
        }
        return false
    }

    /**
     * Validate the next characters as the following alternatives if possible.
     * ```
     *      `\\` AtomEscape[?U, ?N]
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeReverseSolidusAtomEscape(): boolean {
        const start = this.index
        if (this.eat(ReverseSolidus)) {
            if (this.consumeAtomEscape()) {
                return true
            }
            this.rewind(start)
        }
        return false
    }

    /**
     * Validate the next characters as the following alternatives if possible.
     * ```
     *      `(?:` Disjunction[?U, ?N] )
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeUncapturingGroup(): boolean {
        const start = this.index
        if (this.eat3(LeftParenthesis, QuestionMark, Colon)) {
            this.onGroupEnter(start)
            this.consumeDisjunction()
            if (!this.eat(RightParenthesis)) {
                this.raise("Unterminated group")
            }
            this.onGroupLeave(start, this.index)
            return true
        }
        return false
    }

    /**
     * Validate the next characters as the following alternatives if possible.
     * ```
     *      `(` GroupSpecifier[?U] Disjunction[?U, ?N] `)`
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeCapturingGroup(): boolean {
        const start = this.index
        if (this.eat(LeftParenthesis)) {
            let name: string | null = null
            if (this.ecmaVersion >= 2018) {
                if (this.consumeGroupSpecifier()) {
                    name = this._lastStrValue
                }
            } else if (this.currentCodePoint === QuestionMark) {
                this.raise("Invalid group")
            }

            this.onCapturingGroupEnter(start, name)
            this.consumeDisjunction()
            if (!this.eat(RightParenthesis)) {
                this.raise("Unterminated group")
            }
            this.onCapturingGroupLeave(start, this.index, name)

            return true
        }
        return false
    }

    /**
     * Validate the next characters as a RegExp `ExtendedAtom` production if
     * possible.
     * ```
     * ExtendedAtom[N]::
     *      `.`
     *      `\` AtomEscape[~U, ?N]
     *      `\` [lookahead = c]
     *      CharacterClass[~U]
     *      `(?:` Disjunction[~U, ?N] `)`
     *      `(` Disjunction[~U, ?N] `)`
     *      InvalidBracedQuantifier
     *      ExtendedPatternCharacter
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeExtendedAtom(): boolean {
        return (
            this.consumeDot() ||
            this.consumeReverseSolidusAtomEscape() ||
            this.consumeReverseSolidusFollowedByC() ||
            this.consumeCharacterClass() ||
            this.consumeUncapturingGroup() ||
            this.consumeCapturingGroup() ||
            this.consumeInvalidBracedQuantifier() ||
            this.consumeExtendedPatternCharacter()
        )
    }

    /**
     * Validate the next characters as the following alternatives if possible.
     * ```
     *      `\` [lookahead = c]
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeReverseSolidusFollowedByC(): boolean {
        const start = this.index
        if (
            this.currentCodePoint === ReverseSolidus &&
            this.nextCodePoint === LatinSmallLetterC
        ) {
            this._lastIntValue = this.currentCodePoint
            this.advance()
            this.onCharacter(start, this.index, ReverseSolidus)
            return true
        }
        return false
    }

    /**
     * Validate the next characters as a RegExp `InvalidBracedQuantifier`
     * production if possible.
     * ```
     * InvalidBracedQuantifier::
     *      `{` DecimalDigits `}`
     *      `{` DecimalDigits `,}`
     *      `{` DecimalDigits `,` DecimalDigits `}`
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeInvalidBracedQuantifier(): boolean {
        if (this.eatBracedQuantifier(/* noError= */ true)) {
            this.raise("Nothing to repeat")
        }
        return false
    }

    /**
     * Validate the next characters as a RegExp `PatternCharacter` production if
     * possible.
     * ```
     * PatternCharacter::
     *      SourceCharacter but not SyntaxCharacter
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumePatternCharacter(): boolean {
        const start = this.index
        const cp = this.currentCodePoint
        if (cp !== -1 && !isSyntaxCharacter(cp)) {
            this.advance()
            this.onCharacter(start, this.index, cp)
            return true
        }
        return false
    }

    /**
     * Validate the next characters as a RegExp `ExtendedPatternCharacter`
     * production if possible.
     * ```
     * ExtendedPatternCharacter::
     *      SourceCharacter but not one of ^ $ \ . * + ? ( ) [ |
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeExtendedPatternCharacter(): boolean {
        const start = this.index
        const cp = this.currentCodePoint
        if (
            cp !== -1 &&
            cp !== CircumflexAccent &&
            cp !== DollarSign &&
            cp !== ReverseSolidus &&
            cp !== FullStop &&
            cp !== Asterisk &&
            cp !== PlusSign &&
            cp !== QuestionMark &&
            cp !== LeftParenthesis &&
            cp !== RightParenthesis &&
            cp !== LeftSquareBracket &&
            cp !== VerticalLine
        ) {
            this.advance()
            this.onCharacter(start, this.index, cp)
            return true
        }
        return false
    }

    /**
     * Validate the next characters as a RegExp `GroupSpecifier` production.
     * Set `this._lastStrValue` if the group name existed.
     * ```
     * GroupSpecifier[U]::
     *      ε
     *      `?` GroupName[?U]
     * ```
     * @returns `true` if the group name existed.
     */
    private consumeGroupSpecifier(): boolean {
        if (this.eat(QuestionMark)) {
            if (this.eatGroupName()) {
                if (!this._groupNames.has(this._lastStrValue)) {
                    this._groupNames.add(this._lastStrValue)
                    return true
                }
                this.raise("Duplicate capture group name")
            }
            this.raise("Invalid group")
        }
        return false
    }

    /**
     * Validate the next characters as a RegExp `AtomEscape` production if
     * possible.
     * ```
     * AtomEscape[U, N]::
     *      [strict] DecimalEscape
     *      [annexB][+U] DecimalEscape
     *      [annexB][~U] DecimalEscape but only if the CapturingGroupNumber of DecimalEscape is <= NcapturingParens
     *      CharacterClassEscape[?U]
     *      [strict] CharacterEscape[?U]
     *      [annexB] CharacterEscape[?U, ?N]
     *      [+N] `k` GroupName[?U]
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeAtomEscape(): boolean {
        if (
            this.consumeBackreference() ||
            this.consumeCharacterClassEscape() ||
            this.consumeCharacterEscape() ||
            (this._nFlag && this.consumeKGroupName())
        ) {
            return true
        }
        if (this.strict || this._uFlag) {
            this.raise("Invalid escape")
        }
        return false
    }

    /**
     * Validate the next characters as the follwoing alternatives if possible.
     * ```
     *      [strict] DecimalEscape
     *      [annexB][+U] DecimalEscape
     *      [annexB][~U] DecimalEscape but only if the CapturingGroupNumber of DecimalEscape is <= NcapturingParens
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeBackreference(): boolean {
        const start = this.index
        if (this.eatDecimalEscape()) {
            const n = this._lastIntValue
            if (n <= this._numCapturingParens) {
                this.onBackreference(start - 1, this.index, n)
                return true
            }
            if (this.strict || this._uFlag) {
                this.raise("Invalid escape")
            }
            this.rewind(start)
        }
        return false
    }

    /**
     * Validate the next characters as a RegExp `DecimalEscape` production if
     * possible.
     * Set `-1` to `this._lastIntValue` as meaning of a character set if it ate
     * the next characters successfully.
     * ```
     * CharacterClassEscape[U]::
     *      `d`
     *      `D`
     *      `s`
     *      `S`
     *      `w`
     *      `W`
     *      [+U] `p{` UnicodePropertyValueExpression `}`
     *      [+U] `P{` UnicodePropertyValueExpression `}`
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeCharacterClassEscape(): boolean {
        const start = this.index

        if (this.eat(LatinSmallLetterD)) {
            this._lastIntValue = -1
            this.onEscapeCharacterSet(start - 1, this.index, "digit", false)
            return true
        }
        if (this.eat(LatinCapitalLetterD)) {
            this._lastIntValue = -1
            this.onEscapeCharacterSet(start - 1, this.index, "digit", true)
            return true
        }
        if (this.eat(LatinSmallLetterS)) {
            this._lastIntValue = -1
            this.onEscapeCharacterSet(start - 1, this.index, "space", false)
            return true
        }
        if (this.eat(LatinCapitalLetterS)) {
            this._lastIntValue = -1
            this.onEscapeCharacterSet(start - 1, this.index, "space", true)
            return true
        }
        if (this.eat(LatinSmallLetterW)) {
            this._lastIntValue = -1
            this.onEscapeCharacterSet(start - 1, this.index, "word", false)
            return true
        }
        if (this.eat(LatinCapitalLetterW)) {
            this._lastIntValue = -1
            this.onEscapeCharacterSet(start - 1, this.index, "word", true)
            return true
        }

        let negate = false
        if (
            this._uFlag &&
            this.ecmaVersion >= 2018 &&
            (this.eat(LatinSmallLetterP) ||
                (negate = this.eat(LatinCapitalLetterP)))
        ) {
            this._lastIntValue = -1
            if (
                this.eat(LeftCurlyBracket) &&
                this.eatUnicodePropertyValueExpression() &&
                this.eat(RightCurlyBracket)
            ) {
                this.onUnicodePropertyCharacterSet(
                    start - 1,
                    this.index,
                    "property",
                    this._lastKeyValue,
                    this._lastValValue || null,
                    negate,
                )
                return true
            }
            this.raise("Invalid property name")
        }

        return false
    }

    /**
     * Validate the next characters as a RegExp `CharacterEscape` production if
     * possible.
     * ```
     * CharacterEscape[U, N]::
     *      ControlEscape
     *      `c` ControlLetter
     *      `0` [lookahead ∉ DecimalDigit]
     *      HexEscapeSequence
     *      RegExpUnicodeEscapeSequence[?U]
     *      [annexB][~U] LegacyOctalEscapeSequence
     *      IdentityEscape[?U, ?N]
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeCharacterEscape(): boolean {
        const start = this.index
        if (
            this.eatControlEscape() ||
            this.eatCControlLetter() ||
            this.eatZero() ||
            this.eatHexEscapeSequence() ||
            this.eatRegExpUnicodeEscapeSequence() ||
            (!this.strict &&
                !this._uFlag &&
                this.eatLegacyOctalEscapeSequence()) ||
            this.eatIdentityEscape()
        ) {
            this.onCharacter(start - 1, this.index, this._lastIntValue)
            return true
        }
        return false
    }

    /**
     * Validate the next characters as the follwoing alternatives if possible.
     * ```
     *      `k` GroupName[?U]
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeKGroupName(): boolean {
        const start = this.index
        if (this.eat(LatinSmallLetterK)) {
            if (this.eatGroupName()) {
                const groupName = this._lastStrValue
                this._backreferenceNames.add(groupName)
                this.onBackreference(start - 1, this.index, groupName)
                return true
            }
            this.raise("Invalid named reference")
        }
        return false
    }

    /**
     * Validate the next characters as a RegExp `CharacterClass` production if
     * possible.
     * ```
     * CharacterClass[U]::
     *      `[` [lookahead ≠ ^] ClassRanges[?U] `]`
     *      `[^` ClassRanges[?U] `]`
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeCharacterClass(): boolean {
        const start = this.index
        if (this.eat(LeftSquareBracket)) {
            const negate = this.eat(CircumflexAccent)
            this.onCharacterClassEnter(start, negate)
            this.consumeClassRanges()
            if (!this.eat(RightSquareBracket)) {
                this.raise("Unterminated character class")
            }
            this.onCharacterClassLeave(start, this.index, negate)
            return true
        }
        return false
    }

    /**
     * Validate the next characters as a RegExp `ClassRanges` production.
     * ```
     * ClassRanges[U]::
     *      ε
     *      NonemptyClassRanges[?U]
     * NonemptyClassRanges[U]::
     *      ClassAtom[?U]
     *      ClassAtom[?U] NonemptyClassRangesNoDash[?U]
     *      ClassAtom[?U] `-` ClassAtom[?U] ClassRanges[?U]
     * NonemptyClassRangesNoDash[U]::
     *      ClassAtom[?U]
     *      ClassAtomNoDash[?U] NonemptyClassRangesNoDash[?U]
     *      ClassAtomNoDash[?U] `-` ClassAtom[?U] ClassRanges[?U]
     * ```
     */
    private consumeClassRanges(): void {
        const strict = this.strict || this._uFlag
        for (;;) {
            // Consume the first ClassAtom
            const rangeStart = this.index
            if (!this.consumeClassAtom()) {
                break
            }
            const min = this._lastIntValue

            // Consume `-`
            if (!this.eat(HyphenMinus)) {
                continue
            }
            this.onCharacter(this.index - 1, this.index, HyphenMinus)

            // Consume the second ClassAtom
            if (!this.consumeClassAtom()) {
                break
            }
            const max = this._lastIntValue

            // Validate
            if (min === -1 || max === -1) {
                if (strict) {
                    this.raise("Invalid character class")
                }
                continue
            }
            if (min > max) {
                this.raise("Range out of order in character class")
            }

            this.onCharacterClassRange(rangeStart, this.index, min, max)
        }
    }

    /**
     * Validate the next characters as a RegExp `ClassAtom` production if
     * possible.
     * Set `this._lastIntValue` if it consumed the next characters successfully.
     * ```
     * ClassAtom[U, N]::
     *      `-`
     *      ClassAtomNoDash[?U, ?N]
     * ClassAtomNoDash[U, N]::
     *      SourceCharacter but not one of \ ] -
     *      `\` ClassEscape[?U, ?N]
     *      [annexB] `\` [lookahead = c]
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeClassAtom(): boolean {
        const start = this.index
        const cp = this.currentCodePoint

        if (cp !== -1 && cp !== ReverseSolidus && cp !== RightSquareBracket) {
            this.advance()
            this._lastIntValue = cp
            this.onCharacter(start, this.index, this._lastIntValue)
            return true
        }

        if (this.eat(ReverseSolidus)) {
            if (this.consumeClassEscape()) {
                return true
            }
            if (!this.strict && this.currentCodePoint === LatinSmallLetterC) {
                this._lastIntValue = ReverseSolidus
                this.onCharacter(start, this.index, this._lastIntValue)
                return true
            }
            if (this.strict || this._uFlag) {
                this.raise("Invalid escape")
            }
            this.rewind(start)
        }

        return false
    }

    /**
     * Validate the next characters as a RegExp `ClassEscape` production if
     * possible.
     * Set `this._lastIntValue` if it consumed the next characters successfully.
     * ```
     * ClassEscape[U, N]::
     *      `b`
     *      [+U] `-`
     *      [annexB][~U] `c` ClassControlLetter
     *      CharacterClassEscape[?U]
     *      CharacterEscape[?U, ?N]
     * ClassControlLetter::
     *      DecimalDigit
     *      `_`
     * ```
     * @returns `true` if it consumed the next characters successfully.
     */
    private consumeClassEscape(): boolean {
        const start = this.index

        // `b`
        if (this.eat(LatinSmallLetterB)) {
            this._lastIntValue = Backspace
            this.onCharacter(start - 1, this.index, this._lastIntValue)
            return true
        }

        // [+U] `-`
        if (this._uFlag && this.eat(HyphenMinus)) {
            this._lastIntValue = HyphenMinus
            this.onCharacter(start - 1, this.index, this._lastIntValue)
            return true
        }

        // [annexB][~U] `c` ClassControlLetter
        let cp = 0
        if (
            !this.strict &&
            !this._uFlag &&
            this.currentCodePoint === LatinSmallLetterC &&
            (isDecimalDigit((cp = this.nextCodePoint)) || cp === LowLine)
        ) {
            this.advance()
            this.advance()
            this._lastIntValue = cp % 0x20
            this.onCharacter(start - 1, this.index, this._lastIntValue)
            return true
        }

        return (
            this.consumeCharacterClassEscape() || this.consumeCharacterEscape()
        )
    }

    /**
     * Eat the next characters as a RegExp `GroupName` production if possible.
     * Set `this._lastStrValue` if the group name existed.
     * ```
     * GroupName[U]::
     *      `<` RegExpIdentifierName[?U] `>`
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatGroupName(): boolean {
        if (this.eat(LessThanSign)) {
            if (this.eatRegExpIdentifierName() && this.eat(GreaterThanSign)) {
                return true
            }
            this.raise("Invalid capture group name")
        }
        return false
    }

    /**
     * Eat the next characters as a RegExp `RegExpIdentifierName` production if
     * possible.
     * Set `this._lastStrValue` if the identifier name existed.
     * ```
     * RegExpIdentifierName[U]::
     *      RegExpIdentifierStart[?U]
     *      RegExpIdentifierName[?U] RegExpIdentifierPart[?U]
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatRegExpIdentifierName(): boolean {
        if (this.eatRegExpIdentifierStart()) {
            this._lastStrValue = String.fromCodePoint(this._lastIntValue)
            while (this.eatRegExpIdentifierPart()) {
                this._lastStrValue += String.fromCodePoint(this._lastIntValue)
            }
            return true
        }
        return false
    }

    /**
     * Eat the next characters as a RegExp `RegExpIdentifierStart` production if
     * possible.
     * Set `this._lastIntValue` if the identifier start existed.
     * ```
     * RegExpIdentifierStart[U] ::
     *      UnicodeIDStart
     *      `$`
     *      `_`
     *      `\` RegExpUnicodeEscapeSequence[+U]
     *      [~U] UnicodeLeadSurrogate UnicodeTrailSurrogate
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatRegExpIdentifierStart(): boolean {
        const start = this.index
        const forceUFlag = !this._uFlag && this.ecmaVersion >= 2020
        let cp = this.currentCodePoint
        this.advance()

        if (
            cp === ReverseSolidus &&
            this.eatRegExpUnicodeEscapeSequence(forceUFlag)
        ) {
            cp = this._lastIntValue
        } else if (
            forceUFlag &&
            isLeadSurrogate(cp) &&
            isTrailSurrogate(this.currentCodePoint)
        ) {
            cp = combineSurrogatePair(cp, this.currentCodePoint)
            this.advance()
        }

        if (isRegExpIdentifierStart(cp)) {
            this._lastIntValue = cp
            return true
        }

        if (this.index !== start) {
            this.rewind(start)
        }
        return false
    }

    /**
     * Eat the next characters as a RegExp `RegExpIdentifierPart` production if
     * possible.
     * Set `this._lastIntValue` if the identifier part existed.
     * ```
     * RegExpIdentifierPart[U] ::
     *      UnicodeIDContinue
     *      `$`
     *      `_`
     *      `\` RegExpUnicodeEscapeSequence[+U]
     *      [~U] UnicodeLeadSurrogate UnicodeTrailSurrogate
     *      <ZWNJ>
     *      <ZWJ>
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatRegExpIdentifierPart(): boolean {
        const start = this.index
        const forceUFlag = !this._uFlag && this.ecmaVersion >= 2020
        let cp = this.currentCodePoint
        this.advance()

        if (
            cp === ReverseSolidus &&
            this.eatRegExpUnicodeEscapeSequence(forceUFlag)
        ) {
            cp = this._lastIntValue
        } else if (
            forceUFlag &&
            isLeadSurrogate(cp) &&
            isTrailSurrogate(this.currentCodePoint)
        ) {
            cp = combineSurrogatePair(cp, this.currentCodePoint)
            this.advance()
        }

        if (isRegExpIdentifierPart(cp)) {
            this._lastIntValue = cp
            return true
        }

        if (this.index !== start) {
            this.rewind(start)
        }
        return false
    }

    /**
     * Eat the next characters as the follwoing alternatives if possible.
     * Set `this._lastIntValue` if it ate the next characters successfully.
     * ```
     *      `c` ControlLetter
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatCControlLetter(): boolean {
        const start = this.index
        if (this.eat(LatinSmallLetterC)) {
            if (this.eatControlLetter()) {
                return true
            }
            this.rewind(start)
        }
        return false
    }

    /**
     * Eat the next characters as the follwoing alternatives if possible.
     * Set `this._lastIntValue` if it ate the next characters successfully.
     * ```
     *      `0` [lookahead ∉ DecimalDigit]
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatZero(): boolean {
        if (
            this.currentCodePoint === DigitZero &&
            !isDecimalDigit(this.nextCodePoint)
        ) {
            this._lastIntValue = 0
            this.advance()
            return true
        }
        return false
    }

    /**
     * Eat the next characters as a RegExp `ControlEscape` production if
     * possible.
     * Set `this._lastIntValue` if it ate the next characters successfully.
     * ```
     * ControlEscape:: one of
     *      f n r t v
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatControlEscape(): boolean {
        if (this.eat(LatinSmallLetterF)) {
            this._lastIntValue = FormFeed
            return true
        }
        if (this.eat(LatinSmallLetterN)) {
            this._lastIntValue = LineFeed
            return true
        }
        if (this.eat(LatinSmallLetterR)) {
            this._lastIntValue = CarriageReturn
            return true
        }
        if (this.eat(LatinSmallLetterT)) {
            this._lastIntValue = CharacterTabulation
            return true
        }
        if (this.eat(LatinSmallLetterV)) {
            this._lastIntValue = LineTabulation
            return true
        }
        return false
    }

    /**
     * Eat the next characters as a RegExp `ControlLetter` production if
     * possible.
     * Set `this._lastIntValue` if it ate the next characters successfully.
     * ```
     * ControlLetter:: one of
     *      a b c d e f g h i j k l m n o p q r s t u v w x y z
     *      A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatControlLetter(): boolean {
        const cp = this.currentCodePoint
        if (isLatinLetter(cp)) {
            this.advance()
            this._lastIntValue = cp % 0x20
            return true
        }
        return false
    }

    /**
     * Eat the next characters as a RegExp `RegExpUnicodeEscapeSequence`
     * production if possible.
     * Set `this._lastIntValue` if it ate the next characters successfully.
     * ```
     * RegExpUnicodeEscapeSequence[U]::
     *      [+U] `u` LeadSurrogate `\u` TrailSurrogate
     *      [+U] `u` LeadSurrogate
     *      [+U] `u` TrailSurrogate
     *      [+U] `u` NonSurrogate
     *      [~U] `u` Hex4Digits
     *      [+U] `u{` CodePoint `}`
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatRegExpUnicodeEscapeSequence(forceUFlag = false): boolean {
        const start = this.index
        const uFlag = forceUFlag || this._uFlag

        if (this.eat(LatinSmallLetterU)) {
            if (
                (uFlag && this.eatRegExpUnicodeSurrogatePairEscape()) ||
                this.eatFixedHexDigits(4) ||
                (uFlag && this.eatRegExpUnicodeCodePointEscape())
            ) {
                return true
            }
            if (this.strict || uFlag) {
                this.raise("Invalid unicode escape")
            }
            this.rewind(start)
        }

        return false
    }

    /**
     * Eat the next characters as the following alternatives if possible.
     * Set `this._lastIntValue` if it ate the next characters successfully.
     * ```
     *      LeadSurrogate `\u` TrailSurrogate
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatRegExpUnicodeSurrogatePairEscape(): boolean {
        const start = this.index

        if (this.eatFixedHexDigits(4)) {
            const lead = this._lastIntValue
            if (
                isLeadSurrogate(lead) &&
                this.eat(ReverseSolidus) &&
                this.eat(LatinSmallLetterU) &&
                this.eatFixedHexDigits(4)
            ) {
                const trail = this._lastIntValue
                if (isTrailSurrogate(trail)) {
                    this._lastIntValue = combineSurrogatePair(lead, trail)
                    return true
                }
            }

            this.rewind(start)
        }

        return false
    }

    /**
     * Eat the next characters as the following alternatives if possible.
     * Set `this._lastIntValue` if it ate the next characters successfully.
     * ```
     *      `{` CodePoint `}`
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatRegExpUnicodeCodePointEscape(): boolean {
        const start = this.index

        if (
            this.eat(LeftCurlyBracket) &&
            this.eatHexDigits() &&
            this.eat(RightCurlyBracket) &&
            isValidUnicode(this._lastIntValue)
        ) {
            return true
        }

        this.rewind(start)
        return false
    }

    /**
     * Eat the next characters as a RegExp `IdentityEscape` production if
     * possible.
     * Set `this._lastIntValue` if it ate the next characters successfully.
     * ```
     * IdentityEscape[U, N]::
     *      [+U] SyntaxCharacter
     *      [+U] `/`
     *      [strict][~U] SourceCharacter but not UnicodeIDContinue
     *      [annexB][~U] SourceCharacterIdentityEscape[?N]
     * SourceCharacterIdentityEscape[N]::
     *      [~N] SourceCharacter but not c
     *      [+N] SourceCharacter but not one of c k
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatIdentityEscape(): boolean {
        const cp = this.currentCodePoint
        if (this.isValidIdentityEscape(cp)) {
            this._lastIntValue = cp
            this.advance()
            return true
        }
        return false
    }
    private isValidIdentityEscape(cp: number): boolean {
        if (cp === -1) {
            return false
        }
        if (this._uFlag) {
            return isSyntaxCharacter(cp) || cp === Solidus
        }
        if (this.strict) {
            return !isIdContinue(cp)
        }
        if (this._nFlag) {
            return !(cp === LatinSmallLetterC || cp === LatinSmallLetterK)
        }
        return cp !== LatinSmallLetterC
    }

    /**
     * Eat the next characters as a RegExp `DecimalEscape` production if
     * possible.
     * Set `this._lastIntValue` if it ate the next characters successfully.
     * ```
     * DecimalEscape::
     *      NonZeroDigit DecimalDigits(opt) [lookahead ∉ DecimalDigit]
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatDecimalEscape(): boolean {
        this._lastIntValue = 0
        let cp = this.currentCodePoint
        if (cp >= DigitOne && cp <= DigitNine) {
            do {
                this._lastIntValue = 10 * this._lastIntValue + (cp - DigitZero)
                this.advance()
            } while (
                (cp = this.currentCodePoint) >= DigitZero &&
                cp <= DigitNine
            )
            return true
        }
        return false
    }

    /**
     * Eat the next characters as a RegExp `UnicodePropertyValueExpression`
     * production if possible.
     * Set `this._lastKeyValue` and `this._lastValValue` if it ate the next
     * characters successfully.
     * ```
     * UnicodePropertyValueExpression::
     *      UnicodePropertyName `=` UnicodePropertyValue
     *      LoneUnicodePropertyNameOrValue
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatUnicodePropertyValueExpression(): boolean {
        const start = this.index

        // UnicodePropertyName `=` UnicodePropertyValue
        if (this.eatUnicodePropertyName() && this.eat(EqualsSign)) {
            this._lastKeyValue = this._lastStrValue
            if (this.eatUnicodePropertyValue()) {
                this._lastValValue = this._lastStrValue
                if (
                    isValidUnicodeProperty(
                        this.ecmaVersion,
                        this._lastKeyValue,
                        this._lastValValue,
                    )
                ) {
                    return true
                }
                this.raise("Invalid property name")
            }
        }
        this.rewind(start)

        // LoneUnicodePropertyNameOrValue
        if (this.eatLoneUnicodePropertyNameOrValue()) {
            const nameOrValue = this._lastStrValue
            if (
                isValidUnicodeProperty(
                    this.ecmaVersion,
                    "General_Category",
                    nameOrValue,
                )
            ) {
                this._lastKeyValue = "General_Category"
                this._lastValValue = nameOrValue
                return true
            }
            if (isValidLoneUnicodeProperty(this.ecmaVersion, nameOrValue)) {
                this._lastKeyValue = nameOrValue
                this._lastValValue = ""
                return true
            }
            this.raise("Invalid property name")
        }
        return false
    }

    /**
     * Eat the next characters as a RegExp `UnicodePropertyName` production if
     * possible.
     * Set `this._lastStrValue` if it ate the next characters successfully.
     * ```
     * UnicodePropertyName::
     *      UnicodePropertyNameCharacters
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatUnicodePropertyName(): boolean {
        this._lastStrValue = ""
        while (isUnicodePropertyNameCharacter(this.currentCodePoint)) {
            this._lastStrValue += String.fromCodePoint(this.currentCodePoint)
            this.advance()
        }
        return this._lastStrValue !== ""
    }

    /**
     * Eat the next characters as a RegExp `UnicodePropertyValue` production if
     * possible.
     * Set `this._lastStrValue` if it ate the next characters successfully.
     * ```
     * UnicodePropertyValue::
     *      UnicodePropertyValueCharacters
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatUnicodePropertyValue(): boolean {
        this._lastStrValue = ""
        while (isUnicodePropertyValueCharacter(this.currentCodePoint)) {
            this._lastStrValue += String.fromCodePoint(this.currentCodePoint)
            this.advance()
        }
        return this._lastStrValue !== ""
    }

    /**
     * Eat the next characters as a RegExp `UnicodePropertyValue` production if
     * possible.
     * Set `this._lastStrValue` if it ate the next characters successfully.
     * ```
     * LoneUnicodePropertyNameOrValue::
     *      UnicodePropertyValueCharacters
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatLoneUnicodePropertyNameOrValue(): boolean {
        return this.eatUnicodePropertyValue()
    }

    /**
     * Eat the next characters as a `HexEscapeSequence` production if possible.
     * Set `this._lastIntValue` if it ate the next characters successfully.
     * ```
     * HexEscapeSequence::
     *      `x` HexDigit HexDigit
     * HexDigit:: one of
     *      0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatHexEscapeSequence(): boolean {
        const start = this.index
        if (this.eat(LatinSmallLetterX)) {
            if (this.eatFixedHexDigits(2)) {
                return true
            }
            if (this._uFlag || this.strict) {
                this.raise("Invalid escape")
            }
            this.rewind(start)
        }
        return false
    }

    /**
     * Eat the next characters as a `DecimalDigits` production if possible.
     * Set `this._lastIntValue` if it ate the next characters successfully.
     * ```
     * DecimalDigits::
     *      DecimalDigit
     *      DecimalDigits DecimalDigit
     * DecimalDigit:: one of
     *      0 1 2 3 4 5 6 7 8 9
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatDecimalDigits(): boolean {
        const start = this.index

        this._lastIntValue = 0
        while (isDecimalDigit(this.currentCodePoint)) {
            this._lastIntValue =
                10 * this._lastIntValue + digitToInt(this.currentCodePoint)
            this.advance()
        }

        return this.index !== start
    }

    /**
     * Eat the next characters as a `HexDigits` production if possible.
     * Set `this._lastIntValue` if it ate the next characters successfully.
     * ```
     * HexDigits::
     *      HexDigit
     *      HexDigits HexDigit
     * HexDigit:: one of
     *      0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatHexDigits(): boolean {
        const start = this.index
        this._lastIntValue = 0
        while (isHexDigit(this.currentCodePoint)) {
            this._lastIntValue =
                16 * this._lastIntValue + digitToInt(this.currentCodePoint)
            this.advance()
        }
        return this.index !== start
    }

    /**
     * Eat the next characters as a `HexDigits` production if possible.
     * Set `this._lastIntValue` if it ate the next characters successfully.
     * ```
     * LegacyOctalEscapeSequence::
     *      OctalDigit [lookahead ∉ OctalDigit]
     *      ZeroToThree OctalDigit [lookahead ∉ OctalDigit]
     *      FourToSeven OctalDigit
     *      ZeroToThree OctalDigit OctalDigit
     * OctalDigit:: one of
     *      0 1 2 3 4 5 6 7
     * ZeroToThree:: one of
     *      0 1 2 3
     * FourToSeven:: one of
     *      4 5 6 7
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatLegacyOctalEscapeSequence(): boolean {
        if (this.eatOctalDigit()) {
            const n1 = this._lastIntValue
            if (this.eatOctalDigit()) {
                const n2 = this._lastIntValue
                if (n1 <= 3 && this.eatOctalDigit()) {
                    this._lastIntValue = n1 * 64 + n2 * 8 + this._lastIntValue
                } else {
                    this._lastIntValue = n1 * 8 + n2
                }
            } else {
                this._lastIntValue = n1
            }
            return true
        }
        return false
    }

    /**
     * Eat the next characters as a `OctalDigit` production if possible.
     * Set `this._lastIntValue` if it ate the next characters successfully.
     * ```
     * OctalDigit:: one of
     *      0 1 2 3 4 5 6 7
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatOctalDigit(): boolean {
        const cp = this.currentCodePoint
        if (isOctalDigit(cp)) {
            this.advance()
            this._lastIntValue = cp - DigitZero
            return true
        }
        this._lastIntValue = 0
        return false
    }

    /**
     * Eat the next characters as the given number of `HexDigit` productions if
     * possible.
     * Set `this._lastIntValue` if it ate the next characters successfully.
     * ```
     * HexDigit:: one of
     *      0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F
     * ```
     * @returns `true` if it ate the next characters successfully.
     */
    private eatFixedHexDigits(length: number): boolean {
        const start = this.index
        this._lastIntValue = 0
        for (let i = 0; i < length; ++i) {
            const cp = this.currentCodePoint
            if (!isHexDigit(cp)) {
                this.rewind(start)
                return false
            }
            this._lastIntValue = 16 * this._lastIntValue + digitToInt(cp)
            this.advance()
        }
        return true
    }
}
