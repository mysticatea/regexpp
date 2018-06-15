import fs from "fs"
import path from "path"

type FixtureData = {
    [filename: string]: {
        options: {
            strict?: boolean
            ecmaVersion?: 5 | 2015 | 2016 | 2017 | 2018
        }
        patterns: {
            [source: string]: string[]
        }
    }
}
const fixturesRoot = __dirname

export const Fixtures: FixtureData = fs
    .readdirSync(fixturesRoot)
    .filter(filename => path.extname(filename) === ".json")
    .reduce((fixtures, filename) => {
        fixtures[filename] = JSON.parse(
            fs.readFileSync(path.join(fixturesRoot, filename), "utf8"),
        )
        return fixtures
    }, {})
export function save(): void {
    for (const filename of Object.keys(Fixtures)) {
        fs.writeFileSync(
            path.join(fixturesRoot, filename),
            JSON.stringify(Fixtures[filename], null, 2),
        )
    }
}
