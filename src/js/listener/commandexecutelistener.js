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
exports.CommandExecuteListener = void 0;
var commandtype_1 = require("../commandtype");
var jsonplayerdatagetter_1 = require("../jsonplayerdatagetter");
var playerstatusembedbuilder_1 = require("../playerstatusembedbuilder");
var commandchannelsetter_1 = require("../commandchannelsetter");
var jsonfilemanager_1 = require("../jsonfilemanager");
var displayrank = __importStar(require("../displayrank"));
var CommandExecuteListener = /** @class */ (function () {
    function CommandExecuteListener() {
    }
    CommandExecuteListener.prototype.handle = function (event) {
        if (!event.interaction.isCommand())
            return;
        switch (event.interaction.commandName) {
            case commandtype_1.commandNames.APEX:
                this.handleApexCommand(event);
                break;
            case commandtype_1.commandNames.APEXALIASE:
                this.handleApexCommand(event);
                break;
            case commandtype_1.commandNames.SETCOMMANDCHANNEL:
                this.handleSetCommandChannelCommand(event);
                break;
            case commandtype_1.commandNames.SETCOMMANDCHANNELALIASE:
                this.handleSetCommandChannelCommand(event);
                break;
            case commandtype_1.commandNames.SETUSERNAME:
                this.handleSetUsernameCommand(event);
                break;
            case commandtype_1.commandNames.SETUSERNAMEALIASE:
                this.handleSetUsernameCommand(event);
                break;
            case commandtype_1.commandNames.TIMERSTART:
                this.handleTimerStartCommand(event);
                break;
            case commandtype_1.commandNames.TIMERSTARTALIASE:
                this.handleTimerStartCommand(event);
                break;
        }
    };
    CommandExecuteListener.prototype.handleApexCommand = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var options, username, platform, playerDataLoader, apexUserData, playerName, playerLevel, playerRank, playerRankImage, playerRankRP, playerRanking, embedMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = event.interaction.options;
                        username = options.getString("username", true);
                        platform = options.getString("platform", true);
                        playerDataLoader = new jsonplayerdatagetter_1.PlayerDataLoader();
                        return [4 /*yield*/, playerDataLoader.obtainPlayerData(username, platform)];
                    case 1:
                        apexUserData = _a.sent();
                        playerName = apexUserData.playerName;
                        playerLevel = apexUserData.playerLevel;
                        playerRank = apexUserData.playerRank;
                        playerRankImage = apexUserData.playerRankImage;
                        playerRankRP = apexUserData.playerRankRP;
                        playerRanking = apexUserData.playerRanking;
                        if (playerName === "None") {
                            event.interaction.reply({ ephemeral: true, content: "Couldn't find the player" });
                            return [2 /*return*/];
                        }
                        embedMessage = new playerstatusembedbuilder_1.PlayerStatusEmbedBuilder(playerName, playerLevel, playerRank, playerRankImage, playerRankRP, playerRanking).build();
                        event.interaction.reply({ ephemeral: true, embeds: [embedMessage] });
                        return [2 /*return*/];
                }
            });
        });
    };
    CommandExecuteListener.prototype.handleSetCommandChannelCommand = function (event) {
        var _a = event.interaction, options = _a.options, guild = _a.guild;
        var commandChannelName = options.getString("channel");
        var newCommandChannel = guild === null || guild === void 0 ? void 0 : guild.channels.cache.find(function (ch) { return ch.name === commandChannelName; });
        if (newCommandChannel === undefined) {
            event.interaction.reply({ content: "Couldn't find the channel", ephemeral: true });
            return;
        }
        new commandchannelsetter_1.CommandChannelSetter(guild === null || guild === void 0 ? void 0 : guild.id, newCommandChannel === null || newCommandChannel === void 0 ? void 0 : newCommandChannel.id).setCommandChannel();
        event.interaction.reply({
            content: "The command channel has been set to " + (newCommandChannel === null || newCommandChannel === void 0 ? void 0 : newCommandChannel.name),
            ephemeral: true
        });
    };
    CommandExecuteListener.prototype.handleSetUsernameCommand = function (event) {
        var _a = event.interaction, options = _a.options, user = _a.user, guildId = _a.guildId;
        var username = options.getString("username", true);
        var platform = options.getString("platform", true);
        var jsonFileManager = new jsonfilemanager_1.JsonFileManager();
        jsonFileManager.writeData(user, username, platform, guildId);
        event.interaction.reply({
            content: "\u30E6\u30FC\u30B6\u30FC\u30CD\u30FC\u30E0\u3092" + username + "\u306B\u3001\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0\u3092" + platform + "\u306B\u8A2D\u5B9A\u3057\u307E\u3057\u305F",
            ephemeral: true
        });
    };
    CommandExecuteListener.prototype.handleTimerStartCommand = function (event) {
        var client = event.interaction.client;
        displayrank.startTimer(client);
        event.interaction.reply({
            content: "タイマーがスタートしました",
            ephemeral: true
        });
    };
    return CommandExecuteListener;
}());
exports.CommandExecuteListener = CommandExecuteListener;
