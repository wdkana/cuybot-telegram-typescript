function checkUser(data) {
    if (!data.username || !data.first_name) return "juragan"
    return data.username
}

function checkTime() {
    const local_zone = 7
    const _date = new Date()

    // get specific detail
    const date = ("0" + _date.getDate()).slice(-2);
    const month = ("0" + (_date.getMonth() + 1)).slice(-2);
    const year = _date.getFullYear();
    const hours = _date.getHours() + local_zone;
    const minutes = _date.getMinutes();
    const seconds = _date.getSeconds();
    return date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds
}

function helperGuide() {
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
    return result
}

module.exports = { checkUser, checkTime, helperGuide }