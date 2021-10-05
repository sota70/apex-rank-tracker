"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = void 0;
var pg_1 = require("pg");
function load() {
    var client = new pg_1.Client({
        user: 'torktcyfbxppag',
        host: 'ec2-3-209-65-193.compute-1.amazonaws.com',
        database: 'de7r68kvfqj9n',
        password: '72152abc371e1ab711da281cc0c25854ff748517bf795ce4e590ca1710713dcf',
        port: 5432
    });
    var query = {
        text: "INSERT INTO users(username, platform) VALUES($1, $2)",
        values: ["Emotional_Sota", "pc"]
    };
    client.connect();
    client.query(query, function (err, res) {
        console.log(res);
    });
}
exports.load = load;
function login() {
    var client = new pg_1.Client({
        user: 'torktcyfbxppag',
        host: 'ec2-3-209-65-193.compute-1.amazonaws.com',
        database: 'de7r68kvfqj9n',
        password: '72152abc371e1ab711da281cc0c25854ff748517bf795ce4e590ca1710713dcf',
        port: 5432
    });
    client.connect();
}
