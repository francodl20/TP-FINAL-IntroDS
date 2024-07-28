import {responseRecieved, requestError} from "./methods.js"

//Show all players list
function fillLeaderboard(content) {

    var container = document.getElementById("players")
    var contentLenght = content[0].amount

    for(var i = 1; i <= contentLenght; i++) {
        const item = document.createElement("p")
        item.className = "pure-u-1 "
        item.innerHTML = `<a href="accountMenu.html?playID=${content[i].id}" target="_blank"> ${content[i].name} </a> || Orbes: ${content[i].orbs} - Total de tiradas: ${content[i].total_pulls}`;
        container.append(item)
    }
}


fetch("http://localhost:778/players/")
                .then(responseRecieved)
                .then(fillLeaderboard)
                .catch(requestError)