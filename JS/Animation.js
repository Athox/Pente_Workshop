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
           error: function (data) {
             CODE = data.status;
             cb_func(ret);
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

             // TURN_CPT          = data.numTour;

             NB_TENAILLE_J1    = data.nbTenaillesJ1;
             NB_TENAILLE_J2    = data.nbTenaillesJ2;

             DERNIER_COUP_X    = data.dernierCoupX;
             DERNIER_COUP_Y    = data.dernierCoupY;

             PROLONGATION      = data.prolongation;
             FIN_PARTIE        = data.finPartie;
             DETAIL_FIN_PARTIE = data.detailFinPartie;

            cb_func();

         },
         error: function (data) {
           CODE = data.status;
           cb_func();
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

           cb_func();

         },
         error: function (data) {
            CODE = data.status;
            cb_func();
         }
     });
}


// Check code from srv methods -------------------------------------------------
function checkCodeFromPlay(){
  var ret  = false;
  var type = null;

  if(CODE != 200){
    switch(CODE){
      case 401:
        TOAST_TEXT = "Le joueur n'est pas authorisé (le nom de joueur n'est pas valide  pour la parite)";
        type       = 2;
        break;

      case 406:
        TOAST_TEXT = "Le coup n'est pas valide ! ";
        type       = 3;
        break;

      case 503:
        TOAST_TEXT = "Le serveur n'est pas accessible";
        type       = 2;
        break;

      default:
        TOAST_TEXT = "Le serveur n'est pas accessible";
        type       = 2;
        break;

    }

    displayToast(type);
  }else{
    ret  = true;
  }

  return ret;
}

function checkCodeFromConnect(){
  var type = null;
  var tmp  = TOAST_DISP_TIME;

  if(CODE == 200){
    TOAST_TEXT = 'Connexion au serveur réussi';
    displayToast(0);

    updateHeader();

    if (GAME_MODE_HUM == false) {
      THE_IA = new IA(PLAYER_ID, PLAYER_NUM);
    }
    if(ID_THREAD == 0 && FIN_PARTIE == false){
      ID_THREAD = setInterval(runThread, 1000);
    }


    TOAST_TEXT       = "Vous êtes le joueur numéro " + PLAYER_NUM;
    TOAST_DISP_TIME  = 2000;
    type       = 1;

  }else if (CODE == 401) {
    TOAST_TEXT = "Une partie est déjà en cours. Vous ne pouvez pas la rejoindre !";
    type       = 2;
  }else if (CODE == 503) {
    TOAST_TEXT = "Le serveur est indisponible, code http " + CODE;
    type       = 2;
  }else{
    TOAST_TEXT = "Le serveur est indisponible, code http " + CODE;
    type       = 2;
  }

  displayToast(type);
  TOAST_DISP_TIME = tmp;
}

function checkCodeFromTurn(){
  var ret  = false;
  var type = null;

  if(CODE != 200){
  switch(CODE){

    case 401:
      TOAST_TEXT = "Le joueur n'est pas authorisé (le nom de joueur n'est pas valide  pour la parite)";
      type       = 2;
      break;

    case 503:
      TOAST_TEXT = "Le serveur n'est pas accessible";
      type       = 2;
      break;

    default:
      TOAST_TEXT = "Le serveur n'est pas accessible";
      type       = 2;
      break;

  }
    displayToast(type);
  }else{
    ret = true;
  }
  return ret;
}



// IA --------------------------------------------------------------------------
function playIA(){
  var turn = 0;

  THE_IA.setTab(TABLEAU);

  var toPlay = THE_IA.play(DERNIER_COUP_X, DERNIER_COUP_Y, TABLEAU, NB_TENAILLE_J1, NB_TENAILLE_J2, TURN_CPT);

  setTimeout(function() {

      callServerPlay(toPlay[0], toPlay[1], function(){

        var ret = checkCodeFromPlay();

        if(ret){
          updatePoint(this);
          callServerTurn(function()
          {
                  checkCodeFromTurn();

                  updateHeader();
                  updateTable();

                  if(FIN_PARTIE){
                    document.getElementById("popupwin").click();
                  }
          });
        }
        if(ID_THREAD == 0 && FIN_PARTIE == false){
          ID_THREAD = setInterval(runThread, 1000);
        }

      });

  }, TMP_FOR_PLAY);
}



// -----------------------------------------------------------------------------
function runThread(){
  clearInterval(ID_THREAD);
  ID_THREAD = 0;
  callServerTurn(
    function(ret){
      console.log("callServerTurn code -> " + CODE)

      var ret = checkCodeFromTurn();

      if(STATUS == 1){
        TOAST_TEXT = "A vous de jouer !";
        displayToast(1);

        updateHeader();
        updateTable();

        if(!FIN_PARTIE){
          if (GAME_MODE_HUM == false) {
            playIA();
          }
        }else{
          document.getElementById("popuplose").click();
        }
      }else{
        if(ID_THREAD == 0 && FIN_PARTIE == false){
          ID_THREAD = setInterval(runThread, 1000);
        }
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
          IS_FIRST_TURN = false;
          break;

        case 2:
          $(elem).css('opacity', '1');
          $(elem).css('fill', COLOR_PION_J2);
          IS_FIRST_TURN = false;
          break;

        default:
          $(elem).css('opacity', '0');
          break;
      }
    }
  }

  if(IS_FIRST_TURN){
    TURN_CPT = 0;
  }else{
    TURN_CPT = TURN_CPT + 1;
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

function displayToast(type){
  $.toast({
    heading: TOAST_HEADING[type],
    text: TOAST_TEXT,
    showHideTransition: TOAST_TRANSITION,
    icon: TOAST_ICON[type],
    hideAfter: TOAST_DISP_TIME,
    position: TOAST_POSITION,
    loaderBg: TOAST_LOADER_COL
  });
}



// -----------------------------------------------------------------------------
$(document).ready(function () {

  // Update de la partie en-tête à partir des variables global
  updateHeader();

  $("#gamemode").bind("click", function(evt){
    var gameMode = document.getElementById("gamemode").checked;
    if(gameMode){
      TOAST_TEXT = "Mode joueur humain activé";
    }else{
      TOAST_TEXT = "Mode joueur humain désactivé";
    }

    displayToast(1);
  });

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

  $(".point").bind("click", function (evt){

    if(GAME_MODE_HUM){

    // If status value is not 1, then it's not your turn to play
    if(STATUS == 1){

        var id = $(this).attr("id");

        var x = $(this).attr("x");
        var y = $(this).attr("y");

        callServerPlay(x, y, function(){

          var ret = checkCodeFromPlay();

          if(ret){
            updatePoint(this);

            callServerTurn(function()
            {
                var ret = checkCodeFromTurn();

                if(FIN_PARTIE){
                  document.getElementById("popupwin").click();
                }

                updateHeader();
                updateTable();
            });
          }

          if(ID_THREAD == 0 && FIN_PARTIE == false){
            ID_THREAD = setInterval(runThread, 1000);
          }
        });

      }
    }

  });
});
