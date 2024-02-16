const env = require("dotenv")
const Bot = require("./Library/Bot")
env.config()
process.env.TZ = 'Indonesia/Jakarta';

// BOT CONFIG
console.log("🎇 starting cuybot...");
const bot_token = process.env.token

// INITIALIZING BOT
console.log("preparing feature...");
const bot = new Bot(bot_token)

// ACTIVATE BOT FEATURE
bot.get_sticker()
bot.get_help()
bot.get_profile()
bot.get_earth_quake()
bot.get_quote()
bot.get_news()
bot.get_text_by_input()
bot.get_avatar_by_name()

console.log("🎉 bot is running now! 🎉");




