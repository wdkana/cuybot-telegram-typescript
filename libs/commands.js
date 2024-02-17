const command_sign = "!"

function regex(word, type) {
    if (type == "after") {
        return new RegExp(`^${command_sign}${word}(.+)`)
    } else {
        return new RegExp(`^${command_sign}${word}$`)
    }
}

const commands = {
    quake: regex("quake"),
    profile: regex("profile"),
    quote: regex("quote"),
    news: regex("news"),
    help: regex("help"),
    followme: regex("followme", "after"),
    avatar: regex("avatar", "after"),
}

module.exports = commands