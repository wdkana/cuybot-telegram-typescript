// flexible prefix
const command_prefix = "!"

/*
    filtered function untuk melakukan pengecekan rules Regex yang ingin digunakan
    only  -> format fixed
    after -> format fixed + kata-kata setelahnya.

    contoh after: !follow halogan
    data yang didapat: ["!follow halogan"]["halogan"]
**/
function filtered({ keyword, type }) {
    if (type == "only") return new RegExp(`^${command_prefix}${keyword}$`)
    if (type == "after") return new RegExp(`^${command_prefix}${keyword}(.+)`)
}

const commands = {
    quake: filtered({ keyword: "gempa", type: "only" }),
    greeting: filtered({ keyword: "halo", type: "only" }),
    quotes: filtered({ keyword: "quotes", type: "only" }),
    news: filtered({ keyword: "news", type: "only" }),
    help: filtered({ keyword: "help", type: "only" }),
    follow: filtered({ keyword: "follow", type: "after" }),
    avatar: filtered({ keyword: "avatar", type: "after" }),
}

module.exports = commands