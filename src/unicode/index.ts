export { isIdContinue, isIdStart } from "./ids"
export { PropertyData } from "./property-data"

export const Null = 0x00
export const Backspace = 0x08
export const CharacterTabulation = 0x09
export const LineFeed = 0x0a
export const LineTabulation = 0x0b
export const FormFeed = 0x0c
export const CarriageReturn = 0x0d
export const ExclamationMark = 0x21
export const DollarSign = 0x24
export const LeftParenthesis = 0x28
export const RightParenthesis = 0x29
export const Asterisk = 0x2a
export const PlusSign = 0x2b
export const Comma = 0x2c
export const HyphenMinus = 0x2d
export const FullStop = 0x2e
export const Solidus = 0x2f
export const DigitZero = 0x30
export const DigitOne = 0x31
export const DigitSeven = 0x37
export const DigitNine = 0x39
export const Colon = 0x3a
export const LessThanSign = 0x3c
export const EqualsSign = 0x3d
export const GreaterThanSign = 0x3e
export const QuestionMark = 0x3f
export const LatinCapitalLetterA = 0x41
export const LatinCapitalLetterB = 0x42
export const LatinCapitalLetterD = 0x44
export const LatinCapitalLetterF = 0x46
export const LatinCapitalLetterP = 0x50
export const LatinCapitalLetterS = 0x53
export const LatinCapitalLetterW = 0x57
export const LatinCapitalLetterZ = 0x5a
export const LowLine = 0x5f
export const LatinSmallLetterA = 0x61
export const LatinSmallLetterB = 0x62
export const LatinSmallLetterC = 0x63
export const LatinSmallLetterD = 0x64
export const LatinSmallLetterF = 0x66
export const LatinSmallLetterG = 0x67
export const LatinSmallLetterI = 0x69
export const LatinSmallLetterK = 0x6b
export const LatinSmallLetterM = 0x6d
export const LatinSmallLetterN = 0x6e
export const LatinSmallLetterP = 0x70
export const LatinSmallLetterR = 0x72
export const LatinSmallLetterS = 0x73
export const LatinSmallLetterT = 0x74
export const LatinSmallLetterU = 0x75
export const LatinSmallLetterV = 0x76
export const LatinSmallLetterW = 0x77
export const LatinSmallLetterX = 0x78
export const LatinSmallLetterY = 0x79
export const LatinSmallLetterZ = 0x7a
export const LeftSquareBracket = 0x5b
export const ReverseSolidus = 0x5c
export const RightSquareBracket = 0x5d
export const CircumflexAccent = 0x5e
export const LeftCurlyBracket = 0x7b
export const VerticalLine = 0x7c
export const RightCurlyBracket = 0x7d
export const ZeroWidthNonJoiner = 0x200c
export const ZeroWidthJoiner = 0x200d
export const LineSeparator = 0x2028
export const ParagraphSeparator = 0x2029

export const MinCodePoint = 0x00
export const MaxCodePoint = 0x10ffff

export function isLatinLetter(code: number): boolean {
    return (
        (code >= LatinCapitalLetterA && code <= LatinCapitalLetterZ) ||
        (code >= LatinSmallLetterA && code <= LatinSmallLetterZ)
    )
}

export function isDecimalDigit(code: number): boolean {
    return code >= DigitZero && code <= DigitNine
}

export function isOctalDigit(code: number): boolean {
    return code >= DigitZero && code <= DigitSeven
}

export function isHexDigit(code: number): boolean {
    return (
        (code >= DigitZero && code <= DigitNine) ||
        (code >= LatinCapitalLetterA && code <= LatinCapitalLetterF) ||
        (code >= LatinSmallLetterA && code <= LatinSmallLetterF)
    )
}

export function isLineTerminator(code: number): boolean {
    return (
        code === LineFeed ||
        code === CarriageReturn ||
        code === LineSeparator ||
        code === ParagraphSeparator
    )
}

export function isValidUnicode(code: number): boolean {
    return code >= MinCodePoint && code <= MaxCodePoint
}

export function digitToInt(code: number): number {
    if (code >= LatinSmallLetterA && code <= LatinSmallLetterF) {
        return code - LatinSmallLetterA + 10
    }
    if (code >= LatinCapitalLetterA && code <= LatinCapitalLetterF) {
        return code - LatinCapitalLetterA + 10
    }
    return code - DigitZero
}
