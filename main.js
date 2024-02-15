const env = require("dotenv")
const Bot = require("./Library/Bot")
env.config()

// BOT CONFIG
const bot_token = process.env.token

// INITIALIZING BOT
const bot = new Bot(bot_token)

// ACTIVATE BOT FEATURE
bot.receive_sticker()
bot.get_profile()
bot.follow_me()
bot.earth_quake()
bot.generate_avatar()
bot.quote()





