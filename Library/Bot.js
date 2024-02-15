let TelegramBot = require("node-telegram-bot-api");

class Bot extends TelegramBot {
    constructor(token) {
        super(token, { polling: true })
    }
    receive_sticker() {
        this.on("sticker", (callback) => {
            const id = callback.from.id
            const sticker = callback.sticker.emoji
            this.sendMessage(id, sticker)

        })
    }
    earth_quake() {
        this.onText(/!gempa/, async (data) => {
            const id = data.from.id
            const url = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"
            const api = await fetch(url)
            const response = await api.json()
            const { Kedalaman, Magnitude, Wilayah, Potensi, Tanggal, Jam } = response.Infogempa.gempa
            const result = `info gempa terbaru:\n\n${Tanggal} | ${Jam}\nWilayah: ${Wilayah}\nBesar: ${Magnitude} SR\nKedalaman: ${Kedalaman}\nPotensi: ${Potensi}`

            this.sendMessage(id, result)
        })
    }
    get_profile() {
        this.onText(/!myprofile/, (data, after) => {
            const { id, first_name, last_name, username } = data.from;
            const response = `username ${username}, nama lengkap ${first_name} ${last_name}`;
            this.sendMessage(id, response);
        });
    }
    follow_me() {
        this.onText(/!followme(.+)/, (data, after) => {
            let chatId = data.from.id;
            this.sendMessage(chatId, after[1]);
        });
    }
    generate_avatar() {
        this.onText(/!avatar(.+)/, async (data, after) => {
            const id = data.from.id
            this.sendPhoto(id, `https://robohash.org/${after[1]}`)
        })
    }
    quote() {
        this.onText(/!quote/, async (data) => {
            const id = data.from.id
            const url = "https://api.kanye.rest/"
            const api = await fetch(url)
            const response = await api.json() 
            this.sendMessage(id, response.quote)
        })
    }
    news() {
        this.onText(/!berita/, async (data) => {
            const id = data.from.id
            const url = "https://jakpost.vercel.app/api/category/indonesia"
            const api = await fetch(url)
            const response = await api.json()
            //single
            const { title, image, headline } = response.posts[0]
            this.sendPhoto(id, image, {caption: `${title}\n${headline}`})
            //Multiple
            // for(var i=0; i < 3; i++){
            //     const { title, image, headline } = response.posts[i]
            //     this.sendPhoto(id, image, {caption: `${title}\n${headline}`})
            // }
        })
    }
    podcast() {
        this.onText(/!podcast/, async (data) => {
            const id = data.from.id
            const url = "https://jakpost.vercel.app/api/podcast"
            const api = await fetch(url)
            const response = await api.json() 
            const { link } = response.podcast[0]
            const api_podcast = await fetch(link)
            const response_podcast = await api_podcast.json() 
            const { title, image, audio } = response_podcast.detail_podcast
            console.log(audio)
            this.sendAudio(id, audio, {caption: title, thumbnail: image})
        })
    }
}

module.exports = Bot