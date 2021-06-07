const express = require("express");
const path = require("path");
const hbs = require("hbs");
const jwt = require("jsonwebtoken");
var app = express();
require("./connection");
const cookieParser = require("cookie-parser");
var port = process.env.PORT || 8000;
// require("../public/js/index.js")
const User = require("../src/database.js")
// const staticpath = path.join(__dirname,"../public/");

function authenticateToken(token) {
    const client_jwt = jwt.verify(token,secretkey)
    // console.log(client_jwt);
    return client_jwt
    
}
//creating token
// const token = "";
const secretkey = "thisisasecretkeybyashishsharma"
 function createToken(user_id) {
 
   console.log('creating token');
    const token =  jwt.sign({_id:user_id},secretkey,{
        expiresIn: "20d"
    });
    // console.log(token)
    return token;
    
}
// createToken();



var userdata ={}


app.use(cookieParser()); 
// console.log(__dirname);
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
    res.render('dares');
})

app.get("/",async(req,res)=>
{
    const client_cookie = req.cookies.jwt;
    if (client_cookie == undefined) {
        res.render("index");
        
    } else {
        // res.send(" cookie present");
        
        // console.log(client_cookie);
        const token_user_id = authenticateToken(client_cookie);
        // console.log(token_user_id._id);
        try {
            const data = await User.findById(token_user_id._id);
            userdata = data;
            res.status(201).render("user_score",{
                user:userdata.user,
                user_link:"https://quiz-app-ashish.herokuapp.com/"+token_user_id._id
            })
            
        } catch (error) {
            res.send("invald token id")
            
        }
 
    }
})
app.get("/create",(req,res)=>
{
    res.render("index");
})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.listen(port,()=>
{
    console.log("server started")
})

app.post("/finish",(req,res)=>
{
    // res.send("finish from the server"); 
    // console.log("finish is working")
    // console.log(req.body.userans);
    // console.log(req.body)
    const objans = {
        user: req.body.user,
        quiz_user_ans : req.body.userans
    } 
    User.insertMany(objans).then((ins_data)=>
    {
        console.log("data inserted");
        // console.log(ins_data[0]._id);
       const user_token = createToken(ins_data[0]._id);
       User.findOneAndUpdate({_id:ins_data[0]._id},{tokens:user_token}).then(()=>{
           console.log("token inserted ")
       }).catch((err)=>
       {
           console.log("error while inserting token");
       })
        res.cookie('jwt',user_token,{
            expires: new Date(Date.now()+ 10000000000),
            httpOnly: true
        });
        res.json({current_id : ins_data[0]._id});
        
    }).catch((err)=>{
        console.log("data not inserted in database",err)
    })
})

app.get("/xyz",(req,res)=>
{
    // console.log("i got the request")
    // const obj = {
    //     name: userdata.user
    // }
    // console.log(userdata)

   res.json(userdata)
})
app.get("/userscore",(req,res)=>{
    res.json(userdata);
})
app.get("/:id", async(req,res)=>
{

    // const id  = req.params.id;
    // console.log(req.params.id);
    console.log("getting cookie info");
    const client_cookie = req.cookies.jwt;
    // console.log(client_cookie);
    try {
        const data = await User.findById(req.params.id);
        userdata = data;
        if (client_cookie == undefined) {
            console.log("cookie not present in the client side")
            
                if (data!= null) {
                    res.status(200);
                    res.render("player",{
                        // quiz_user: data.user
                        quizzer : userdata.user
                    })
                    // console.log(data)
                    // console.log(data.quiz_user_ans[1])
                    
                } else {
                    res.send("data not found");
                    console.log("data not found")
                }
                
            
        } else {
           
            // console.log(client_cookie);
            const token_user_id = authenticateToken(client_cookie);
            // console.log(token_user_id._id);
            //check whether the jwt id is same as request id
            if (token_user_id._id == req.params.id) {
                
                const data = await User.findById(req.params.id);
                userdata = data;
                res.status(201).render("user_score",{
                    user:userdata.user,
                    user_link:"https://quiz-app-ashish.herokuapp.com/"+req.params.id
                })
            }
            else{
                res.render("player",{
                    quizzer: userdata.user
                })
            }
            // res.send("you have a cookie let me check who you are")
        }
        
    } catch (error) {
        res.send("not data in this database")
    }
    // console.log("getting localstorage");
    // console.log(localStorage())
    // console.log();

    // res.render("finish")
    // console.log("get request")
})
app.post("/submit_quiz",(req,res)=>
{
    console.log("i got a post request");
    // console.log(req.body.id);
    const id = req.body.id;
    const player = req.body.player;
    const player_sc = req.body.player_score;
    // console.log(`id = ${id} , player = ${player} and player score = ${player_sc}`);
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