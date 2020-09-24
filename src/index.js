//Se inicializa los frameworks
const express = require("express");
const path = require("path");
const passport = require("passport")
const cookieParser = require("cookie-parser")
const session = require("express-session");
const PassportLocal = require("passport-local").Strategy

const app = express();

//Setings de express
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");
app.engine("html", require("ejs").renderFile);

//Static files
app.use(express.static(path.join(__dirname, "/public")));

//Routes 
app.use(require("./routes/index"))

//Start Server(Listen express)
const server = app.listen(app.get("port"),()=>{
    console.log("server on port:", app.get("port"));
  });

//Configuracion inicial socket 
const SocketIO = require("socket.io");
const io = SocketIO(server);

//Se inicia el socket
io.on("connection", (socket)=>{
    console.log("Nueva conexión:", socket.id);

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


