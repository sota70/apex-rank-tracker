"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApexUserData = void 0;
var discord_js_1 = require("discord.js");
var ApexUserData = /** @class */ (function () {
    function ApexUserData(playerName, playerLevel, playerRank, playerRankImage, playerRankRP, playerRanking) {
        this.playerName = "None";
        this.playerLevel = 0;
        this.playerRank = "None";
        this.playerRankImage = "None";
        this.playerRankRP = -1;
        this.playerRanking = -1;
        this.playerName = playerName;
        this.playerLevel = playerLevel;
        this.playerRank = playerRank;
        this.playerRankImage = playerRankImage;
        this.playerRankRP = playerRankRP;
        this.playerRanking = playerRanking;
    }
    ApexUserData.prototype.createMessageEmbed = function (playerName, playerLevel, playerRank, playerRankRP, playerRanking, playerRankImageUrl) {
        var embed;
        if (this.isPlayerRankPredator(playerRanking)) {
            embed = this.createPredatorPlayerDataEmbed(playerName, playerLevel, playerRank, playerRankRP, playerRanking);
        }
        else {
            embed = this.createPlayerDataEmbed(playerName, playerLevel, playerRank, playerRankRP, playerRankImageUrl);
        }
        return embed;
    };
    ApexUserData.prototype.isPlayerRankPredator = function (playerRanking) {
        if (playerRanking === undefined)
            return false;
        return playerRanking <= 750;
    };
    ApexUserData.prototype.createPlayerDataEmbed = function (playerName, playerLevel, playerRank, playerRankRP, playerRankImageUrl) {
        var blank = '\u200b';
        return new discord_js_1.MessageEmbed()
            .setTitle("PlayerStatus")
            .addField("PlayerName", playerName)
            .addField(blank, blank)
            .addField("PlayerLevel", playerLevel.toString())
            .addField(blank, blank)
            .addField("PlayerRank", playerRank)
            .addField(blank, blank)
            .addField("PlayerRankRP", playerRankRP.toString())
            .addField(blank, blank)
            .setImage(playerRankImageUrl);
    };
    ApexUserData.prototype.createPredatorPlayerDataEmbed = function (playerName, playerLevel, playerRank, playerRankRP, playerRanking) {
        var blank = '\u200b';
        var predatorIconImage = "https://images-ext-1.discordapp.net/external/0lGvCP8CmGd-HUqpem-120A-dVpNVbN_srCvpE6D-84/https/trackercdn.com/cdn/apex.tracker.gg/ranks/apex.png?width=108&height=108";
        return new discord_js_1.MessageEmbed()
            .setTitle("PlayerStatus")
            .addField("PlayerName", playerName)
            .addField(blank, blank)
            .addField("PlayerLevel", playerLevel.toString())
            .addField(blank, blank)
            .addField("PlayerRank", playerRank)
            .addField(blank, blank)
            .addField("PlayerRankRP", playerRankRP.toString())
            .addField(blank, blank)
            .addField("PlayerRanking", playerRanking.toString())
            .addField(blank, blank)
            .setImage(predatorIconImage);
    };
    return ApexUserData;
}());
exports.ApexUserData = ApexUserData;
