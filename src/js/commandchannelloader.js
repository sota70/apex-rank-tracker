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
exports.CommandChannelLoader = void 0;
var commandchannel_1 = require("./commandchannel");
var sqlDataEditor = __importStar(require("./sqldataeditor"));
var CommandChannelLoader = /** @class */ (function () {
    function CommandChannelLoader(serverId) {
        this.serverId = serverId;
    }
    CommandChannelLoader.prototype.getAllCommandChannels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var commandChannels, commandChannelsData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commandChannels = [];
                        return [4 /*yield*/, sqlDataEditor.select("command_channel")];
                    case 1:
                        commandChannelsData = _a.sent();
                        commandChannelsData.forEach(function (data) {
                            commandChannels.push(new commandchannel_1.CommandChannel(data.serverid, data.channelid));
                        });
                        return [2 /*return*/, commandChannels];
                }
            });
        });
    };
    CommandChannelLoader.prototype.getCommandChannel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var commandChannels, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllCommandChannels()];
                    case 1:
                        commandChannels = _a.sent();
                        for (i = 0; i < commandChannels.length; i++) {
                            if (commandChannels[i].serverId !== this.serverId)
                                continue;
                            return [2 /*return*/, commandChannels[i]];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommandChannelLoader.prototype.getCommandChannelId = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var commandChannel, guild;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCommandChannel()];
                    case 1:
                        commandChannel = _a.sent();
                        if (!(commandChannel === undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, client.guilds.fetch(this.serverId)];
                    case 2:
                        guild = _a.sent();
                        return [2 /*return*/, this.getDefaultCommandChannelId(guild)];
                    case 3: return [2 /*return*/, commandChannel.channelId];
                }
            });
        });
    };
    CommandChannelLoader.prototype.isCommandChannelSet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var commandChannels;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllCommandChannels()];
                    case 1:
                        commandChannels = _a.sent();
                        return [2 /*return*/, commandChannels.some(function (ch) { return ch.serverId === _this.serverId; })];
                }
            });
        });
    };
    CommandChannelLoader.prototype.getDefaultCommandChannelId = function (guild) {
        var defaultCommandChannel = guild.channels.cache.find(function (ch) { return ch.name === process.env.DEFAULT_RANK_CHANNEL; });
        if (defaultCommandChannel === undefined)
            throw console.error("The guild must have command channel.");
        return defaultCommandChannel.id;
    };
    return CommandChannelLoader;
}());
exports.CommandChannelLoader = CommandChannelLoader;