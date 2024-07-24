import {response_recieved, request_error} from "./methods.js"

//Show all players list
function fillLeaderboard(content) {

    var container = document.getElementById("players")
    var contentLenght = content[0].amount

    for(var index = 1; index <= contentLenght; index++) {
        const item = document.createElement("p")
        item.innerHTML = `<a href="players/${content[index].id}" target="_blank"> ${content[index].name} </a> - Orbes: ${content[index].orbs} - Total de tiradas: ${content[index].total_pulls}`;
        container.append(item)
    }
}


fetch("http://localhost:778/player/")
                .then(response_recieved)
                .then(fillLeaderboard)
                .catch(request_error)