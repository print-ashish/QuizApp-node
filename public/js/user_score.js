const players_section_id = document.getElementById("players_section_id");
// fetch("/userscore").then((res)=> res.json()).then((data)=>
// {
//     console.log("fetching user score data", data);
// })
fetch('/xyz')
.then(response => response.json()).then((data) => {
    // console.log(data);
    if (data.players.length > 0) {
      
      var s = "";
    for (let i = 0; i < data.players.length; i++) {
      s = s+ ` 
      <tr>
      
      <td>${data.players[i]}</td>
      <td>${data.player_scores[i]}</td> 
      </tr>`
      
      
        
    }
  
    players.innerHTML = s;
    }
    else{
      players.innerHTML = "No players have answered your quiz share the link"
    }
    
  players_section_id.style.display = "flex"
})