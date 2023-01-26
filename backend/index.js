'use strict'

const moongose=require('mongoose');
var app=require("./app");
moongose.Promise=global.Promise;


app.get('/',(req,res)=>{
  res.send("La conexion ha sido correcta")
});

moongose.connect('mongodb+srv://[Usuario]:[Contraseña]@cluster0.laodkjt.mongodb.net/?retryWrites=true&w=majority')
          .then(()=>{
            console.log("Conexion a la bd establecida");
            app.listen(app.get("port"),()=>{
                console.log("Servidor corriendo correctamente en el puerto ",app.get("port"))
            })
          })
          .catch(err=>console.log(err));