// /* .env */
// const env = require('dotenv').config()

// /* DiscordBot関連 */
// const Discord = require('discord.js')
// const { Intents } = require('discord.js')
// const client = new Discord.Client({ 
//     intents: [
//         Intents.FLAGS.GUILDS,
//         Intents.FLAGS.GUILD_MESSAGES,
//         Intents.FLAGS.GUILD_MEMBERS
//     ]
//  })

// /* http */
// const http = require('http')

// /* query string */
// const querystring = require('querystring')

// /* コマンドの名前を保管しているEnum */
// const commandName = require(`./commandtype`)

// /* コマンドチャンネルをセットするクラス */
// const commandChannelSetter = require('./commandchannelsetter')

// /*
//  * TOKENと適するボットとしてログインする
//  */
// loginToClient()

// /*
//  * ディスコードボット起動時の処理をするメソッド
//  */
// client.on(`ready`, () => {
//     console.log(`${client.user.tag}でログインしています`)
//     console.log('準備完了')
//     // client.users.fetch("422396862168039425").then((user) => {
//     //     client.guilds.fetch("814796519131185156").then((guild) => {
//     //         console.log(`UserName: ${user.username}, GuildName: ${guild.name}`)
//     //     }).catch(console.error)
//     // }).catch(console.error)
// })

// async function fetchGuildChannels() {
//     let guild = await client.guilds.fetch("814796519131185156")
//     return guild.channels.cache
// }

// function fetchGuild(guildId) {
//     return client.guilds.fetch(guildId)
// }

// /* 
//  * ボットを動かしているサーバーに送られてきたメソッドを受け取り、処理するメソッド 
//  */
// http.createServer(function(req, res) {
//     if (req.method == "POST") {
//         var data = ""
//         req.on("data", function(chunk) { data += chunk })
//         req.on("end", function() {
//             if (!data) {
//                 res.end("No Post Data")
//                 return
//             }
//             var dataObject = querystring.parse(data)
//             console.log(`post: ${dataObject.type}`)
//             if (dataObject.type == "wake") {
//                 console.log("Woke up in post")
//                 res.end()
//                 return
//             }
//             res.end()
//         })
//     } else if (req.method == "GET") {
//         res.writeHead(200, { "Content-Type": "text/plain" })
//         res.end()
//     }
// }).listen(3000)

// /*
//  * プレイヤーが打ったメッセージからコマンドを検知して、それぞれのコマンドに適応した処理をするメソッド
//  */
// client.on("messageCreate", (message) => {
//     let channel = message.channel
//     let serverName = message.guild.name
//     let commandChannel = message.guild.channels.cache.find(ch =>
//         ch.name === commandChannelSetter.getCommandChannel(message.guild.name)
//     )
//     let args = message.content.slice(config.prefix.length).trim().split(/ +/)
//     let command = args.shift().toLowerCase()
//     if (message.author.bot) return
//     if (!message.content.startsWith(config.prefix)) return
//     if (!isCommandChannel(channel, commandChannel)) return
//     executeCommand(command, args, message)
// })

// function loginToClient() {
//     if (process.env.TOKEN == undefined) {
//         console.log("TOKENが設定されていません")
//         process.exit(0)
//     }
//     client.login(process.env.TOKEN)
// }

// function reply(message, text) {
//     message.reply(text)
//         .then(console.log(`リプライ送信: ${text}`))
//         .catch(console.error)
// }

// function sendMsg(channelId, text, option = {}) {
//     let channel = client.channels.cache.find(channel => channel.id === channelId)
//     channel.send(text, option)
//         .then(console.log(`メッセージ送信: ${text}${JSON.stringify(option)}`))
//         .catch(console.error)
// }

// function isCommandChannel(channel, commandChannel) {
//     if (channel === commandChannel) return true
//     sendNotCommandChannelMessage(channel)
//     return false
// }

// function executeCommand(command, args, message) {
//     let channel = message.channel
//     if (command === commandName.APEX) {
//         printApexPlayerData(args, message)
//     }
// }

// function printApexPlayerData(args, message) {
//     let channel = message.channel
//     let username = args[0]
//     let platform = args[1]
//     if (args.length === 0) {
//         sendMissingUserNameMessage(channel)
//         return
//     }
//     if (args.length === 1) {
//         sendMissingPlatformMessage(channel)
//         return
//     }
//     if (args.length >= 3) {
//         sendoverArgsMessage(channel)
//         return
//     }
//     apexAPI.obtainPlayerData(message, username, platform)
// }

// async function registerCommands() {
//     let guild = await fetchGuild("814796519131185156")
//     let commands = guild.commands
//     commands.create({
//         name: 'hello',
//         description: 'Replies with hi',
//         options: [],
//         type: "USER"
//     })
// }

// client.on('interactionCreate', async (interaction) => {
//     if (!interaction.isCommand()) return
//     const { commandName, options, channel, guild } = interaction
//     if (channel.name !== commandChannelSetter.getCommandChannel(guild.name)) return
//     if (commandName === 'hello') {
//         interaction.reply({ content: 'hi', ephemeral: true })
//     }
// })