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
    isDecimalDigit,
    isHexDigit,
    isIdContinue,
    isIdStart,
    isLatinLetter,
    isLineTerminator,
    isOctalDigit,
    isValidUnicode,
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
    PropertyData,
    QuestionMark,
    ReverseSolidus,
    RightCurlyBracket,
    RightParenthesis,
    RightSquareBracket,
    Solidus,
    VerticalLine,
    ZeroWidthJoiner,
    ZeroWidthNonJoiner,
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

function isValidUnicodeProperty(name: string, value: string): boolean {
    //eslint-disable-next-line no-prototype-builtins
    return PropertyData.hasOwnProperty(name) && PropertyData[name].has(value)
}

function isValidUnicodePropertyName(name: string): boolean {
    return PropertyData.$LONE.has(name)
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
         * ECMAScript version. Default is `2018`.
         * - `2015` added `u` and `y` flags.
         * - `2018` added `s` flag, Named Capturing Group, Lookbehind Assertion,
         *   and Unicode Property Escape.
         */
        ecmaVersion?: 5 | 2015 | 2016 | 2017 | 2018

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
        this.pattern()

        if (
            !this._nFlag &&
            this.ecmaVersion >= 2018 &&
            this._groupNames.size > 0
        ) {
            this._nFlag = true
            this.rewind(start)
            this.pattern()
        }
    }

    // #region Delegate for Options

    private get strict() {
        return Boolean(this._options.strict || this._uFlag)
    }

    private get ecmaVersion() {
        return this._options.ecmaVersion || 2018
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

    // https://www.ecma-international.org/ecma-262/8.0/#prod-Pattern
    private pattern(): void {
        const start = this.index
        this._numCapturingParens = this.countCapturingParens()
        this._groupNames.clear()
        this._backreferenceNames.clear()

        this.onPatternEnter(start)
        this.disjunction()

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

    // https://www.ecma-international.org/ecma-262/8.0/#prod-Disjunction
    private disjunction(): void {
        const start = this.index
        let i = 0

        this.onDisjunctionEnter(start)
        this.alternative(i++)
        while (this.eat(VerticalLine)) {
            this.alternative(i++)
        }

        if (this.eatQuantifier(true)) {
            this.raise("Nothing to repeat")
        }
        if (this.eat(LeftCurlyBracket)) {
            this.raise("Lone quantifier brackets")
        }
        this.onDisjunctionLeave(start, this.index)
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-Alternative
    private alternative(i: number): void {
        const start = this.index

        this.onAlternativeEnter(start, i)
        while (this.currentCodePoint !== -1 && this.eatTerm()) {
            // do nothing.
        }
        this.onAlternativeLeave(start, this.index, i)
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-Term
    private eatTerm(): boolean {
        if (this.eatAssertion()) {
            // Handle `QuantifiableAssertion Quantifier` alternative.
            // `this.lastAssertionIsQuantifiable` is true if the last eaten
            // Assertion is a QuantifiableAssertion.
            if (this._lastAssertionIsQuantifiable) {
                this.eatQuantifier()
            }
            return true
        }

        if (this.strict ? this.eatAtom() : this.eatExtendedAtom()) {
            this.eatQuantifier()
            return true
        }

        return false
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-Assertion
    private eatAssertion(): boolean {
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
                this.disjunction()
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

    // https://www.ecma-international.org/ecma-262/8.0/#prod-Quantifier
    // https://www.ecma-international.org/ecma-262/8.0/#prod-QuantifierPrefix
    private eatQuantifier(noError = false): boolean {
        const start = this.index
        let min = 0
        let max = 0
        let greedy = false

        if (this.eat(Asterisk)) {
            min = 0
            max = Number.POSITIVE_INFINITY
        } else if (this.eat(PlusSign)) {
            min = 1
            max = Number.POSITIVE_INFINITY
        } else if (this.eat(QuestionMark)) {
            min = 0
            max = 1
        } else if (this.eatBracedQuantifier(noError)) {
            min = this._lastMinValue
            max = this._lastMaxValue
        } else {
            return false
        }
        greedy = !this.eat(QuestionMark)

        if (!noError) {
            this.onQuantifier(start, this.index, min, max, greedy)
        }
        return true
    }

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
            if (!noError && this.strict) {
                this.raise("Incomplete quantifier")
            }
            this.rewind(start)
        }
        return false
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-Atom
    private eatAtom(): boolean {
        return (
            this.eatPatternCharacter() ||
            this.eatDot() ||
            this.eatReverseSolidusAtomEscape() ||
            this.eatCharacterClass() ||
            this.eatUncapturingGroup() ||
            this.eatCapturingGroup()
        )
    }

    private eatDot(): boolean {
        if (this.eat(FullStop)) {
            this.onAnyCharacterSet(this.index - 1, this.index, "any")
            return true
        }
        return false
    }

    private eatReverseSolidusAtomEscape(): boolean {
        const start = this.index
        if (this.eat(ReverseSolidus)) {
            if (this.eatAtomEscape()) {
                return true
            }
            this.rewind(start)
        }
        return false
    }

    private eatUncapturingGroup(): boolean {
        const start = this.index
        if (this.eat3(LeftParenthesis, QuestionMark, Colon)) {
            this.onGroupEnter(start)
            this.disjunction()
            if (!this.eat(RightParenthesis)) {
                this.raise("Unterminated group")
            }
            this.onGroupLeave(start, this.index)
            return true
        }
        return false
    }

    private eatCapturingGroup(): boolean {
        const start = this.index
        if (this.eat(LeftParenthesis)) {
            this._lastStrValue = ""
            if (this.ecmaVersion >= 2018) {
                this.groupSpecifier()
            } else if (this.currentCodePoint === QuestionMark) {
                this.raise("Invalid group")
            }
            const name = this._lastStrValue || null

            this.onCapturingGroupEnter(start, name)
            this.disjunction()
            if (!this.eat(RightParenthesis)) {
                this.raise("Unterminated group")
            }
            this.onCapturingGroupLeave(start, this.index, name)

            return true
        }
        return false
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-ExtendedAtom
    private eatExtendedAtom(): boolean {
        return (
            this.eatDot() ||
            this.eatReverseSolidusAtomEscape() ||
            this.eatReverseSolidusFollowedByC() ||
            this.eatCharacterClass() ||
            this.eatUncapturingGroup() ||
            this.eatCapturingGroup() ||
            this.eatInvalidBracedQuantifier() ||
            this.eatExtendedPatternCharacter()
        )
    }

    // \ [lookahead = c]
    private eatReverseSolidusFollowedByC(): boolean {
        if (
            this.currentCodePoint === ReverseSolidus &&
            this.nextCodePoint === LatinSmallLetterC
        ) {
            this._lastIntValue = this.currentCodePoint
            this.advance()
            this.onCharacter(this.index - 1, this.index, ReverseSolidus)
            return true
        }
        return false
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-InvalidBracedQuantifier
    private eatInvalidBracedQuantifier(): boolean {
        if (this.eatBracedQuantifier(true)) {
            this.raise("Nothing to repeat")
        }
        return false
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-SyntaxCharacter
    private eatSyntaxCharacter(): boolean {
        if (isSyntaxCharacter(this.currentCodePoint)) {
            this._lastIntValue = this.currentCodePoint
            this.advance()
            return true
        }
        return false
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-PatternCharacter
    private eatPatternCharacter(): boolean {
        const start = this.index
        const cp = this.currentCodePoint
        if (cp !== -1 && !isSyntaxCharacter(cp)) {
            this.advance()
            this.onCharacter(start, this.index, cp)
            return true
        }
        return false
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-ExtendedPatternCharacter
    private eatExtendedPatternCharacter(): boolean {
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

    // GroupSpecifier[U] ::
    //   [empty]
    //   `?` GroupName[?U]
    private groupSpecifier(): void {
        this._lastStrValue = ""
        if (this.eat(QuestionMark)) {
            if (this.eatGroupName()) {
                if (!this._groupNames.has(this._lastStrValue)) {
                    this._groupNames.add(this._lastStrValue)
                    return
                }
                this.raise("Duplicate capture group name")
            }
            this.raise("Invalid group")
        }
    }

    // GroupName[U] ::
    //   `<` RegExpIdentifierName[?U] `>`
    private eatGroupName(): boolean {
        this._lastStrValue = ""
        if (this.eat(LessThanSign)) {
            if (this.eatRegExpIdentifierName() && this.eat(GreaterThanSign)) {
                return true
            }
            this.raise("Invalid capture group name")
        }
        return false
    }

    // RegExpIdentifierName[U] ::
    //   RegExpIdentifierStart[?U]
    //   RegExpIdentifierName[?U] RegExpIdentifierPart[?U]
    private eatRegExpIdentifierName(): boolean {
        this._lastStrValue = ""
        if (this.eatRegExpIdentifierStart()) {
            this._lastStrValue += String.fromCodePoint(this._lastIntValue)
            while (this.eatRegExpIdentifierPart()) {
                this._lastStrValue += String.fromCodePoint(this._lastIntValue)
            }
            return true
        }
        return false
    }

    // RegExpIdentifierStart[U] ::
    //   UnicodeIDStart
    //   `$`
    //   `_`
    //   `\` RegExpUnicodeEscapeSequence[?U]
    private eatRegExpIdentifierStart(): boolean {
        const start = this.index
        let cp = this.currentCodePoint
        this.advance()

        if (cp === ReverseSolidus && this.eatRegExpUnicodeEscapeSequence()) {
            cp = this._lastIntValue
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

    // RegExpIdentifierPart[U] ::
    //   UnicodeIDContinue
    //   `$`
    //   `_`
    //   `\` RegExpUnicodeEscapeSequence[?U]
    //   <Zwnj>
    //   <Zwj>
    private eatRegExpIdentifierPart(): boolean {
        const start = this.index
        let cp = this.currentCodePoint
        this.advance()

        if (cp === ReverseSolidus && this.eatRegExpUnicodeEscapeSequence()) {
            cp = this._lastIntValue
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

    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-AtomEscape
    private eatAtomEscape(): boolean {
        if (
            this.eatBackreference() ||
            this.eatCharacterClassEscape() ||
            this.eatCharacterEscape() ||
            (this._nFlag && this.eatKGroupName())
        ) {
            return true
        }
        if (this.strict || this._uFlag) {
            this.raise("Invalid escape")
        }
        return false
    }

    private eatBackreference(): boolean {
        const start = this.index
        if (this.eatDecimalEscape()) {
            const n = this._lastIntValue
            if (n <= this._numCapturingParens) {
                this.onBackreference(start - 1, this.index, n)
                return true
            }
            if (this.strict) {
                this.raise("Invalid escape")
            }
            this.rewind(start)
        }
        return false
    }

    private eatKGroupName(): boolean {
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

    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-CharacterEscape
    private eatCharacterEscape(): boolean {
        const start = this.index
        if (
            this.eatControlEscape() ||
            this.eatCControlLetter() ||
            this.eatZero() ||
            this.eatHexEscapeSequence() ||
            this.eatRegExpUnicodeEscapeSequence() ||
            (!this.strict && this.eatLegacyOctalEscapeSequence()) ||
            this.eatIdentityEscape()
        ) {
            this.onCharacter(start - 1, this.index, this._lastIntValue)
            return true
        }
        return false
    }

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

    // https://www.ecma-international.org/ecma-262/8.0/#prod-ControlEscape
    private eatControlEscape(): boolean {
        if (this.eat(LatinSmallLetterT)) {
            this._lastIntValue = CharacterTabulation
            return true
        }
        if (this.eat(LatinSmallLetterN)) {
            this._lastIntValue = LineFeed
            return true
        }
        if (this.eat(LatinSmallLetterV)) {
            this._lastIntValue = LineTabulation
            return true
        }
        if (this.eat(LatinSmallLetterF)) {
            this._lastIntValue = FormFeed
            return true
        }
        if (this.eat(LatinSmallLetterR)) {
            this._lastIntValue = CarriageReturn
            return true
        }
        return false
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-ControlLetter
    private eatControlLetter(): boolean {
        const cp = this.currentCodePoint
        if (isLatinLetter(cp)) {
            this.advance()
            this._lastIntValue = cp % 0x20
            return true
        }
        return false
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-RegExpUnicodeEscapeSequence
    //eslint-disable-next-line complexity
    private eatRegExpUnicodeEscapeSequence(): boolean {
        const start = this.index

        if (this.eat(LatinSmallLetterU)) {
            if (this.eatFixedHexDigits(4)) {
                const lead = this._lastIntValue
                if (this._uFlag && lead >= 0xd800 && lead <= 0xdbff) {
                    const leadSurrogateEnd = this.index
                    if (
                        this.eat(ReverseSolidus) &&
                        this.eat(LatinSmallLetterU) &&
                        this.eatFixedHexDigits(4)
                    ) {
                        const trail = this._lastIntValue
                        if (trail >= 0xdc00 && trail <= 0xdfff) {
                            this._lastIntValue =
                                (lead - 0xd800) * 0x400 +
                                (trail - 0xdc00) +
                                0x10000
                            return true
                        }
                    }
                    this.rewind(leadSurrogateEnd)
                    this._lastIntValue = lead
                }
                return true
            }
            if (
                this._uFlag &&
                this.eat(LeftCurlyBracket) &&
                this.eatHexDigits() &&
                this.eat(RightCurlyBracket) &&
                isValidUnicode(this._lastIntValue)
            ) {
                return true
            }
            if (this.strict || this._uFlag) {
                this.raise("Invalid unicode escape")
            }
            this.rewind(start)
        }

        return false
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-IdentityEscape
    private eatIdentityEscape(): boolean {
        if (this._uFlag) {
            if (this.eatSyntaxCharacter()) {
                return true
            }
            if (this.eat(Solidus)) {
                this._lastIntValue = Solidus
                return true
            }
            return false
        }

        if (this.isValidIdentityEscape(this.currentCodePoint)) {
            this._lastIntValue = this.currentCodePoint
            this.advance()
            return true
        }

        return false
    }
    private isValidIdentityEscape(cp: number): boolean {
        if (cp === -1) {
            return false
        }
        if (this.strict) {
            return !isIdContinue(cp)
        }
        return (
            cp !== LatinSmallLetterC &&
            (!this._nFlag || cp !== LatinSmallLetterK)
        )
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalEscape
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

    // https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClassEscape
    private eatCharacterClassEscape(): boolean {
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

    // UnicodePropertyValueExpression ::
    //   UnicodePropertyName `=` UnicodePropertyValue
    //   LoneUnicodePropertyNameOrValue
    private eatUnicodePropertyValueExpression(): boolean {
        const start = this.index

        // UnicodePropertyName `=` UnicodePropertyValue
        if (this.eatUnicodePropertyName() && this.eat(EqualsSign)) {
            this._lastKeyValue = this._lastStrValue
            if (this.eatUnicodePropertyValue()) {
                this._lastValValue = this._lastStrValue
                if (
                    isValidUnicodeProperty(
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
            if (isValidUnicodeProperty("General_Category", nameOrValue)) {
                this._lastKeyValue = "General_Category"
                this._lastValValue = nameOrValue
                return true
            }
            if (isValidUnicodePropertyName(nameOrValue)) {
                this._lastKeyValue = nameOrValue
                this._lastValValue = ""
                return true
            }
            this.raise("Invalid property name")
        }
        return false
    }

    // UnicodePropertyName ::
    //   UnicodePropertyNameCharacters
    private eatUnicodePropertyName(): boolean {
        this._lastStrValue = ""
        while (isUnicodePropertyNameCharacter(this.currentCodePoint)) {
            this._lastStrValue += String.fromCodePoint(this.currentCodePoint)
            this.advance()
        }
        return this._lastStrValue !== ""
    }

    // UnicodePropertyValue ::
    //   UnicodePropertyValueCharacters
    private eatUnicodePropertyValue(): boolean {
        this._lastStrValue = ""
        while (isUnicodePropertyValueCharacter(this.currentCodePoint)) {
            this._lastStrValue += String.fromCodePoint(this.currentCodePoint)
            this.advance()
        }
        return this._lastStrValue !== ""
    }

    // LoneUnicodePropertyNameOrValue ::
    //   UnicodePropertyValueCharacters
    private eatLoneUnicodePropertyNameOrValue(): boolean {
        return this.eatUnicodePropertyValue()
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClass
    private eatCharacterClass(): boolean {
        const start = this.index
        if (this.eat(LeftSquareBracket)) {
            const negate = this.eat(CircumflexAccent)
            this.onCharacterClassEnter(start, negate)
            this.classRanges()
            if (!this.eat(RightSquareBracket)) {
                this.raise("Unterminated character class")
            }
            this.onCharacterClassLeave(start, this.index, negate)
            return true
        }
        return false
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassRanges
    // https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRanges
    // https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRangesNoDash
    private classRanges(): void {
        let start = this.index
        while (this.eatClassAtom()) {
            const left = this._lastIntValue
            const hyphenStart = this.index
            if (this.eat(HyphenMinus)) {
                this.onCharacter(hyphenStart, this.index, HyphenMinus)

                if (this.eatClassAtom()) {
                    const right = this._lastIntValue

                    if (left === -1 || right === -1) {
                        if (this.strict) {
                            this.raise("Invalid character class")
                        }
                    } else if (left > right) {
                        this.raise("Range out of order in character class")
                    } else {
                        this.onCharacterClassRange(
                            start,
                            this.index,
                            left,
                            right,
                        )
                    }
                }
            }

            start = this.index
        }
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtom
    // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtomNoDash
    private eatClassAtom(): boolean {
        const start = this.index

        if (this.eat(ReverseSolidus)) {
            if (this.eatClassEscape()) {
                return true
            }
            if (this._uFlag) {
                this.raise("Invalid escape")
            }
            this.rewind(start)
        }

        const cp = this.currentCodePoint
        if (cp !== -1 && cp !== RightSquareBracket) {
            this.advance()
            this._lastIntValue = cp
            this.onCharacter(start, this.index, cp)
            return true
        }

        return false
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-ClassEscape
    private eatClassEscape(): boolean {
        const start = this.index

        if (this.eat(LatinSmallLetterB)) {
            this._lastIntValue = Backspace
            this.onCharacter(start - 1, this.index, Backspace)
            return true
        }

        if (this._uFlag && this.eat(HyphenMinus)) {
            this._lastIntValue = HyphenMinus
            this.onCharacter(start - 1, this.index, HyphenMinus)
            return true
        }

        if (!this._uFlag && this.eat(LatinSmallLetterC)) {
            if (this.eatClassControlLetter()) {
                this.onCharacter(start - 1, this.index, this._lastIntValue)
                return true
            }
            this.rewind(start)
        }

        return this.eatCharacterClassEscape() || this.eatCharacterEscape()
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-ClassControlLetter
    private eatClassControlLetter(): boolean {
        const cp = this.currentCodePoint
        if (isDecimalDigit(cp) || cp === LowLine) {
            this.advance()
            this._lastIntValue = cp % 0x20
            return true
        }
        return false
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
    private eatHexEscapeSequence(): boolean {
        const start = this.index
        if (this.eat(LatinSmallLetterX)) {
            if (this.eatFixedHexDigits(2)) {
                return true
            }
            if (this._uFlag) {
                this.raise("Invalid escape")
            }
            this.rewind(start)
        }
        return false
    }

    // https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalDigits
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

    // https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigits
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

    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-LegacyOctalEscapeSequence
    // Allows only 0-377(octal) i.e. 0-255(decimal).
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

    // https://www.ecma-international.org/ecma-262/8.0/#prod-OctalDigit
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

    // https://www.ecma-international.org/ecma-262/8.0/#prod-Hex4Digits
    // https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigit
    // And HexDigit HexDigit in https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
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
