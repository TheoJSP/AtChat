const express = require("express");
const path = require("path");
const app = express();

//setings
app.set("port", 3000);

//static files
app.use(express.static(path.join(__dirname, "/public")));

//Start Server
const server = app.listen(app.get("port"),()=>{
    console.log("server on port:", app.get("port"));
  });


//Configuracion socket 
const SocketIO = require("socket.io");
const io = SocketIO(server);

//se inicia el socket
io.on("connection", (socket)=>{
    console.log("Nueva conexión:", socket.id)

    //On escucha , emit manda
    socket.on("chat:message", (data) =>{
        io.sockets.emit("chat:message", data);
        console.log(data);
    });

    socket.on("chat:typing", (data)=>{
        //se manda a todos menos al emisor 
        socket.broadcast.emit("chat:typing", data);
    })
});


