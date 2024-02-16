const TelegramBot = require("node-telegram-bot-api");
const commands = require("../libs/commands");
const showHelp = require("../libs/help");
const { checkTime, checkUser, checkCommands, checkCallback } = require("../libs/utils");

class Bot extends TelegramBot {
    constructor(token) {
        super(token, { polling: true })
        checkCommands(this)
        checkCallback(this)
    }
    get_sticker() {
        this.on("sticker", (data) => {
            console.log("feature: get_sticker executed!", checkUser(data.from), checkTime());
            const id = data.from.id
            const sticker = data.sticker.emoji
            this.sendMessage(id, sticker)
        })
    }
    get_earth_quake() {
        this.onText(commands.quake, async (data) => {
            console.log("feature: get_earth_quake executed!", checkUser(data.from), checkTime());
            const id = data.from.id
            const url = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"
            try {
                const api = await fetch(url)
                const response = await api.json()
                const { Kedalaman, Magnitude, Wilayah, Potensi, Tanggal, Jam } = response.Infogempa.gempa
                const result = `info gempa terbaru:\n\n${Tanggal} | ${Jam}\nWilayah: ${Wilayah}\nBesar: ${Magnitude} SR\nKedalaman: ${Kedalaman}\nPotensi: ${Potensi}`
                this.sendMessage(id, result)
            } catch (e) {
                this.sendMessage("Gagal memuat data berita, silahkan coba lagi 😢")
            }
        })
    }
    get_profile() {
        this.onText(commands.profile, (data) => {
            console.log("feature: get_profile executed!", checkUser(data.from), checkTime());
            const id = data.from.id;
            const response = `Halo saya tau kamu ${checkUser(data.from)}! 🙊`;
            this.sendMessage(id, response);
        });
    }
    get_quote() {
        this.onText(commands.quote, async (data) => {
            console.log("feature: get_quote executed!", checkUser(data.from), checkTime());
            const id = data.from.id
            const url = "https://api.kanye.rest/"
            try {
                const api = await fetch(url)
                const response = await api.json()
                this.sendMessage(id, response.quote)
            } catch (e) {
                this.sendMessage("Gagal memuat quotes, silahkan coba lagi 😢")
            }
        })
    }
    get_news() {
        this.onText(commands.news, async (data) => {
            console.log("feature: get_news executed!", checkUser(data.from), checkTime());
            const id = data.from.id
            this.sendMessage(id, "mohon tunggu...")
            try {
                const url = "https://jakpost.vercel.app/api/category/indonesia"
                const api = await fetch(url)
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
    get_help() {
        this.onText(commands.help, async (data) => {
            console.log("feature: get_help executed!", checkUser(data.from), checkTime());
            const id = data.from.id
            this.sendMessage(id, showHelp())
        })
    }

    // WITH PARAMETER //
    get_text_by_input() {
        this.onText(commands.followme, (data, after) => {
            console.log("feature: get_text_by_input executed!", checkUser(data.from), checkTime());
            let chatId = data.from.id;
            this.sendMessage(chatId, after[1]);
        });
    }
    // WITH PARAMETER //
    get_avatar_by_name() {
        this.onText(commands.avatar, async (data, after) => {
            console.log("feature: get_avatar_by_name executed!", checkUser(data.from), checkTime());
            const id = data.from.id
            this.sendMessage(id, "mohon tunggu...")
            this.sendPhoto(id, `https://robohash.org/${after[1]}`)
        })
    }
}

module.exports = Bot