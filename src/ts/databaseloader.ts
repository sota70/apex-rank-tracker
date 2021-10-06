import { Client } from 'pg'
import { CommandChannel } from './commandchannel'

export function insert() {
    let client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })
    client.connect()
    client.query(`INSERT INTO test (key, value) VALUES ('KEY', 'VALUE');`, (err, res) => {
        if (err) throw err
        console.log(res)
        client.end()
    })
}

export function load() {
    let client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })
    client.connect()
    client.query("SELECT key, value FROM test;", (err, res) => {
        if (err) throw err
        res.rows.forEach(function (row) {
            let r = JSON.parse(JSON.stringify(row))
            console.log(r)
        })
        client.end()
    })
}

export function createTable() {
    let client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    })
    client.connect()
    client.query("CREATE TABLE username (discordUserId text, username text, platform text);", (err, res) => {
        if (err) throw err
        console.log(res)
        client.end()
    })
}

export function deleteTable() {
    let client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    })
    client.connect()
    client.query("DROP TABLE username", (err, res) => {
        if (err) throw err
        console.log(res)
        client.end()
    })
}