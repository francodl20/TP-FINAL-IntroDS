import {responseRecieved, requestError} from "./methods.js"

//Show all banners list
function displayBanners(content) {

    var container = document.getElementById("banners")
    //var contentLenght = content[0].amount

    //for(var index = 1; index <= contentLenght; index++) {
        const item2 = document.createElement("img")
        item2.className = "pure-img "
        item2.src = content[0].imgSource

        const item = document.createElement("a")
        item.href = ""
        item.append(item2)


        container.append(item)
    //}
}


fetch("http://localhost:778/banners/")
                .then(responseRecieved)
                .then(displayBanners)
                .catch(requestError)