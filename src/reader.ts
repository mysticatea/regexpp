const legacyImpl = {
    at(s: string, end: number, i: number): number {
        return i < end ? s.charCodeAt(i) : -1
    },
    width(c: number): number {
        return 1
    },
}
const unicodeImpl = {
    at(s: string, end: number, i: number): number {
        return i < end ? s.codePointAt(i)! : -1
    },
    width(c: number): number {
        return c > 0xffff ? 2 : 1
    },
}

export class Reader {
    private _impl = legacyImpl
    private _s = ""
    private _i = 0
    private _end = 0
    private _cp1: number = -1
    private _w1 = 1
    private _cp2: number = -1
    private _w2 = 1
    private _cp3: number = -1
    private _w3 = 1
    private _cp4: number = -1

    public get source(): string {
        return this._s
    }

    public get index(): number {
        return this._i
    }

    public get currentCodePoint(): number {
        return this._cp1
    }

    public get nextCodePoint(): number {
        return this._cp2
    }

    public get nextCodePoint2(): number {
        return this._cp3
    }

    public get nextCodePoint3(): number {
        return this._cp4
    }

    public reset(
        source: string,
        start: number,
        end: number,
        uFlag: boolean,
    ): void {
        this._impl = uFlag ? unicodeImpl : legacyImpl
        this._s = source
        this._end = end
        this.rewind(start)
    }

    public rewind(index: number): void {
        const impl = this._impl
        this._i = index
        this._cp1 = impl.at(this._s, this._end, index)
        this._w1 = impl.width(this._cp1)
        this._cp2 = impl.at(this._s, this._end, index + this._w1)
        this._w2 = impl.width(this._cp2)
        this._cp3 = impl.at(this._s, this._end, index + this._w1 + this._w2)
        this._w3 = impl.width(this._cp3)
        this._cp4 = impl.at(
            this._s,
            this._end,
            index + this._w1 + this._w2 + this._w3,
        )
    }

    public advance(): void {
        if (this._cp1 !== -1) {
            const impl = this._impl
            this._i += this._w1
            this._cp1 = this._cp2
            this._w1 = this._w2
            this._cp2 = this._cp3
            this._w2 = impl.width(this._cp2)
            this._cp3 = this._cp4
            this._w3 = impl.width(this._cp3)
            this._cp4 = impl.at(
                this._s,
                this._end,
                this._i + this._w1 + this._w2 + this._w3,
            )
        }
    }

    public eat(cp: number): boolean {
        if (this._cp1 === cp) {
            this.advance()
            return true
        }
        return false
    }

    public eat2(cp1: number, cp2: number): boolean {
        if (this._cp1 === cp1 && this._cp2 === cp2) {
            this.advance()
            this.advance()
            return true
        }
        return false
    }

    public eat3(cp1: number, cp2: number, cp3: number): boolean {
        if (this._cp1 === cp1 && this._cp2 === cp2 && this._cp3 === cp3) {
            this.advance()
            this.advance()
            this.advance()
            return true
        }
        return false
    }
}
