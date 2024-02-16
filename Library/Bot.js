let TelegramBot = require("node-telegram-bot-api");
const commands = require("./commands");
class Bot extends TelegramBot {
    constructor(token) {
        console.log("extending telegram bot...");
        super(token, { polling: true })
        this.on("message", (data) => {
            console.log("user typing outside commands...");
            const id = data.from.id
            const text = data.text
            const isInCommand = Object.values(commands).some((keyword) => keyword.test(text))
            if (!isInCommand) {
                this.sendMessage(id, "Saya tidak mengerti 🙏\nketik !help untuk memunculkan panduan")
            }
        })
        console.log("telegram bot ready!");
    }
    get_sticker() {
        console.log("get_sticker ready!");
        this.on("sticker", (callback) => {
            console.log("feature: get_sticker executed!");
            const id = callback.from.id
            const sticker = callback.sticker.emoji
            this.sendMessage(id, sticker)

        })
    }
    get_earth_quake() {
        console.log("get_earth_quake ready!");
        this.onText(commands.quake, async (data) => {
            console.log("feature: get_earth_quake executed!");
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
        console.log("get_profile ready!");
        this.onText(commands.profile, (data) => {
            console.log("feature: get_profile executed!");
            const { id, first_name, last_name, username } = data.from;
            const response = `username ${username}, nama lengkap ${first_name} ${last_name}`;
            this.sendMessage(id, response);
        });
    }
    get_quote() {
        console.log("get_quote ready!");
        this.onText(commands.quote, async (data) => {
            console.log("feature: get_quote executed!");
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
        console.log("get_news ready!");
        this.onText(commands.news, async (data) => {
            console.log("feature: get_news executed!");
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
        console.log("get_help ready!");
        this.onText(commands.help, async (data) => {
            console.log("feature: get_help executed!");
            const id = data.from.id
            const result = ` 🍻 Panduan Penggunaan 🍻

👇 Basic Command 👇
---
    !help memunculkan bantuan
    !quote memunculkan quotes secara acak
    !quake info gempa terbaru dari BMKG
    !profile cek profile kamu
    !news menampilkan berita terbaru
---

👇 Command with parameter 👇
---
    !avatar [nama] generate gambar avatar buatmu
    !followme [ucapan] mengikuti apa ucapanmu 
---
`
            this.sendMessage(id, result)
        })
    }

    // WITH PARAMETER //
    get_text_by_input() {
        console.log("get_text_by_input ready!");
        this.onText(commands.followme, (data, after) => {
            console.log("feature: get_text_by_input executed!");
            let chatId = data.from.id;
            this.sendMessage(chatId, after[1]);
        });
    }
    // WITH PARAMETER //
    get_avatar_by_name() {
        console.log("get_avatar_by_name ready!");
        this.onText(commands.avatar, async (data, after) => {
            console.log("feature: get_avatar_by_name executed!");
            const id = data.from.id
            this.sendMessage(id, "mohon tunggu...")
            this.sendPhoto(id, `https://robohash.org/${after[1]}`)
        })
    }
}

module.exports = Bot