window.onload = function(){
    //inicializaciones
    console.log("Chat.js ON");

    const socket = io();

    //Elements
    let message = document.getElementById("message");
    let username = document.getElementById("username");
    let btn = document.getElementById("send");
    let output = document.getElementById("output");
    //let actions = document.getElementById("actions");


    //Manda al server la info del user en un objeto 
    btn.addEventListener("click", () => {
        if (username.value == "" || message.value == "") {
            Swal.fire('Complete los campos requeridos')
        } else {
            socket.emit("chat:message", {
                username: username.value,
                message: message.value
            });
            //lockea el nombre 
            message.value = ""
            var name = document.getElementById("username")
            name.setAttribute("disabled", "disabled")
        }

    });


    //Manda al server que el usuario esta escribiendo un MSG
    /*
    message.addEventListener("keypress", () => {
        socket.emit("chat:typing", username.value);
    });
    */

    //Imprime la info del usuario con su mensaje al ser enviado 
    socket.on("chat:message", (data) => {
        console.log(data);
        //si no es el emisor 
        if (data.username != username.value) {
            console.log("entre")
            //actions.innerHTML = " "
            output.innerHTML += `
            <div class="input-group mt-2 text-center ">
                <div class="input-group-prepend">
                    <span class="input-group-text">${data.username}</span>
                </div>
                <input  type="text" class="form-control font-weight-bold" disabled=disabled value="${data.message}">
            </div>
        `
            //si es el emisor
        } else if (data.username == username.value) {
            console.log("entre")
            //actions.innerHTML = " "
            output.innerHTML += ` 
            <div class="input-group mt-2 ">
            <input type="text" class="form-control font-weight-bold" disabled=disabled value="${data.message}" >
            <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2">${data.username}</span>
            </div>
            </div> `

        }
    });

    //Envia que el usuario X esta escribiendo 
    /*
    socket.on("chat:typing", (data) => {
        actions.innerHTML = `<p><em>${data} Esta escribiendo un mensaje... </em</p>`
    });
    */

}