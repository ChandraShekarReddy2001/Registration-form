const express=require('express');
const path=require("path");
const hbs=require("hbs");
const app =express();
require("./db/conn");
const Register=require("./models/register");
const { json }= require("express");
const port = process.env.PORT || 3000;
const static_path=path.join(__dirname ,"../public")
const template_path=path.join(__dirname ,"../temlets/views");
const partials_path=path.join(__dirname ,"../temlets/partials");


function rewriteUrlMiddleware(req, res, next) {
   
    if (req.url.endsWith('.hbs')) {
 
      req.url = req.url.substring(0, req.url.length - 4);
    }
  
    next();
  }
app.use(express.json());
app.use(express.urlencoded({extended:false}));
 app.use(express.static(static_path));
 app.use(rewriteUrlMiddleware);
 app.set("view engine" , "hbs");

 app.set("views" , template_path);
 hbs.registerPartials(partials_path);

 app.get("/",(req,res) =>{
     res.render("index");
 });
app.get("/register",(req,res) =>{
    res.render("register");
})
app.get("/login",(req,res) =>{
    res.render("login");
})
app.get("/index",(req,res) =>{
    res.render("index");
})
app.post("/register",async(req,res) =>{
    try{
       const password=req.body.password;
       const cpassword=req.body.confirmpassword;
       if(password===cpassword){
const registerstudent=new Register({
    Fullname:req.body.fullname,
    Username:req.body.username,
    Email:req.body.email,
    PhoneNumber:req.body.phonenumber,
    Password:password,
    Confirmpassword:req.body.confirmpassword,
    Gender:req.body.gender

})
const registered =registerstudent.save();
res.status(201).render("index");
       }
       else{
        res.send("password not matched")
       }

    }
    catch(error){
        res.status(400).send(error);
    }
    })
app.post("/login",async(req,res) =>{
    try{
 const email=req.body.email;
 const password=req.body.password;
  const useremail= await Register.findOne({email:email});
  if(useremail.password===password){
res.status(201).render("index");
  }else
  {res.render("login");}

    }
    catch(errror)
    {
        res.status(400).send("invalid email")
    }
})
app.listen(port, () =>{
    console.log(`server is running on port  ${port}`);
});