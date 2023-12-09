const mongooses=require("mongoose");
mongooses.connect("mongodb://127.0.0.1:27017/student").then(() =>{
    console.log("connection succes");
}).catch((e) =>{ 
    console.log(e);
})