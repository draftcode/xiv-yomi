import { toHiragana } from 'wanakana'

const stripHalfWrittenKana = (s: string): string => {
    if (s.endsWith('sh') || s.endsWith('ch')) {
        return s.substring(0, s.length - 2)
    }
    const lastChar = s[s.length - 1]
    if (lastChar == 'k' || lastChar == 's' || lastChar == 't' ||
        lastChar == 'h' || lastChar == 'm' || lastChar == 'n' ||
        lastChar == 'r' || lastChar == 'y' || lastChar == 'w' ||
        lastChar == 'g' || lastChar == 'z' || lastChar == 'd' ||
        lastChar == 'b' || lastChar == 'p' || lastChar == 'v') {
        return s.substring(0, s.length - 1)
    }
    return s
}

const containsAll = (args: string[], terms: [string, string][]): boolean => {
    for (let [orig, converted] of terms) {
        const included = args.some(arg => {
            arg = arg.toLowerCase()
            return arg.includes(orig) || arg.includes(converted)
        })
        if (!included) {
            return false
        }
    }
    return true
}

export const createFuzzyMatcher = (searchValue: string): (args: string[]) => boolean => {
    const terms: [string, string][] = searchValue
        .toLowerCase()
        .split(' ')
        .map(term => [
            term,
            stripHalfWrittenKana(toHiragana(term, { convertLongVowelMark: false })),
        ])
    return (args: string[]) => containsAll(args, terms)
}
