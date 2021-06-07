// const User = require("../src/database.js")s


var user = "";



// console.log(question_arr[0]);
const option_arr = [["tea", "coffee", "beer", "juice"], ["Delhi", "Bihar", "Kolkata", "Mumbai"], ["Ganga", "Yamuna", "Nile", "Saraswati"], ["4", "15", "10", "5"]]


const username_container = document.getElementsByClassName("username_container");
const container = document.getElementsByClassName("container");
const user_name = document.getElementById("user_name");
const player_name = document.getElementById("player_name");
const players = document.getElementById("players");
const how_to_play = document.getElementById("how_to_play");
const share_link = document.getElementById("share_link");
const players_section_id = document.getElementById("players_section_id");
var questions = []
function start() {
    
    console.log("start fired")
    console.log(user_name.value);
    user = user_name.value;
    if (user=="") {
        alert("please enter a name")
        
    } else {
        // share_link.style.display = "none"
        username_container[0].style.display = "none"
        container[0].style.display = "flex";
        how_to_play.style.display = "none";

        var questions = [`What is your fav drink`, "Capital of India", "which is longest river in world", "What is 5 x 3"]
        // display(q_no);
        question_arr = questions;
        var que_len = question_arr.length;
        display(q_no);
        
    }




}
// console.log(que_len)
const op1 = document.getElementById("op1");
const op2 = document.getElementById("op2");
const op3 = document.getElementById("op3");
const op4 = document.getElementById("op4");
const option_container = document.getElementsByClassName("option_container");

const op1_txt = document.getElementById("op1_txt")
const op2_txt = document.getElementById("op2_txt")
const op3_txt = document.getElementById("op3_txt")
const op4_txt = document.getElementById("op4_txt")

const finish_btn = document.getElementById("finish_btn");
const next_btn = document.getElementById("next_btn");
const question = document.getElementById("que");
var q_no = 0;

// var fst_img = document.createElement("img");
// var scd_img = document.createElement("img");
// var third_img = document.createElement("img");
// var forth_img = document.createElement("img");


// fst_img.src = `../public/images/${option_arr[q_no][0]}.jpg`;
// scd_img.src = `../public/images/${option_arr[q_no][1]}.jpg`;
// third_img.src = `../public/images/${option_arr[q_no][2]}.jpg`;
// forth_img.src = `../public/images/${option_arr[q_no][3]}.jpg`;

// scd_img.height = 200;
// scd_img.width = 200;

var selected_opt = 0;
function optionone() {
    // console.log("option one clicked")

}
var player_ans = "";
function option(n) {
    selected_opt = n
    // console.log(`selected option = ${selected_opt}`)

    // console.log(`clicked option = ${n}`)
    // var str2 = n.toString()
    //  player_ans = player_ans + str2;
    // console.log(str2)
    // console.log(player_ans)
}
const copy_link = document.getElementById("copy_link");
function copy_the_link() {
    // copy_link.value = "this is a copy link testing"
    copy_link.select();
    document.execCommand("copy");
    alert("link copied ! ")
    
}
function next_ques() {

    // console.log(`selected option = ${selected_opt}`)
    //setting ans in string
    if (selected_opt != 0) {
        var str2 = selected_opt.toString()
        player_ans = player_ans + str2;
        //    console.log(str2)
        selected_opt = 0;
        //    console.log(player_ans)

    }
    else {


        player_ans = player_ans + "0"
    }
    // console.log(player_ans)

    q_no = q_no + 1
    if (q_no < question_arr.length) {

        display(q_no)
    }
    else {
        finish_btn.style.display = "block"
        // console.log("question finished")
        next_btn.style.display = "none"
        question.style.display = "none";
        option_container[0].style.display = "none";
        // console.log("question finished")
    }

    // console.log("next btn clicked")


}
function display(q_no) {
    question.innerText = question_arr[q_no]

    //     fst_img.src = `../public/images/${option_arr[q_no][0]}.jpg`;
    // scd_img.src = `../public/images/${option_arr[q_no][1]}.jpg`;
    // third_img.src = `../public/images/${option_arr[q_no][2]}.jpg`;
    // forth_img.src = `../public/images/${option_arr[q_no][3]}.jpg`;

    // scd_img.height = 200;
    // scd_img.width = 200;
    op1_txt.innerText = `${option_arr[q_no][0]}`;
    op2_txt.innerText = `${option_arr[q_no][1]}`;
    op3_txt.innerText = `${option_arr[q_no][2]}`;
    op4_txt.innerText = `${option_arr[q_no][3]}`;
    // op1.appendChild(op_one);
    // op1.innerText = "tea";
    // op1.appendChild(fst_img);
    // op2.appendChild(scd_img);
    // op3.appendChild(third_img);
    // op4.appendChild(forth_img);
}
// op1.innerHTML = "tea pic"
const main_container = document.getElementById("main_container");

