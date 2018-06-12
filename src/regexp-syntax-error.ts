export class RegExpSyntaxError extends SyntaxError {
    public index: number
    public constructor(
        source: string,
        uFlag: boolean,
        index: number,
        message: string,
    ) {
        /*eslint-disable no-param-reassign */
        if (source) {
            if (source[0] !== "/") {
                source = `/${source}/${uFlag ? "u" : ""}`
            }
            source = `: ${source}`
        }
        /*eslint-enable no-param-reassign */

        super(`Invalid regular expression${source}: ${message}`)
        this.index = index
    }
}
