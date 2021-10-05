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
    client.query("INSERT INTO command_channel (serverId, channelId) VALUES ('Emotional_Sota', 'pc');", (err, res) => {
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
    client.query("SELECT serverId, channelId FROM command_channel;", (err, res) => {
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
        ssl: {
            rejectUnauthorized: false
        }
    })
    client.connect()
    client.query("CREATE TABLE command_channel (serverId char(100), channelId char(100));", (err, res) => {
        if (err) throw err
        console.log(res)
        client.end()
    })
}