import { parseRegExpLiteral } from "../src/index"
import { Fixtures, save } from "../test/fixtures/parser/literal"
import { cloneWithoutCircular } from "./clone-without-circular"

for (const filename of Object.keys(Fixtures)) {
    const fixture = Fixtures[filename]
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

    save()
}
