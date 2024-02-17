const command_sign = "!"

function filtered(word, type) {
    if (type == "after") {
        return new RegExp(`^${command_sign}${word}(.+)`)
    }
    return new RegExp(`^${command_sign}${word}$`)
}

const commands = {
    quake: filtered("quake"),
    profile: filtered("profile"),
    quote: filtered("quote"),
    news: filtered("news"),
    help: filtered("help"),
    followme: filtered("followme", "after"),
    avatar: filtered("avatar", "after"),
}

module.exports = commands