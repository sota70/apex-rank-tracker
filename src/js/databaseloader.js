"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTable = exports.createTable = exports.load = exports.insert = void 0;
var pg_1 = require("pg");
function insert() {
    var client = new pg_1.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query("INSERT INTO test (key, value) VALUES ('KEY', 'VALUE');", function (err, res) {
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
    client.query("SELECT key, value FROM test;", function (err, res) {
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
        ssl: { rejectUnauthorized: false }
    });
    client.connect();
    client.query("CREATE TABLE username (discordUserId text, username text, platform text);", function (err, res) {
        if (err)
            throw err;
        console.log(res);
        client.end();
    });
}
exports.createTable = createTable;
function deleteTable() {
    var client = new pg_1.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    client.connect();
    client.query("DROP TABLE username", function (err, res) {
        if (err)
            throw err;
        console.log(res);
        client.end();
    });
}
exports.deleteTable = deleteTable;
