import { SqlColumnType } from "./sqlcolumntype"

/**
 * データベースコマンドに使うコマンドの一部をビルドするクラス
 * コマンドに必要なデータを受け取り、それを用途に応じてコマンドにビルドする
 * 
 * @property {@link data} コマンドに使うデータ
 */
export class SqlCommandBuilder {

    private data: Map<string, any>

    /**
     * コマンドに使うデータをセットする
     * 
     * @param data コマンドに使うデータ
     */
    constructor(data: Map<string, any>) {
        this.data = data
    }

    /**
     * Insertコマンド用にデータをコマンドへビルドするメソッド
     * 
     * @returns Insertコマンド用にビルドしたコマンドの一部を返す
     */
    public buildInsertCommand(): string {
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

    /**
     * Updateコマンド用にデータをコマンドへビルドするメソッド
     * 
     * @returns Updateコマンド用にビルドしたコマンドの一部を返す
     */
    public buildUpdateCommand(): string {
        let rowStrings = ''
        this.data.forEach(function (value, key) {
            rowStrings += `${key} = '${value}',`
        })
        return rowStrings.slice(0, -1)
    }

    /**
     * Updateコマンド等で使う条件コマンドを{@link conditions}を元にビルドするメソッド
     * 
     * @param conditions 条件データ
     * @returns {@link conditions}を元にビルドした条件の指定用のコマンド
     */
    public static buildConditionCommand(conditions: Map<string, any>): string {
        let keyStrings = 'WHERE '
        conditions.forEach(function (value, key) {
            keyStrings += `${key} = '${value}' AND `
        })
        return keyStrings.slice(0, -5)
    }

    /**
     * テーブル作成時に使うコロンの指定用のコマンドを{@link columns}を元にビルドするメソッド
     * 
     * @param columns テーブルのコロン
     * @returns {@link columns}を元にビルドしたコロンの指定用のコマンド
     */
    public static buildColumnsCommand(columns: Map<string, SqlColumnType>): string {
        let rowStrings = ''
        columns.forEach(function (value, key) {
            rowStrings += `${key} ${value},`
        })
        return rowStrings.slice(0, -1)
    }
}