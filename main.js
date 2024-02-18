const Bot = require("./app/Bot")
require("dotenv").config()

// SET Zona Waktu Jakarta untuk seluruh sistem
process.env.TZ = 'Indonesia/Jakarta';

// BOT CONFIGURATION
const bot_token = process.env.TOKEN
const bot_option = { polling: true, filePath: false }

// INITIALIZING BOT
console.log("🎇 starting cuybot...");
const bot = new Bot(bot_token, bot_option)

// ACTIVATE BOT FEATURE
const main = () => {
    console.log("preparing feature...");
    bot.get_greeting()
    bot.get_help()
    bot.get_sticker()
    bot.get_earth_quake()
    bot.get_quotes()
    bot.get_news()
    bot.get_text_by_input()
    bot.get_avatar_by_name()
}

main()
console.log("🎉 bot is running now! 🎉");




