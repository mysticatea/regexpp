import * as AST from "./ast"
import { RegExpParser } from "./parser"
import { RegExpValidator } from "./validator"
import { RegExpVisitor } from "./visitor"

export { AST, RegExpParser, RegExpValidator }

/**
 * Parse a given regular expression literal then make AST object.
 * @param source The source code to parse.
 * @param options The options to parse.
 * @returns The AST of the regular expression.
 */
export function parseRegExpLiteral(
    source: string | RegExp,
    options?: RegExpParser.Options,
): AST.RegExpLiteral {
    return new RegExpParser(options).parseLiteral(String(source))
}

/**
 * Validate a given regular expression literal.
 * @param source The source code to validate.
 * @param options The options to validate.
 */
export function validateRegExpLiteral(
    source: string,
    options?: RegExpValidator.Options,
): void {
    return new RegExpValidator(options).validateLiteral(source)
}

export function visitRegExpAST(
    node: AST.Node,
    handlers: RegExpVisitor.Handlers,
): void {
    new RegExpVisitor(handlers).visit(node)
}
