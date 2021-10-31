"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatusEmbedBuilder = void 0;
var discord_js_1 = require("discord.js");
var PlayerStatusEmbedBuilder = /** @class */ (function () {
    function PlayerStatusEmbedBuilder(playerName, playerLevel, playerRank, playerRankImage, playerRankRP, playerRanking) {
        this.playerName = playerName;
        this.playerLevel = playerLevel;
        this.playerRank = playerRank;
        this.playerRankImage = playerRankImage;
        this.playerRankRP = playerRankRP;
        this.playerRanking = playerRanking;
    }
    PlayerStatusEmbedBuilder.prototype.build = function () {
        var embed;
        if (this.isPlayerRankPredator()) {
            embed = this.buildPredatorPlayerStatusEmbed();
        }
        else {
            embed = this.buildPlayerStatusEmbed();
        }
        return embed;
    };
    PlayerStatusEmbedBuilder.prototype.buildPlayerStatusEmbed = function () {
        var blank = '\u200b';
        return new discord_js_1.MessageEmbed()
            .setTitle("PlayerStatus")
            .addField("PlayerName", this.playerName)
            .addField(blank, blank)
            .addField("PlayerLevel", this.playerLevel.toString())
            .addField(blank, blank)
            .addField("PlayerRank", this.playerRank)
            .addField(blank, blank)
            .addField("PlayerRankRP", this.playerRankRP.toString())
            .addField(blank, blank)
            .setImage(this.playerRankImage);
    };
    PlayerStatusEmbedBuilder.prototype.buildPredatorPlayerStatusEmbed = function () {
        var blank = '\u200b';
        var predatorIconImage = "https://images-ext-1.discordapp.net/external/0lGvCP8CmGd-HUqpem-120A-dVpNVbN_srCvpE6D-84/https/trackercdn.com/cdn/apex.tracker.gg/ranks/apex.png?width=108&height=108";
        return new discord_js_1.MessageEmbed()
            .setTitle("PlayerStatus")
            .addField("PlayerName", this.playerName)
            .addField(blank, blank)
            .addField("PlayerLevel", this.playerLevel.toString())
            .addField(blank, blank)
            .addField("PlayerRank", "Predator")
            .addField(blank, blank)
            .addField("PlayerRankRP", this.playerRankRP.toString())
            .addField(blank, blank)
            .addField("PlayerRanking", this.playerRanking.toString())
            .addField(blank, blank)
            .setImage(predatorIconImage);
    };
    PlayerStatusEmbedBuilder.prototype.isPlayerRankPredator = function () {
        return this.playerRanking <= 750;
    };
    return PlayerStatusEmbedBuilder;
}());
exports.PlayerStatusEmbedBuilder = PlayerStatusEmbedBuilder;
