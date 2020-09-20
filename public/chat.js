//inicializaciones
console.log("Chat.js ON");
const socket = io();

//Elements
let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

//Manda al server la info del user en un objeto 
btn.addEventListener("click",()=>{
    socket.emit("chat:message", {
        username: username.value,
        message: message.value
     });
});


//Manda al server que el usuario esta escribiendo un MSG
message.addEventListener("keypress", ()=>{
    socket.emit("chat:typing", username.value);
});

//Imprime la info del usuario con su mensaje al ser enviado 
socket.on("chat:message", (data)=>{
    console.log(data);
    actions.innerHTML = " "
    output.innerHTML +=  `
    <div class="input-group mt-2 text-center ">
        <div class="input-group-prepend">
            <span class="input-group-text">${data.username}</span>
        </div>
        <input  type="text" aria-label="First name" class="form-control" disabled=disabled placeholder=" ${data.message}">
    </div>
    `
});

//Envia que el usuario X esta escribiendo 
socket.on("chat:typing", (data)=>{
    actions.innerHTML = `<p><em>${data} Esta escribiendo un mensaje... </em</p>`
});