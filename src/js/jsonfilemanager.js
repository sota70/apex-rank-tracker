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
exports.JsonFileManager = void 0;
var pg_1 = require("pg");
var userdata_1 = require("./userdata");
var JsonFileManager = /** @class */ (function () {
    function JsonFileManager() {
    }
    JsonFileManager.prototype.getPlayerData = function (discordUserId) {
        return __awaiter(this, void 0, void 0, function () {
            var playerData, playerDatas, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        playerData = new userdata_1.User("NULL", "NULL", "NULL");
                        return [4 /*yield*/, this.getPlayerDatas()];
                    case 1:
                        playerDatas = _a.sent();
                        for (i = 0; i < playerDatas.length; i++) {
                            if (playerDatas[i].discordUserId !== discordUserId)
                                continue;
                            playerData = playerDatas[i];
                        }
                        return [2 /*return*/, playerData];
                }
            });
        });
    };
    JsonFileManager.prototype.getPlayerDatas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        users = [];
                        client = new pg_1.Client({
                            connectionString: process.env.DATABASE_URL,
                            ssl: {
                                rejectUnauthorized: false
                            }
                        });
                        client.connect();
                        client.query("SELECT discordUserId, username, platform FROM username;", function (err, res) {
                            if (err)
                                throw err;
                            res.rows.forEach(function (row) {
                                var discordUserId = JSON.parse(JSON.stringify(row.discorduserid));
                                var username = JSON.parse(JSON.stringify(row.username));
                                var platform = JSON.parse(JSON.stringify(row.platform));
                                users.push(new userdata_1.User(discordUserId, username, platform));
                            });
                            client.end();
                        });
                        return [4 /*yield*/, this.delay(1)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    JsonFileManager.prototype.removeAllData = function () {
        var client = new pg_1.Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
        client.connect();
        client.query("DROP TABLE username;", function (err, res) {
            if (err)
                throw err;
            client.end();
        });
    };
    // public isDataExists(discordUserId: String): Boolean {
    //     let playerData = this.getPlayerDatas()
    //     let dataExists = false
    //     for (let i = 0; i < playerData.length; i++) {
    //         if (playerData[i].discordUserId !== discordUserId) continue
    //         dataExists = true
    //     }
    //     return dataExists
    // }
    JsonFileManager.prototype.writeData = function (discordUser, username, platform) {
        var client = new pg_1.Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
        client.connect();
        client.query("UPDATE username SET discordUserId = " + discordUser.id + ", username = " + username + ", platform = " + platform + ";", function (err, res) {
            if (err)
                throw err;
            client.end();
        });
    };
    JsonFileManager.prototype.delay = function (sec) {
        return new Promise(function (resolve) {
            setTimeout(resolve, sec * 1350);
        });
    };
    return JsonFileManager;
}());
exports.JsonFileManager = JsonFileManager;
