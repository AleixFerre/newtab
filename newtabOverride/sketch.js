let timeTxt;
let champName;
const url = "http://ddragon.leagueoflegends.com/cdn/11.1.1/data/en_US/champion.json";
const url2 = "http://ddragon.leagueoflegends.com/cdn/11.1.1/data/en_US/champion/";

function preload() {
    httpDo(url, {
        method: 'GET'
    }, gotNames);
}

function gotNames(res) {
    champName = randomProperty(res.data).name.replace(" ", "");
    console.log(champName);
    httpDo(url2 + champName + '.json', {
        method: 'GET'
    }, gotChamp);
}

function gotChamp(res) {
    let skins = res.data[champName].skins;
    let chosenSkin = randomProperty(skins);
    let index = chosenSkin.num;
    console.log(index);
    document.body.style.backgroundImage = "url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + champName + "_" + index + ".jpg')";
}

function setup() {
    noCanvas();
    timeTxt = document.getElementById("h");
    updateDate();
}

function draw() {
    updateDate();
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function randomProperty(obj) {
    var keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}

function updateDate() {
    timeTxt.innerHTML = `${pad(hour(), 2)}:${pad(minute(), 2)}:${pad(second(), 2)}`;
}