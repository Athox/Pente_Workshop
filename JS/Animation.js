// SERVEUR ---------------------------------------------------------------------
function checkServer(srv, player, gameMode, cb_func){
  var ret = "";

  if(srv.length == 0){
    ret = "Veuillez renseigner une adresse";
  }else if (player.length == 0){
    ret = "Veuillez renseigner un nom de joueur";
  }else{
    $.ajax({
           url: srv + "/connect/" + player,
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

function callServerTurn(cb_func){
  $.ajax({
         url: ADRESSE_SRV + "/turn/" + PLAYER_ID,
         data: "",
         contentType: "application/json; charset=utf-8",
         type: "GET",
         success: function (data) {

             STATUS = data.status;

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

            cb_func(ret);

         },
         error: function (x, y, z) {
            console.log(x.responseText + "  " + x.status)
         }
     });
}

function callServerPlay(x, y, cb_func){
  $.ajax({
         url: ADRESSE_SRV + "/play/" + x + "/" + y + "/" + PLAYER_ID,
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


// Check code from srv methods -------------------------------------------------
function checkCodeFromPlay(){
  var ret  = false;
  var cons = "";

  switch(CODE){
    case 200:
      ret  = true;
      cons = "Play is validated";
      break;

    case 401:
      cons = "Player is unauhorized (player name not validate for the game)";
      break;

    case 406:
      cons = "Play is not validated";
      break;

    case 503:
      cons = "Server is unavailable";
      break;
  }

  console.log(cons);

  return ret;
}

function checkCodeFromConnect(){
  var type = "";
  var text = "";
  var icon = "";

  if(CODE == "200"){

    console.log("Player is connected to server");

    updateHeader();

    if (GAME_MODE_HUM == false) {
      THE_IA = new IA(PLAYER_ID, PLAYER_NUM);
    }

    ID_THREAD = setInterval(runThread(), 1000);


    $.toast({
      heading: 'Information',
      text: 'Now you can add icons to generate different kinds of toasts',
      showHideTransition: 'slide',
      icon: 'info'
    });

  }else if (CODE == "401") {
    console.log("Game is already running, can't join the server");

  }else if (CODE == "503") {

  }else{
    console.log("Server conncetion failled. Error -> " + CODE);
  }


}


// IA --------------------------------------------------------------------------
function playIA(){
  THE_IA.setTab(TABLEAU);
  var toPlay = THE_IA.play(DERNIER_COUP_X, DERNIER_COUP_Y, TABLEAU, NB_TENAILLE_J1, NB_TENAILLE_J2, TURN_CPT);

  callServerPlay(toPlay[0], toPlay[1], function(val){

    var ret = checkCodeFromPlay();

    if(ret){
      updatePoint(this);
      callServerTurn(function(ret)
      {
              updateHeader();
              updateTable();
      });
    }

    ID_THREAD = setInterval(runThread(), 1000);
  });
}



// -----------------------------------------------------------------------------
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

function updateHeader(){
  if(PLAYER_NUM == 1 )
  {
    document.getElementById("namej1").innerHTML  = PLAYER_NAME;

    if(STATUS == 1){
      $('.player1').addClass('active');
      $('.player2').removeClass('active');
    }else{
      $('.player1').removeClass('active');
      $('.player2').addClass('active');
    }
  }
  else if (PLAYER_NUM == 2 ) {
    document.getElementById("namej2").innerHTML  = PLAYER_NAME;

    if(STATUS == 1){
      $('.player1').removeClass('active');
      $('.player2').addClass('active');
    }else{
      $('.player1').addClass('active');
      $('.player2').removeClass('active');
    }
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

function updatePoint(elem){
  $(elem).css('opacity', '1');

  if(PLAYER_NUM == 1){
    $(elem).css('fill', COLOR_PION_J1);
  }else if (PLAYER_NUM == 2) {
    $(elem).css('fill', COLOR_PION_J2);
  }
}



// -----------------------------------------------------------------------------
$(document).ready(function () {

  // Update de la partie en-tête à partir des variables global
  updateHeader();

  // Test des informations fournies pour la co au SRV
  $(document).on("click", "#validate", function (evt) {

    // Récupération des informations données par l'utilisateur
    var srv      = document.getElementById("srvadress").value;
    var name     = document.getElementById("playername").value;
    var gameMode = document.getElementById("gamemode").checked;

    // Call de la méthode de connection au SRV
    checkServer(srv, name, gameMode, function(val) {

      checkCodeFromConnect();

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

        var id = $(this).attr("id");

        var x = $(this).attr("x");
        var y = $(this).attr("y");

        callServerPlay(x, y, function(val){

          var ret = checkCodeFromPlay();

          if(ret){
            updatePoint(this);

            callServerTurn(function(ret)
            {
                    updateHeader();
                    updateTable();
            });
          }

          ID_THREAD = setInterval(runThread(), 1000);
        });

      }
    }

  });


});
