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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApexUserRoleSetter = void 0;
var request_1 = __importDefault(require("request"));
var apexuserdatareader_1 = require("./apexuserdatareader");
var ApexUserRoleSetter = /** @class */ (function () {
    function ApexUserRoleSetter(discordUser, username, platform, guild) {
        this.discordUser = discordUser;
        this.username = username;
        this.platform = platform;
        this.guild = guild;
    }
    ApexUserRoleSetter.prototype.setPlayerRankRole = function () {
        var _this = this;
        var url = "https://public-api.tracker.gg/apex/v1/standard/profile/" + this.checkPlatform() + "/" + this.username;
        request_1.default.get({
            url: url,
            headers: { "TRN-Api-Key": process.env.APEX_TRACKER_API_KEY }
        }, function (err, res, body) {
            var jsonData = JSON.parse(body);
            if (jsonData.data === undefined)
                return;
            var apexUserDataLoader = new apexuserdatareader_1.ApexUserDataLoader(_this.username, _this.platform);
            var playerRank = jsonData.data.metadata.rankName;
            var playerRanking = apexUserDataLoader.getPlayerRanking(jsonData.data.stats);
            _this.setPlayerRole(playerRank, playerRanking);
        });
    };
    ApexUserRoleSetter.prototype.setPlayerRole = function (rankName, ranking) {
        return __awaiter(this, void 0, void 0, function () {
            var role, isPlayerRankPredator, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isPlayerRankPredator = ranking <= 750;
                        if (isPlayerRankPredator) {
                            role = this.guild.roles.cache.find(function (r) { return r.name === "Predator"; });
                            this.resetPlayerRankRole();
                            this.discordUser.roles.add(role);
                            return [2 /*return*/];
                        }
                        _a = rankName;
                        switch (_a) {
                            case "Gold 4": return [3 /*break*/, 1];
                            case "Gold 3": return [3 /*break*/, 3];
                            case "Gold 2": return [3 /*break*/, 5];
                            case "Gold 1": return [3 /*break*/, 7];
                            case "Platinum 4": return [3 /*break*/, 9];
                            case "Platinum 3": return [3 /*break*/, 11];
                            case "Platinum 2": return [3 /*break*/, 13];
                            case "Platinum 1": return [3 /*break*/, 15];
                            case "Diamond 4": return [3 /*break*/, 17];
                            case "Diamond 3": return [3 /*break*/, 19];
                            case "Diamond 2": return [3 /*break*/, 21];
                            case "Diamond 1": return [3 /*break*/, 23];
                            case "Master": return [3 /*break*/, 25];
                        }
                        return [3 /*break*/, 27];
                    case 1:
                        role = this.guild.roles.cache.find(function (r) { return r.name === "Gold 4"; });
                        this.resetPlayerRankRole();
                        return [4 /*yield*/, this.discordUser.roles.add(role).catch(console.error)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 28];
                    case 3:
                        role = this.guild.roles.cache.find(function (r) { return r.name === "Gold 3"; });
                        this.resetPlayerRankRole();
                        return [4 /*yield*/, this.discordUser.roles.add(role).catch(console.error)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 28];
                    case 5:
                        role = this.guild.roles.cache.find(function (r) { return r.name === "Gold 2"; });
                        this.resetPlayerRankRole();
                        return [4 /*yield*/, this.discordUser.roles.add(role).catch(console.error)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 28];
                    case 7:
                        role = this.guild.roles.cache.find(function (r) { return r.name === "Gold 1"; });
                        this.resetPlayerRankRole();
                        return [4 /*yield*/, this.discordUser.roles.add(role).catch(console.error)];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 28];
                    case 9:
                        role = this.guild.roles.cache.find(function (r) { return r.name === "Platinum 4"; });
                        this.resetPlayerRankRole();
                        return [4 /*yield*/, this.discordUser.roles.add(role).catch(console.error)];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 28];
                    case 11:
                        role = this.guild.roles.cache.find(function (r) { return r.name === "Platinum 3"; });
                        this.resetPlayerRankRole();
                        return [4 /*yield*/, this.discordUser.roles.add(role).catch(console.error)];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 28];
                    case 13:
                        role = this.guild.roles.cache.find(function (r) { return r.name === "Platinum 2"; });
                        this.resetPlayerRankRole();
                        return [4 /*yield*/, this.discordUser.roles.add(role).catch(console.error)];
                    case 14:
                        _b.sent();
                        return [3 /*break*/, 28];
                    case 15:
                        role = this.guild.roles.cache.find(function (r) { return r.name === "Platinum 1"; });
                        this.resetPlayerRankRole();
                        return [4 /*yield*/, this.discordUser.roles.add(role).catch(console.error)];
                    case 16:
                        _b.sent();
                        return [3 /*break*/, 28];
                    case 17:
                        role = this.guild.roles.cache.find(function (r) { return r.name === "Diamond 4"; });
                        this.resetPlayerRankRole();
                        return [4 /*yield*/, this.discordUser.roles.add(role).catch(console.error)];
                    case 18:
                        _b.sent();
                        return [3 /*break*/, 28];
                    case 19:
                        role = this.guild.roles.cache.find(function (r) { return r.name === "Diamond 3"; });
                        this.resetPlayerRankRole();
                        return [4 /*yield*/, this.discordUser.roles.add(role).catch(console.error)];
                    case 20:
                        _b.sent();
                        return [3 /*break*/, 28];
                    case 21:
                        role = this.guild.roles.cache.find(function (r) { return r.name === "Diamond 2"; });
                        this.resetPlayerRankRole();
                        return [4 /*yield*/, this.discordUser.roles.add(role).catch(console.error)];
                    case 22:
                        _b.sent();
                        return [3 /*break*/, 28];
                    case 23:
                        role = this.guild.roles.cache.find(function (r) { return r.name === "Diamond 1"; });
                        this.resetPlayerRankRole();
                        return [4 /*yield*/, this.discordUser.roles.add(role).catch(console.error)];
                    case 24:
                        _b.sent();
                        return [3 /*break*/, 28];
                    case 25:
                        role = this.guild.roles.cache.find(function (r) { return r.name === "Master"; });
                        this.resetPlayerRankRole();
                        return [4 /*yield*/, this.discordUser.roles.add(role).catch(console.error)];
                    case 26:
                        _b.sent();
                        return [3 /*break*/, 28];
                    case 27: return [3 /*break*/, 28];
                    case 28: return [2 /*return*/];
                }
            });
        });
    };
    ApexUserRoleSetter.prototype.resetPlayerRankRole = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var rankRoles, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        rankRoles = [
                            this.guild.roles.cache.find(function (r) { return r.name === "Gold 4"; }),
                            this.guild.roles.cache.find(function (r) { return r.name === "Gold 3"; }),
                            this.guild.roles.cache.find(function (r) { return r.name === "Gold 2"; }),
                            this.guild.roles.cache.find(function (r) { return r.name === "Gold 1"; }),
                            this.guild.roles.cache.find(function (r) { return r.name === "Platinum 4"; }),
                            this.guild.roles.cache.find(function (r) { return r.name === "Platinum 3"; }),
                            this.guild.roles.cache.find(function (r) { return r.name === "Platinum 2"; }),
                            this.guild.roles.cache.find(function (r) { return r.name === "Platinum 1"; }),
                            this.guild.roles.cache.find(function (r) { return r.name === "Diamond 4"; }),
                            this.guild.roles.cache.find(function (r) { return r.name === "Diamond 3"; }),
                            this.guild.roles.cache.find(function (r) { return r.name === "Diamond 2"; }),
                            this.guild.roles.cache.find(function (r) { return r.name === "Diamond 1"; }),
                            this.guild.roles.cache.find(function (r) { return r.name === "Master"; }),
                            this.guild.roles.cache.find(function (r) { return r.name === "Predator"; })
                        ];
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < rankRoles.length)) return [3 /*break*/, 4];
                        if (!this.discordUser.roles.cache.has((_a = rankRoles[i]) === null || _a === void 0 ? void 0 : _a.id))
                            return [3 /*break*/, 3];
                        return [4 /*yield*/, this.discordUser.roles.remove(rankRoles[i])];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApexUserRoleSetter.prototype.checkPlatform = function () {
        switch (this.platform) {
            case "pc": return 5;
            case "ps4": return 2;
            case "xbox": return 1;
            default: return 0;
        }
    };
    return ApexUserRoleSetter;
}());
exports.ApexUserRoleSetter = ApexUserRoleSetter;