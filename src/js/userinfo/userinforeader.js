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
exports.UserInfoReader = void 0;
var sqldatamanager_1 = require("../sql/sqldatamanager");
var userinfo_1 = require("./userinfo");
/**
 * ディスコードのユーザー情報をデータべースから読み込むクラス
 *
 * @property {@link discordUserId} ディスコードのユーザーのID
 * @property {@link guildId} ディスコードサーバーのID
 */
var UserInfoReader = /** @class */ (function () {
    /**
     * ディスコードのユーザー情報を読み込むために必要な情報をセットする
     *
     * @param discordUserId ディスコードのユーザーのID
     * @param guildId ディスコードサーバーのID
     */
    function UserInfoReader(discordUserId, guildId) {
        this.discordUserId = discordUserId;
        this.guildId = guildId;
    }
    /**
     * データベースに保存されている全てのディスコードユーザーの情報を読み込むメソッド
     * {@link UserInfo}クラスにユーザーの情報を入れたものを一つずつ配列に入れていき、最後にそれを返す
     *
     * @returns ユーザー情報が入った{@link UserInfo}クラスの配列を返す
     */
    UserInfoReader.getPlayerDatas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, datas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        users = [];
                        return [4 /*yield*/, new sqldatamanager_1.SqlDataManager("username").select()];
                    case 1:
                        datas = _a.sent();
                        datas.forEach(function (data) {
                            users.push(new userinfo_1.UserInfo(data.discorduserid, data.username, data.platform, data.guildid));
                        });
                        return [2 /*return*/, users];
                }
            });
        });
    };
    /**
     * 指定したユーザー情報を読み込むメソッド
     * データベースに、同じ{@link discordUserId}と{@link guildId}を持つデータがあれば、それを返す
     * 同じデータが存在しない場合は、全てのプロパティにNULLを入れた{@link UserInfo}クラスを返す
     *
     * @returns 指定したユーザー情報が入った{@link UserInfo}クラスを返す
     */
    UserInfoReader.prototype.getPlayerData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var playerData, playerDatas, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        playerData = new userinfo_1.UserInfo('NULL', 'NULL', 'NULL', 'NULL');
                        return [4 /*yield*/, UserInfoReader.getPlayerDatas()];
                    case 1:
                        playerDatas = _a.sent();
                        for (i = 0; i < playerDatas.length; i++) {
                            if (playerDatas[i].discordUserId !== this.discordUserId)
                                continue;
                            if (playerDatas[i].guildId !== this.guildId)
                                continue;
                            playerData = playerDatas[i];
                        }
                        return [2 /*return*/, playerData];
                }
            });
        });
    };
    /**
     * 指定したユーザー情報がデータベース上にあるかどうか確認するメソッド
     *
     * @returns 同じ{@link discordUserId}と{@link guildId}があればtrueを返し、そうでない場合はfalseを返す
     */
    UserInfoReader.prototype.isDataExists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var playerDatas;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserInfoReader.getPlayerDatas()];
                    case 1:
                        playerDatas = _a.sent();
                        return [2 /*return*/, playerDatas.some(function (data) { return data.discordUserId === _this.discordUserId && data.guildId === _this.guildId; })];
                }
            });
        });
    };
    return UserInfoReader;
}());
exports.UserInfoReader = UserInfoReader;
