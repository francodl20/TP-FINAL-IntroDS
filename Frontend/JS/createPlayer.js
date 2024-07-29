import {responseRecieved, requestError} from "./methods.js"

function handle_response(data) {
    console.log(data)
}

function createPlayer(event) {
    event.preventDefault()

    const formData = new FormData(event.target)

    const name = formData.get("name")

    fetch("http://cocasocodm.crabdance.com:778/player", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })
    })
        .then(responseRecieved)
        .then(handle_response)
        .catch(requestError)

    location.reload()
}

window.create_player = createPlayer;