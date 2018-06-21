/* Generated from DerivedCoreProperties-11.0.0.txt */
export function isIdStart(cp: number): boolean {
    if (cp < 0x41) return false
    if (cp < 0x5b) return true
    if (cp < 0x61) return false
    if (cp < 0x7b) return true
    return isLargeIdStart(cp)
}
export function isIdContinue(cp: number): boolean {
    if (cp < 0x30) return false
    if (cp < 0x3a) return true
    if (cp < 0x41) return false
    if (cp < 0x5b) return true
    if (cp === 0x5f) return true
    if (cp < 0x61) return false
    if (cp < 0x7b) return true
    return isLargeIdStart(cp) || isLargeIdContinue(cp)
}

function isLargeIdStart(cp: number): boolean {
    if (cp < 0x30a1) {
        if (cp < 0xec0) {
            if (cp < 0xa35) {
                if (cp < 0x6e5) {
                    if (cp < 0x37a) {
                        if (cp < 0x294) {
                            if (cp < 0xf8) {
                                if (cp === 0xaa) return true
                                if (cp === 0xb5) return true
                                if (cp === 0xba) return true
                                if (cp < 0xc0) return false
                                if (cp < 0xd7) return true
                                if (cp < 0xd8) return false
                                if (cp < 0xf7) return true
                                return false
                            }
                            if (cp < 0x1bb) return true
                            if (cp === 0x1bb) return true
                            if (cp < 0x1bc) return false
                            if (cp < 0x1c0) return true
                            if (cp < 0x1c0) return false
                            if (cp < 0x1c4) return true
                            if (cp < 0x1c4) return false
                            if (cp < 0x294) return true
                            return false
                        }
                        if (cp < 0x2ec) {
                            if (cp === 0x294) return true
                            if (cp < 0x295) return false
                            if (cp < 0x2b0) return true
                            if (cp < 0x2b0) return false
                            if (cp < 0x2c2) return true
                            if (cp < 0x2c6) return false
                            if (cp < 0x2d2) return true
                            if (cp < 0x2e0) return false
                            if (cp < 0x2e5) return true
                            return false
                        }
                        if (cp === 0x2ec) return true
                        if (cp === 0x2ee) return true
                        if (cp < 0x370) return false
                        if (cp < 0x374) return true
                        if (cp === 0x374) return true
                        if (cp < 0x376) return false
                        if (cp < 0x378) return true
                        return false
                    }
                    if (cp < 0x531) {
                        if (cp < 0x38c) {
                            if (cp === 0x37a) return true
                            if (cp < 0x37b) return false
                            if (cp < 0x37e) return true
                            if (cp === 0x37f) return true
                            if (cp === 0x386) return true
                            if (cp < 0x388) return false
                            if (cp < 0x38b) return true
                            return false
                        }
                        if (cp === 0x38c) return true
                        if (cp < 0x38e) return false
                        if (cp < 0x3a2) return true
                        if (cp < 0x3a3) return false
                        if (cp < 0x3f6) return true
                        if (cp < 0x3f7) return false
                        if (cp < 0x482) return true
                        if (cp < 0x48a) return false
                        if (cp < 0x530) return true
                        return false
                    }
                    if (cp < 0x620) {
                        if (cp < 0x531) return false
                        if (cp < 0x557) return true
                        if (cp === 0x559) return true
                        if (cp < 0x560) return false
                        if (cp < 0x589) return true
                        if (cp < 0x5d0) return false
                        if (cp < 0x5eb) return true
                        if (cp < 0x5ef) return false
                        if (cp < 0x5f3) return true
                        return false
                    }
                    if (cp < 0x640) return true
                    if (cp === 0x640) return true
                    if (cp < 0x641) return false
                    if (cp < 0x64b) return true
                    if (cp < 0x66e) return false
                    if (cp < 0x670) return true
                    if (cp < 0x671) return false
                    if (cp < 0x6d4) return true
                    if (cp === 0x6d5) return true
                    return false
                }
                if (cp < 0x950) {
                    if (cp < 0x7fa) {
                        if (cp < 0x712) {
                            if (cp < 0x6e5) return false
                            if (cp < 0x6e7) return true
                            if (cp < 0x6ee) return false
                            if (cp < 0x6f0) return true
                            if (cp < 0x6fa) return false
                            if (cp < 0x6fd) return true
                            if (cp === 0x6ff) return true
                            if (cp === 0x710) return true
                            return false
                        }
                        if (cp < 0x730) return true
                        if (cp < 0x74d) return false
                        if (cp < 0x7a6) return true
                        if (cp === 0x7b1) return true
                        if (cp < 0x7ca) return false
                        if (cp < 0x7eb) return true
                        if (cp < 0x7f4) return false
                        if (cp < 0x7f6) return true
                        return false
                    }
                    if (cp < 0x840) {
                        if (cp === 0x7fa) return true
                        if (cp < 0x800) return false
                        if (cp < 0x816) return true
                        if (cp === 0x81a) return true
                        if (cp === 0x824) return true
                        if (cp === 0x828) return true
                        return false
                    }
                    if (cp < 0x859) return true
                    if (cp < 0x860) return false
                    if (cp < 0x86b) return true
                    if (cp < 0x8a0) return false
                    if (cp < 0x8b5) return true
                    if (cp < 0x8b6) return false
                    if (cp < 0x8be) return true
                    if (cp < 0x904) return false
                    if (cp < 0x93a) return true
                    if (cp === 0x93d) return true
                    return false
                }
                if (cp < 0x9bd) {
                    if (cp < 0x98f) {
                        if (cp === 0x950) return true
                        if (cp < 0x958) return false
                        if (cp < 0x962) return true
                        if (cp === 0x971) return true
                        if (cp < 0x972) return false
                        if (cp < 0x981) return true
                        if (cp < 0x985) return false
                        if (cp < 0x98d) return true
                        return false
                    }
                    if (cp < 0x991) return true
                    if (cp < 0x993) return false
                    if (cp < 0x9a9) return true
                    if (cp < 0x9aa) return false
                    if (cp < 0x9b1) return true
                    if (cp === 0x9b2) return true
                    if (cp < 0x9b6) return false
                    if (cp < 0x9ba) return true
                    return false
                }
                if (cp < 0x9fc) {
                    if (cp === 0x9bd) return true
                    if (cp === 0x9ce) return true
                    if (cp < 0x9dc) return false
                    if (cp < 0x9de) return true
                    if (cp < 0x9df) return false
                    if (cp < 0x9e2) return true
                    if (cp < 0x9f0) return false
                    if (cp < 0x9f2) return true
                    return false
                }
                if (cp === 0x9fc) return true
                if (cp < 0xa05) return false
                if (cp < 0xa0b) return true
                if (cp < 0xa0f) return false
                if (cp < 0xa11) return true
                if (cp < 0xa13) return false
                if (cp < 0xa29) return true
                if (cp < 0xa2a) return false
                if (cp < 0xa31) return true
                if (cp < 0xa32) return false
                if (cp < 0xa34) return true
                return false
            }
            if (cp < 0xc60) {
                if (cp < 0xb3d) {
                    if (cp < 0xab5) {
                        if (cp < 0xa85) {
                            if (cp < 0xa35) return false
                            if (cp < 0xa37) return true
                            if (cp < 0xa38) return false
                            if (cp < 0xa3a) return true
                            if (cp < 0xa59) return false
                            if (cp < 0xa5d) return true
                            if (cp === 0xa5e) return true
                            if (cp < 0xa72) return false
                            if (cp < 0xa75) return true
                            return false
                        }
                        if (cp < 0xa8e) return true
                        if (cp < 0xa8f) return false
                        if (cp < 0xa92) return true
                        if (cp < 0xa93) return false
                        if (cp < 0xaa9) return true
                        if (cp < 0xaaa) return false
                        if (cp < 0xab1) return true
                        if (cp < 0xab2) return false
                        if (cp < 0xab4) return true
                        return false
                    }
                    if (cp < 0xb05) {
                        if (cp < 0xab5) return false
                        if (cp < 0xaba) return true
                        if (cp === 0xabd) return true
                        if (cp === 0xad0) return true
                        if (cp < 0xae0) return false
                        if (cp < 0xae2) return true
                        if (cp === 0xaf9) return true
                        return false
                    }
                    if (cp < 0xb0d) return true
                    if (cp < 0xb0f) return false
                    if (cp < 0xb11) return true
                    if (cp < 0xb13) return false
                    if (cp < 0xb29) return true
                    if (cp < 0xb2a) return false
                    if (cp < 0xb31) return true
                    if (cp < 0xb32) return false
                    if (cp < 0xb34) return true
                    if (cp < 0xb35) return false
                    if (cp < 0xb3a) return true
                    return false
                }
                if (cp < 0xb9e) {
                    if (cp < 0xb85) {
                        if (cp === 0xb3d) return true
                        if (cp < 0xb5c) return false
                        if (cp < 0xb5e) return true
                        if (cp < 0xb5f) return false
                        if (cp < 0xb62) return true
                        if (cp === 0xb71) return true
                        if (cp === 0xb83) return true
                        return false
                    }
                    if (cp < 0xb8b) return true
                    if (cp < 0xb8e) return false
                    if (cp < 0xb91) return true
                    if (cp < 0xb92) return false
                    if (cp < 0xb96) return true
                    if (cp < 0xb99) return false
                    if (cp < 0xb9b) return true
                    if (cp === 0xb9c) return true
                    return false
                }
                if (cp < 0xc05) {
                    if (cp < 0xb9e) return false
                    if (cp < 0xba0) return true
                    if (cp < 0xba3) return false
                    if (cp < 0xba5) return true
                    if (cp < 0xba8) return false
                    if (cp < 0xbab) return true
                    if (cp < 0xbae) return false
                    if (cp < 0xbba) return true
                    if (cp === 0xbd0) return true
                    return false
                }
                if (cp < 0xc0d) return true
                if (cp < 0xc0e) return false
                if (cp < 0xc11) return true
                if (cp < 0xc12) return false
                if (cp < 0xc29) return true
                if (cp < 0xc2a) return false
                if (cp < 0xc3a) return true
                if (cp === 0xc3d) return true
                if (cp < 0xc58) return false
                if (cp < 0xc5b) return true
                return false
            }
            if (cp < 0xdb3) {
                if (cp < 0xcf1) {
                    if (cp < 0xcaa) {
                        if (cp < 0xc60) return false
                        if (cp < 0xc62) return true
                        if (cp === 0xc80) return true
                        if (cp < 0xc85) return false
                        if (cp < 0xc8d) return true
                        if (cp < 0xc8e) return false
                        if (cp < 0xc91) return true
                        if (cp < 0xc92) return false
                        if (cp < 0xca9) return true
                        return false
                    }
                    if (cp < 0xcb4) return true
                    if (cp < 0xcb5) return false
                    if (cp < 0xcba) return true
                    if (cp === 0xcbd) return true
                    if (cp === 0xcde) return true
                    if (cp < 0xce0) return false
                    if (cp < 0xce2) return true
                    return false
                }
                if (cp < 0xd4e) {
                    if (cp < 0xcf1) return false
                    if (cp < 0xcf3) return true
                    if (cp < 0xd05) return false
                    if (cp < 0xd0d) return true
                    if (cp < 0xd0e) return false
                    if (cp < 0xd11) return true
                    if (cp < 0xd12) return false
                    if (cp < 0xd3b) return true
                    if (cp === 0xd3d) return true
                    return false
                }
                if (cp === 0xd4e) return true
                if (cp < 0xd54) return false
                if (cp < 0xd57) return true
                if (cp < 0xd5f) return false
                if (cp < 0xd62) return true
                if (cp < 0xd7a) return false
                if (cp < 0xd80) return true
                if (cp < 0xd85) return false
                if (cp < 0xd97) return true
                if (cp < 0xd9a) return false
                if (cp < 0xdb2) return true
                return false
            }
            if (cp < 0xe8a) {
                if (cp < 0xe40) {
                    if (cp < 0xdb3) return false
                    if (cp < 0xdbc) return true
                    if (cp === 0xdbd) return true
                    if (cp < 0xdc0) return false
                    if (cp < 0xdc7) return true
                    if (cp < 0xe01) return false
                    if (cp < 0xe31) return true
                    if (cp < 0xe32) return false
                    if (cp < 0xe34) return true
                    return false
                }
                if (cp < 0xe46) return true
                if (cp === 0xe46) return true
                if (cp < 0xe81) return false
                if (cp < 0xe83) return true
                if (cp === 0xe84) return true
                if (cp < 0xe87) return false
                if (cp < 0xe89) return true
                return false
            }
            if (cp < 0xea5) {
                if (cp === 0xe8a) return true
                if (cp === 0xe8d) return true
                if (cp < 0xe94) return false
                if (cp < 0xe98) return true
                if (cp < 0xe99) return false
                if (cp < 0xea0) return true
                if (cp < 0xea1) return false
                if (cp < 0xea4) return true
                return false
            }
            if (cp === 0xea5) return true
            if (cp === 0xea7) return true
            if (cp < 0xeaa) return false
            if (cp < 0xeac) return true
            if (cp < 0xead) return false
            if (cp < 0xeb1) return true
            if (cp < 0xeb2) return false
            if (cp < 0xeb4) return true
            if (cp === 0xebd) return true
            return false
        }
        if (cp < 0x1ce9) {
            if (cp < 0x166f) {
                if (cp < 0x10fd) {
                    if (cp < 0x105a) {
                        if (cp < 0xf49) {
                            if (cp < 0xec0) return false
                            if (cp < 0xec5) return true
                            if (cp === 0xec6) return true
                            if (cp < 0xedc) return false
                            if (cp < 0xee0) return true
                            if (cp === 0xf00) return true
                            if (cp < 0xf40) return false
                            if (cp < 0xf48) return true
                            return false
                        }
                        if (cp < 0xf6d) return true
                        if (cp < 0xf88) return false
                        if (cp < 0xf8d) return true
                        if (cp < 0x1000) return false
                        if (cp < 0x102b) return true
                        if (cp === 0x103f) return true
                        if (cp < 0x1050) return false
                        if (cp < 0x1056) return true
                        return false
                    }
                    if (cp < 0x108e) {
                        if (cp < 0x105a) return false
                        if (cp < 0x105e) return true
                        if (cp === 0x1061) return true
                        if (cp < 0x1065) return false
                        if (cp < 0x1067) return true
                        if (cp < 0x106e) return false
                        if (cp < 0x1071) return true
                        if (cp < 0x1075) return false
                        if (cp < 0x1082) return true
                        return false
                    }
                    if (cp === 0x108e) return true
                    if (cp < 0x10a0) return false
                    if (cp < 0x10c6) return true
                    if (cp === 0x10c7) return true
                    if (cp === 0x10cd) return true
                    if (cp < 0x10d0) return false
                    if (cp < 0x10fb) return true
                    if (cp === 0x10fc) return true
                    return false
                }
                if (cp < 0x12b8) {
                    if (cp < 0x125a) {
                        if (cp < 0x10fd) return false
                        if (cp < 0x1100) return true
                        if (cp < 0x1100) return false
                        if (cp < 0x1249) return true
                        if (cp < 0x124a) return false
                        if (cp < 0x124e) return true
                        if (cp < 0x1250) return false
                        if (cp < 0x1257) return true
                        if (cp === 0x1258) return true
                        return false
                    }
                    if (cp < 0x125e) return true
                    if (cp < 0x1260) return false
                    if (cp < 0x1289) return true
                    if (cp < 0x128a) return false
                    if (cp < 0x128e) return true
                    if (cp < 0x1290) return false
                    if (cp < 0x12b1) return true
                    if (cp < 0x12b2) return false
                    if (cp < 0x12b6) return true
                    return false
                }
                if (cp < 0x1312) {
                    if (cp < 0x12b8) return false
                    if (cp < 0x12bf) return true
                    if (cp === 0x12c0) return true
                    if (cp < 0x12c2) return false
                    if (cp < 0x12c6) return true
                    if (cp < 0x12c8) return false
                    if (cp < 0x12d7) return true
                    if (cp < 0x12d8) return false
                    if (cp < 0x1311) return true
                    return false
                }
                if (cp < 0x1316) return true
                if (cp < 0x1318) return false
                if (cp < 0x135b) return true
                if (cp < 0x1380) return false
                if (cp < 0x1390) return true
                if (cp < 0x13a0) return false
                if (cp < 0x13f6) return true
                if (cp < 0x13f8) return false
                if (cp < 0x13fe) return true
                if (cp < 0x1401) return false
                if (cp < 0x166d) return true
                return false
            }
            if (cp < 0x18b0) {
                if (cp < 0x176e) {
                    if (cp < 0x1700) {
                        if (cp < 0x166f) return false
                        if (cp < 0x1680) return true
                        if (cp < 0x1681) return false
                        if (cp < 0x169b) return true
                        if (cp < 0x16a0) return false
                        if (cp < 0x16eb) return true
                        if (cp < 0x16ee) return false
                        if (cp < 0x16f1) return true
                        if (cp < 0x16f1) return false
                        if (cp < 0x16f9) return true
                        return false
                    }
                    if (cp < 0x170d) return true
                    if (cp < 0x170e) return false
                    if (cp < 0x1712) return true
                    if (cp < 0x1720) return false
                    if (cp < 0x1732) return true
                    if (cp < 0x1740) return false
                    if (cp < 0x1752) return true
                    if (cp < 0x1760) return false
                    if (cp < 0x176d) return true
                    return false
                }
                if (cp < 0x1843) {
                    if (cp < 0x176e) return false
                    if (cp < 0x1771) return true
                    if (cp < 0x1780) return false
                    if (cp < 0x17b4) return true
                    if (cp === 0x17d7) return true
                    if (cp === 0x17dc) return true
                    if (cp < 0x1820) return false
                    if (cp < 0x1843) return true
                    return false
                }
                if (cp === 0x1843) return true
                if (cp < 0x1844) return false
                if (cp < 0x1879) return true
                if (cp < 0x1880) return false
                if (cp < 0x1885) return true
                if (cp < 0x1885) return false
                if (cp < 0x1887) return true
                if (cp < 0x1887) return false
                if (cp < 0x18a9) return true
                if (cp === 0x18aa) return true
                return false
            }
            if (cp < 0x1b45) {
                if (cp < 0x19b0) {
                    if (cp < 0x18b0) return false
                    if (cp < 0x18f6) return true
                    if (cp < 0x1900) return false
                    if (cp < 0x191f) return true
                    if (cp < 0x1950) return false
                    if (cp < 0x196e) return true
                    if (cp < 0x1970) return false
                    if (cp < 0x1975) return true
                    if (cp < 0x1980) return false
                    if (cp < 0x19ac) return true
                    return false
                }
                if (cp < 0x19ca) return true
                if (cp < 0x1a00) return false
                if (cp < 0x1a17) return true
                if (cp < 0x1a20) return false
                if (cp < 0x1a55) return true
                if (cp === 0x1aa7) return true
                if (cp < 0x1b05) return false
                if (cp < 0x1b34) return true
                return false
            }
            if (cp < 0x1c4d) {
                if (cp < 0x1b45) return false
                if (cp < 0x1b4c) return true
                if (cp < 0x1b83) return false
                if (cp < 0x1ba1) return true
                if (cp < 0x1bae) return false
                if (cp < 0x1bb0) return true
                if (cp < 0x1bba) return false
                if (cp < 0x1be6) return true
                if (cp < 0x1c00) return false
                if (cp < 0x1c24) return true
                return false
            }
            if (cp < 0x1c50) return true
            if (cp < 0x1c5a) return false
            if (cp < 0x1c78) return true
            if (cp < 0x1c78) return false
            if (cp < 0x1c7e) return true
            if (cp < 0x1c80) return false
            if (cp < 0x1c89) return true
            if (cp < 0x1c90) return false
            if (cp < 0x1cbb) return true
            if (cp < 0x1cbd) return false
            if (cp < 0x1cc0) return true
            return false
        }
        if (cp < 0x212f) {
            if (cp < 0x1fc2) {
                if (cp < 0x1f18) {
                    if (cp < 0x1d6b) {
                        if (cp < 0x1ce9) return false
                        if (cp < 0x1ced) return true
                        if (cp < 0x1cee) return false
                        if (cp < 0x1cf2) return true
                        if (cp < 0x1cf5) return false
                        if (cp < 0x1cf7) return true
                        if (cp < 0x1d00) return false
                        if (cp < 0x1d2c) return true
                        if (cp < 0x1d2c) return false
                        if (cp < 0x1d6b) return true
                        return false
                    }
                    if (cp < 0x1d78) return true
                    if (cp === 0x1d78) return true
                    if (cp < 0x1d79) return false
                    if (cp < 0x1d9b) return true
                    if (cp < 0x1d9b) return false
                    if (cp < 0x1dc0) return true
                    if (cp < 0x1e00) return false
                    if (cp < 0x1f16) return true
                    return false
                }
                if (cp < 0x1f5b) {
                    if (cp < 0x1f18) return false
                    if (cp < 0x1f1e) return true
                    if (cp < 0x1f20) return false
                    if (cp < 0x1f46) return true
                    if (cp < 0x1f48) return false
                    if (cp < 0x1f4e) return true
                    if (cp < 0x1f50) return false
                    if (cp < 0x1f58) return true
                    if (cp === 0x1f59) return true
                    return false
                }
                if (cp === 0x1f5b) return true
                if (cp === 0x1f5d) return true
                if (cp < 0x1f5f) return false
                if (cp < 0x1f7e) return true
                if (cp < 0x1f80) return false
                if (cp < 0x1fb5) return true
                if (cp < 0x1fb6) return false
                if (cp < 0x1fbd) return true
                if (cp === 0x1fbe) return true
                return false
            }
            if (cp < 0x2102) {
                if (cp < 0x1ff2) {
                    if (cp < 0x1fc2) return false
                    if (cp < 0x1fc5) return true
                    if (cp < 0x1fc6) return false
                    if (cp < 0x1fcd) return true
                    if (cp < 0x1fd0) return false
                    if (cp < 0x1fd4) return true
                    if (cp < 0x1fd6) return false
                    if (cp < 0x1fdc) return true
                    if (cp < 0x1fe0) return false
                    if (cp < 0x1fed) return true
                    return false
                }
                if (cp < 0x1ff5) return true
                if (cp < 0x1ff6) return false
                if (cp < 0x1ffd) return true
                if (cp === 0x2071) return true
                if (cp === 0x207f) return true
                if (cp < 0x2090) return false
                if (cp < 0x209d) return true
                return false
            }
            if (cp < 0x2119) {
                if (cp === 0x2102) return true
                if (cp === 0x2107) return true
                if (cp < 0x210a) return false
                if (cp < 0x2114) return true
                if (cp === 0x2115) return true
                if (cp === 0x2118) return true
                return false
            }
            if (cp < 0x211e) return true
            if (cp === 0x2124) return true
            if (cp === 0x2126) return true
            if (cp === 0x2128) return true
            if (cp < 0x212a) return false
            if (cp < 0x212e) return true
            if (cp === 0x212e) return true
            return false
        }
        if (cp < 0x2d80) {
            if (cp < 0x2c30) {
                if (cp < 0x214e) {
                    if (cp < 0x212f) return false
                    if (cp < 0x2135) return true
                    if (cp < 0x2135) return false
                    if (cp < 0x2139) return true
                    if (cp === 0x2139) return true
                    if (cp < 0x213c) return false
                    if (cp < 0x2140) return true
                    if (cp < 0x2145) return false
                    if (cp < 0x214a) return true
                    return false
                }
                if (cp === 0x214e) return true
                if (cp < 0x2160) return false
                if (cp < 0x2183) return true
                if (cp < 0x2183) return false
                if (cp < 0x2185) return true
                if (cp < 0x2185) return false
                if (cp < 0x2189) return true
                if (cp < 0x2c00) return false
                if (cp < 0x2c2f) return true
                return false
            }
            if (cp < 0x2cf2) {
                if (cp < 0x2c30) return false
                if (cp < 0x2c5f) return true
                if (cp < 0x2c60) return false
                if (cp < 0x2c7c) return true
                if (cp < 0x2c7c) return false
                if (cp < 0x2c7e) return true
                if (cp < 0x2c7e) return false
                if (cp < 0x2ce5) return true
                if (cp < 0x2ceb) return false
                if (cp < 0x2cef) return true
                return false
            }
            if (cp < 0x2cf4) return true
            if (cp < 0x2d00) return false
            if (cp < 0x2d26) return true
            if (cp === 0x2d27) return true
            if (cp === 0x2d2d) return true
            if (cp < 0x2d30) return false
            if (cp < 0x2d68) return true
            if (cp === 0x2d6f) return true
            return false
        }
        if (cp < 0x3006) {
            if (cp < 0x2dc0) {
                if (cp < 0x2d80) return false
                if (cp < 0x2d97) return true
                if (cp < 0x2da0) return false
                if (cp < 0x2da7) return true
                if (cp < 0x2da8) return false
                if (cp < 0x2daf) return true
                if (cp < 0x2db0) return false
                if (cp < 0x2db7) return true
                if (cp < 0x2db8) return false
                if (cp < 0x2dbf) return true
                return false
            }
            if (cp < 0x2dc7) return true
            if (cp < 0x2dc8) return false
            if (cp < 0x2dcf) return true
            if (cp < 0x2dd0) return false
            if (cp < 0x2dd7) return true
            if (cp < 0x2dd8) return false
            if (cp < 0x2ddf) return true
            if (cp === 0x3005) return true
            return false
        }
        if (cp < 0x303b) {
            if (cp === 0x3006) return true
            if (cp === 0x3007) return true
            if (cp < 0x3021) return false
            if (cp < 0x302a) return true
            if (cp < 0x3031) return false
            if (cp < 0x3036) return true
            if (cp < 0x3038) return false
            if (cp < 0x303b) return true
            return false
        }
        if (cp === 0x303b) return true
        if (cp === 0x303c) return true
        if (cp < 0x3041) return false
        if (cp < 0x3097) return true
        if (cp < 0x309b) return false
        if (cp < 0x309d) return true
        if (cp < 0x309d) return false
        if (cp < 0x309f) return true
        if (cp === 0x309f) return true
        return false
    }
    if (cp < 0x10b60) {
        if (cp < 0xd7b0) {
            if (cp < 0xa882) {
                if (cp < 0xa67f) {
                    if (cp < 0xa015) {
                        if (cp < 0x31a0) {
                            if (cp < 0x30a1) return false
                            if (cp < 0x30fb) return true
                            if (cp < 0x30fc) return false
                            if (cp < 0x30ff) return true
                            if (cp === 0x30ff) return true
                            if (cp < 0x3105) return false
                            if (cp < 0x3130) return true
                            if (cp < 0x3131) return false
                            if (cp < 0x318f) return true
                            return false
                        }
                        if (cp < 0x31bb) return true
                        if (cp < 0x31f0) return false
                        if (cp < 0x3200) return true
                        if (cp < 0x3400) return false
                        if (cp < 0x4db6) return true
                        if (cp < 0x4e00) return false
                        if (cp < 0x9ff0) return true
                        if (cp < 0xa000) return false
                        if (cp < 0xa015) return true
                        return false
                    }
                    if (cp < 0xa60c) {
                        if (cp === 0xa015) return true
                        if (cp < 0xa016) return false
                        if (cp < 0xa48d) return true
                        if (cp < 0xa4d0) return false
                        if (cp < 0xa4f8) return true
                        if (cp < 0xa4f8) return false
                        if (cp < 0xa4fe) return true
                        if (cp < 0xa500) return false
                        if (cp < 0xa60c) return true
                        return false
                    }
                    if (cp === 0xa60c) return true
                    if (cp < 0xa610) return false
                    if (cp < 0xa620) return true
                    if (cp < 0xa62a) return false
                    if (cp < 0xa62c) return true
                    if (cp < 0xa640) return false
                    if (cp < 0xa66e) return true
                    if (cp === 0xa66e) return true
                    return false
                }
                if (cp < 0xa78b) {
                    if (cp < 0xa717) {
                        if (cp === 0xa67f) return true
                        if (cp < 0xa680) return false
                        if (cp < 0xa69c) return true
                        if (cp < 0xa69c) return false
                        if (cp < 0xa69e) return true
                        if (cp < 0xa6a0) return false
                        if (cp < 0xa6e6) return true
                        if (cp < 0xa6e6) return false
                        if (cp < 0xa6f0) return true
                        return false
                    }
                    if (cp < 0xa720) return true
                    if (cp < 0xa722) return false
                    if (cp < 0xa770) return true
                    if (cp === 0xa770) return true
                    if (cp < 0xa771) return false
                    if (cp < 0xa788) return true
                    if (cp === 0xa788) return true
                    return false
                }
                if (cp < 0xa7fa) {
                    if (cp < 0xa78b) return false
                    if (cp < 0xa78f) return true
                    if (cp === 0xa78f) return true
                    if (cp < 0xa790) return false
                    if (cp < 0xa7ba) return true
                    if (cp === 0xa7f7) return true
                    if (cp < 0xa7f8) return false
                    if (cp < 0xa7fa) return true
                    return false
                }
                if (cp === 0xa7fa) return true
                if (cp < 0xa7fb) return false
                if (cp < 0xa802) return true
                if (cp < 0xa803) return false
                if (cp < 0xa806) return true
                if (cp < 0xa807) return false
                if (cp < 0xa80b) return true
                if (cp < 0xa80c) return false
                if (cp < 0xa823) return true
                if (cp < 0xa840) return false
                if (cp < 0xa874) return true
                return false
            }
            if (cp < 0xaab1) {
                if (cp < 0xa9e6) {
                    if (cp < 0xa930) {
                        if (cp < 0xa882) return false
                        if (cp < 0xa8b4) return true
                        if (cp < 0xa8f2) return false
                        if (cp < 0xa8f8) return true
                        if (cp === 0xa8fb) return true
                        if (cp < 0xa8fd) return false
                        if (cp < 0xa8ff) return true
                        if (cp < 0xa90a) return false
                        if (cp < 0xa926) return true
                        return false
                    }
                    if (cp < 0xa947) return true
                    if (cp < 0xa960) return false
                    if (cp < 0xa97d) return true
                    if (cp < 0xa984) return false
                    if (cp < 0xa9b3) return true
                    if (cp === 0xa9cf) return true
                    if (cp < 0xa9e0) return false
                    if (cp < 0xa9e5) return true
                    return false
                }
                if (cp < 0xaa44) {
                    if (cp === 0xa9e6) return true
                    if (cp < 0xa9e7) return false
                    if (cp < 0xa9f0) return true
                    if (cp < 0xa9fa) return false
                    if (cp < 0xa9ff) return true
                    if (cp < 0xaa00) return false
                    if (cp < 0xaa29) return true
                    if (cp < 0xaa40) return false
                    if (cp < 0xaa43) return true
                    return false
                }
                if (cp < 0xaa4c) return true
                if (cp < 0xaa60) return false
                if (cp < 0xaa70) return true
                if (cp === 0xaa70) return true
                if (cp < 0xaa71) return false
                if (cp < 0xaa77) return true
                if (cp === 0xaa7a) return true
                if (cp < 0xaa7e) return false
                if (cp < 0xaab0) return true
                return false
            }
            if (cp < 0xab01) {
                if (cp < 0xaadb) {
                    if (cp === 0xaab1) return true
                    if (cp < 0xaab5) return false
                    if (cp < 0xaab7) return true
                    if (cp < 0xaab9) return false
                    if (cp < 0xaabe) return true
                    if (cp === 0xaac0) return true
                    if (cp === 0xaac2) return true
                    return false
                }
                if (cp < 0xaadd) return true
                if (cp === 0xaadd) return true
                if (cp < 0xaae0) return false
                if (cp < 0xaaeb) return true
                if (cp === 0xaaf2) return true
                if (cp < 0xaaf3) return false
                if (cp < 0xaaf5) return true
                return false
            }
            if (cp < 0xab30) {
                if (cp < 0xab01) return false
                if (cp < 0xab07) return true
                if (cp < 0xab09) return false
                if (cp < 0xab0f) return true
                if (cp < 0xab11) return false
                if (cp < 0xab17) return true
                if (cp < 0xab20) return false
                if (cp < 0xab27) return true
                if (cp < 0xab28) return false
                if (cp < 0xab2f) return true
                return false
            }
            if (cp < 0xab5b) return true
            if (cp < 0xab5c) return false
            if (cp < 0xab60) return true
            if (cp < 0xab60) return false
            if (cp < 0xab66) return true
            if (cp < 0xab70) return false
            if (cp < 0xabc0) return true
            if (cp < 0xabc0) return false
            if (cp < 0xabe3) return true
            if (cp < 0xac00) return false
            if (cp < 0xd7a4) return true
            return false
        }
        if (cp < 0x1032d) {
            if (cp < 0xff41) {
                if (cp < 0xfb3e) {
                    if (cp < 0xfb13) {
                        if (cp < 0xd7b0) return false
                        if (cp < 0xd7c7) return true
                        if (cp < 0xd7cb) return false
                        if (cp < 0xd7fc) return true
                        if (cp < 0xf900) return false
                        if (cp < 0xfa6e) return true
                        if (cp < 0xfa70) return false
                        if (cp < 0xfada) return true
                        if (cp < 0xfb00) return false
                        if (cp < 0xfb07) return true
                        return false
                    }
                    if (cp < 0xfb18) return true
                    if (cp === 0xfb1d) return true
                    if (cp < 0xfb1f) return false
                    if (cp < 0xfb29) return true
                    if (cp < 0xfb2a) return false
                    if (cp < 0xfb37) return true
                    if (cp < 0xfb38) return false
                    if (cp < 0xfb3d) return true
                    return false
                }
                if (cp < 0xfd50) {
                    if (cp === 0xfb3e) return true
                    if (cp < 0xfb40) return false
                    if (cp < 0xfb42) return true
                    if (cp < 0xfb43) return false
                    if (cp < 0xfb45) return true
                    if (cp < 0xfb46) return false
                    if (cp < 0xfbb2) return true
                    if (cp < 0xfbd3) return false
                    if (cp < 0xfd3e) return true
                    return false
                }
                if (cp < 0xfd90) return true
                if (cp < 0xfd92) return false
                if (cp < 0xfdc8) return true
                if (cp < 0xfdf0) return false
                if (cp < 0xfdfc) return true
                if (cp < 0xfe70) return false
                if (cp < 0xfe75) return true
                if (cp < 0xfe76) return false
                if (cp < 0xfefd) return true
                if (cp < 0xff21) return false
                if (cp < 0xff3b) return true
                return false
            }
            if (cp < 0x10000) {
                if (cp < 0xffa0) {
                    if (cp < 0xff41) return false
                    if (cp < 0xff5b) return true
                    if (cp < 0xff66) return false
                    if (cp < 0xff70) return true
                    if (cp === 0xff70) return true
                    if (cp < 0xff71) return false
                    if (cp < 0xff9e) return true
                    if (cp < 0xff9e) return false
                    if (cp < 0xffa0) return true
                    return false
                }
                if (cp < 0xffbf) return true
                if (cp < 0xffc2) return false
                if (cp < 0xffc8) return true
                if (cp < 0xffca) return false
                if (cp < 0xffd0) return true
                if (cp < 0xffd2) return false
                if (cp < 0xffd8) return true
                if (cp < 0xffda) return false
                if (cp < 0xffdd) return true
                return false
            }
            if (cp < 0x10050) {
                if (cp < 0x10000) return false
                if (cp < 0x1000c) return true
                if (cp < 0x1000d) return false
                if (cp < 0x10027) return true
                if (cp < 0x10028) return false
                if (cp < 0x1003b) return true
                if (cp < 0x1003c) return false
                if (cp < 0x1003e) return true
                if (cp < 0x1003f) return false
                if (cp < 0x1004e) return true
                return false
            }
            if (cp < 0x1005e) return true
            if (cp < 0x10080) return false
            if (cp < 0x100fb) return true
            if (cp < 0x10140) return false
            if (cp < 0x10175) return true
            if (cp < 0x10280) return false
            if (cp < 0x1029d) return true
            if (cp < 0x102a0) return false
            if (cp < 0x102d1) return true
            if (cp < 0x10300) return false
            if (cp < 0x10320) return true
            return false
        }
        if (cp < 0x10837) {
            if (cp < 0x10450) {
                if (cp < 0x10380) {
                    if (cp < 0x1032d) return false
                    if (cp < 0x10341) return true
                    if (cp === 0x10341) return true
                    if (cp < 0x10342) return false
                    if (cp < 0x1034a) return true
                    if (cp === 0x1034a) return true
                    if (cp < 0x10350) return false
                    if (cp < 0x10376) return true
                    return false
                }
                if (cp < 0x1039e) return true
                if (cp < 0x103a0) return false
                if (cp < 0x103c4) return true
                if (cp < 0x103c8) return false
                if (cp < 0x103d0) return true
                if (cp < 0x103d1) return false
                if (cp < 0x103d6) return true
                if (cp < 0x10400) return false
                if (cp < 0x10450) return true
                return false
            }
            if (cp < 0x10600) {
                if (cp < 0x10450) return false
                if (cp < 0x1049e) return true
                if (cp < 0x104b0) return false
                if (cp < 0x104d4) return true
                if (cp < 0x104d8) return false
                if (cp < 0x104fc) return true
                if (cp < 0x10500) return false
                if (cp < 0x10528) return true
                if (cp < 0x10530) return false
                if (cp < 0x10564) return true
                return false
            }
            if (cp < 0x10737) return true
            if (cp < 0x10740) return false
            if (cp < 0x10756) return true
            if (cp < 0x10760) return false
            if (cp < 0x10768) return true
            if (cp < 0x10800) return false
            if (cp < 0x10806) return true
            if (cp === 0x10808) return true
            if (cp < 0x1080a) return false
            if (cp < 0x10836) return true
            return false
        }
        if (cp < 0x109be) {
            if (cp < 0x108e0) {
                if (cp < 0x10837) return false
                if (cp < 0x10839) return true
                if (cp === 0x1083c) return true
                if (cp < 0x1083f) return false
                if (cp < 0x10856) return true
                if (cp < 0x10860) return false
                if (cp < 0x10877) return true
                if (cp < 0x10880) return false
                if (cp < 0x1089f) return true
                return false
            }
            if (cp < 0x108f3) return true
            if (cp < 0x108f4) return false
            if (cp < 0x108f6) return true
            if (cp < 0x10900) return false
            if (cp < 0x10916) return true
            if (cp < 0x10920) return false
            if (cp < 0x1093a) return true
            if (cp < 0x10980) return false
            if (cp < 0x109b8) return true
            return false
        }
        if (cp < 0x10a60) {
            if (cp < 0x109be) return false
            if (cp < 0x109c0) return true
            if (cp === 0x10a00) return true
            if (cp < 0x10a10) return false
            if (cp < 0x10a14) return true
            if (cp < 0x10a15) return false
            if (cp < 0x10a18) return true
            if (cp < 0x10a19) return false
            if (cp < 0x10a36) return true
            return false
        }
        if (cp < 0x10a7d) return true
        if (cp < 0x10a80) return false
        if (cp < 0x10a9d) return true
        if (cp < 0x10ac0) return false
        if (cp < 0x10ac8) return true
        if (cp < 0x10ac9) return false
        if (cp < 0x10ae5) return true
        if (cp < 0x10b00) return false
        if (cp < 0x10b36) return true
        if (cp < 0x10b40) return false
        if (cp < 0x10b56) return true
        return false
    }
    if (cp < 0x16e40) {
        if (cp < 0x11580) {
            if (cp < 0x11213) {
                if (cp < 0x11083) {
                    if (cp < 0x10d00) {
                        if (cp < 0x10b60) return false
                        if (cp < 0x10b73) return true
                        if (cp < 0x10b80) return false
                        if (cp < 0x10b92) return true
                        if (cp < 0x10c00) return false
                        if (cp < 0x10c49) return true
                        if (cp < 0x10c80) return false
                        if (cp < 0x10cb3) return true
                        if (cp < 0x10cc0) return false
                        if (cp < 0x10cf3) return true
                        return false
                    }
                    if (cp < 0x10d24) return true
                    if (cp < 0x10f00) return false
                    if (cp < 0x10f1d) return true
                    if (cp === 0x10f27) return true
                    if (cp < 0x10f30) return false
                    if (cp < 0x10f46) return true
                    if (cp < 0x11003) return false
                    if (cp < 0x11038) return true
                    return false
                }
                if (cp < 0x11176) {
                    if (cp < 0x11083) return false
                    if (cp < 0x110b0) return true
                    if (cp < 0x110d0) return false
                    if (cp < 0x110e9) return true
                    if (cp < 0x11103) return false
                    if (cp < 0x11127) return true
                    if (cp === 0x11144) return true
                    if (cp < 0x11150) return false
                    if (cp < 0x11173) return true
                    return false
                }
                if (cp === 0x11176) return true
                if (cp < 0x11183) return false
                if (cp < 0x111b3) return true
                if (cp < 0x111c1) return false
                if (cp < 0x111c5) return true
                if (cp === 0x111da) return true
                if (cp === 0x111dc) return true
                if (cp < 0x11200) return false
                if (cp < 0x11212) return true
                return false
            }
            if (cp < 0x1132a) {
                if (cp < 0x1129f) {
                    if (cp < 0x11213) return false
                    if (cp < 0x1122c) return true
                    if (cp < 0x11280) return false
                    if (cp < 0x11287) return true
                    if (cp === 0x11288) return true
                    if (cp < 0x1128a) return false
                    if (cp < 0x1128e) return true
                    if (cp < 0x1128f) return false
                    if (cp < 0x1129e) return true
                    return false
                }
                if (cp < 0x112a9) return true
                if (cp < 0x112b0) return false
                if (cp < 0x112df) return true
                if (cp < 0x11305) return false
                if (cp < 0x1130d) return true
                if (cp < 0x1130f) return false
                if (cp < 0x11311) return true
                if (cp < 0x11313) return false
                if (cp < 0x11329) return true
                return false
            }
            if (cp < 0x1135d) {
                if (cp < 0x1132a) return false
                if (cp < 0x11331) return true
                if (cp < 0x11332) return false
                if (cp < 0x11334) return true
                if (cp < 0x11335) return false
                if (cp < 0x1133a) return true
                if (cp === 0x1133d) return true
                if (cp === 0x11350) return true
                return false
            }
            if (cp < 0x11362) return true
            if (cp < 0x11400) return false
            if (cp < 0x11435) return true
            if (cp < 0x11447) return false
            if (cp < 0x1144b) return true
            if (cp < 0x11480) return false
            if (cp < 0x114b0) return true
            if (cp < 0x114c4) return false
            if (cp < 0x114c6) return true
            if (cp === 0x114c7) return true
            return false
        }
        if (cp < 0x11d00) {
            if (cp < 0x11a0b) {
                if (cp < 0x11700) {
                    if (cp < 0x11580) return false
                    if (cp < 0x115af) return true
                    if (cp < 0x115d8) return false
                    if (cp < 0x115dc) return true
                    if (cp < 0x11600) return false
                    if (cp < 0x11630) return true
                    if (cp === 0x11644) return true
                    if (cp < 0x11680) return false
                    if (cp < 0x116ab) return true
                    return false
                }
                if (cp < 0x1171b) return true
                if (cp < 0x11800) return false
                if (cp < 0x1182c) return true
                if (cp < 0x118a0) return false
                if (cp < 0x118e0) return true
                if (cp === 0x118ff) return true
                if (cp === 0x11a00) return true
                return false
            }
            if (cp < 0x11a9d) {
                if (cp < 0x11a0b) return false
                if (cp < 0x11a33) return true
                if (cp === 0x11a3a) return true
                if (cp === 0x11a50) return true
                if (cp < 0x11a5c) return false
                if (cp < 0x11a84) return true
                if (cp < 0x11a86) return false
                if (cp < 0x11a8a) return true
                return false
            }
            if (cp === 0x11a9d) return true
            if (cp < 0x11ac0) return false
            if (cp < 0x11af9) return true
            if (cp < 0x11c00) return false
            if (cp < 0x11c09) return true
            if (cp < 0x11c0a) return false
            if (cp < 0x11c2f) return true
            if (cp === 0x11c40) return true
            if (cp < 0x11c72) return false
            if (cp < 0x11c90) return true
            return false
        }
        if (cp < 0x12400) {
            if (cp < 0x11d67) {
                if (cp < 0x11d00) return false
                if (cp < 0x11d07) return true
                if (cp < 0x11d08) return false
                if (cp < 0x11d0a) return true
                if (cp < 0x11d0b) return false
                if (cp < 0x11d31) return true
                if (cp === 0x11d46) return true
                if (cp < 0x11d60) return false
                if (cp < 0x11d66) return true
                return false
            }
            if (cp < 0x11d69) return true
            if (cp < 0x11d6a) return false
            if (cp < 0x11d8a) return true
            if (cp === 0x11d98) return true
            if (cp < 0x11ee0) return false
            if (cp < 0x11ef3) return true
            if (cp < 0x12000) return false
            if (cp < 0x1239a) return true
            return false
        }
        if (cp < 0x16a40) {
            if (cp < 0x12400) return false
            if (cp < 0x1246f) return true
            if (cp < 0x12480) return false
            if (cp < 0x12544) return true
            if (cp < 0x13000) return false
            if (cp < 0x1342f) return true
            if (cp < 0x14400) return false
            if (cp < 0x14647) return true
            if (cp < 0x16800) return false
            if (cp < 0x16a39) return true
            return false
        }
        if (cp < 0x16a5f) return true
        if (cp < 0x16ad0) return false
        if (cp < 0x16aee) return true
        if (cp < 0x16b00) return false
        if (cp < 0x16b30) return true
        if (cp < 0x16b40) return false
        if (cp < 0x16b44) return true
        if (cp < 0x16b63) return false
        if (cp < 0x16b78) return true
        if (cp < 0x16b7d) return false
        if (cp < 0x16b90) return true
        return false
    }
    if (cp < 0x1d7c4) {
        if (cp < 0x1d4bd) {
            if (cp < 0x1bc70) {
                if (cp < 0x17000) {
                    if (cp < 0x16e40) return false
                    if (cp < 0x16e80) return true
                    if (cp < 0x16f00) return false
                    if (cp < 0x16f45) return true
                    if (cp === 0x16f50) return true
                    if (cp < 0x16f93) return false
                    if (cp < 0x16fa0) return true
                    if (cp < 0x16fe0) return false
                    if (cp < 0x16fe2) return true
                    return false
                }
                if (cp < 0x187f2) return true
                if (cp < 0x18800) return false
                if (cp < 0x18af3) return true
                if (cp < 0x1b000) return false
                if (cp < 0x1b11f) return true
                if (cp < 0x1b170) return false
                if (cp < 0x1b2fc) return true
                if (cp < 0x1bc00) return false
                if (cp < 0x1bc6b) return true
                return false
            }
            if (cp < 0x1d49e) {
                if (cp < 0x1bc70) return false
                if (cp < 0x1bc7d) return true
                if (cp < 0x1bc80) return false
                if (cp < 0x1bc89) return true
                if (cp < 0x1bc90) return false
                if (cp < 0x1bc9a) return true
                if (cp < 0x1d400) return false
                if (cp < 0x1d455) return true
                if (cp < 0x1d456) return false
                if (cp < 0x1d49d) return true
                return false
            }
            if (cp < 0x1d4a0) return true
            if (cp === 0x1d4a2) return true
            if (cp < 0x1d4a5) return false
            if (cp < 0x1d4a7) return true
            if (cp < 0x1d4a9) return false
            if (cp < 0x1d4ad) return true
            if (cp < 0x1d4ae) return false
            if (cp < 0x1d4ba) return true
            if (cp === 0x1d4bb) return true
            return false
        }
        if (cp < 0x1d552) {
            if (cp < 0x1d51e) {
                if (cp < 0x1d4bd) return false
                if (cp < 0x1d4c4) return true
                if (cp < 0x1d4c5) return false
                if (cp < 0x1d506) return true
                if (cp < 0x1d507) return false
                if (cp < 0x1d50b) return true
                if (cp < 0x1d50d) return false
                if (cp < 0x1d515) return true
                if (cp < 0x1d516) return false
                if (cp < 0x1d51d) return true
                return false
            }
            if (cp < 0x1d53a) return true
            if (cp < 0x1d53b) return false
            if (cp < 0x1d53f) return true
            if (cp < 0x1d540) return false
            if (cp < 0x1d545) return true
            if (cp === 0x1d546) return true
            if (cp < 0x1d54a) return false
            if (cp < 0x1d551) return true
            return false
        }
        if (cp < 0x1d716) {
            if (cp < 0x1d552) return false
            if (cp < 0x1d6a6) return true
            if (cp < 0x1d6a8) return false
            if (cp < 0x1d6c1) return true
            if (cp < 0x1d6c2) return false
            if (cp < 0x1d6db) return true
            if (cp < 0x1d6dc) return false
            if (cp < 0x1d6fb) return true
            if (cp < 0x1d6fc) return false
            if (cp < 0x1d715) return true
            return false
        }
        if (cp < 0x1d735) return true
        if (cp < 0x1d736) return false
        if (cp < 0x1d74f) return true
        if (cp < 0x1d750) return false
        if (cp < 0x1d76f) return true
        if (cp < 0x1d770) return false
        if (cp < 0x1d789) return true
        if (cp < 0x1d78a) return false
        if (cp < 0x1d7a9) return true
        if (cp < 0x1d7aa) return false
        if (cp < 0x1d7c3) return true
        return false
    }
    if (cp < 0x1ee5b) {
        if (cp < 0x1ee39) {
            if (cp < 0x1ee21) {
                if (cp < 0x1d7c4) return false
                if (cp < 0x1d7cc) return true
                if (cp < 0x1e800) return false
                if (cp < 0x1e8c5) return true
                if (cp < 0x1e900) return false
                if (cp < 0x1e944) return true
                if (cp < 0x1ee00) return false
                if (cp < 0x1ee04) return true
                if (cp < 0x1ee05) return false
                if (cp < 0x1ee20) return true
                return false
            }
            if (cp < 0x1ee23) return true
            if (cp === 0x1ee24) return true
            if (cp === 0x1ee27) return true
            if (cp < 0x1ee29) return false
            if (cp < 0x1ee33) return true
            if (cp < 0x1ee34) return false
            if (cp < 0x1ee38) return true
            return false
        }
        if (cp < 0x1ee4b) {
            if (cp === 0x1ee39) return true
            if (cp === 0x1ee3b) return true
            if (cp === 0x1ee42) return true
            if (cp === 0x1ee47) return true
            if (cp === 0x1ee49) return true
            return false
        }
        if (cp === 0x1ee4b) return true
        if (cp < 0x1ee4d) return false
        if (cp < 0x1ee50) return true
        if (cp < 0x1ee51) return false
        if (cp < 0x1ee53) return true
        if (cp === 0x1ee54) return true
        if (cp === 0x1ee57) return true
        if (cp === 0x1ee59) return true
        return false
    }
    if (cp < 0x1ee80) {
        if (cp < 0x1ee67) {
            if (cp === 0x1ee5b) return true
            if (cp === 0x1ee5d) return true
            if (cp === 0x1ee5f) return true
            if (cp < 0x1ee61) return false
            if (cp < 0x1ee63) return true
            if (cp === 0x1ee64) return true
            return false
        }
        if (cp < 0x1ee6b) return true
        if (cp < 0x1ee6c) return false
        if (cp < 0x1ee73) return true
        if (cp < 0x1ee74) return false
        if (cp < 0x1ee78) return true
        if (cp < 0x1ee79) return false
        if (cp < 0x1ee7d) return true
        if (cp === 0x1ee7e) return true
        return false
    }
    if (cp < 0x20000) {
        if (cp < 0x1ee80) return false
        if (cp < 0x1ee8a) return true
        if (cp < 0x1ee8b) return false
        if (cp < 0x1ee9c) return true
        if (cp < 0x1eea1) return false
        if (cp < 0x1eea4) return true
        if (cp < 0x1eea5) return false
        if (cp < 0x1eeaa) return true
        if (cp < 0x1eeab) return false
        if (cp < 0x1eebc) return true
        return false
    }
    if (cp < 0x2a6d7) return true
    if (cp < 0x2a700) return false
    if (cp < 0x2b735) return true
    if (cp < 0x2b740) return false
    if (cp < 0x2b81e) return true
    if (cp < 0x2b820) return false
    if (cp < 0x2cea2) return true
    if (cp < 0x2ceb0) return false
    if (cp < 0x2ebe1) return true
    if (cp < 0x2f800) return false
    if (cp < 0x2fa1e) return true
    return false
}

