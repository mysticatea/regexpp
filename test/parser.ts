import assert from "assert"
import { parseRegExpLiteral, RegExpParser } from "../src/index"
import { cloneWithoutCircular } from "../scripts/clone-without-circular"
import { Fixtures } from "./fixtures/parser/literal"

function generateAST(source: string, options: RegExpParser.Options): object {
    return JSON.parse(
        Buffer.from(
            JSON.stringify(
                cloneWithoutCircular(parseRegExpLiteral(source, options)),
            ),
        ).toString(),
    )
}

describe("parseRegExpLiteral function:", () => {
    for (const filename of Object.keys(Fixtures)) {
        const fixture = Fixtures[filename]
        const options = fixture.options

        describe(`${filename} (options=${JSON.stringify(options)})`, () => {
            for (const source of Object.keys(fixture.patterns)) {
                const result = fixture.patterns[source]
                if ("ast" in result) {
                    it(`${source} should succeed to parse.`, () => {
                        const expected = result.ast
                        const actual = generateAST(source, options)
                        assert.deepStrictEqual(actual, expected)
                    })
                } else {
                    it(`${source} should throw syntax error.`, () => {
                        const expected = result.error
                        assert.strictEqual(
                            expected.message.slice(0, 27),
                            "Invalid regular expression:",
                            `The error message '${
                                expected.message
                            }' was not syntax error.`,
                        )
                        try {
                            parseRegExpLiteral(source, options)
                        } catch (err) {
                            assert.strictEqual(err.message, expected.message)
                            assert.strictEqual(err.index, expected.index)
                            return
                        }
                        assert.fail("Should fail, but succeeded.")
                    })
                }
            }
        })
    }
})

for (const filename of Object.keys(Fixtures)) {
    const fixture = Fixtures[filename]

    if (filename.indexOf("-valid") !== -1) {
        describe(filename, () => {
            it("should not contain any invalid test case", () => {
                for (const source of Object.keys(fixture.patterns)) {
                    const result = fixture.patterns[source]
                    assert("ast" in result, `${source} is invalid`)
                }
            })
        })
    } else if (filename.indexOf("-invalid") !== -1) {
        describe(filename, () => {
            it("should not contain any valid test case", () => {
                for (const source of Object.keys(fixture.patterns)) {
                    const result = fixture.patterns[source]
                    assert("error" in result, `${source} is valid`)
                }
            })
        })
    }
}
