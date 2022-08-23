import rawData from './readings.json'

export interface Item {
    id: string
    name: string
    yomi: Array<string>
}

interface Items {
    items: Array<Item>
}

export const items = (rawData as Items).items
