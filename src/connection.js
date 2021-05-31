const mongoose = require("mongoose");
const db = 'mongodb+srv://Ashish:Ashishdb@cluster0.4nks2.mongodb.net/QuizUser?retryWrites=true&w=majority'
const localdb = "mongodb://localhost:27017/quizplayer"
mongoose.connect(db,{
useCreateIndex: true,
useNewUrlParser:true,
useUnifiedTopology:true,
useFindAndModify:false
}).then(()=>
{
    console.log("connection success to the database");
}).catch((err)=>
{
    console.log("cannot connect to the database",err);
})