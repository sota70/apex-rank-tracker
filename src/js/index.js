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
var env = __importStar(require("dotenv"));
var Discord = __importStar(require("discord.js"));
var http = __importStar(require("http"));
var querystring = __importStar(require("querystring"));
var command = __importStar(require("./commandtype"));
var displayrank = __importStar(require("./displayrank"));
var commandhandler_1 = require("./commandhandler");
var discord_js_1 = require("discord.js");
var guildId = "814796519131185156";
var config = env.config();
var client = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MEMBERS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
    ]
});
/* TOKENと適するボットとしてログインする */
loginToClient();
client.on('ready', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag) + "\u3067\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u3044\u307E\u3059");
                console.log('準備完了');
                client.application = new discord_js_1.ClientApplication(client, {});
                return [4 /*yield*/, client.application.fetch()];
            case 1:
                _b.sent();
                return [4 /*yield*/, registerCommands()];
            case 2:
                _b.sent();
                displayrank.startTimer(client);
                return [2 /*return*/];
        }
    });
}); });
/* ボットを動かしているサーバーに送られてきたメソッドメソッドを受け取り、処理するメソッド*/
http.createServer(function (req, res) {
    if (req.method == "POST") {
        var data = '';
        req.on("data", function (chunk) { data += chunk; });
        req.on("end", function () {
            if (!data) {
                res.end("No Post Data");
                return;
            }
            var dataObject = querystring.parse(data);
            console.log("post: " + dataObject.type);
            if (dataObject.type == "wake") {
                console.log("Woke up in post");
                res.end();
                return;
            }
            res.end();
        });
    }
    else if (req.method == "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end();
    }
}).listen(process.env.PORT || 5000);
/*
 * コマンドを登録するメソッド
 */
function registerCommands() {
    return __awaiter(this, void 0, void 0, function () {
        var guild, commands;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.guilds.fetch(guildId)];
                case 1:
                    guild = _a.sent();
                    commands = [
                        command.apexCommand,
                        command.apexAliaseCommand,
                        command.setCommandChannelCommand,
                        command.setCommandChannelAliaseCommand,
                        command.setUsernameCommand,
                        command.setUsernameAliaseCommand,
                        command.timerstartCommand,
                        command.timerstartAliaseCommand
                    ];
                    guild.commands.set(commands);
                    return [2 /*return*/];
            }
        });
    });
}
/*
 * プレイヤーが打ったメッセージからコマンドを検知して、それぞれのコマンドに適応した処理をするメソッド
 */
client.on('interactionCreate', function (interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var commandHandler;
        return __generator(this, function (_a) {
            if (!interaction.isCommand())
                return [2 /*return*/];
            commandHandler = new commandhandler_1.CommandHandler(interaction);
            commandHandler.handle();
            return [2 /*return*/];
        });
    });
});
function loginToClient() {
    if (process.env.TOKEN == undefined) {
        console.log("TOKENが設定されていません");
        process.exit(0);
    }
    client.login(process.env.TOKEN);
}
function createMessageEmbed(playerName, playerLevel, playerRank, playerRankRP, playerRanking, playerRankImageUrl) {
    var embed;
    if (isPlayerRankPredator(playerRanking)) {
        embed = createPredatorPlayerDataEmbed(playerName, playerLevel, playerRank, playerRankRP, playerRanking);
    }
    else {
        embed = createPlayerDataEmbed(playerName, playerLevel, playerRank, playerRankRP, playerRankImageUrl);
    }
    return embed;
}
function isPlayerRankPredator(playerRanking) {
    if (playerRanking === undefined)
        return false;
    return playerRanking <= 750;
}
function createPlayerDataEmbed(playerName, playerLevel, playerRank, playerRankRP, playerRankImageUrl) {
    var blank = '\u200b';
    return new Discord.MessageEmbed()
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
}
function createPredatorPlayerDataEmbed(playerName, playerLevel, playerRank, playerRankRP, playerRanking) {
    var blank = '\u200b';
    var predatorIconImage = "https://images-ext-1.discordapp.net/external/0lGvCP8CmGd-HUqpem-120A-dVpNVbN_srCvpE6D-84/https/trackercdn.com/cdn/apex.tracker.gg/ranks/apex.png?width=108&height=108";
    return new Discord.MessageEmbed()
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
}
