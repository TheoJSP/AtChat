const express = require("express");
const path = require("path")
const app = express()

//setings
app.set("port", 3000);

//static files
app.use(express.static(path.join(__dirname, "/public")));

//Start Server
const server = app.listen(app.get("port"),()=>{
    console.log("server on port:", app.get("port")) 
  })


//Configuracion socket 
const SocketIO = require("socket.io");
const io = SocketIO(server)
io.on("connection", (socket)=>{
    console.log("Nueva conexión:", socket.id)
})


