function checkUser(data) {
    if (!data.username || !data.first_name) return "juragan"
    return data.username
}

function checkTime() {
    let _date = new Date()
    let date = ("0" + _date.getDate()).slice(-2);
    let month = ("0" + (_date.getMonth() + 1)).slice(-2);
    let year = _date.getFullYear();
    let hours = _date.getHours();
    let minutes = _date.getMinutes();
    let seconds = _date.getSeconds();
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
}

module.exports = { checkUser, checkTime }