import {responseRecieved, requestError} from "./methods.js"

//
function displayPlayerInfo(content) {
    //Display player name
    var nameTag = document.getElementById("playerName")
    nameTag.innerText = content.name

    //Display player orbs
    var nameTag = document.getElementById("playerOrbs")
    nameTag.innerText = content.orbs

    //Display player total pulls
    var nameTag = document.getElementById("playerPulls")
    nameTag.innerText = content.totalPulls

}

let playPar = window.location.search
let playID = new URLSearchParams(playPar).get("playID")

fetch("http://cocasocodm.crabdance.com:778/players/" + playID)
                .then(responseRecieved)
                .then(displayPlayerInfo)
                .catch(requestError)



//Turns string with format "xxxxDragonBanner" to "XXXX DRAGON"
function formatName(name) {
    let result = name.replace('Banner', '')
    result = result.replace('Dragon', ' Dragon')
    result = result.toUpperCase()

    return result
}

//Create button with custom font
function pullButton(bannerClass) {
    var container = document.getElementById("pullButton")
    container.className = bannerClass.replace('Banner', 'Button')
}

//
function displayBanner(content) {
    //Img
    var container = document.getElementById("banner")

    const item = document.createElement("img")
    item.className = "pure-img pure-u-1"
    item.src = 'http://cocasocodm.crabdance.com:776/banners/' + content.name
    item.alt = content.name

    container.append(item)

    //Title
    var container = document.getElementById("bannerName")
    container.innerText = formatName(content.name)
    container.className = "pure-u-1 center " + content.name 

    //Pull button
    pullButton(content.name)
}

let banPar = window.location.search
let banID = new URLSearchParams(banPar).get("banID")

fetch("http://cocasocodm.crabdance.com:778/banners/" + banID)
                .then(responseRecieved)
                .then(displayBanner)
                .catch(requestError)