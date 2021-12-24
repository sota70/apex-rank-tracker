"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatusEmbedBuilder = void 0;
var discord_js_1 = require("discord.js");
/**
 * {@link MessageEmbed}にプレイヤーステータスを入力したものを作り、それを返すクラス
 *
 * @property {@link playerName} プレイヤー名
 * @property {@link playerLevel} プレイヤーのレベル
 * @property {@link playerRank} プレイヤーのランク
 * @property {@link playerRankImage} プレイヤーのランクアイコン
 * @property {@link playerRankRP} プレイヤーのランクポイント
 * @property {@link playerRanking} プレイヤーのランク順位
 */
var PlayerStatusEmbedBuilder = /** @class */ (function () {
    /**
     * プレイヤーステータスMessageEmbedを作成するのに必要な情報をプロパティに代入する
     *
     * @param playerName プレイヤーの名前
     * @param playerLevel プレイヤーのレベル
     * @param playerRank プレイヤーのランク名
     * @param playerRankImage プレイヤーのランクのアイコン
     * @param playerRankRP プレイヤーのランクポイント
     * @param playerRanking プレイヤーのランク順位
     */
    function PlayerStatusEmbedBuilder(playerName, playerLevel, playerRank, playerRankImage, playerRankRP, playerRanking) {
        this.playerName = playerName;
        this.playerLevel = playerLevel;
        this.playerRank = playerRank;
        this.playerRankImage = playerRankImage;
        this.playerRankRP = playerRankRP;
        this.playerRanking = playerRanking;
    }
    /**
     * {@link MessageEmbed}にプレイヤーステータスを入力したものを作り、それを返すメソッド
     * *プレイヤーがプレデターの場合、プレデターのプレイヤーステータスメッセージを作成し
     * *プレデターでない場合、普通のプレイヤーステータスメッセージを作成する
     *
     * @returns {@link MessageEmbed}にプレイヤーステータスを入力したものを返す
     */
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
    // MessageEmbedにプレイヤーステータスを入力したものを作り、それを返すメソッド
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
    // MessageEmbedにプレデターのプレイヤーステータスを入力したものを作り、それを返すメソッド
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
    // プレイヤーがプレデターか確認するメソッド
    PlayerStatusEmbedBuilder.prototype.isPlayerRankPredator = function () {
        return this.playerRanking <= 750;
    };
    return PlayerStatusEmbedBuilder;
}());
exports.PlayerStatusEmbedBuilder = PlayerStatusEmbedBuilder;
