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

const containsAll = (arg: string, terms: [string, string][]): boolean => {
    arg = arg.toLowerCase()
    for (let [orig, converted] of terms) {
        if (!arg.includes(orig) && !arg.includes(converted)) {
            return false
        }
    }
    return true
}

export const createFuzzyMatcher = (searchValue: string): (arg: string) => boolean => {
    const terms: [string, string][] = searchValue
        .toLowerCase()
        .split(' ')
        .map(term => [
            term,
            stripHalfWrittenKana(toHiragana(term, { convertLongVowelMark: false })),
        ])
    return (arg: string) => containsAll(arg, terms)
}
