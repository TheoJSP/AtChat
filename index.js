//Se inicializa los frameworks
const express = require("express");
const path = require("path");
const app = express();

//Setings de express
app.set("port", 3000);

//Static files
app.use(express.static(path.join(__dirname, "/public")));

//Start Server(Listen express)
const server = app.listen(app.get("port"),()=>{
    console.log("server on port:", app.get("port"));
  });


//Configuracion inicial socket 
const SocketIO = require("socket.io");
const io = SocketIO(server);

//Se inicia el socket
io.on("connection", (socket)=>{
    console.log("Nueva conexión:", socket.id)

    //Escucha lo que manda el JS 
    socket.on("chat:message", (data) =>{
        //Se emite a todos el msg
        io.sockets.emit("chat:message", data);
        console.log(data);
    });

    //Escucha lo que manda el JS 
    socket.on("chat:typing", (data)=>{
        //Se manda a todos menos al emisor 
        socket.broadcast.emit("chat:typing", data);
    })
});


