"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFileManager = void 0;
var Discord = __importStar(require("discord.js"));
var fs = __importStar(require("fs"));
var userdata_1 = require("./userdata");
var JsonFileManager = /** @class */ (function () {
    function JsonFileManager() {
    }
    JsonFileManager.prototype.getPlayerData = function (discordUserId) {
        var playerData = new userdata_1.User("NULL", "NULL", "NULL");
        var playerDatas = this.getPlayerDatas();
        for (var i = 0; i < playerDatas.length; i++) {
            if (playerDatas[i].discordUserId !== discordUserId)
                continue;
            playerData = playerDatas[i];
        }
        return playerData;
    };
    JsonFileManager.prototype.getPlayerDatas = function () {
        var file = fs.readFileSync("./username.json", "utf-8");
        return JSON.parse(file);
    };
    JsonFileManager.prototype.removeAllData = function () {
        var playerData = this.getPlayerDatas();
        playerData.splice(0, playerData.length);
        fs.writeFileSync("./username.json", JSON.stringify(playerData));
    };
    JsonFileManager.prototype.isDataExists = function (discordUserId) {
        var playerData = this.getPlayerDatas();
        var dataExists = false;
        for (var i = 0; i < playerData.length; i++) {
            if (playerData[i].discordUserId !== discordUserId)
                continue;
            dataExists = true;
        }
        return dataExists;
    };
    JsonFileManager.prototype.writeData = function (discordUser, username, platform) {
        var playerData = this.getPlayerDatas();
        var discordUserId = discordUser.id;
        if (this.isDataExists(discordUserId)) {
            this.removeData(discordUserId, playerData);
        }
        playerData.push(new userdata_1.User(discordUserId, username, platform));
        fs.writeFileSync("./username.json", JSON.stringify(playerData));
    };
    JsonFileManager.prototype.removeData = function (discordUserId, playerData) {
        for (var i = 0; i < playerData.length; i++) {
            if (playerData[i].discordUserId !== discordUserId)
                continue;
            playerData.splice(i, 1);
        }
    };
    JsonFileManager.prototype.sendSetApexUserNameMessage = function (channel, username) {
        var successMessage = new Discord.MessageEmbed()
            .setTitle("\u30E6\u30FC\u30B6\u30FC\u30CD\u30FC\u30E0\u3092" + username + "\u306B\u30BB\u30C3\u30C8\u3057\u307E\u3057\u305F");
        channel.send({ embeds: [successMessage] });
    };
    return JsonFileManager;
}());
exports.JsonFileManager = JsonFileManager;
