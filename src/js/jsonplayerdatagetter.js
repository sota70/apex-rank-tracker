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
exports.PlayerDataLoader = void 0;
var request = __importStar(require("request"));
var discord = __importStar(require("discord.js"));
var apexuserdata_1 = require("./apexuserdata");
var PlayerDataLoader = /** @class */ (function () {
    function PlayerDataLoader() {
    }
    PlayerDataLoader.prototype.obtainPlayerData = function (username, platform) {
        return __awaiter(this, void 0, void 0, function () {
            var apexUserData, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apexUserData = new apexuserdata_1.ApexUserData("None", 0, "None", "None", -1, -1);
                        url = "https://public-api.tracker.gg/apex/v1/standard/profile/" + this.checkPlatform(platform) + "/" + username;
                        request.get({
                            url: url,
                            headers: { "TRN-Api-Key": process.env.APEX_TRACKER_API_KEY }
                        }, function (err, res, body) {
                            var jsonData = JSON.parse(body);
                            var playerName = jsonData.data.metadata.platformUserHandle;
                            var playerLevel = jsonData.data.metadata.level;
                            var playerRank = jsonData.data.metadata.rankName;
                            var playerRankImage = jsonData.data.metadata.rankImage;
                            var playerRankRP = _this.getPlayerRP(jsonData.data.stats);
                            var playerRanking = _this.getPlayerRanking(jsonData.data.stats);
                            apexUserData = new apexuserdata_1.ApexUserData(playerName, playerLevel, playerRank, playerRankImage, playerRankRP, playerRanking);
                        });
                        return [4 /*yield*/, this.delay(1)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, apexUserData];
                }
            });
        });
    };
    PlayerDataLoader.prototype.setPlayerRankRole = function (discordUser, username, platform, client) {
        var _this = this;
        var url = "https://public-api.tracker.gg/apex/v1/standard/profile/" + this.checkPlatform(platform) + "/" + username;
        request.get({
            url: url,
            headers: { "TRN-Api-Key": process.env.APEX_TRACKER_API_KEY }
        }, function (err, res, body) {
            var jsonData = JSON.parse(body);
            var playerRank = jsonData.data.metadata.rankName;
            var playerRanking = _this.getPlayerRanking(jsonData.data.stats);
            _this.setPlayerRole(discordUser, playerRank, playerRanking, client);
        });
    };
    PlayerDataLoader.prototype.delay = function (sec) {
        return new Promise(function (resolve) {
            setTimeout(resolve, sec * 1000);
        });
    };
    PlayerDataLoader.prototype.setPlayerRole = function (discordUser, rankName, ranking, client) {
        return __awaiter(this, void 0, void 0, function () {
            var role, awaitedDiscordUser, serverId, guild, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, discordUser];
                    case 1:
                        awaitedDiscordUser = _b.sent();
                        serverId = '814796519131185156';
                        return [4 /*yield*/, client.guilds.fetch(serverId)];
                    case 2:
                        guild = _b.sent();
                        if (this.isPlayerRankPredator(ranking)) {
                            role = guild.roles.cache.find(function (r) { return r.name === "Predator"; });
                            this.resetPlayerRankRole(discordUser, guild);
                            discordUser.roles.add(role);
                            return [2 /*return*/];
                        }
                        _a = rankName;
                        switch (_a) {
                            case "Gold 4": return [3 /*break*/, 3];
                            case "Gold 3": return [3 /*break*/, 5];
                            case "Gold 2": return [3 /*break*/, 7];
                            case "Gold 1": return [3 /*break*/, 9];
                            case "Platinum 4": return [3 /*break*/, 11];
                            case "Platinum 3": return [3 /*break*/, 13];
                            case "Platinum 2": return [3 /*break*/, 15];
                            case "Platinum 1": return [3 /*break*/, 17];
                            case "Diamond 4": return [3 /*break*/, 19];
                            case "Diamond 3": return [3 /*break*/, 21];
                            case "Diamond 2": return [3 /*break*/, 23];
                            case "Diamond 1": return [3 /*break*/, 25];
                            case "Master": return [3 /*break*/, 27];
                        }
                        return [3 /*break*/, 29];
                    case 3:
                        role = guild.roles.cache.find(function (r) { return r.name === "Gold 4"; });
                        this.resetPlayerRankRole(awaitedDiscordUser, guild);
                        return [4 /*yield*/, discordUser.roles.add(role).catch(console.error)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 30];
                    case 5:
                        role = guild.roles.cache.find(function (r) { return r.name === "Gold 3"; });
                        this.resetPlayerRankRole(awaitedDiscordUser, guild);
                        return [4 /*yield*/, discordUser.roles.add(role).catch(console.error)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 30];
                    case 7:
                        role = guild.roles.cache.find(function (r) { return r.name === "Gold 2"; });
                        this.resetPlayerRankRole(awaitedDiscordUser, guild);
                        return [4 /*yield*/, discordUser.roles.add(role).catch(console.error)];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 30];
                    case 9:
                        role = guild.roles.cache.find(function (r) { return r.name === "Gold 1"; });
                        this.resetPlayerRankRole(awaitedDiscordUser, guild);
                        return [4 /*yield*/, discordUser.roles.add(role).catch(console.error)];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 30];
                    case 11:
                        role = guild.roles.cache.find(function (r) { return r.name === "Platinum 4"; });
                        this.resetPlayerRankRole(awaitedDiscordUser, guild);
                        return [4 /*yield*/, discordUser.roles.add(role).catch(console.error)];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 30];
                    case 13:
                        role = guild.roles.cache.find(function (r) { return r.name === "Platinum 3"; });
                        this.resetPlayerRankRole(awaitedDiscordUser, guild);
                        return [4 /*yield*/, discordUser.roles.add(role).catch(console.error)];
                    case 14:
                        _b.sent();
                        return [3 /*break*/, 30];
                    case 15:
                        role = guild.roles.cache.find(function (r) { return r.name === "Platinum 2"; });
                        this.resetPlayerRankRole(awaitedDiscordUser, guild);
                        return [4 /*yield*/, discordUser.roles.add(role).catch(console.error)];
                    case 16:
                        _b.sent();
                        return [3 /*break*/, 30];
                    case 17:
                        role = guild.roles.cache.find(function (r) { return r.name === "Platinum 1"; });
                        this.resetPlayerRankRole(awaitedDiscordUser, guild);
                        return [4 /*yield*/, discordUser.roles.add(role).catch(console.error)];
                    case 18:
                        _b.sent();
                        return [3 /*break*/, 30];
                    case 19:
                        role = guild.roles.cache.find(function (r) { return r.name === "Diamond 4"; });
                        this.resetPlayerRankRole(awaitedDiscordUser, guild);
                        return [4 /*yield*/, discordUser.roles.add(role).catch(console.error)];
                    case 20:
                        _b.sent();
                        return [3 /*break*/, 30];
                    case 21:
                        role = guild.roles.cache.find(function (r) { return r.name === "Diamond 3"; });
                        this.resetPlayerRankRole(awaitedDiscordUser, guild);
                        return [4 /*yield*/, discordUser.roles.add(role).catch(console.error)];
                    case 22:
                        _b.sent();
                        return [3 /*break*/, 30];
                    case 23:
                        role = guild.roles.cache.find(function (r) { return r.name === "Diamond 2"; });
                        this.resetPlayerRankRole(awaitedDiscordUser, guild);
                        return [4 /*yield*/, discordUser.roles.add(role).catch(console.error)];
                    case 24:
                        _b.sent();
                        return [3 /*break*/, 30];
                    case 25:
                        role = guild.roles.cache.find(function (r) { return r.name === "Diamond 1"; });
                        this.resetPlayerRankRole(awaitedDiscordUser, guild);
                        return [4 /*yield*/, discordUser.roles.add(role).catch(console.error)];
                    case 26:
                        _b.sent();
                        return [3 /*break*/, 30];
                    case 27:
                        role = guild.roles.cache.find(function (r) { return r.name === "Master"; });
                        this.resetPlayerRankRole(discordUser, guild);
                        return [4 /*yield*/, discordUser.roles.add(role).catch(console.error)];
                    case 28:
                        _b.sent();
                        return [3 /*break*/, 30];
                    case 29: return [3 /*break*/, 30];
                    case 30: return [2 /*return*/];
                }
            });
        });
    };
    PlayerDataLoader.prototype.resetPlayerRankRole = function (discordUser, guild) {
        return __awaiter(this, void 0, void 0, function () {
            var rankRoles, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rankRoles = [
                            guild.roles.cache.find(function (r) { return r.name === "Gold 4"; }),
                            guild.roles.cache.find(function (r) { return r.name === "Gold 3"; }),
                            guild.roles.cache.find(function (r) { return r.name === "Gold 2"; }),
                            guild.roles.cache.find(function (r) { return r.name === "Gold 1"; }),
                            guild.roles.cache.find(function (r) { return r.name === "Platinum 4"; }),
                            guild.roles.cache.find(function (r) { return r.name === "Platinum 3"; }),
                            guild.roles.cache.find(function (r) { return r.name === "Platinum 2"; }),
                            guild.roles.cache.find(function (r) { return r.name === "Platinum 1"; }),
                            guild.roles.cache.find(function (r) { return r.name === "Diamond 4"; }),
                            guild.roles.cache.find(function (r) { return r.name === "Diamond 3"; }),
                            guild.roles.cache.find(function (r) { return r.name === "Diamond 2"; }),
                            guild.roles.cache.find(function (r) { return r.name === "Diamond 1"; }),
                            guild.roles.cache.find(function (r) { return r.name === "Master"; }),
                            guild.roles.cache.find(function (r) { return r.name === "Predator"; })
                        ];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < rankRoles.length)) return [3 /*break*/, 4];
                        if (!discordUser.roles.cache.has(rankRoles[i].id))
                            return [3 /*break*/, 3];
                        return [4 /*yield*/, discordUser.roles.remove(rankRoles[i])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PlayerDataLoader.prototype.checkPlatform = function (platform) {
        switch (platform) {
            case "pc": return 5;
            case "ps4": return 2;
            case "xbox": return 1;
            default: return 0;
        }
    };
    PlayerDataLoader.prototype.getPlayerRP = function (playerStatistics) {
        for (var i = 0; i < playerStatistics.length; i++) {
            if (playerStatistics[i].metadata.key !== "RankScore")
                continue;
            return playerStatistics[i].value;
        }
    };
    PlayerDataLoader.prototype.getPlayerRanking = function (playerStatistics) {
        for (var i = 0; i < playerStatistics.length; i++) {
            if (playerStatistics[i].metadata.key !== "RankScore")
                continue;
            return playerStatistics[i].rank;
        }
    };
    PlayerDataLoader.prototype.isPlayerRankPredator = function (playerRanking) {
        return playerRanking <= 750;
    };
    PlayerDataLoader.prototype.sendMessageEmbed = function (channel, playerName, playerLevel, playerRank, playerRankRP, playerRanking, playerRankImageUrl) {
        var embed;
        var blank = '\u200b';
        if (this.isPlayerRankPredator(playerRanking)) {
            embed = this.createPredatorPlayerDataEmbed(playerName, playerLevel, playerRank, playerRankRP, playerRanking);
        }
        else {
            embed = this.createPlayerDataEmbed(playerName, playerLevel, playerRank, playerRankRP, playerRankImageUrl);
        }
        channel.send({ embeds: [embed] });
    };
    PlayerDataLoader.prototype.createPlayerDataEmbed = function (playerName, playerLevel, playerRank, playerRankRP, playerRankImageUrl) {
        var blank = '\u200b';
        return new discord.MessageEmbed()
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
    PlayerDataLoader.prototype.createPredatorPlayerDataEmbed = function (playerName, playerLevel, playerRank, playerRankRP, playerRanking) {
        var blank = '\u200b';
        var predatorIconImage = "https://images-ext-1.discordapp.net/external/0lGvCP8CmGd-HUqpem-120A-dVpNVbN_srCvpE6D-84/https/trackercdn.com/cdn/apex.tracker.gg/ranks/apex.png?width=108&height=108";
        return new discord.MessageEmbed()
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
    return PlayerDataLoader;
}());
exports.PlayerDataLoader = PlayerDataLoader;
