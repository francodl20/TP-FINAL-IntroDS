import {responseRecieved, requestError} from "./methods.js"

function showSelectedDragon(content) {
    console.log(content)
}

function useData(content) {
    var pullNumber = Math.floor(Math.random() * 100)
    console.log('Random: ' + pullNumber)

    let stars
    let banPar = window.location.search
    let banID = new URLSearchParams(banPar).get("banID")

    let logic3 = content.three_star_percent
    let logic4 = content.four_star_percent
    let logic5 = content.five_star_percent
    let logic6 = content.six_star_percent

    if (pullNumber <= logic3) {
        //Get a 3 star
        stars = 3
    } else if (pullNumber <= (logic3 + logic4)) {
        //Get a 4 star
        stars = 4
    } else if (pullNumber <= (logic3 + logic4 + logic5)) {
        //Get a 5 star
        stars = 5
    } else if (pullNumber <= (logic3 + logic4 + logic5 + logic6)) {
        //Get a 6 star
        stars = 6
    } else {
        stars = 404
    }

    fetch("http://cocasocodm.crabdance.com:778/bannerChances/" + banID + "/" + stars)
        .then(responseRecieved)
        .then(showSelectedDragon)
        .catch(requestError)
}

function pullButton() {

    let banPar = window.location.search
    let banID = new URLSearchParams(banPar).get("banID")

    fetch("http://cocasocodm.crabdance.com:778/bannerChances/" + banID)
        .then(responseRecieved)
        .then(useData)
        .catch(requestError)

}

window.pullButton = pullButton;