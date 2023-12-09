const mongoose =require("mongoose")
const studentdetails= new mongoose.Schema({
    Fullname :{
        type:String,
        require:true
    },
    Username:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true,
        unique:true
    },
    PhoneNumber:{
        type:Number,
        require:true,
        unique:true
    },
    Passwor:{
        type:String,
        require:true
    },
    Confirmpassword:{
        type:String,
        require:true
    },
    Gender:{
        type:String,
        require:true
    }




})
const Register=new mongoose.model("Register", studentdetails);
module.exports=Register;