// SERVEUR ---------------------------------------------------------------------
function checkServer(srv, player, gameMode, cb_func){
  var ret = "";

  if(srv.length == 0){
    ret = "Veuillez renseigner une adresse";
  }else if (player.length == 0){
    ret = "Veuillez renseigner un nom de joueur";
  }else{
    $.ajax({
           url: "http://" + srv + "/connect/" + player,
           data: "",
           contentType: "application/json; charset=utf-8",
           type: "GET",
           success: function (data) {
              ret = "succes"

              CODE        = data.code;

              ADRESSE_SRV = srv;
              PLAYER_NAME = player;

              PLAYER_ID   = data.idJoueur;
              PLAYER_NUM  = data.numJoueur;

              GAME_MODE_HUM = gameMode;

              cb_func(ret);

           },
           error: function (x, y, z) {
              console.log(x.responseText + "  " + x.status);
           }
       });
  }
}

function runThread(){
  clearInterval(ID_THREAD);
  callServerTurn(
    function(ret){
      console.log("callServerTurn code -> " + CODE)

      if(STATUS == 1){
        updateHeader();
        updateTable();
        if (GAME_MODE_HUM == false) {
          playIA();
        }
      }else{
        ID_THREAD = setInterval(runThread(), 1000);
      }
    });
}

function callServerTurn(cb_func){
  $.ajax({
         url: "http://" + ADRESSE_SRV + "/turn/" + PLAYER_ID,
         data: "",
         contentType: "application/json; charset=utf-8",
         type: "GET",
         success: function (data) {

           STATUS = data.status;

          // if(STATUS == 1 ){

             TABLEAU           = data.tableau;

             TURN_CPT          = data.numTour;

             NB_TENAILLE_J1    = data.nbTenaillesJ1;
             NB_TENAILLE_J2    = data.nbTenaillesJ2;

             DERNIER_COUP_X    = data.dernierCoupX;
             DERNIER_COUP_Y    = data.dernierCoupY;

             PROLONGATION      = data.prolongation;
             FIN_PARTIE        = data.finPartie;
             DETAIL_FIN_PARTIE = data.detailFinPartie;

             ret = "Your turn" + PLAYER_NAME;

           /*}else{
             ret = "Waiting your turn";
           }*/

            cb_func(ret);

         },
         error: function (x, y, z) {
            console.log(x.responseText + "  " + x.status)
         }
     });
}

function callServerPlay(x, y, cb_func){
  $.ajax({
         url: "http://" + ADRESSE_SRV + "/play/" + x + "/" + y + "/" + PLAYER_ID,
         data: "",
         contentType: "application/json; charset=utf-8",
         type: "GET",
         success: function (data) {

           CODE   = data.code;

           STATUS = 0;

           cb_func(ret);

         },
         error: function (x, y, z) {
            console.log(x.responseText + "  " + x.status);
         }
     });
}

function checkCodeFromPlay(){
  var ret  = false;
  var cons = "";

  switch(CODE){
    case "200":
      ret  = true;
      cons = "Play is validated";
      break;

    case "401":
      cons = "Player is unauhorized (player name not validate for the game)";
      break;

    case "406":
      cons = "Play is not validated";
      break;

    case "503":
      cons = "Server is unavailable";
      break;
  }

  console.log(cons);

  return ret;
}

// IA --------------------------------------------------------------------------
function playIA(){
  THE_IA.setTab(TABLEAU);
  var toPlay = THE_IA.play(DERNIER_COUP_X, DERNIER_COUP_Y, TABLEAU, NB_TENAILLE_J1, NB_TENAILLE_J2, TURN_CPT);
  callServerPlay(toPlay[0], toPlay[1], function (ret){
    console.log("callServerPlay : " + CODE);
  });
}

// -----------------------------------------------------------------------------
function updateHeader(){
  if(PLAYER_NUM == 1 )
  {
    document.getElementById("namej1").innerHTML  = PLAYER_NAME;
  }
  else if (PLAYER_NUM == 2 ) {
    document.getElementById("namej2").innerHTML  = PLAYER_NAME;
  }

  document.getElementById("score1").innerHTML  = NB_TENAILLE_J1;
  document.getElementById("score2").innerHTML  = NB_TENAILLE_J2;

  document.getElementById("cptturn").innerHTML = TURN_CPT;
}

function updateTable(){
  var tab = TABLEAU;

  console.log("Update table for player " + PLAYER_NUM + " " + PLAYER_NAME);

  for(var x = 0; x < 19; x++){

    for(var y = 0; y < 19; y++){

      var val = tab[x][y];
      var id  = x + ";" + y;
      var elem = document.getElementById(id);

      switch (val) {
        case 1:
          //$(id).css('opacity', '1');
          //$(id).css('fill', COLOR_PION_J1);

          $(elem).css('opacity', '1');
          $(elem).css('fill', COLOR_PION_J1);
          break;
        case 2:
        $(elem).css('opacity', '1');
        $(elem).css('fill', COLOR_PION_J2);
          break;
        default:
          $(elem).css('opacity', '0');
          break;
      }
    }
  }


}

$(document).ready(function () {

  updateHeader();

  $(document).on("click", "#validate", function (evt) {
    var srv  = document.getElementById("srvadress").value;
    var name = document.getElementById("playername").value;
    var gameMode = document.getElementById("gamemode").value;
    checkServer(srv, name, gameMode, function(val) {
      /*
      console.log("Adresse SRV -> " + ADRESSE_SRV);
      console.log("Player name -> " + PLAYER_NAME);
      console.log("Player ID   -> " + PLAYER_ID);
      console.log("Player num  -> " + PLAYER_NUM);

      console.log("checkServer code -> " + CODE);
      */

      if(CODE == "200"){
        console.log("Player is connected to server");

        updateHeader();

        // TODO -> Start IA
        if (GAME_MODE_HUM == false) {
          THE_IA = new IA(PLAYER_ID, PLAYER_NUM);
        }

        ID_THREAD = setInterval(runThread(), 1000);

      }else if (CODE == "401") {
        console.log("Game is already running, can't join the server");

      }else{
        console.log("Server conncetion failled. Error -> " + CODE);
      }
    });
  });

  $("#gamemode").bind("click", function(evt){
    HUMAN_VS_IA = true;
    $(this).disabled = true;

    console.log("Human vs IA mode activated");
  });

  $(".point").bind("click", function (evt){

    if(GAME_MODE_HUM){

    // If status value is not 1, then it's not your turn to play
    if(STATUS == 1){
      $(this).css('opacity', '1');

      if(PLAYER_NUM == 1){
        $(this).css('fill', COLOR_PION_J1);
      }else if (PLAYER_NUM == 2) {
        $(this).css('fill', COLOR_PION_J2);
      }



        var id = $(this).attr("id");

        var x = $(this).attr("x");
        var y = $(this).attr("y");

        callServerPlay(x, y, function(val){
          console.log(CODE);
          console.log("Start thread Turn");

          callServerTurn(function(ret){
                console.log("callServerTurn code -> " + CODE)

                  updateHeader();
                  updateTable();
              });

          ID_THREAD = setInterval(runThread(), 1000);
        });

      }
    }

  });


});
