import {responseRecieved, requestError} from "./methods.js"

//Turns string with format "xxxxDragonBanner" to "XXXX DRAGON"
function formatName(name) {
    let result = name.replace('Banner', '')
    result = result.replace('Dragon', ' Dragon')
    result = result.toUpperCase()

    return result
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
}

let params = window.location.search
let id = new URLSearchParams(params).get("banID")

fetch("http://cocasocodm.crabdance.com:778/banners/" + id)
                .then(responseRecieved)
                .then(displayBanner)
                .catch(requestError)