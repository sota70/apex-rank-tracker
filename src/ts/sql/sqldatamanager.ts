import { Client } from 'pg'
import { SqlColumnType } from './sqlcolumntype'
import { SqlCommandConverter } from './sqlcommandconverter'

export class SqlDataManager {

    private tableName: string
    private client: Client

    constructor(tableName: string) {
        this.tableName = tableName
        this.client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        })
    }

    public createTable(columns: Map<string, SqlColumnType>) {
        let columnsCommand = SqlCommandConverter.convertColumnIntoCommand(columns)
        let command = `CREATE TABLE ${this.tableName} (${columnsCommand});`
        this.client.connect()
        this.client.query(command, (err, res) => {
            if (err) throw err
            console.log(res)
            this.client.end()
        })
    }

    public insert(data: Map<string, any>) {
        let dataCommand = new SqlCommandConverter(data).convertIntoInsertCommand()
        let command = `INSERT INTO ${this.tableName} ${dataCommand};`
        this.client.connect()
        this.client.query(command, (err, res) => {
            if (err) throw err
            console.log(res)
            this.client.end()
        })
    }

    public update(data: Map<string, any>, conditions: Map<string, any>) {
        let dataCommand = new SqlCommandConverter(data).convertIntoUpdateCommand()
        let conditionsCommand = SqlCommandConverter.convertConditionIntoCommand(conditions)
        let command = `UPDATE ${this.tableName} SET ${dataCommand} ${conditionsCommand};`
        this.client.connect()
        this.client.query(command, (err, res) => {
            if (err) throw err
            console.log(res)
            this.client.end()
        })
    }

    public dropTable() {
        let command = `DROP TABLE ${this.tableName};`
        this.client.connect()
        this.client.query(command, (err, res) => {
            if (err) throw err
            console.log(res)
            this.client.end()
        })
    }

    public deleteRows() {
        let command = `DELETE FROM ${this.tableName}`
        this.client.connect()
        this.client.query(command, (err, res) => {
            if (err) throw err
            console.log(res)
            this.client.end()
        })
    }

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

function delay(sec: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, sec * 1350)
    })
}