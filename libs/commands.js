const command_sign = "!"

function filtered({ word, type }) {
    if (type == "after") {
        return new RegExp(`^${command_sign}${word}(.+)`)
    }
    // type == only:
    return new RegExp(`^${command_sign}${word}$`)
}

const commands = {
    quake: filtered({ word: "quake" }),
    profile: filtered({ word: "profile" }),
    quote: filtered({ word: "quote" }),
    news: filtered({ word: "news" }),
    help: filtered({ word: "help" }),
    followme: filtered({ word: "followme", type: "after" }),
    avatar: filtered({ word: "avatar", type: "after" }),
}

module.exports = commands