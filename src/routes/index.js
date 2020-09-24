const express = require("express")
const router = express.Router();
const passport = require("passport")
const cookieParser = require("cookie-parser")
const session = require("express-session");
const PassportLocal = require("passport-local").Strategy


//MW
router.use(express.urlencoded({ extended: true }))
router.use(cookieParser("secreto"))
router.use(session({
    secret: "secreto",
    resave: true, 
    saveUninitialized: true 
}))
router.use(passport.initialize());
router.use(passport.session());
passport.use(new PassportLocal(function(username, password, done){
    if(username == "test" && password == "test"){
        return done(null,{id: 1, name:"Test"});//Este objeto seria buscado en la base de datos en un login tradicional
    };
    done(null, false);
}));
//serializacion
passport.serializeUser(function(user, done){
    done(null, user.id)
});
//deserializacion
passport.deserializeUser(function(id, done){
    done(null, {id: 1, name:"Test"})

});


router.get("/",(req, res , next)=>{ 
    if (req.isAuthenticated()){ return next()}
    res.redirect("/Login")
 },(req,res)=>{
     //Si se inicio sesion mostrar bienvenida or mandar a /login
     res.render("index.html", {title: "Atchat"});
 });

 router.get("/login",(req,res)=>{
    //form login
    res.render("login.html");
});

router.post("/login", passport.authenticate("local",{
    //recibir credenciales e inicio de sesion
    successRedirect: "/",
    failureRedirect: "/login"
}));

module.exports = router;