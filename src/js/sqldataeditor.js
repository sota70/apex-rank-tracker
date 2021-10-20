"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildInsertRows = exports.select = exports.deleteRows = exports.dropTable = exports.update = exports.insert = exports.createTable = exports.RowTypes = void 0;
var pg_1 = require("pg");
var RowTypes;
(function (RowTypes) {
    RowTypes["STRING"] = "text";
    RowTypes["INTEGER"] = "integer";
})(RowTypes = exports.RowTypes || (exports.RowTypes = {}));
function createTable(tableName, rows) {
    var client = new pg_1.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    client.connect();
    client.query("CREATE TABLE " + tableName + " (" + buildCreateRows(rows) + ");", function (err, res) {
        if (err)
            throw err;
        console.log(res);
        client.end();
    });
}
exports.createTable = createTable;
function insert(tableName, rows) {
    var client = new pg_1.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    client.connect();
    client.query("INSERT INTO " + tableName + " " + buildInsertRows(rows) + ";", function (err, res) {
        if (err)
            throw err;
        console.log(res);
        client.end();
    });
}
exports.insert = insert;
function update(tableName, rows, keys) {
    var client = new pg_1.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    console.log("UPDATE " + tableName + " SET " + buildUpdateRows(rows) + " " + buildContext(keys) + ";");
    client.connect();
    client.query("UPDATE " + tableName + " SET " + buildUpdateRows(rows) + " " + buildContext(keys) + ";", function (err, res) {
        if (err)
            throw err;
        console.log(res);
        client.end();
    });
}
exports.update = update;
function dropTable(tableName) {
    var client = new pg_1.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    client.connect();
    client.query("DROP TABLE " + tableName + ";", function (err, res) {
        if (err)
            throw err;
        console.log(res);
        client.end();
    });
}
exports.dropTable = dropTable;
function deleteRows(tableName) {
    var client = new pg_1.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    client.connect();
    client.query("DELETE FROM " + tableName, function (err, res) {
        if (err)
            throw err;
        console.log(res);
        client.end();
    });
}
exports.deleteRows = deleteRows;
function select(tableName) {
    return __awaiter(this, void 0, void 0, function () {
        var data, client;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = [];
                    client = new pg_1.Client({
                        connectionString: process.env.DATABASE_URL,
                        ssl: { rejectUnauthorized: false }
                    });
                    client.connect();
                    client.query("SELECT * FROM " + tableName + ";", function (err, res) {
                        if (err)
                            throw err;
                        data = res.rows;
                        client.end();
                    });
                    return [4 /*yield*/, delay(1)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.select = select;
function buildUpdateRows(rows) {
    var rowsString = '';
    rows.forEach(function (value, key) {
        rowsString += key + " = '" + value + "',";
    });
    return rowsString.slice(0, -1);
}
function buildContext(keys) {
    var keysString = 'WHERE ';
    keys.forEach(function (value, key) {
        keysString += key + " = '" + value + "' AND ";
    });
    return keysString.slice(0, -5);
}
function buildCreateRows(rows) {
    var rowsString = '';
    rows.forEach(function (value, key) {
        rowsString += key.toString() + " " + value + ",";
    });
    return rowsString.slice(0, -1);
}
function buildInsertRows(rows) {
    var columnsString = '';
    var inputString = '';
    rows.forEach(function (value, key) {
        columnsString += key + ",";
        inputString += "'" + value + "',";
    });
    var adjustedColumnString = columnsString.slice(0, -1);
    var adjustedInputString = inputString.slice(0, -1);
    return "(" + adjustedColumnString + ") VALUES (" + adjustedInputString + ")";
}
exports.buildInsertRows = buildInsertRows;
function delay(sec) {
    return new Promise(function (resolve) {
        setTimeout(resolve, sec * 1350);
    });
}
