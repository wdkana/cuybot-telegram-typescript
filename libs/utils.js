const commands = require("./commands");
const { helpText } = require("./constant");

/*
    checkCommands merupakan listener untuk pengecekan inputan user.
    jika inputan dari user tidak mengandung commands yang valid sesuai file commands.js,
    checkCommands memberikan callback_data untuk ditangkap oleh function checkCallback 
**/
function checkCommands(bot) {
    bot.on("message", (data) => {
        const isInCommand = Object.values(commands).some((keyword) => keyword.test(data.text))
        if (!isInCommand) {
            bot.sendMessage(data.from.id, "Saya tidak mengerti 🙏\nketik !help atau klik tombol dibawah ini untuk memunculkan panduan ", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "Panduan Penggunaan", callback_data: "go_to_help" }
                        ]
                    ]
                }
            })
        }
    })
}


/*
    checkCallback merupakan listener untuk menangkap data dari parameter "callback_data". 
    properti tertentu seperti inline_keyboard mengandung callback_data.
**/
function checkCallback(bot) {
    bot.on('callback_query', (data) => {
        const callbackData = data.data
        const id = data.from.id

        if (callbackData == "go_to_help") {
            bot.sendMessage(id, helpText)
        }
    })
}

/* 
    terkadang user telegram tidak ngeset username
    function checkUser berfungsi untuk melakukan pengecekan data sender.
    menghindari value "undefined"
**/
function checkUser(data) {
    if (!data.from.username || !data.from.first_name) return "juragan"
    return data.from.username
}

/*
    checkTime saat ini digunakan untuk time logger di server
    kapan sender melakukan interaksi kepada bot 
**/
function checkTime() {
    // set zona waktu server menjadi WIB (+7), secara default zona server adalah +0 
    const local_zone = 7

    const _date = new Date()

    // variabel waktu spesifik untuk keperluan tertentu
    const date = ("0" + _date.getDate()).slice(-2);
    const month = ("0" + (_date.getMonth() + 1)).slice(-2);
    const year = _date.getFullYear();
    const hours = _date.getHours() + local_zone;
    const minutes = _date.getMinutes();
    const seconds = _date.getSeconds();

    return date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds
}

module.exports = { checkUser, checkTime, checkCommands, checkCallback }