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

function displayBanners(content) {

    let params = window.location.search
    let playID = new URLSearchParams(params).get("playID")

    var container = document.getElementById("banners")
    var contentLenght = content[0].amount

    for(var i = 1; i <= contentLenght; i++) {
        const item2 = document.createElement("img")
        item2.className = "pure-img pure-u-1 pure-u-xl-1-5 pure-u-md-1-2 pure-u-sm-1"
        item2.src = 'http://cocasocodm.crabdance.com:776/banners/' + content[i].name
        item2.alt = content[i].name

        const item = document.createElement("a")
        item.href = `gachaMenu.html?playID=${playID}&banID=${content[i].id}`
        item.append(item2)


        container.append(item)
    }
}

fetch("http://cocasocodm.crabdance.com:778/banners/")
                .then(responseRecieved)
                .then(displayBanners)
                .catch(requestError)

function displayDragons(content) {
    var container = document.getElementById("dragons")
    var contentLenght = content[0].amount

    for(var i = 1; i <= contentLenght; i++) {

        const div = document.createElement("div")
        div.className = "pure-u-1-2 pure-u-xl-1-12 dragonBlock"

        const img = document.createElement("img")
        img.className = "pure-img pure-u-1"
        img.src = 'http://cocasocodm.crabdance.com:776/dragons/' + content[i].name + content[i].stars
        img.alt = content[i].name

        const txt = document.createElement("p")
        txt.innerText = content[i].id

        div.append(img)
        div.append(txt)
        container.append(div)
    }

}

fetch("http://cocasocodm.crabdance.com:778//players/" + id + "/dragons")
                .then(responseRecieved)
                .then(displayDragons)
                .catch(requestError)


function delete_response(response) {

    alert("Dragon removed successfully")
    location.reload()

}

function deleteDragon(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const deleteID = formData.get("id")

    let params = window.location.search
    let id = new URLSearchParams(params).get("playID")


    fetch("http://cocasocodm.crabdance.com:778//players/" + id + "/" + deleteID,
         {method: "DELETE"})
        .then(responseRecieved)
        .then(delete_response)
        .catch(requestError)
}

window.deleteDragon = deleteDragon;