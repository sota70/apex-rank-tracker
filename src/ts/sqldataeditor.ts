import { Client } from 'pg'

export enum RowTypes {
    STRING = 'text',
    INTEGER = 'integer'
}

export function createTable(tableName: string, rows: Map<string, RowTypes>) {
    let client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    })
    client.connect()
    client.query(`CREATE TABLE ${tableName} (${buildCreateRows(rows)});`, (err, res) => {
        if (err) throw err
        console.log(res)
        client.end()
    })
}

export function insert(tableName: string, rows: Map<string, any>) {
    let client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    })
    client.connect()
    client.query(`INSERT INTO ${tableName} ${buildInsertRows(rows)};`, (err, res) => {
        if (err) throw err
        console.log(res)
        client.end()
    })
}

export function update(tableName: string, rows: Map<string, any>) {
    let client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    })
    client.connect()
    client.query(`UPDATE ${tableName} SET ${buildUpdateRows(rows)};`, (err, res) => {
        if (err) throw err
        console.log(res)
        client.end()
    })
}

export function dropTable(tableName: string) {
    let client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    })
    client.connect()
    client.query(`DROP TABLE ${tableName};`, (err, res) => {
        if (err) throw err
        console.log(res)
        client.end()
    })
}

export async function select(tableName: string): Promise<Array<any>> {
    let data: Array<any> = []
    let client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    })
    client.connect()
    client.query(`SELECT * FROM ${tableName};`, (err, res) => {
        if (err) throw err
        data = res.rows
        client.end()
    })
    await delay(1)
    return data
}

function buildUpdateRows(rows: Map<string, any>): string {
    let rowsString = ''
    rows.forEach(function (value, key) {
        rowsString += `${key} = '${value}',`
    })
    return rowsString.slice(0, -1)
}

function buildCreateRows(rows: Map<string, RowTypes>): string {
    let rowsString = ''
    rows.forEach(function (value, key) {
        rowsString += `${key.toString()} ${value},`
    })
    return rowsString.slice(0, -1)
}

export function buildInsertRows(rows: Map<string, any>): string {
    let columnsString = ''
    let inputString = ''
    rows.forEach(function (value, key) {
        columnsString += `${key},`
        inputString += `'${value}',`
    })
    let adjustedColumnString = columnsString.slice(0, -1)
    let adjustedInputString = inputString.slice(0, -1)
    return `(${adjustedColumnString}) VALUES (${adjustedInputString})`
}

function delay(sec: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, sec * 1350)
    })
}