function finish_ques() {
    main_container.style.display = "none";
    how_to_play.style.display = "none";
    share_link.style.display = "flex";
    players_section_id.style.display = "flex";


    const data = {
        userans: player_ans,
        user: user
    }
    localStorage.setItem("user_ans", player_ans);
    const fetchoptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch("/finish", fetchoptions).then(response => response.json()).then((data)=>
    {
        console.log(data);
        var link = "https://quiz-app-ashish.herokuapp.com/"+data.current_id;
        copy_link.value = link;
        localStorage.setItem("id", data.current_id)
    })
    // fetch("/finish").then((res)=>
    // {
    //     console.log("getting the id of current user");
    //     console.log(res.json());
    // })
    // fetch("http://localhost:5500/finish",{
    //     method:"GET"
    // })
}
var qz_player = "";
var qz_user_ans = "";
var qz_user_id = "";
function start_quiz() {
    if (player_name.value == "") {
        alert("please enter a name")
    }
    else{
        username_container[0].style.display = "none"
        container[0].style.display = "flex";
     
        fetch('/xyz')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                qz_player = data.user;
                qz_user_ans = data.quiz_user_ans;
                qz_user_id = data._id;
    
                var questions = [`What is ${data.user} fav drink`, "Capital of India", "which is longest river in world", "What is 5 x 3"]
                console.log(qz_player);
                console.log(`quiz started player name ${player_name.value}`)
    
                // display(q_no);
                question_arr = questions;
                var que_len = question_arr.length;
                display(q_no);
                // console.log(qz_player);
            });

    }



}
var player_score = 0;
function calculate() {
    const player_score_display = document.getElementById("player_score");
    console.log(`player ans = ${player_ans}`);
    console.log(`qz_user ans = ${qz_user_ans}`);

    for (let i = 0; i < player_ans.length; i++) {

        if (player_ans[i] == qz_user_ans[i] && (qz_user_ans[i] != 0)) {
            player_score = player_score + 1;
        }
    }
    console.log(player_score);
    container[0].style.display = "none";
    player_score_display.style.display = "block"
    player_score_display.innerHTML = `Your total score = ${player_score}`

    //posting data
    // const data = {
    //     player: player_name.value,
    //     player_score: player_score
    // }
    // // localStorage.setItem("user_ans",player_ans);
    // const fetchoptions = {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // }
    // fetch("/submit_quiz", fetchoptions);

}
function submit() {
    // console.log(player_ans)   
    calculate();
    const data = {
        player: player_name.value,
        player_score: player_score,
        id: qz_user_id,
    }
    // localStorage.setItem("user_ans",player_ans);
    const fetchoptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch("/submit_quiz", fetchoptions);
    fetch('/xyz')
        .then(response => response.json()).then((data) => {
            // console.log(data);
            var s = "";
          for (let i = 0; i < data.players.length; i++) {
            s = s+ ` 
            <tr>
            
            <td>${data.players[i]}</td>
            <td>${data.player_scores[i]}</td> 
            </tr>`
            
            
              
          }
          s = s+ `       <tr>
            
          <td>${player_name.value}</td>
          <td>${player_score}</td> 
          </tr>`
          players.innerHTML = s;
          players_section_id.style.display = "block"
        })

    // .then(data => {
    //     console.log(data)
    // }


}


// players.innerHTML= "hello"