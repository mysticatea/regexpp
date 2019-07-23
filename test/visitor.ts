import assert from "assert"
import {
    AST,
    RegExpParser,
    parseRegExpLiteral,
    visitRegExpAST,
} from "../src/index"
import { cloneWithoutCircular } from "../scripts/clone-without-circular"
import { Fixtures } from "./fixtures/visitor"

function generateAST(source: string, options: RegExpParser.Options): any {
    return cloneWithoutCircular(parseRegExpLiteral(source, options))
}

describe("visitRegExpAST function:", () => {
    for (const filename of Object.keys(Fixtures)) {
        const fixture = Fixtures[filename]
        const options = fixture.options

        describe(`${filename} (options=${JSON.stringify(options)})`, () => {
            for (const source of Object.keys(fixture.patterns)) {
                it(`${source} should succeed to visit.`, () => {
                    const expected = fixture.patterns[source]
                    const ast = generateAST(source, options)
                    const history = [] as string[]
                    const enter = (node: AST.Node): void => {
                        history.push(`enter:${node.type}:${node.raw}`)
                    }
                    const leave = (node: AST.Node): void => {
                        history.push(`leave:${node.type}:${node.raw}`)
                    }

                    visitRegExpAST(ast, {
                        onAlternativeEnter: enter,
                        onAssertionEnter: enter,
                        onBackreferenceEnter: enter,
                        onCapturingGroupEnter: enter,
                        onCharacterEnter: enter,
                        onCharacterClassEnter: enter,
                        onCharacterClassRangeEnter: enter,
                        onCharacterSetEnter: enter,
                        onFlagsEnter: enter,
                        onGroupEnter: enter,
                        onPatternEnter: enter,
                        onQuantifierEnter: enter,
                        onRegExpLiteralEnter: enter,
                        onAlternativeLeave: leave,
                        onAssertionLeave: leave,
                        onBackreferenceLeave: leave,
                        onCapturingGroupLeave: leave,
                        onCharacterLeave: leave,
                        onCharacterClassLeave: leave,
                        onCharacterClassRangeLeave: leave,
                        onCharacterSetLeave: leave,
                        onFlagsLeave: leave,
                        onGroupLeave: leave,
                        onPatternLeave: leave,
                        onQuantifierLeave: leave,
                        onRegExpLiteralLeave: leave,
                    })

                    assert.deepStrictEqual(history, expected)
                })
            }
        })
    }
})
