const express = require("express");
const path = require("path");
const hbs = require("hbs");
var app = express();
require("./connection");
var port = process.env.PORT || 8000;
// require("../public/js/index.js")
const User = require("../src/database.js")
// const staticpath = path.join(__dirname,"../public/");
console.log(__dirname);
// console.log(staticpath);
const partialspath = path.join(__dirname,"../templates/partials");
const viewpath = path.join(__dirname,"../templates/views");
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', viewpath);
hbs.registerPartials(partialspath);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/dare",(req,res)=>
{
    res.send("this is a dare page ");
})
app.get("/",(req,res)=>
{
    res.render("index");
})
app.listen(port,()=>
{
    console.log("server started")
})
app.post("/finish",(req,res)=>
{
    res.send("finish from the server"); 
    // console.log("finish is working")
    // console.log(req.body.userans);
    console.log(req.body)
    const objans = {
        user: req.body.user,
        quiz_user_ans : req.body.userans
    } 
    User.insertMany(objans).then(()=>
    {
        console.log("data inserted")
    }).catch((err)=>{
        console.log("data not inserted in database")
    })
})
app.get("/finish",(req,res)=>
{
    res.render("finish")
})
var userdata ={}
app.get("/xyz",(req,res)=>
{
    console.log("i got the request")
    // const obj = {
    //     name: userdata.user
    // }
    // console.log(userdata)

   res.json(userdata)
})
app.get("/:id", async(req,res)=>
{
    // const id  = req.params.id;
    // console.log(req.params.id);
    
    try {
        const data = await User.findById(req.params.id);
        if (data!= null) {
            userdata = data;
            res.status(200);
            res.render("player",{
                quiz_user: data.user
            })
            // console.log(data)
            // console.log(data.quiz_user_ans[1])
            
        } else {
            res.send("data not found");
            console.log("data not found")
        }
        
    }catch (error) {
        console.log("error in catch")
        // console.log(error)
        
    }
    // console.log();

    // res.render("finish")
    // console.log("get request")
})
app.post("/submit_quiz",(req,res)=>
{
    console.log("i got a post request");
    console.log(req.body.id);
    const id = req.body.id;
    const player = req.body.player;
    const player_sc = req.body.player_score;
    console.log(`id = ${id} , player = ${player} and player score = ${player_sc}`);
    User.findOneAndUpdate({_id:id},{
        $push:{
            players: player,
            player_scores :player_sc
        }
    }).then((msg)=>{
        console.log("player name and score added")
    }).catch((err)=>
    {
        console.log(err);
    })

})