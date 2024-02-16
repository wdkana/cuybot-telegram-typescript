const commands = require("./commands");
const showHelp = require("./help");

function checkCommands(bot) {
    bot.on("message", (data) => {
        const isInCommand = Object.values(commands).some((keyword) => keyword.test(data.text))
        if (!isInCommand) {
            bot.sendMessage(data.from.id, "Saya tidak mengerti 🙏\nketik !help atau klik tombol dibawah ini untuk memunculkan panduan ", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "Panduan Penggunaan", callback_data: "go_to_help" }
                        ]
                    ]
                }
            })
        }
    })
}

function checkCallback(bot) {
    bot.on('callback_query', (data) => {
        const callbackData = data.data
        const chatId = data.from.id
        if (callbackData == "go_to_help") {
            bot.sendMessage(chatId, showHelp())
        }
    })
}

function checkUser(data) {
    if (!data.from.username || !data.from.first_name) return "juragan"
    return data.from.username
}

function checkTime() {
    const local_zone = 7
    const _date = new Date()

    // get specific detail
    const date = ("0" + _date.getDate()).slice(-2);
    const month = ("0" + (_date.getMonth() + 1)).slice(-2);
    const year = _date.getFullYear();
    const hours = _date.getHours() + local_zone;
    const minutes = _date.getMinutes();
    const seconds = _date.getSeconds();
    return date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds
}

module.exports = { checkUser, checkTime, checkCommands, checkCallback }