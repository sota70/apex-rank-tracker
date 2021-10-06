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
exports.fetchCommandChannels = exports.isCommandChannelSet = exports.getCommandChannelId = exports.setCommandChannel = void 0;
var commandchannel_1 = require("./commandchannel");
var sqlDataEditor = __importStar(require("./sqldataeditor"));
function setCommandChannel(serverId, channelId) {
    return __awaiter(this, void 0, void 0, function () {
        var rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rows = new Map([
                        ["serverId", serverId],
                        ["channelId", channelId]
                    ]);
                    return [4 /*yield*/, isCommandChannelSet(serverId)];
                case 1:
                    if (!(_a.sent())) {
                        sqlDataEditor.insert("command_channel", rows);
                        console.log(channelId + " has been set to " + serverId);
                        return [2 /*return*/];
                    }
                    sqlDataEditor.update("command_channel", rows);
                    console.log(channelId + " has been set to " + serverId);
                    return [2 /*return*/];
            }
        });
    });
}
exports.setCommandChannel = setCommandChannel;
function getCommandChannelId(serverId) {
    return __awaiter(this, void 0, void 0, function () {
        var commandChannel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getCommandChannel(serverId)];
                case 1:
                    commandChannel = _a.sent();
                    if (commandChannel === undefined)
                        return [2 /*return*/, process.env.DEFAULT_RANK_CHANNEL];
                    return [2 /*return*/, commandChannel.channelId];
            }
        });
    });
}
exports.getCommandChannelId = getCommandChannelId;
function getCommandChannel(serverId) {
    return __awaiter(this, void 0, void 0, function () {
        var commandChannels, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchCommandChannels()];
                case 1:
                    commandChannels = _a.sent();
                    for (i = 0; i < commandChannels.length; i++) {
                        if (commandChannels[i].serverId !== serverId)
                            continue;
                        return [2 /*return*/, commandChannels[i]];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function isCommandChannelSet(serverId) {
    return __awaiter(this, void 0, void 0, function () {
        var commandChannels;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchCommandChannels()];
                case 1:
                    commandChannels = _a.sent();
                    return [2 /*return*/, commandChannels.some(function (ch) { return ch.serverId === serverId; })];
            }
        });
    });
}
exports.isCommandChannelSet = isCommandChannelSet;
function fetchCommandChannels() {
    return __awaiter(this, void 0, void 0, function () {
        var commandChannels, rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    commandChannels = [];
                    return [4 /*yield*/, sqlDataEditor.select("command_channel")];
                case 1:
                    rows = _a.sent();
                    rows.forEach(function (row) {
                        var serverId = JSON.parse(JSON.stringify(row.serverid));
                        var channelId = JSON.parse(JSON.stringify(row.channelid));
                        commandChannels.push(new commandchannel_1.CommandChannel(serverId, channelId));
                    });
                    return [2 /*return*/, commandChannels
                        // let client = new Client({
                        //     connectionString: process.env.DATABASE_URL,
                        //     ssl: { rejectUnauthorized: false }
                        // })
                        // client.connect()
                        // client.query("SELECT serverId, channelId FROM command_channel;", (err, res) => {
                        //     if (err) throw err
                        //     res.rows.forEach(function (row) {
                        //         let serverId = JSON.parse(JSON.stringify(row.serverid))
                        //         let channelId = JSON.parse(JSON.stringify(row.channelid))
                        //         commandChannels.push(new CommandChannel(serverId, channelId))
                        //     })
                        //     client.end()
                        // })
                        // await delay(1)
                        // return commandChannels
                    ];
            }
        });
    });
}
exports.fetchCommandChannels = fetchCommandChannels;
