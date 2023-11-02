const express=require("express");
const app=express();
app.set("view engine","ejs");
app.use(express.urlencoded());

const client=require("mongodb").MongoClient;
let dbinstance;
let usersinstance;
client.connect("mongodb+srv://userroot:Abhi7764@cluster0.mfmsaea.mongodb.net/?retryWrites=true&w=majority").then((database)=>{
    dbinstance=database.db("project1")
    usersinstance=dbinstance.collection("students");
    console.log("database connected");
})
app.get("/",(req,res)=>{
    res.render("home");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/signup",(req,res)=>{
    res.render("signup");
})

app.post("/login",(req,res)=>{
    usersinstance.findOne({$and:[{"username":req.body.username},{"password":req.body.password}]}).then((results)=>{
        console.log(results);
        if(!results){
            res.send("Invalide username/password");
        }
        else{
            //console.log(results);
            res.send("Login Successfully....");
        }
    })
})
app.post("/signup",(req,res)=>{
    usersinstance.findOne({$and:[{"username":req.body.username},{"password":req.body.password}]}).then((results)=>{
        //console.log(results);
        if(results){
            res.send("Username Already Exist");
        }
        else{
            let obj={};
            obj.username=req.body.username;
            obj.password=req.body.password;
            usersinstance.insertOne(obj).then((results)=>{
            res.send("SignUp Successfully.....");
            })
        }
    })

})
app.listen(3000,(err)=>{
    console.log("Server Started....");
})