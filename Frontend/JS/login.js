import jsCookie from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/+esm'
import {response_recieved} from "./methods.js"


function handle_response(data) {
    if (data.success) {
        //Change page to show logged in
        document.getElementById("loggedIn").hidden = false
        document.getElementById("accountName").innerHTML = jsCookie.get('name')
        //Hide login form and display player data
        document.getElementById("loginPanel").hidden = true
    } 
}

function request_error(error) {
    console.log("ERROR")
    console.log(error)

    //Remove loaded cookie to force login
    jsCookie.remove('name')
}

export function loginInfo(event) {
    //Get data
    const formData = new FormData(event.target)

    //Save into cookies
    jsCookie.set('name', formData.get('name'))

    //Attempt to log in
    checkLogin()
}


function checkLogin() {
    //Read loaded cookie to login
    let playerName = jsCookie.get('name')

    //Ask the API for player info
    fetch("http://localhost:778/login/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: playerName})
        })
        .then(response_recieved)
        .then(handle_response)
        .catch(request_error)

}

//Upon entering domain
checkLogin()

loginButton = document.getElementById("loginButton")
loginButton.addEventListener("click", loginInfo)