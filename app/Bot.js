const TelegramBot = require("node-telegram-bot-api");
const commands = require("../libs/commands");
const { helpText } = require("../libs/constant");
const { checkTime, checkUser, checkCommands, checkCallback } = require("../libs/utils");

class Bot extends TelegramBot {
    constructor(token, options) {
        super(token, options)
        checkCommands(this)
        checkCallback(this)
    }
    get_greeting() {
        this.onText(commands.greeting, (data) => {
            console.log("feature: get_greeting executed!", checkUser(data), checkTime());

            const id = data.from.id;
            const greeting = `Halo saya tau kamu ${checkUser(data)}! 🙊`;
            this.sendMessage(id, greeting);
        });
    }
    get_help() {
        this.onText(commands.help, async (data) => {
            console.log("feature: get_help executed!", checkUser(data), checkTime());

            const id = data.from.id
            this.sendMessage(id, helpText)
        })
    }
    get_sticker() {
        this.on("sticker", (data) => {
            console.log("feature: get_sticker executed!", checkUser(data), checkTime());

            const id = data.from.id
            const sticker = data.sticker.emoji
            this.sendMessage(id, sticker)
        })
    }
    get_earth_quake() {
        this.onText(commands.quake, async (data) => {
            console.log("feature: get_earth_quake executed!", checkUser(data), checkTime());

            const id = data.from.id
            const bmkg_endpoint = process.env.BMKG_ENDPOINT

            this.sendMessage(id, "mohon tunggu juragan...")

            try {
                const api = await fetch(bmkg_endpoint)
                const response = await api.json()
                const { Kedalaman, Magnitude, Wilayah, Potensi, Tanggal, Jam, Shakemap } = response.Infogempa.gempa
                const image = `${process.env.BMKG_IMAGE_SOURCE}/${Shakemap}`

                const result = `info gempa terbaru:\n\n${Tanggal} | ${Jam}\nWilayah: ${Wilayah}\nBesar: ${Magnitude} SR\nKedalaman: ${Kedalaman}\nPotensi: ${Potensi}`
                this.sendPhoto(id, image, { caption: result })
            } catch (e) {
                this.sendMessage("Gagal memuat data berita, silahkan coba lagi 😢")
            }
        })
    }
    get_quotes() {
        this.onText(commands.quotes, async (data) => {
            console.log("feature: get_quote executed!", checkUser(data), checkTime());

            const id = data.from.id
            const quotes_endpoint = process.env.QUOTES_ENDPOINT

            try {
                const api = await fetch(quotes_endpoint)
                const response = await api.json()
                const quotes = response.quote

                this.sendMessage(id, quotes)
            } catch (e) {
                this.sendMessage("Gagal memuat quotes, silahkan coba lagi 😢")
            }
        })
    }
    get_news() {
        this.onText(commands.news, async (data) => {
            console.log("feature: get_news executed!", checkUser(data), checkTime());

            const id = data.from.id
            const news_endpoint = process.env.NEWS_ENDPOINT

            this.sendMessage(id, "mohon tunggu juragan...")

            try {
                const api = await fetch(news_endpoint)
                const response = await api.json()

                for (var i = 0; i < 3; i++) {
                    const { title, image, headline } = response.posts[i]
                    this.sendPhoto(id, image, { caption: `\n---\n${title}\n---\n\n${headline}` })
                }
            } catch (e) {
                this.sendMessage("Gagal memuat berita, silahkan coba lagi 😢")
            }
        })
    }
    get_text_by_input() {
        this.onText(commands.follow, (data, after) => {
            console.log("feature: get_text_by_input executed!", checkUser(data), checkTime());

            const id = data.from.id;
            this.sendMessage(id, after[1]);
        });
    }
    get_avatar_by_name() {
        this.onText(commands.avatar, async (data, after) => {
            console.log("feature: get_avatar_by_name executed!", checkUser(data), checkTime());

            const id = data.from.id
            const avatar_endpoint = process.env.AVATAR_ENDPOINT

            this.sendMessage(id, "mohon tunggu...")
            this.sendPhoto(id, `${avatar_endpoint}/${after[1]}`)
        })
    }
}

module.exports = Bot