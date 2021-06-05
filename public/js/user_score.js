const players_section_id = document.getElementById("players_section_id");
// fetch("/userscore").then((res)=> res.json()).then((data)=>
// {
//     console.log("fetching user score data", data);
// })
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

  players.innerHTML = s;
  players_section_id.style.display = "block"
})