import { SqlColumnType } from "./sqlcolumntype"

export class SqlCommandConverter {

    private data: Map<string, any>

    constructor(data: Map<string, any>) {
        this.data = data
    }

    public convertIntoInsertCommand(): string {
        let columnStrings = ''
        let inputStrings = ''
        this.data.forEach(function (value, key) {
            columnStrings += `${key},`
            inputStrings += `'${value}',`
        })
        let adjustedColumnStrings = columnStrings.slice(0, -1)
        let adjustedInputStrings = inputStrings.slice(0, -1)
        return `(${adjustedColumnStrings}) VALUES (${adjustedInputStrings})`
    }

    public convertIntoUpdateCommand(): string {
        let rowStrings = ''
        this.data.forEach(function (value, key) {
            rowStrings += `${key} = '${value}',`
        })
        return rowStrings.slice(0, -1)
    }

    public static convertConditionIntoCommand(conditions: Map<string, any>): string {
        let keyStrings = 'WHERE '
        conditions.forEach(function (value, key) {
            keyStrings += `${key} = '${value}' AND `
        })
        return keyStrings.slice(0, -5)
    }

    public static convertColumnIntoCommand(columns: Map<string, SqlColumnType>): string {
        let rowStrings = ''
        columns.forEach(function (value, key) {
            rowStrings += `${key} ${value},`
        })
        return rowStrings.slice(0, -1)
    }
}