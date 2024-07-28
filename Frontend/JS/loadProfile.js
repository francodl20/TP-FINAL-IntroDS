import {responseRecieved, requestError} from "./methods.js"

function displayPlayerInfo(content) {

    var nameTag = document.getElementById("playerName")
    nameTag.innerText = content.name

    return "cocky want boing boing"
}

let params = window.location.search
let id = new URLSearchParams(params).get("id")

fetch("http://localhost:778/players/" + id)
                .then(responseRecieved)
                .then(displayPlayerInfo)
                .catch(requestError)