function isLargeIdContinue(cp: number): boolean {
    if (cp < 0x1cd0) {
        if (cp < 0xd82) {
            if (cp < 0xa83) {
                if (cp < 0x93b) {
                    if (cp < 0x6ea) {
                        if (cp < 0x5c7) {
                            if (cp === 0xb7) return true
                            if (cp < 0x300) return false
                            if (cp < 0x370) return true
                            if (cp === 0x387) return true
                            if (cp < 0x483) return false
                            if (cp < 0x488) return true
                            if (cp < 0x591) return false
                            if (cp < 0x5be) return true
                            if (cp === 0x5bf) return true
                            if (cp < 0x5c1) return false
                            if (cp < 0x5c3) return true
                            if (cp < 0x5c4) return false
                            if (cp < 0x5c6) return true
                            return false
                        }
                        if (cp === 0x5c7) return true
                        if (cp < 0x610) return false
                        if (cp < 0x61b) return true
                        if (cp < 0x64b) return false
                        if (cp < 0x660) return true
                        if (cp < 0x660) return false
                        if (cp < 0x66a) return true
                        if (cp === 0x670) return true
                        if (cp < 0x6d6) return false
                        if (cp < 0x6dd) return true
                        if (cp < 0x6df) return false
                        if (cp < 0x6e5) return true
                        if (cp < 0x6e7) return false
                        if (cp < 0x6e9) return true
                        return false
                    }
                    if (cp < 0x816) {
                        if (cp < 0x6ea) return false
                        if (cp < 0x6ee) return true
                        if (cp < 0x6f0) return false
                        if (cp < 0x6fa) return true
                        if (cp === 0x711) return true
                        if (cp < 0x730) return false
                        if (cp < 0x74b) return true
                        if (cp < 0x7a6) return false
                        if (cp < 0x7b1) return true
                        if (cp < 0x7c0) return false
                        if (cp < 0x7ca) return true
                        if (cp < 0x7eb) return false
                        if (cp < 0x7f4) return true
                        if (cp === 0x7fd) return true
                        return false
                    }
                    if (cp < 0x81a) return true
                    if (cp < 0x81b) return false
                    if (cp < 0x824) return true
                    if (cp < 0x825) return false
                    if (cp < 0x828) return true
                    if (cp < 0x829) return false
                    if (cp < 0x82e) return true
                    if (cp < 0x859) return false
                    if (cp < 0x85c) return true
                    if (cp < 0x8d3) return false
                    if (cp < 0x8e2) return true
                    if (cp < 0x8e3) return false
                    if (cp < 0x903) return true
                    if (cp === 0x903) return true
                    if (cp === 0x93a) return true
                    return false
                }
                if (cp < 0x9cd) {
                    if (cp < 0x962) {
                        if (cp === 0x93b) return true
                        if (cp === 0x93c) return true
                        if (cp < 0x93e) return false
                        if (cp < 0x941) return true
                        if (cp < 0x941) return false
                        if (cp < 0x949) return true
                        if (cp < 0x949) return false
                        if (cp < 0x94d) return true
                        if (cp === 0x94d) return true
                        if (cp < 0x94e) return false
                        if (cp < 0x950) return true
                        if (cp < 0x951) return false
                        if (cp < 0x958) return true
                        return false
                    }
                    if (cp < 0x964) return true
                    if (cp < 0x966) return false
                    if (cp < 0x970) return true
                    if (cp === 0x981) return true
                    if (cp < 0x982) return false
                    if (cp < 0x984) return true
                    if (cp === 0x9bc) return true
                    if (cp < 0x9be) return false
                    if (cp < 0x9c1) return true
                    if (cp < 0x9c1) return false
                    if (cp < 0x9c5) return true
                    if (cp < 0x9c7) return false
                    if (cp < 0x9c9) return true
                    if (cp < 0x9cb) return false
                    if (cp < 0x9cd) return true
                    return false
                }
                if (cp < 0xa3e) {
                    if (cp === 0x9cd) return true
                    if (cp === 0x9d7) return true
                    if (cp < 0x9e2) return false
                    if (cp < 0x9e4) return true
                    if (cp < 0x9e6) return false
                    if (cp < 0x9f0) return true
                    if (cp === 0x9fe) return true
                    if (cp < 0xa01) return false
                    if (cp < 0xa03) return true
                    if (cp === 0xa03) return true
                    if (cp === 0xa3c) return true
                    return false
                }
                if (cp < 0xa41) return true
                if (cp < 0xa41) return false
                if (cp < 0xa43) return true
                if (cp < 0xa47) return false
                if (cp < 0xa49) return true
                if (cp < 0xa4b) return false
                if (cp < 0xa4e) return true
                if (cp === 0xa51) return true
                if (cp < 0xa66) return false
                if (cp < 0xa70) return true
                if (cp < 0xa70) return false
                if (cp < 0xa72) return true
                if (cp === 0xa75) return true
                if (cp < 0xa81) return false
                if (cp < 0xa83) return true
                return false
            }
            if (cp < 0xc00) {
                if (cp < 0xb41) {
                    if (cp < 0xae2) {
                        if (cp === 0xa83) return true
                        if (cp === 0xabc) return true
                        if (cp < 0xabe) return false
                        if (cp < 0xac1) return true
                        if (cp < 0xac1) return false
                        if (cp < 0xac6) return true
                        if (cp < 0xac7) return false
                        if (cp < 0xac9) return true
                        if (cp === 0xac9) return true
                        if (cp < 0xacb) return false
                        if (cp < 0xacd) return true
                        if (cp === 0xacd) return true
                        return false
                    }
                    if (cp < 0xae4) return true
                    if (cp < 0xae6) return false
                    if (cp < 0xaf0) return true
                    if (cp < 0xafa) return false
                    if (cp < 0xb00) return true
                    if (cp === 0xb01) return true
                    if (cp < 0xb02) return false
                    if (cp < 0xb04) return true
                    if (cp === 0xb3c) return true
                    if (cp === 0xb3e) return true
                    if (cp === 0xb3f) return true
                    if (cp === 0xb40) return true
                    return false
                }
                if (cp < 0xb82) {
                    if (cp < 0xb41) return false
                    if (cp < 0xb45) return true
                    if (cp < 0xb47) return false
                    if (cp < 0xb49) return true
                    if (cp < 0xb4b) return false
                    if (cp < 0xb4d) return true
                    if (cp === 0xb4d) return true
                    if (cp === 0xb56) return true
                    if (cp === 0xb57) return true
                    if (cp < 0xb62) return false
                    if (cp < 0xb64) return true
                    if (cp < 0xb66) return false
                    if (cp < 0xb70) return true
                    return false
                }
                if (cp === 0xb82) return true
                if (cp < 0xbbe) return false
                if (cp < 0xbc0) return true
                if (cp === 0xbc0) return true
                if (cp < 0xbc1) return false
                if (cp < 0xbc3) return true
                if (cp < 0xbc6) return false
                if (cp < 0xbc9) return true
                if (cp < 0xbca) return false
                if (cp < 0xbcd) return true
                if (cp === 0xbcd) return true
                if (cp === 0xbd7) return true
                if (cp < 0xbe6) return false
                if (cp < 0xbf0) return true
                return false
            }
            if (cp < 0xcc7) {
                if (cp < 0xc62) {
                    if (cp === 0xc00) return true
                    if (cp < 0xc01) return false
                    if (cp < 0xc04) return true
                    if (cp === 0xc04) return true
                    if (cp < 0xc3e) return false
                    if (cp < 0xc41) return true
                    if (cp < 0xc41) return false
                    if (cp < 0xc45) return true
                    if (cp < 0xc46) return false
                    if (cp < 0xc49) return true
                    if (cp < 0xc4a) return false
                    if (cp < 0xc4e) return true
                    if (cp < 0xc55) return false
                    if (cp < 0xc57) return true
                    return false
                }
                if (cp < 0xc64) return true
                if (cp < 0xc66) return false
                if (cp < 0xc70) return true
                if (cp === 0xc81) return true
                if (cp < 0xc82) return false
                if (cp < 0xc84) return true
                if (cp === 0xcbc) return true
                if (cp === 0xcbe) return true
                if (cp === 0xcbf) return true
                if (cp < 0xcc0) return false
                if (cp < 0xcc5) return true
                if (cp === 0xcc6) return true
                return false
            }
            if (cp < 0xd3b) {
                if (cp < 0xcc7) return false
                if (cp < 0xcc9) return true
                if (cp < 0xcca) return false
                if (cp < 0xccc) return true
                if (cp < 0xccc) return false
                if (cp < 0xcce) return true
                if (cp < 0xcd5) return false
                if (cp < 0xcd7) return true
                if (cp < 0xce2) return false
                if (cp < 0xce4) return true
                if (cp < 0xce6) return false
                if (cp < 0xcf0) return true
                if (cp < 0xd00) return false
                if (cp < 0xd02) return true
                if (cp < 0xd02) return false
                if (cp < 0xd04) return true
                return false
            }
            if (cp < 0xd3d) return true
            if (cp < 0xd3e) return false
            if (cp < 0xd41) return true
            if (cp < 0xd41) return false
            if (cp < 0xd45) return true
            if (cp < 0xd46) return false
            if (cp < 0xd49) return true
            if (cp < 0xd4a) return false
            if (cp < 0xd4d) return true
            if (cp === 0xd4d) return true
            if (cp === 0xd57) return true
            if (cp < 0xd62) return false
            if (cp < 0xd64) return true
            if (cp < 0xd66) return false
            if (cp < 0xd70) return true
            return false
        }
        if (cp < 0x17e0) {
            if (cp < 0x1038) {
                if (cp < 0xf18) {
                    if (cp < 0xe31) {
                        if (cp < 0xd82) return false
                        if (cp < 0xd84) return true
                        if (cp === 0xdca) return true
                        if (cp < 0xdcf) return false
                        if (cp < 0xdd2) return true
                        if (cp < 0xdd2) return false
                        if (cp < 0xdd5) return true
                        if (cp === 0xdd6) return true
                        if (cp < 0xdd8) return false
                        if (cp < 0xde0) return true
                        if (cp < 0xde6) return false
                        if (cp < 0xdf0) return true
                        if (cp < 0xdf2) return false
                        if (cp < 0xdf4) return true
                        return false
                    }
                    if (cp === 0xe31) return true
                    if (cp < 0xe34) return false
                    if (cp < 0xe3b) return true
                    if (cp < 0xe47) return false
                    if (cp < 0xe4f) return true
                    if (cp < 0xe50) return false
                    if (cp < 0xe5a) return true
                    if (cp === 0xeb1) return true
                    if (cp < 0xeb4) return false
                    if (cp < 0xeba) return true
                    if (cp < 0xebb) return false
                    if (cp < 0xebd) return true
                    if (cp < 0xec8) return false
                    if (cp < 0xece) return true
                    if (cp < 0xed0) return false
                    if (cp < 0xeda) return true
                    return false
                }
                if (cp < 0xf80) {
                    if (cp < 0xf18) return false
                    if (cp < 0xf1a) return true
                    if (cp < 0xf20) return false
                    if (cp < 0xf2a) return true
                    if (cp === 0xf35) return true
                    if (cp === 0xf37) return true
                    if (cp === 0xf39) return true
                    if (cp < 0xf3e) return false
                    if (cp < 0xf40) return true
                    if (cp < 0xf71) return false
                    if (cp < 0xf7f) return true
                    if (cp === 0xf7f) return true
                    return false
                }
                if (cp < 0xf85) return true
                if (cp < 0xf86) return false
                if (cp < 0xf88) return true
                if (cp < 0xf8d) return false
                if (cp < 0xf98) return true
                if (cp < 0xf99) return false
                if (cp < 0xfbd) return true
                if (cp === 0xfc6) return true
                if (cp < 0x102b) return false
                if (cp < 0x102d) return true
                if (cp < 0x102d) return false
                if (cp < 0x1031) return true
                if (cp === 0x1031) return true
                if (cp < 0x1032) return false
                if (cp < 0x1038) return true
                return false
            }
            if (cp < 0x1090) {
                if (cp < 0x1062) {
                    if (cp === 0x1038) return true
                    if (cp < 0x1039) return false
                    if (cp < 0x103b) return true
                    if (cp < 0x103b) return false
                    if (cp < 0x103d) return true
                    if (cp < 0x103d) return false
                    if (cp < 0x103f) return true
                    if (cp < 0x1040) return false
                    if (cp < 0x104a) return true
                    if (cp < 0x1056) return false
                    if (cp < 0x1058) return true
                    if (cp < 0x1058) return false
                    if (cp < 0x105a) return true
                    if (cp < 0x105e) return false
                    if (cp < 0x1061) return true
                    return false
                }
                if (cp < 0x1065) return true
                if (cp < 0x1067) return false
                if (cp < 0x106e) return true
                if (cp < 0x1071) return false
                if (cp < 0x1075) return true
                if (cp === 0x1082) return true
                if (cp < 0x1083) return false
                if (cp < 0x1085) return true
                if (cp < 0x1085) return false
                if (cp < 0x1087) return true
                if (cp < 0x1087) return false
                if (cp < 0x108d) return true
                if (cp === 0x108d) return true
                if (cp === 0x108f) return true
                return false
            }
            if (cp < 0x1772) {
                if (cp < 0x1090) return false
                if (cp < 0x109a) return true
                if (cp < 0x109a) return false
                if (cp < 0x109d) return true
                if (cp === 0x109d) return true
                if (cp < 0x135d) return false
                if (cp < 0x1360) return true
                if (cp < 0x1369) return false
                if (cp < 0x1372) return true
                if (cp < 0x1712) return false
                if (cp < 0x1715) return true
                if (cp < 0x1732) return false
                if (cp < 0x1735) return true
                if (cp < 0x1752) return false
                if (cp < 0x1754) return true
                return false
            }
            if (cp < 0x1774) return true
            if (cp < 0x17b4) return false
            if (cp < 0x17b6) return true
            if (cp === 0x17b6) return true
            if (cp < 0x17b7) return false
            if (cp < 0x17be) return true
            if (cp < 0x17be) return false
            if (cp < 0x17c6) return true
            if (cp === 0x17c6) return true
            if (cp < 0x17c7) return false
            if (cp < 0x17c9) return true
            if (cp < 0x17c9) return false
            if (cp < 0x17d4) return true
            if (cp === 0x17dd) return true
            return false
        }
        if (cp < 0x1b04) {
            if (cp < 0x1a1b) {
                if (cp < 0x1930) {
                    if (cp < 0x17e0) return false
                    if (cp < 0x17ea) return true
                    if (cp < 0x180b) return false
                    if (cp < 0x180e) return true
                    if (cp < 0x1810) return false
                    if (cp < 0x181a) return true
                    if (cp === 0x18a9) return true
                    if (cp < 0x1920) return false
                    if (cp < 0x1923) return true
                    if (cp < 0x1923) return false
                    if (cp < 0x1927) return true
                    if (cp < 0x1927) return false
                    if (cp < 0x1929) return true
                    if (cp < 0x1929) return false
                    if (cp < 0x192c) return true
                    return false
                }
                if (cp < 0x1932) return true
                if (cp === 0x1932) return true
                if (cp < 0x1933) return false
                if (cp < 0x1939) return true
                if (cp < 0x1939) return false
                if (cp < 0x193c) return true
                if (cp < 0x1946) return false
                if (cp < 0x1950) return true
                if (cp < 0x19d0) return false
                if (cp < 0x19da) return true
                if (cp === 0x19da) return true
                if (cp < 0x1a17) return false
                if (cp < 0x1a19) return true
                if (cp < 0x1a19) return false
                if (cp < 0x1a1b) return true
                return false
            }
            if (cp < 0x1a63) {
                if (cp === 0x1a1b) return true
                if (cp === 0x1a55) return true
                if (cp === 0x1a56) return true
                if (cp === 0x1a57) return true
                if (cp < 0x1a58) return false
                if (cp < 0x1a5f) return true
                if (cp === 0x1a60) return true
                if (cp === 0x1a61) return true
                if (cp === 0x1a62) return true
                return false
            }
            if (cp < 0x1a65) return true
            if (cp < 0x1a65) return false
            if (cp < 0x1a6d) return true
            if (cp < 0x1a6d) return false
            if (cp < 0x1a73) return true
            if (cp < 0x1a73) return false
            if (cp < 0x1a7d) return true
            if (cp === 0x1a7f) return true
            if (cp < 0x1a80) return false
            if (cp < 0x1a8a) return true
            if (cp < 0x1a90) return false
            if (cp < 0x1a9a) return true
            if (cp < 0x1ab0) return false
            if (cp < 0x1abe) return true
            if (cp < 0x1b00) return false
            if (cp < 0x1b04) return true
            return false
        }
        if (cp < 0x1baa) {
            if (cp < 0x1b43) {
                if (cp === 0x1b04) return true
                if (cp === 0x1b34) return true
                if (cp === 0x1b35) return true
                if (cp < 0x1b36) return false
                if (cp < 0x1b3b) return true
                if (cp === 0x1b3b) return true
                if (cp === 0x1b3c) return true
                if (cp < 0x1b3d) return false
                if (cp < 0x1b42) return true
                if (cp === 0x1b42) return true
                return false
            }
            if (cp < 0x1b45) return true
            if (cp < 0x1b50) return false
            if (cp < 0x1b5a) return true
            if (cp < 0x1b6b) return false
            if (cp < 0x1b74) return true
            if (cp < 0x1b80) return false
            if (cp < 0x1b82) return true
            if (cp === 0x1b82) return true
            if (cp === 0x1ba1) return true
            if (cp < 0x1ba2) return false
            if (cp < 0x1ba6) return true
            if (cp < 0x1ba6) return false
            if (cp < 0x1ba8) return true
            if (cp < 0x1ba8) return false
            if (cp < 0x1baa) return true
            return false
        }
        if (cp < 0x1bee) {
            if (cp === 0x1baa) return true
            if (cp < 0x1bab) return false
            if (cp < 0x1bae) return true
            if (cp < 0x1bb0) return false
            if (cp < 0x1bba) return true
            if (cp === 0x1be6) return true
            if (cp === 0x1be7) return true
            if (cp < 0x1be8) return false
            if (cp < 0x1bea) return true
            if (cp < 0x1bea) return false
            if (cp < 0x1bed) return true
            if (cp === 0x1bed) return true
            return false
        }
        if (cp === 0x1bee) return true
        if (cp < 0x1bef) return false
        if (cp < 0x1bf2) return true
        if (cp < 0x1bf2) return false
        if (cp < 0x1bf4) return true
        if (cp < 0x1c24) return false
        if (cp < 0x1c2c) return true
        if (cp < 0x1c2c) return false
        if (cp < 0x1c34) return true
        if (cp < 0x1c34) return false
        if (cp < 0x1c36) return true
        if (cp < 0x1c36) return false
        if (cp < 0x1c38) return true
        if (cp < 0x1c40) return false
        if (cp < 0x1c4a) return true
        if (cp < 0x1c50) return false
        if (cp < 0x1c5a) return true
        return false
    }
    if (cp < 0x1123e) {
        if (cp < 0xaab7) {
            if (cp < 0xa8b4) {
                if (cp < 0x2d7f) {
                    if (cp < 0x1cf8) {
                        if (cp < 0x1cd0) return false
                        if (cp < 0x1cd3) return true
                        if (cp < 0x1cd4) return false
                        if (cp < 0x1ce1) return true
                        if (cp === 0x1ce1) return true
                        if (cp < 0x1ce2) return false
                        if (cp < 0x1ce9) return true
                        if (cp === 0x1ced) return true
                        if (cp < 0x1cf2) return false
                        if (cp < 0x1cf4) return true
                        if (cp === 0x1cf4) return true
                        if (cp === 0x1cf7) return true
                        return false
                    }
                    if (cp < 0x1cfa) return true
                    if (cp < 0x1dc0) return false
                    if (cp < 0x1dfa) return true
                    if (cp < 0x1dfb) return false
                    if (cp < 0x1e00) return true
                    if (cp < 0x203f) return false
                    if (cp < 0x2041) return true
                    if (cp === 0x2054) return true
                    if (cp < 0x20d0) return false
                    if (cp < 0x20dd) return true
                    if (cp === 0x20e1) return true
                    if (cp < 0x20e5) return false
                    if (cp < 0x20f1) return true
                    if (cp < 0x2cef) return false
                    if (cp < 0x2cf2) return true
                    return false
                }
                if (cp < 0xa69e) {
                    if (cp === 0x2d7f) return true
                    if (cp < 0x2de0) return false
                    if (cp < 0x2e00) return true
                    if (cp < 0x302a) return false
                    if (cp < 0x302e) return true
                    if (cp < 0x302e) return false
                    if (cp < 0x3030) return true
                    if (cp < 0x3099) return false
                    if (cp < 0x309b) return true
                    if (cp < 0xa620) return false
                    if (cp < 0xa62a) return true
                    if (cp === 0xa66f) return true
                    if (cp < 0xa674) return false
                    if (cp < 0xa67e) return true
                    return false
                }
                if (cp < 0xa6a0) return true
                if (cp < 0xa6f0) return false
                if (cp < 0xa6f2) return true
                if (cp === 0xa802) return true
                if (cp === 0xa806) return true
                if (cp === 0xa80b) return true
                if (cp < 0xa823) return false
                if (cp < 0xa825) return true
                if (cp < 0xa825) return false
                if (cp < 0xa827) return true
                if (cp === 0xa827) return true
                if (cp < 0xa880) return false
                if (cp < 0xa882) return true
                return false
            }
            if (cp < 0xa9d0) {
                if (cp < 0xa952) {
                    if (cp < 0xa8b4) return false
                    if (cp < 0xa8c4) return true
                    if (cp < 0xa8c4) return false
                    if (cp < 0xa8c6) return true
                    if (cp < 0xa8d0) return false
                    if (cp < 0xa8da) return true
                    if (cp < 0xa8e0) return false
                    if (cp < 0xa8f2) return true
                    if (cp === 0xa8ff) return true
                    if (cp < 0xa900) return false
                    if (cp < 0xa90a) return true
                    if (cp < 0xa926) return false
                    if (cp < 0xa92e) return true
                    if (cp < 0xa947) return false
                    if (cp < 0xa952) return true
                    return false
                }
                if (cp < 0xa954) return true
                if (cp < 0xa980) return false
                if (cp < 0xa983) return true
                if (cp === 0xa983) return true
                if (cp === 0xa9b3) return true
                if (cp < 0xa9b4) return false
                if (cp < 0xa9b6) return true
                if (cp < 0xa9b6) return false
                if (cp < 0xa9ba) return true
                if (cp < 0xa9ba) return false
                if (cp < 0xa9bc) return true
                if (cp === 0xa9bc) return true
                if (cp < 0xa9bd) return false
                if (cp < 0xa9c1) return true
                return false
            }
            if (cp < 0xaa43) {
                if (cp < 0xa9d0) return false
                if (cp < 0xa9da) return true
                if (cp === 0xa9e5) return true
                if (cp < 0xa9f0) return false
                if (cp < 0xa9fa) return true
                if (cp < 0xaa29) return false
                if (cp < 0xaa2f) return true
                if (cp < 0xaa2f) return false
                if (cp < 0xaa31) return true
                if (cp < 0xaa31) return false
                if (cp < 0xaa33) return true
                if (cp < 0xaa33) return false
                if (cp < 0xaa35) return true
                if (cp < 0xaa35) return false
                if (cp < 0xaa37) return true
                return false
            }
            if (cp === 0xaa43) return true
            if (cp === 0xaa4c) return true
            if (cp === 0xaa4d) return true
            if (cp < 0xaa50) return false
            if (cp < 0xaa5a) return true
            if (cp === 0xaa7b) return true
            if (cp === 0xaa7c) return true
            if (cp === 0xaa7d) return true
            if (cp === 0xaab0) return true
            if (cp < 0xaab2) return false
            if (cp < 0xaab5) return true
            return false
        }
        if (cp < 0x10d30) {
            if (cp < 0xfe00) {
                if (cp < 0xabe3) {
                    if (cp < 0xaab7) return false
                    if (cp < 0xaab9) return true
                    if (cp < 0xaabe) return false
                    if (cp < 0xaac0) return true
                    if (cp === 0xaac1) return true
                    if (cp === 0xaaeb) return true
                    if (cp < 0xaaec) return false
                    if (cp < 0xaaee) return true
                    if (cp < 0xaaee) return false
                    if (cp < 0xaaf0) return true
                    if (cp === 0xaaf5) return true
                    if (cp === 0xaaf6) return true
                    return false
                }
                if (cp < 0xabe5) return true
                if (cp === 0xabe5) return true
                if (cp < 0xabe6) return false
                if (cp < 0xabe8) return true
                if (cp === 0xabe8) return true
                if (cp < 0xabe9) return false
                if (cp < 0xabeb) return true
                if (cp === 0xabec) return true
                if (cp === 0xabed) return true
                if (cp < 0xabf0) return false
                if (cp < 0xabfa) return true
                if (cp === 0xfb1e) return true
                return false
            }
            if (cp < 0x10376) {
                if (cp < 0xfe00) return false
                if (cp < 0xfe10) return true
                if (cp < 0xfe20) return false
                if (cp < 0xfe30) return true
                if (cp < 0xfe33) return false
                if (cp < 0xfe35) return true
                if (cp < 0xfe4d) return false
                if (cp < 0xfe50) return true
                if (cp < 0xff10) return false
                if (cp < 0xff1a) return true
                if (cp === 0xff3f) return true
                if (cp === 0x101fd) return true
                if (cp === 0x102e0) return true
                return false
            }
            if (cp < 0x1037b) return true
            if (cp < 0x104a0) return false
            if (cp < 0x104aa) return true
            if (cp < 0x10a01) return false
            if (cp < 0x10a04) return true
            if (cp < 0x10a05) return false
            if (cp < 0x10a07) return true
            if (cp < 0x10a0c) return false
            if (cp < 0x10a10) return true
            if (cp < 0x10a38) return false
            if (cp < 0x10a3b) return true
            if (cp === 0x10a3f) return true
            if (cp < 0x10ae5) return false
            if (cp < 0x10ae7) return true
            if (cp < 0x10d24) return false
            if (cp < 0x10d28) return true
            return false
        }
        if (cp < 0x1112d) {
            if (cp < 0x11082) {
                if (cp < 0x10d30) return false
                if (cp < 0x10d3a) return true
                if (cp < 0x10f46) return false
                if (cp < 0x10f51) return true
                if (cp === 0x11000) return true
                if (cp === 0x11001) return true
                if (cp === 0x11002) return true
                if (cp < 0x11038) return false
                if (cp < 0x11047) return true
                if (cp < 0x11066) return false
                if (cp < 0x11070) return true
                if (cp < 0x1107f) return false
                if (cp < 0x11082) return true
                return false
            }
            if (cp === 0x11082) return true
            if (cp < 0x110b0) return false
            if (cp < 0x110b3) return true
            if (cp < 0x110b3) return false
            if (cp < 0x110b7) return true
            if (cp < 0x110b7) return false
            if (cp < 0x110b9) return true
            if (cp < 0x110b9) return false
            if (cp < 0x110bb) return true
            if (cp < 0x110f0) return false
            if (cp < 0x110fa) return true
            if (cp < 0x11100) return false
            if (cp < 0x11103) return true
            if (cp < 0x11127) return false
            if (cp < 0x1112c) return true
            if (cp === 0x1112c) return true
            return false
        }
        if (cp < 0x111bf) {
            if (cp < 0x1112d) return false
            if (cp < 0x11135) return true
            if (cp < 0x11136) return false
            if (cp < 0x11140) return true
            if (cp < 0x11145) return false
            if (cp < 0x11147) return true
            if (cp === 0x11173) return true
            if (cp < 0x11180) return false
            if (cp < 0x11182) return true
            if (cp === 0x11182) return true
            if (cp < 0x111b3) return false
            if (cp < 0x111b6) return true
            if (cp < 0x111b6) return false
            if (cp < 0x111bf) return true
            return false
        }
        if (cp < 0x111c1) return true
        if (cp < 0x111c9) return false
        if (cp < 0x111cd) return true
        if (cp < 0x111d0) return false
        if (cp < 0x111da) return true
        if (cp < 0x1122c) return false
        if (cp < 0x1122f) return true
        if (cp < 0x1122f) return false
        if (cp < 0x11232) return true
        if (cp < 0x11232) return false
        if (cp < 0x11234) return true
        if (cp === 0x11234) return true
        if (cp === 0x11235) return true
        if (cp < 0x11236) return false
        if (cp < 0x11238) return true
        return false
    }
    if (cp < 0x11a33) {
        if (cp < 0x115af) {
            if (cp < 0x11435) {
                if (cp < 0x1133e) {
                    if (cp === 0x1123e) return true
                    if (cp === 0x112df) return true
                    if (cp < 0x112e0) return false
                    if (cp < 0x112e3) return true
                    if (cp < 0x112e3) return false
                    if (cp < 0x112eb) return true
                    if (cp < 0x112f0) return false
                    if (cp < 0x112fa) return true
                    if (cp < 0x11300) return false
                    if (cp < 0x11302) return true
                    if (cp < 0x11302) return false
                    if (cp < 0x11304) return true
                    if (cp < 0x1133b) return false
                    if (cp < 0x1133d) return true
                    return false
                }
                if (cp < 0x11340) return true
                if (cp === 0x11340) return true
                if (cp < 0x11341) return false
                if (cp < 0x11345) return true
                if (cp < 0x11347) return false
                if (cp < 0x11349) return true
                if (cp < 0x1134b) return false
                if (cp < 0x1134e) return true
                if (cp === 0x11357) return true
                if (cp < 0x11362) return false
                if (cp < 0x11364) return true
                if (cp < 0x11366) return false
                if (cp < 0x1136d) return true
                if (cp < 0x11370) return false
                if (cp < 0x11375) return true
                return false
            }
            if (cp < 0x114b0) {
                if (cp < 0x11435) return false
                if (cp < 0x11438) return true
                if (cp < 0x11438) return false
                if (cp < 0x11440) return true
                if (cp < 0x11440) return false
                if (cp < 0x11442) return true
                if (cp < 0x11442) return false
                if (cp < 0x11445) return true
                if (cp === 0x11445) return true
                if (cp === 0x11446) return true
                if (cp < 0x11450) return false
                if (cp < 0x1145a) return true
                if (cp === 0x1145e) return true
                return false
            }
            if (cp < 0x114b3) return true
            if (cp < 0x114b3) return false
            if (cp < 0x114b9) return true
            if (cp === 0x114b9) return true
            if (cp === 0x114ba) return true
            if (cp < 0x114bb) return false
            if (cp < 0x114bf) return true
            if (cp < 0x114bf) return false
            if (cp < 0x114c1) return true
            if (cp === 0x114c1) return true
            if (cp < 0x114c2) return false
            if (cp < 0x114c4) return true
            if (cp < 0x114d0) return false
            if (cp < 0x114da) return true
            return false
        }
        if (cp < 0x116ae) {
            if (cp < 0x11633) {
                if (cp < 0x115af) return false
                if (cp < 0x115b2) return true
                if (cp < 0x115b2) return false
                if (cp < 0x115b6) return true
                if (cp < 0x115b8) return false
                if (cp < 0x115bc) return true
                if (cp < 0x115bc) return false
                if (cp < 0x115be) return true
                if (cp === 0x115be) return true
                if (cp < 0x115bf) return false
                if (cp < 0x115c1) return true
                if (cp < 0x115dc) return false
                if (cp < 0x115de) return true
                if (cp < 0x11630) return false
                if (cp < 0x11633) return true
                return false
            }
            if (cp < 0x1163b) return true
            if (cp < 0x1163b) return false
            if (cp < 0x1163d) return true
            if (cp === 0x1163d) return true
            if (cp === 0x1163e) return true
            if (cp < 0x1163f) return false
            if (cp < 0x11641) return true
            if (cp < 0x11650) return false
            if (cp < 0x1165a) return true
            if (cp === 0x116ab) return true
            if (cp === 0x116ac) return true
            if (cp === 0x116ad) return true
            return false
        }
        if (cp < 0x11726) {
            if (cp < 0x116ae) return false
            if (cp < 0x116b0) return true
            if (cp < 0x116b0) return false
            if (cp < 0x116b6) return true
            if (cp === 0x116b6) return true
            if (cp === 0x116b7) return true
            if (cp < 0x116c0) return false
            if (cp < 0x116ca) return true
            if (cp < 0x1171d) return false
            if (cp < 0x11720) return true
            if (cp < 0x11720) return false
            if (cp < 0x11722) return true
            if (cp < 0x11722) return false
            if (cp < 0x11726) return true
            return false
        }
        if (cp === 0x11726) return true
        if (cp < 0x11727) return false
        if (cp < 0x1172c) return true
        if (cp < 0x11730) return false
        if (cp < 0x1173a) return true
        if (cp < 0x1182c) return false
        if (cp < 0x1182f) return true
        if (cp < 0x1182f) return false
        if (cp < 0x11838) return true
        if (cp === 0x11838) return true
        if (cp < 0x11839) return false
        if (cp < 0x1183b) return true
        if (cp < 0x118e0) return false
        if (cp < 0x118ea) return true
        if (cp < 0x11a01) return false
        if (cp < 0x11a0b) return true
        return false
    }
    if (cp < 0x11d97) {
        if (cp < 0x11ca9) {
            if (cp < 0x11a97) {
                if (cp < 0x11a33) return false
                if (cp < 0x11a39) return true
                if (cp === 0x11a39) return true
                if (cp < 0x11a3b) return false
                if (cp < 0x11a3f) return true
                if (cp === 0x11a47) return true
                if (cp < 0x11a51) return false
                if (cp < 0x11a57) return true
                if (cp < 0x11a57) return false
                if (cp < 0x11a59) return true
                if (cp < 0x11a59) return false
                if (cp < 0x11a5c) return true
                if (cp < 0x11a8a) return false
                if (cp < 0x11a97) return true
                return false
            }
            if (cp === 0x11a97) return true
            if (cp < 0x11a98) return false
            if (cp < 0x11a9a) return true
            if (cp === 0x11c2f) return true
            if (cp < 0x11c30) return false
            if (cp < 0x11c37) return true
            if (cp < 0x11c38) return false
            if (cp < 0x11c3e) return true
            if (cp === 0x11c3e) return true
            if (cp === 0x11c3f) return true
            if (cp < 0x11c50) return false
            if (cp < 0x11c5a) return true
            if (cp < 0x11c92) return false
            if (cp < 0x11ca8) return true
            return false
        }
        if (cp < 0x11d3c) {
            if (cp === 0x11ca9) return true
            if (cp < 0x11caa) return false
            if (cp < 0x11cb1) return true
            if (cp === 0x11cb1) return true
            if (cp < 0x11cb2) return false
            if (cp < 0x11cb4) return true
            if (cp === 0x11cb4) return true
            if (cp < 0x11cb5) return false
            if (cp < 0x11cb7) return true
            if (cp < 0x11d31) return false
            if (cp < 0x11d37) return true
            if (cp === 0x11d3a) return true
            return false
        }
        if (cp < 0x11d3e) return true
        if (cp < 0x11d3f) return false
        if (cp < 0x11d46) return true
        if (cp === 0x11d47) return true
        if (cp < 0x11d50) return false
        if (cp < 0x11d5a) return true
        if (cp < 0x11d8a) return false
        if (cp < 0x11d8f) return true
        if (cp < 0x11d90) return false
        if (cp < 0x11d92) return true
        if (cp < 0x11d93) return false
        if (cp < 0x11d95) return true
        if (cp === 0x11d95) return true
        if (cp === 0x11d96) return true
        return false
    }
    if (cp < 0x1d242) {
        if (cp < 0x16f51) {
            if (cp === 0x11d97) return true
            if (cp < 0x11da0) return false
            if (cp < 0x11daa) return true
            if (cp < 0x11ef3) return false
            if (cp < 0x11ef5) return true
            if (cp < 0x11ef5) return false
            if (cp < 0x11ef7) return true
            if (cp < 0x16a60) return false
            if (cp < 0x16a6a) return true
            if (cp < 0x16af0) return false
            if (cp < 0x16af5) return true
            if (cp < 0x16b30) return false
            if (cp < 0x16b37) return true
            if (cp < 0x16b50) return false
            if (cp < 0x16b5a) return true
            return false
        }
        if (cp < 0x16f7f) return true
        if (cp < 0x16f8f) return false
        if (cp < 0x16f93) return true
        if (cp < 0x1bc9d) return false
        if (cp < 0x1bc9f) return true
        if (cp < 0x1d165) return false
        if (cp < 0x1d167) return true
        if (cp < 0x1d167) return false
        if (cp < 0x1d16a) return true
        if (cp < 0x1d16d) return false
        if (cp < 0x1d173) return true
        if (cp < 0x1d17b) return false
        if (cp < 0x1d183) return true
        if (cp < 0x1d185) return false
        if (cp < 0x1d18c) return true
        if (cp < 0x1d1aa) return false
        if (cp < 0x1d1ae) return true
        return false
    }
    if (cp < 0x1e000) {
        if (cp < 0x1d242) return false
        if (cp < 0x1d245) return true
        if (cp < 0x1d7ce) return false
        if (cp < 0x1d800) return true
        if (cp < 0x1da00) return false
        if (cp < 0x1da37) return true
        if (cp < 0x1da3b) return false
        if (cp < 0x1da6d) return true
        if (cp === 0x1da75) return true
        if (cp === 0x1da84) return true
        if (cp < 0x1da9b) return false
        if (cp < 0x1daa0) return true
        if (cp < 0x1daa1) return false
        if (cp < 0x1dab0) return true
        return false
    }
    if (cp < 0x1e007) return true
    if (cp < 0x1e008) return false
    if (cp < 0x1e019) return true
    if (cp < 0x1e01b) return false
    if (cp < 0x1e022) return true
    if (cp < 0x1e023) return false
    if (cp < 0x1e025) return true
    if (cp < 0x1e026) return false
    if (cp < 0x1e02b) return true
    if (cp < 0x1e8d0) return false
    if (cp < 0x1e8d7) return true
    if (cp < 0x1e944) return false
    if (cp < 0x1e94b) return true
    if (cp < 0x1e950) return false
    if (cp < 0x1e95a) return true
    if (cp < 0xe0100) return false
    if (cp < 0xe01f0) return true
    return false
}
