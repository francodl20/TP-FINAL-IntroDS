import {responseRecieved, requestError} from "./methods.js"

function displayPlayerInfo(content) {

    //Display player name
    var nameTag = document.getElementById("playerName")
    nameTag.innerText = content.name

}

let params = window.location.search
let id = new URLSearchParams(params).get("playID")

fetch("http://cocasocodm.crabdance.com:778/players/" + id)
                .then(responseRecieved)
                .then(displayPlayerInfo)
                .catch(requestError)