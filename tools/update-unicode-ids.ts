import fs from "fs"
import http from "http"
import { CLIEngine } from "eslint"

const DB_URL = "http://unicode.org/Public/UNIDATA/DerivedCoreProperties.txt"
const FILE_PATH = "src/unicode/ids.ts"
const ID_START = /^([0-9a-z]+)(?:\.\.([0-9a-z]+))?[^;]*; ID_Start /i
const ID_CONTINUE = /^([0-9a-z]+)(?:\.\.([0-9a-z]+))?[^;]*; ID_Continue /i
const BORDER = 0x7f
const logger = console

enum Mode {
    Small,
    Former,
    Latter,
}

// Main
;(async () => {
    let banner: string = ""
    const idStartSet: Set<string> = new Set()
    const idStartSmall: Array<[number, number]> = []
    const idStartLarge: Array<[number, number]> = []
    const idContinueSmall: Array<[number, number]> = []
    const idContinueLarge: Array<[number, number]> = []

    logger.log("Fetching data... (%s)", DB_URL)
    await processEachLine(line => {
        let m: RegExpExecArray //eslint-disable-line init-declarations
        if (banner === "") {
            logger.log("Processing data... (%s)", line.slice(2))
            banner = `/* Generated from ${line.slice(2)} */`
        } else if ((m = ID_START.exec(line)) != null) {
            const min = parseInt(m[1], 16)
            const max = m[2] ? parseInt(m[2], 16) : min
            if (max <= BORDER) {
                idStartSmall.push([min, max])
            } else {
                idStartSet.add(`${min}..${max}`)
                idStartLarge.push([min, max])
            }
        } else if ((m = ID_CONTINUE.exec(line)) != null) {
            const min = parseInt(m[1], 16)
            const max = m[2] ? parseInt(m[2], 16) : min
            if (max <= BORDER) {
                idContinueSmall.push([min, max])
            } else if (!idStartSet.has(`${min}..${max}`)) {
                idContinueLarge.push([min, max])
            }
        }
    })

    logger.log("Generating code...")
    let code = `${banner}
export function isIdStart(cp: number): boolean {
${makeSmallCondtion(idStartSmall, Mode.Small)}
return isLargeIdStart(cp)
}
export function isIdContinue(cp: number): boolean {
${makeSmallCondtion(idContinueSmall, Mode.Small)}
return isLargeIdStart(cp) || isLargeIdContinue(cp)
}
function isLargeIdStart(cp: number): boolean {
${makeCondition(idStartLarge, Mode.Former)}
}
function isLargeIdContinue(cp: number): boolean {
${makeCondition(idContinueLarge, Mode.Former)}
}`

    logger.log("Formatting code...")
    const engine = new CLIEngine({ fix: true })
    const result = engine.executeOnText(code, "ids.ts").results[0]
    code = result.output || code

    logger.log("Writing '%s'...", FILE_PATH)
    await save(code)

    logger.log("Completed!")
})().catch(error => {
    logger.error(error.stack)
    process.exitCode = 1
})

function processEachLine(cb: (line: string) => void): Promise<void> {
    return new Promise((resolve, reject) => {
        http
            .get(DB_URL, res => {
                let buffer = ""
                res.setEncoding("utf8")
                res.on("data", chunk => {
                    const lines = (buffer + chunk).split("\n")
                    if (lines.length === 1) {
                        buffer = lines[0]
                    } else {
                        buffer = lines.pop()
                        for (const line of lines) {
                            cb(line)
                        }
                    }
                })
                res.on("end", () => {
                    if (buffer) {
                        cb(buffer)
                    }
                    resolve()
                })
                res.on("error", reject)
            })
            .on("error", reject)
    })
}

function makeCondition(ranges: [number, number][], mode: Mode): string {
    if (ranges.length < 10) {
        return makeSmallCondtion(ranges, mode)
    }

    const middle = ranges.length >> 1
    const ranges1 = ranges.slice(0, middle)
    const ranges2 = ranges.slice(middle)
    const pivot = ranges2[0][0]
    return `if (cp < 0x${pivot.toString(16)}) {
${makeCondition(ranges1, Mode.Former)}
}
${makeCondition(ranges2, Mode.Latter)}`
}

function makeSmallCondtion(ranges: [number, number][], mode: Mode): string {
    const conditions: string[] = []
    for (const [min, max] of ranges) {
        if (min === max) {
            conditions.push(`if (cp === 0x${min.toString(16)}) return true`)
        } else {
            if (mode !== Mode.Latter || conditions.length !== 0) {
                conditions.push(`if (cp < 0x${min.toString(16)}) return false`)
            }
            conditions.push(`if (cp < 0x${(max + 1).toString(16)}) return true`)
        }
    }
    if (mode === Mode.Former || mode === Mode.Latter) {
        conditions.push("return false")
    }
    return conditions.join("\n")
}

function save(content: string): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            FILE_PATH,
            content,
            error => (error ? reject(error) : resolve()),
        )
    })
}
