import TelegramBot from "node-telegram-bot-api";
import replyWithButton from "../libs/reply-with-button";
import commands from "../libs/commands";
import { helpText } from "../libs/constants";
import { BMKGData, QuoteData, UserData } from "../libs/response-types";

class Bot extends TelegramBot {
    constructor(token, botOptions) {
        super(token, botOptions)
        this.on("message", (data): void => {
            const { from: { id } } = data
            const isInCommand: boolean = Object.values(commands).some((keyword: RegExp) => keyword.test(data.text))

            if (!isInCommand) {
                const result: string = "Saya tidak mengerti 🙏\nketik !help atau klik tombol dibawah ini untuk memunculkan panduan"

                this.sendMessage(id, result, replyWithButton({ text: "Panduan Penggunaan", callback_data: "go_to_help" }))
            }
        })
        this.on('callback_query', (callback: UserData): void => {
            const { data, from: { id } } = callback
            if (data == "go_to_help") {
                this.sendMessage(id, helpText)
            }
        })
    }
    showHelp(): void {
        this.onText(commands.help, (data: UserData) => {
            const { from: { id } } = data
            this.sendMessage(id, helpText)
        })
    }
    showGreeting(): void {
        this.onText(commands.greeting, (data: UserData) => {
            const { from: { id } } = data
            this.sendMessage(id, `halo juga juragan! 😁`)
        })
    }
    showFollowedText(): void {
        this.onText(commands.follow, (data: UserData, after: RegExpExecArray): void => {
            const { from: { id } } = data
            this.sendMessage(id, after[1]);
        });
    }
    showAvatar(): void {
        this.onText(commands.avatar, (data: UserData, after: RegExpExecArray): void => {
            const { from: { id } } = data

            this.sendMessage(id, "mohon tunggu...")
            this.sendPhoto(id, `${process.env.AVATAR_ENDPOINT}/${after[1]}`)
        })
    }
    showEarthQuakeInfo(): void {
        this.onText(commands.quake, async (data): Promise<void> => {
            const { from: { id } } = data

            this.sendMessage(id, "mohon tunggu juragan...")

            try {
                const apiCall = await fetch(process.env.BMKG_ENDPOINT)
                const { Infogempa: { gempa } } = await apiCall.json()
                const { Kedalaman, Magnitude, Wilayah, Potensi, Tanggal, Jam, Shakemap } = gempa

                const image: string = `${process.env.BMKG_IMAGE_SOURCE}/${Shakemap}`

                const result: string = `info gempa terbaru:\n\n${Tanggal} | ${Jam}\nWilayah: ${Wilayah}\nBesar: ${Magnitude} SR\nKedalaman: ${Kedalaman}\nPotensi: ${Potensi}`

                this.sendPhoto(id, image, { caption: result })
            } catch (e) {
                this.sendMessage(id, "Gagal memuat data berita, silahkan coba lagi 😢")
            }
        })
    }
    showQuotes(): void {
        this.onText(commands.quotes, async (data): Promise<void> => {
            const { from: { id } } = data

            try {
                const apiCall = await fetch(process.env.QUOTES_ENDPOINT)
                const { quote }: QuoteData = await apiCall.json()

                this.sendMessage(id, quote)
            } catch (e) {
                this.sendMessage(id, "Gagal memuat quotes, silahkan coba lagi 😢")
            }
        })
    }
    showNews(): void {
        this.onText(commands.news, async (data): Promise<void> => {
            const { from: { id } } = data

            this.sendMessage(id, "mohon tunggu juragan...")

            try {
                const apiCall = await fetch(process.env.NEWS_ENDPOINT)
                const { posts }: BMKGData = await apiCall.json()

                for (let i = 0; i < 3; i++) {
                    const { title, image, headline } = posts[i]
                    const result: string = `\n---\n${title}\n---\n\n${headline}`

                    this.sendPhoto(id, image, { caption: result })
                }
            } catch (e) {
                this.sendMessage(id, "Gagal memuat berita, silahkan coba lagi 😢")
            }
        })
    }
}

export default Bot