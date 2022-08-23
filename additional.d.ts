declare module "wanakana" {
    export interface WanakanaOptions {
        convertLongVowelMark?: boolean | undefined
        IMEMode?: boolean | undefined
    }

    export function toHiragana(input: string, options?: WanakanaOptions): string;
}
