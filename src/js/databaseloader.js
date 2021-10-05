"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTable = exports.load = exports.insert = void 0;
var pg_1 = require("pg");
function insert() {
    var client = new pg_1.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query("INSERT INTO command_channel (serverId, channelId) VALUES ('Emotional_Sota', 'pc');", function (err, res) {
        if (err)
            throw err;
        console.log(res);
        client.end();
    });
}
exports.insert = insert;
function load() {
    var client = new pg_1.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query("SELECT serverId, channelId FROM command_channel;", function (err, res) {
        if (err)
            throw err;
        res.rows.forEach(function (row) {
            var r = JSON.parse(JSON.stringify(row));
            console.log(r);
        });
        client.end();
    });
}
exports.load = load;
function createTable() {
    var client = new pg_1.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query("CREATE TABLE command_channel (serverId char(100), channelId char(100));", function (err, res) {
        if (err)
            throw err;
        console.log(res);
        client.end();
    });
}
exports.createTable = createTable;
