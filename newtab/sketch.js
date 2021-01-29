let champName;
let names;
let timeTxt;
const myName = "Aleix";
const url = "https://ddragon.leagueoflegends.com/cdn/11.1.1/data/en_US/champion.json";
const url2 = "https://ddragon.leagueoflegends.com/cdn/11.1.1/data/en_US/champion/";

function preload() {
    httpDo(url, {
        method: 'GET'
    }, gotNames);
}

function gotNames(res) {
    console.log("Cached all the names");
    names = res.data;
    champName = randomProperty(names).id;
    console.log(champName);
    httpDo(url2 + champName + '.json', {
        method: 'GET'
    }, gotChamp);
}

function gotChamp(res) {
    console.log(res.data[champName]);

    document.getElementById("champName").innerHTML = champName;
    document.getElementById("champTitle").innerHTML = res.data[champName].title;

    let skins = res.data[champName].skins;
    let chosenSkin = randomProperty(skins);
    let index = chosenSkin.num;
    console.log(index);
    document.body.style.backgroundImage = "url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + champName + "_" + index + ".jpg')";
}

function changeBG() {
    console.log("Pressed");
    champName = randomProperty(names).id;
    console.log(champName);
    httpDo(url2 + champName + '.json', {
        method: 'GET'
    }, gotChamp)
}

function setup() {

    timeTxt = document.getElementById("h");
    window.addEventListener("dblclick", changeBG);
    document.getElementById("greetings").innerHTML = `${saludar(hour())}, ${myName}!`;

    noCanvas();
    updateDate();
}

function draw() {
    updateDate();
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) {
        num = "0" + num;
    }
    return num;
}

function randomProperty(obj) {
    var keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}

function updateDate() {
    timeTxt.innerHTML = `${pad(hour(), 2)}:${pad(minute(), 2)}:${pad(second(), 2)}`;
}

function saludar(h) {
    if (h >= 0 && h <= 5) {
        return "Bona nit";
    } else if (h <= 14) {
        return "Bon dia";
    } else if (h <= 21) {
        return "Bona tarda";
    } else {
        return "Bona nit";
    }
}