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
     })
});


//Manda al server que el usuario esta escribiendo un MSG
message.addEventListener("keypress", ()=>{
    socket.emit("chat:typing", username.value);
})

//Imprime la info del usuario con su mensaje al ser enviado 
socket.on("chat:message", (data)=>{
    console.log(data)
    actions.innerHTML = " "
    output.innerHTML +=  ` <p> 
    <strong>${data.username}</stron>: ${data.message}
    </p>`
});

//Envia que el usuario X esta escribiendo 
socket.on("chat:typing", (data)=>{
    actions.innerHTML = `<p><em>${data} Esta escribiendo un mensaje... </em</p>`
})