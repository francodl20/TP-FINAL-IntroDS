
//Response confirmation through json
export function response_recieved(response) {
    return response.json()
}

//Show errors in console
export function request_error(error) {
    console.log("ERROR")
    console.log(error)
}

export function createPlayer(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const name = formData.get("name")

    
    fetch("http://localhost:778/player", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })
    })
    .then(response_recieved)
    .then(handle_response)
    .catch(request_error)
}

