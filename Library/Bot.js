let TelegramBot = require("node-telegram-bot-api");
const commands = require("./commands");
class Bot extends TelegramBot {
    constructor(token) {
        super(token, { polling: true })
    }
    init() {
        this.on("message", (data) => {
            const id = data.from.id
            const text = data.text
            const isInCommand = Object.values(commands).some((keyword) => keyword.test(text))
            if (!isInCommand) {
                this.sendMessage(id, "Saya tidak mengerti 🙏\nketik !help untuk memunculkan panduan")
            }
            return
        })
    }
    receive_sticker() {
        this.on("sticker", (callback) => {
            const id = callback.from.id
            const sticker = callback.sticker.emoji
            this.sendMessage(id, sticker)

        })
    }
    earth_quake() {
        this.onText(commands.quake, async (data) => {
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
            const { id, first_name, last_name, username } = data.from;
            const response = `username ${username}, nama lengkap ${first_name} ${last_name}`;
            this.sendMessage(id, response);
        });
    }
    follow_me() {
        this.onText(commands.followme, (data, after) => {
            let chatId = data.from.id;
            this.sendMessage(chatId, after[1]);
        });
    }
    generate_avatar() {
        this.onText(commands.avatar, async (data, after) => {
            const id = data.from.id
            this.sendMessage(id, "mohon tunggu...")
            this.sendPhoto(id, `https://robohash.org/${after[1]}`)
        })
    }
    quote() {
        this.onText(commands.quote, async (data) => {
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
    news() {
        this.onText(commands.news, async (data) => {
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
    help() {
        this.onText(commands.help, async (data) => {
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
    podcast() {
        this.onText(commands.podcast, async (data) => {
            const id = data.from.id
            const url = "https://jakpost.vercel.app/api/podcast"
            const api = await fetch(url)
            const response = await api.json()
            const { link } = response.podcast[0]
            const api_podcast = await fetch(link)
            const response_podcast = await api_podcast.json()
            const { title, image, audio } = response_podcast.detail_podcast
            console.log(audio)
            this.sendAudio(id, audio, { caption: title, thumbnail: image })
        })
    }
}

module.exports = Bot