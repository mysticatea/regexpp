import { AST, parseRegExpLiteral, visitRegExpAST } from "../src/index"
import * as Parser from "../test/fixtures/parser/literal"
import * as Visitor from "../test/fixtures/visitor"
import { cloneWithoutCircular } from "./clone-without-circular"

for (const filename of Object.keys(Parser.Fixtures)) {
    const fixture = Parser.Fixtures[filename]
    const options = fixture.options

    for (const pattern of Object.keys(fixture.patterns)) {
        try {
            const ast = parseRegExpLiteral(pattern, options)
            fixture.patterns[pattern] = { ast: cloneWithoutCircular(ast) }
        } catch (err) {
            fixture.patterns[pattern] = {
                error: { message: err.message, index: err.index },
            }
        }
    }

    Parser.save()
}

for (const filename of Object.keys(Visitor.Fixtures)) {
    const fixture = Visitor.Fixtures[filename]
    const options = fixture.options

    for (const pattern of Object.keys(fixture.patterns)) {
        const ast = parseRegExpLiteral(pattern, options)
        const history = []
        const enter = (node: AST.Node): void => {
            history.push(`enter:${node.type}:${node.raw}`)
        }
        const leave = (node: AST.Node): void => {
            history.push(`leave:${node.type}:${node.raw}`)
        }

        visitRegExpAST(ast, {
            onAssertionEnter: enter,
            onBackreferenceEnter: enter,
            onCapturingGroupEnter: enter,
            onCharacterEnter: enter,
            onCharacterClassEnter: enter,
            onCharacterClassRangeEnter: enter,
            onCharacterSetEnter: enter,
            onDisjunctionEnter: enter,
            onFlagsEnter: enter,
            onGroupEnter: enter,
            onPatternEnter: enter,
            onQuantifierEnter: enter,
            onRegExpLiteralEnter: enter,
            onAssertionLeave: leave,
            onBackreferenceLeave: leave,
            onCapturingGroupLeave: leave,
            onCharacterLeave: leave,
            onCharacterClassLeave: leave,
            onCharacterClassRangeLeave: leave,
            onCharacterSetLeave: leave,
            onDisjunctionLeave: leave,
            onFlagsLeave: leave,
            onGroupLeave: leave,
            onPatternLeave: leave,
            onQuantifierLeave: leave,
            onRegExpLiteralLeave: leave,
        })

        fixture.patterns[pattern] = history
    }

    Visitor.save()
}
