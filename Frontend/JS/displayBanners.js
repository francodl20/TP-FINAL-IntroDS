import {responseRecieved, requestError} from "./methods.js"

//
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