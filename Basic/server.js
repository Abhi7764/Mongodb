const express=require("express");
const app=express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
const client=require("mongodb").MongoClient;
//(err,database)
// catch :-received the error
//then:- received the database
let dbinstance; 
let studentsInstance;

client.connect("mongodb+srv://userroot:Abhi7764@cluster0.mfmsaea.mongodb.net/?retryWrites=true&w=majority").then((database)=>{
    dbinstance=database.db("project");
    studentsInstance=dbinstance.collection("students");
    console.log("database connected");
})

//app.use(express.static("."))

app.get("/getData",(req,res)=>{
    //! for one value
    // studentsInstance.findOne().then((result)=>{
    //     console.log(result);
    //     res.end();
    // });
    
    studentsInstance.find({}).toArray().then((result)=>{
        // console.log(result);
        // res.end();
        res.render("home",{data:result});
    });
})
app.get("/add",(req,res)=>{
    res.render("add")
})
app.post("/storeData",(req,res)=>{
    let obj={"name":req.body.name,"age":req.body.age};
    studentsInstance.insertOne(obj).then((result)=>{
        // console.log(result);
        // res.end(); 
        //res.render("home",{data:result});
        res.redirect("/getData");
    })
})
app.listen(3000,(err)=>{
    console.log("Server Started.....")
})