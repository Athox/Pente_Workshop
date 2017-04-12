// SERVEUR ---------------------------------------------------------------------
function checkServer(srv, player, cb_func){
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

              cb_func(ret);

           },
           error: function (x, y, z) {
              console.log(x.responseText + "  " + x.status)
           }
       });
  }
}

function callServerTurn(cb_func){
  $.ajax({
         url: "http://" + ADRESSE_SRV + "/turn/" + PLAYER_ID,
         data: "",
         contentType: "application/json; charset=utf-8",
         type: "GET",
         success: function (data) {

           STATUS = data.status;

           if(STATUS == 1){

             TABLEAU           = data.tableau;

             TURN_CPT          = data.numTour;

             NB_TENAILLE_J1    = data.nbTenaillesJ1;
             NB_TENAILLE_J2    = data.nbTenaillesJ2;

             DERNIER_COUP_X    = data.dernierCoupX;
             DERNIER_COUP_Y    = data.dernierCoupY;

             PROLONGATION      = data.prolongation;
             FIN_PARTIE        = data.finPartie;
             DETAIL_FIN_PARTIE = data.detailFinPartie;

           }else{
             ret = "Waiting your turn";
           }

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


// IA --------------------------------------------------------------------------
function playIA(x, y){
  callServerPlay(x, y, function (ret){
    console.log("Tour finis");
  });
}

// -----------------------------------------------------------------------------
function updateHeader(){
  document.getElementById("namej1").innerHTML  = PLAYER_NAME;

  document.getElementById("score1").innerHTML  = NB_TENAILLE_J1;
  document.getElementById("score2").innerHTML  = NB_TENAILLE_J2;

  document.getElementById("cptturn").innerHTML = TURN_CPT;
}

function updateTable(){
  var tab = TABLEAU;

  for(var x = 0; x < 19; x++){

    for(var y = 0; y < 19; y++){

      var val = tab[x][y];
      var id  = x + ";" + y;

      switch (val) {
        case 1:
          document.getElementById(id).innerHTML = "j1";
          break;
        case 2:
          document.getElementById(id).innerHTML = "j1"
          break;
        default:
          // Do nothing
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

    checkServer(srv, name, function(val) {
      console.log("Adresse SRV -> " + ADRESSE_SRV);
      console.log("Player name -> " + PLAYER_NAME);
      console.log("Player ID   -> " + PLAYER_ID);
      console.log("Player num  -> " + PLAYER_NUM);

      console.log("checkServer code -> " + CODE);

      document.getElementById("namej1").innerHTML = PLAYER_NAME;

      // TODO -> Start IA

      ID_THREAD = setInterval(callServerTurn(function(ret){
          console.log("callServerTurn code -> " + CODE)

          if(STATUS == 1){
            updateHeader();
            updateTable();
          }

      }), 500);

      /*
      clearInterval(ID_THREAD);
      ID_THREAD = 0;
      */

    });
  });

  $(".point").bind("click", function (evt){

    // If status value is not 1, then it's not your turn to play
    if(STATUS == 1){
      var id = $(this).attr("id").value;

      var x = $(this).attr("x").value;
      var y = $(this).attr("y").value;

      callServerPlay(x, y, function(val){
        $(this).css('opacity', '1');
      });
    }
  });


});
