const helpText = ` 🍻 Panduan Penggunaan 🍻

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

function showHelp() {
    return helpText
}

module.exports = showHelp