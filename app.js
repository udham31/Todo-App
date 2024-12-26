const express = require("express");
const { default: mongoose } = require("mongoose");

const app =express ();

//connection to mongodb
mongoose.connect("mongodb://localhost/todo_list",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
});

//middle ware 
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine","ejs");


//routes
app.use(require("./routes/index"))
app.use(require("./routes/todo"))



//server configurations....
app.listen(3000,function(){
    console.log("server is running on port 3000");
})
