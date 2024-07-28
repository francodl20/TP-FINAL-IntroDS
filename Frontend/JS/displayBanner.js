import {responseRecieved, requestError} from "./methods.js"

//Show all banners list
function displayBanners(content) {

    var container = document.getElementById("banners")
    var contentLenght = content[0].amount

    for(var i = 1; i <= contentLenght; i++) {
        const item2 = document.createElement("img")
        item2.className = "pure-img pure-u-1-8 pure-u-xl-1-5 pure-u-md-1-2 pure-u-sm-1"
        item2.src = 'http://localhost:776/banners/' + content[i].name
        item2.alt = 'Cosmic dragon banner'

        const item = document.createElement("a")
        item.href = `gachaMenu.html?id=${content[i].id}`
        item.append(item2)


        container.append(item)
    }
}


fetch("http://localhost:778/banners/")
                .then(responseRecieved)
                .then(displayBanners)
                .catch(requestError)