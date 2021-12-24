import { Client } from 'pg'
import { SqlColumnType } from './sqlcolumntype'
import { SqlCommandBuilder } from './sqlcommandbuilder'

/**
 * データベースを管理するクラス
 * データを入力したり、読み込んだりする
 * 
 * @property {@link tableName} データベースにあるテーブルの名前
 * @property {@link client} データベースにアクセスする用のクライアント
 */
export class SqlDataManager {

    private tableName: string
    private client: Client

    /**
     * 編集するテーブル名をセットし、{@link Client}を初期化する
     * 
     * @param tableName 編集したいテーブル名
     */
    constructor(tableName: string) {
        this.tableName = tableName
        this.client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        })
    }

    /**
     * データベースに新たにテーブルを作るメソッド
     * テーブル名は{@link tableName}を使う
     * 
     * @param columns テーブルのコロン
     */
    public createTable(columns: Map<string, SqlColumnType>) {
        let columnsCommand = SqlCommandBuilder.buildColumnsCommand(columns)
        let command = `CREATE TABLE ${this.tableName} (${columnsCommand});`
        this.client.connect()
        this.client.query(command, (err, res) => {
            if (err) throw err
            console.log(res)
            this.client.end()
        })
    }

    /**
     * テーブルにデータを書き込むメソッド
     * 
     * @param data 書き込むデータ
     */
    public insert(data: Map<string, any>) {
        let dataCommand = new SqlCommandBuilder(data).buildInsertCommand()
        let command = `INSERT INTO ${this.tableName} ${dataCommand};`
        this.client.connect()
        this.client.query(command, (err, res) => {
            if (err) throw err
            console.log(res)
            this.client.end()
        })
    }

    /**
     * テーブル内に存在するデータを上書きするメソッド
     * * {@link conditions}で一致したデータを上書きする
     * 
     * @param data 上書きするデータ
     * @param conditions 上書きするデータの対象条件
     */
    public update(data: Map<string, any>, conditions: Map<string, any>) {
        let dataCommand = new SqlCommandBuilder(data).buildUpdateCommand()
        let conditionsCommand = SqlCommandBuilder.buildConditionCommand(conditions)
        let command = `UPDATE ${this.tableName} SET ${dataCommand} ${conditionsCommand};`
        this.client.connect()
        this.client.query(command, (err, res) => {
            if (err) throw err
            console.log(res)
            this.client.end()
        })
    }

    /**
     * テーブルごとデータベースから削除するメソッド
     */
    public dropTable() {
        let command = `DROP TABLE ${this.tableName};`
        this.client.connect()
        this.client.query(command, (err, res) => {
            if (err) throw err
            console.log(res)
            this.client.end()
        })
    }

    /**
     * テーブル内にあるデータを全て削除するメソッド
     */
    public deleteRows() {
        let command = `DELETE FROM ${this.tableName}`
        this.client.connect()
        this.client.query(command, (err, res) => {
            if (err) throw err
            console.log(res)
            this.client.end()
        })
    }

    /**
     * テーブル内にある全てのデータを取得するメソッド
     * データは全て{@link any}として扱い、それを配列に入れて返す
     * 
     * @returns {@link any}型の配列に入れたデータを返す
     */
    public async select(): Promise<Array<any>> {
        let data: Array<any> = []
        let command = `SELECT * FROM ${this.tableName};`
        this.client.connect()
        this.client.query(command, (err, res) => {
            if (err) throw err
            data = res.rows
            this.client.end()
        })
        await delay(1)
        return data
    }
}

/**
 * 約(1.3 * sec)秒間の遅延を与えるメソッド
 * 
 * @param sec 遅延する秒数
 * @notExported
 */
function delay(sec: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, sec * 1350)
    })
}