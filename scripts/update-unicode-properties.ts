import fs from "fs"
import { JSDOM, DOMWindow } from "jsdom"
import { CLIEngine } from "eslint"

const DataSources = [
    {
        url: "https://www.ecma-international.org/ecma-262/9.0/",
        version: 2018,
        binProperties: "#table-binary-unicode-properties",
        gcValues: "#table-unicode-general-category-values",
        scValues: "#table-unicode-script-values",
    },
    {
        url: "https://www.ecma-international.org/ecma-262/10.0/",
        version: 2019,
        binProperties: "#table-binary-unicode-properties",
        gcValues: "#table-unicode-general-category-values",
        scValues: "#table-unicode-script-values",
    },
    {
        url: "https://www.ecma-international.org/ecma-262/11.0/",
        version: 2020,
        binProperties: "#table-binary-unicode-properties",
        gcValues: "#table-unicode-general-category-values",
        scValues: "#table-unicode-script-values",
    },
    {
        url: "https://tc39.es/ecma262/",
        version: 2021,
        binProperties: "#table-binary-unicode-properties",
        gcValues: "#table-unicode-general-category-values",
        scValues: "#table-unicode-script-values",
    },
]
const FILE_PATH = "src/unicode/properties.ts"
const logger = console

type Datum = {
    binProperties: string[]
    gcValues: string[]
    scValues: string[]
}

// Main
;(async () => {
    const data: Record<number, Datum> = Object.create(null)
    const existing = {
        binProperties: new Set<string>(),
        gcValues: new Set<string>(),
        scValues: new Set<string>(),
    }

    for (const {
        binProperties,
        gcValues,
        scValues,
        url,
        version,
    } of DataSources) {
        logger.log("---- ECMAScript %d ----", version)
        const datum: Datum = {
            binProperties: [],
            gcValues: [],
            scValues: [],
        }
        data[version] = datum

        let window: DOMWindow | null = null
        do {
            try {
                logger.log("Fetching data from %o", url)
                ;({ window } = await JSDOM.fromURL(url))
            } catch (error) {
                if (!error || error.message !== "Error: socket hang up") {
                    throw error
                }
                logger.log(error.message, "then retry.")
                await new Promise(resolve => setTimeout(resolve, 2000))
            }
        } while (window == null)

        logger.log("Parsing tables")
        datum.binProperties = collectValues(
            window,
            binProperties,
            existing.binProperties,
        )
        datum.gcValues = collectValues(window, gcValues, existing.gcValues)
        datum.scValues = collectValues(window, scValues, existing.scValues)

        logger.log("Done")
    }

    logger.log("Generating code...")
    let code = `/* This file was generated with ECMAScript specifications. */

${makeClassDeclarationCode(Object.keys(data))}

const gcNameSet = new Set(["General_Category", "gc"])
const scNameSet = new Set(["Script", "Script_Extensions", "sc", "scx"])
const gcValueSets = new DataSet(${Object.values(data)
        .map(d => makeDataCode(d.gcValues))
        .join(",")})
const scValueSets = new DataSet(${Object.values(data)
        .map(d => makeDataCode(d.scValues))
        .join(",")})
const binPropertySets = new DataSet(${Object.values(data)
        .map(d => makeDataCode(d.binProperties))
        .join(",")})

export function isValidUnicodeProperty(version: number, name: string, value: string): boolean {
    if (gcNameSet.has(name)) {
        return ${Object.entries(data)
            .map(([version, { gcValues }]) =>
                makeVerificationCode(version, "gcValueSets", gcValues),
            )
            .filter(Boolean)
            .join(" || ")}
    }
    if (scNameSet.has(name)) {
        return ${Object.entries(data)
            .map(([version, { scValues }]) =>
                makeVerificationCode(version, "scValueSets", scValues),
            )
            .filter(Boolean)
            .join(" || ")}
    }
    return false
}

export function isValidLoneUnicodeProperty(version: number, value: string): boolean {
    return ${Object.entries(data)
        .map(([version, { binProperties }]) =>
            makeVerificationCode(version, "binPropertySets", binProperties),
        )
        .filter(Boolean)
        .join(" || ")}
}
`

    logger.log("Formatting code...")
    const engine = new CLIEngine({ fix: true })
    const result = engine.executeOnText(code, "properties.ts").results[0]
    code = result.output || code

    logger.log("Writing '%s'...", FILE_PATH)
    await save(code)

    logger.log("Completed!")
})().catch(error => {
    logger.error(error.stack)
    process.exitCode = 1
})

function collectValues(
    window: Window,
    id: string,
    existingSet: Set<string>,
): string[] {
    const selector = `${id} td:nth-child(1) code`
    const nodes = window.document.querySelectorAll(selector)
    const values = Array.from(nodes, node => node.textContent || "")
        .filter(value => {
            if (existingSet.has(value)) {
                return false
            }
            existingSet.add(value)
            return true
        })
        .sort(undefined)

    logger.log(
        "%o nodes of %o were found, then %o adopted and %o ignored as duplication.",
        nodes.length,
        selector,
        values.length,
        nodes.length - values.length,
    )

    return values
}

function makeClassDeclarationCode(versions: string[]): string {
    const fields = versions
        .map(
            v =>
                `private _raw${v}: string\nprivate _set${v}: Set<string> | undefined`,
        )
        .join("\n")
    const parameters = versions.map(v => `raw${v}: string`).join(", ")
    const init = versions.map(v => `this._raw${v} = raw${v}`).join("\n")
    const getters = versions
        .map(
            v =>
                `public get es${v}(): Set<string> { return this._set${v} || (this._set${v} = new Set(this._raw${v}.split(" "))) }`,
        )
        .join("\n")

    return `
        class DataSet {
            ${fields}
            public constructor(${parameters}) {
                ${init}
            }
            ${getters}
        }
    `
}

function makeDataCode(values: string[]): string {
    return `"${values
        .map(value => JSON.stringify(value).slice(1, -1))
        .join(" ")}"`
}

function makeVerificationCode(
    version: string,
    patternVar: string,
    values: string[],
): string {
    if (values.length === 0) {
        return ""
    }

    return `(version >= ${version} && ${patternVar}.es${version}.has(value))`
}

function save(content: string): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(FILE_PATH, content, error =>
            error ? reject(error) : resolve(),
        )
    })
}
