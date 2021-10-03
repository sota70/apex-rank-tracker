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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommandChannelId = exports.setCommandChannel = void 0;
var fs = __importStar(require("fs"));
var commandchannel_1 = require("./commandchannel");
function setCommandChannel(serverId, channelId) {
    var commandChannels = fetchCommandChannels();
    // 一つのサーバーIDに二つ以上のチャンネルIDが入るのを避けるためにフィルターをかけている
    if (isCommandChannelSet(serverId))
        removeCommandChannel(serverId, commandChannels);
    console.log(channelId + " has been set to " + serverId);
    commandChannels.push(new commandchannel_1.CommandChannel(serverId, channelId));
    fs.writeFileSync("./command-channel.json", JSON.stringify(commandChannels));
}
exports.setCommandChannel = setCommandChannel;
function getCommandChannelId(serverId) {
    var commandChannel = getCommandChannel(serverId);
    if (commandChannel === undefined)
        return process.env.DEFAULT_RANK_CHANNEL;
    return commandChannel.channelId;
}
exports.getCommandChannelId = getCommandChannelId;
function removeCommandChannel(serverId, commandChannels) {
    for (var i = 0; i < commandChannels.length; i++) {
        if (commandChannels[i].serverId !== serverId)
            continue;
        commandChannels.splice(i, 1);
    }
}
function getCommandChannel(serverId) {
    var commandChannels = fetchCommandChannels();
    for (var i = 0; i < commandChannels.length; i++) {
        if (commandChannels[i].serverId !== serverId)
            continue;
        return commandChannels[i];
    }
}
function isCommandChannelSet(serverId) {
    var commandChannels = fetchCommandChannels();
    var dataExists = false;
    for (var i = 0; i < commandChannels.length; i++) {
        if (commandChannels[i].serverId !== serverId)
            continue;
        dataExists = true;
    }
    return dataExists;
}
function fetchCommandChannels() {
    return JSON.parse(fs.readFileSync("./command-channel.json", "utf-8"));
}
