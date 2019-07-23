import { posix } from "path"

function resolveLocation(
    obj: any,
    path: string[],
    pathMap: Map<object, string>,
): void {
    if (Array.isArray(obj)) {
        obj.forEach((el, index) => {
            if (typeof el === "object" && el !== null) {
                path.push(String(index))
                resolveLocation(el, path, pathMap)
                path.pop()
            }
        })
        return
    }

    pathMap.set(obj, `/${path.join("/")}`)
    for (const key of Object.keys(obj)) {
        if (key === "parent" || key === "resolved" || key === "references") {
            continue
        }
        const el = obj[key]
        if (typeof el === "object" && el !== null) {
            path.push(key)
            resolveLocation(el, path, pathMap)
            path.pop()
        }
    }
}

function cloneWithoutCircularRec(x: any, pathMap: Map<object, string>): any {
    if (typeof x !== "object" || x === null) {
        return x
    }
    if (Array.isArray(x)) {
        return x.map(el => cloneWithoutCircularRec(el, pathMap))
    }

    const y = {} as any
    for (const key of Object.keys(x)) {
        if (key === "parent" || key === "resolved" || key === "references") {
            y[key] = getRelativePath(x, x[key], pathMap)
        } else {
            y[key] = cloneWithoutCircularRec(x[key], pathMap)
        }
    }
    return y
}

function getRelativePath(
    from: object,
    to: any,
    pathMap: Map<object, string>,
): any {
    if (typeof to !== "object" || to === null) {
        return to
    }
    if (Array.isArray(to)) {
        return to.map(el => getRelativePath(from, el, pathMap))
    }

    const fromPath = pathMap.get(from)!
    const toPath = pathMap.get(to)!
    try {
        return `♻️${posix.relative(fromPath, toPath).replace(/\/$/u, "")}`
    } catch (err) {
        console.error(fromPath, toPath, err.stack)
        return "💥💥💥💥💥💥💥💥"
    }
}

export function cloneWithoutCircular(obj: object): object {
    const path: string[] = []
    const pathMap: Map<object, string> = new Map()
    resolveLocation(obj, path, pathMap)

    return cloneWithoutCircularRec(obj, pathMap)
}
