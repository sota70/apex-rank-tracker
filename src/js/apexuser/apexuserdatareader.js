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
exports.ApexUserDataLoader = void 0;
var apexuserdata_1 = require("./apexuserdata");
var request = __importStar(require("request"));
var ApexUserDataLoader = /** @class */ (function () {
    function ApexUserDataLoader(username, platform) {
        this.username = username;
        this.platform = platform;
    }
    ApexUserDataLoader.prototype.getPlayerData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var apexUserData, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apexUserData = new apexuserdata_1.ApexUserData("None", 0, "None", "None", -1, -1);
                        url = "https://public-api.tracker.gg/apex/v1/standard/profile/" + this.checkPlatform() + "/" + this.username;
                        request.get({
                            url: url,
                            headers: { "TRN-Api-Key": process.env.APEX_TRACKER_API_KEY }
                        }, function (err, res, body) {
                            var jsonData = JSON.parse(body);
                            if (jsonData.data === undefined)
                                return apexUserData;
                            var playerName = jsonData.data.metadata.platformUserHandle;
                            var playerLevel = jsonData.data.metadata.level;
                            var playerRank = jsonData.data.metadata.rankName;
                            var playerRankImage = jsonData.data.metadata.rankImage;
                            var playerRankRP = _this.getPlayerRP(jsonData.data.stats);
                            var playerRanking = _this.getPlayerRanking(jsonData.data.stats);
                            apexUserData = new apexuserdata_1.ApexUserData(playerName, playerLevel, playerRank, playerRankImage, playerRankRP, playerRanking);
                        });
                        return [4 /*yield*/, this.delay()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, apexUserData];
                }
            });
        });
    };
    ApexUserDataLoader.prototype.getPlayerRP = function (playerStatistics) {
        for (var i = 0; i < playerStatistics.length; i++) {
            if (playerStatistics[i].metadata.key !== "RankScore")
                continue;
            return playerStatistics[i].value;
        }
    };
    ApexUserDataLoader.prototype.getPlayerRanking = function (playerStatistics) {
        for (var i = 0; i < playerStatistics.length; i++) {
            if (playerStatistics[i].metadata.key !== "RankScore")
                continue;
            return playerStatistics[i].rank;
        }
    };
    ApexUserDataLoader.prototype.checkPlatform = function () {
        switch (this.platform) {
            case "pc": return 5;
            case "ps4": return 2;
            case "xbox": return 1;
            default: return 0;
        }
    };
    ApexUserDataLoader.prototype.delay = function () {
        return new Promise(function (resolve) {
            setTimeout(resolve, 1000);
        });
    };
    return ApexUserDataLoader;
}());
exports.ApexUserDataLoader = ApexUserDataLoader;
