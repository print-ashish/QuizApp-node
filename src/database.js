const mongoose = require("mongoose");
// const validator = require("validator");




const playerSchema = new mongoose.Schema({

    user:String,
    quiz_user_ans: String,
    players : [String],
    player_scores :[Number]

})


//creating new collection
const User = new mongoose.model("quizPlayer",playerSchema);


module.exports = User;


