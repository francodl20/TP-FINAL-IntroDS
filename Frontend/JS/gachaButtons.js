import {responseRecieved, requestError} from "./methods.js"

function formatName(name) {
    let result = name.replace('Dragon', ' Dragon')
    result = result.toUpperCase()

    return result
}

function hidePull() {
    var container = document.getElementById("pullContainer")
    container.hidden = true
    location.reload()
}

function handle_response(data) {
    console.log(data)
}

function updateOrbs(amount) {
    let banPar = window.location.search
    let playID = new URLSearchParams(banPar).get("playID")

    fetch("http://cocasocodm.crabdance.com:778/players/" + playID, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            playerID: playID,
            pulls: amount
        })
    })
    .then(responseRecieved)
    .then(handle_response)
    .catch(requestError)
}

function updateDB(dragID, stars) {

    //Get playID from url
    let banPar = window.location.search
    let playID = new URLSearchParams(banPar).get("playID")

    //Add dragon to player account
    fetch("http://cocasocodm.crabdance.com:778/player/dragons", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            playerID: playID,
            dragonID: dragID,
            stars: stars
        })
    })
        .then(responseRecieved)
        .then(handle_response)
        .catch(requestError)

    let amountOfPulls = 1

    //Update amout of orbs
    updateOrbs(amountOfPulls)
}

function showSelectedDragon(content) {
    let id = content.id 
    let name = content.name
    let stars = content.stars

    console.log(id)
    console.log(name)
    console.log(stars)

    updateDB(id, stars)

    const item = document.createElement("img")
    item.className = "pure-img dragon"
    item.src = 'http://cocasocodm.crabdance.com:776/dragons/' + name + stars
    item.alt = formatName(name)

    var container = document.getElementById("dragon")
    container.innerHTML = ''
    container.append(item)

    var container = document.getElementById("pullContainer")
    container.hidden = false
    
}

function pullButton() {

    let banPar = window.location.search
    let banID = new URLSearchParams(banPar).get("banID")

    fetch("http://cocasocodm.crabdance.com:778//banner/" + banID + "/pull")
        .then(responseRecieved)
        .then(showSelectedDragon)
        .catch(requestError)

}

function buyOrbs() {
    let purchase = -1
    updateOrbs(purchase)
    setTimeout(function() {
        location.reload()
      }, 1000)
}

window.pullButton = pullButton;
window.hidePull = hidePull;
window.buyOrbs = buyOrbs;