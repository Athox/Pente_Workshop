/* 
 * 
 * $Author: antony$
 * $Date: $
 * $Rev: $
 * Permet d'afficher des information a l'utilisateur final
 * Copyright (c) DEVLYX - Tous droits réservés
 * 
 */
var Toast = function () {
    var threadAffichage = null;
    var threadFermeture = null;

    var toast_wrapper = document.getElementById('toast_wrapper');
    var toast = document.getElementById('toast');
    var toast_text = $(toast).find('.toast_text');
    var toast_action = $(toast).find('.toast_action');

    var show = function (time, text, value) {

        if (threadAffichage !== null) {//si un toast est déjà affiché
            clearInterval(threadAffichage);//j'arrete tous les threads
            clearInterval(threadFermeture);
            $(toast_wrapper).removeClass('open');//j'enleve le toast présent
            threadFermeture = setInterval(function () {//thread qui attend le temps que le toast se ferme
                clearInterval(threadFermeture);
                threadFermeture = null;
                $(toast_wrapper).addClass('open');//j'affiche le toast
                if (value !== undefined && value !== 'undefined' && value !== null && value !== '') {//si il contient une value il crée un toast spécifique
                    makeCopyText(text, value);
                } else {
                    makeText(text);
                }
                threadAffichage = setInterval(function () {//lance un thread qui fermera le toast apres le temps passé en parametre
                    $(toast_wrapper).removeClass('open');
                    clearInterval(threadAffichage);
                    threadAffichage = null;
                }, time);
            }, 400);
        } else {//si pas de toast affiché
            clearInterval(threadFermeture);
            threadFermeture = null;
            $(toast_wrapper).addClass('open');
            if (value !== undefined && value !== 'undefined' && value !== null && value !== '') {
                makeCopyText(text, value);
            } else {
                makeText(text);
            }
            threadAffichage = setInterval(function () {
                $(toast_wrapper).removeClass('open');
                clearInterval(threadAffichage);
                threadAffichage = null;
            }, time);
        }
    };

    var hide = function () {
        clearInterval(threadAffichage);
        threadAffichage = null;
        $(toast_wrapper).removeClass('open');
    };

    var makeText = function (text) {
        $(toast_action).unbind('click');
        $(toast_text).empty().append(text);
        $(toast_action).empty().append("cacher");
        $(toast_action).bind('click', function () {
            hide();
        });
    };

    var makeCopyText = function (text, value) {
        $(toast_action).unbind('click');
        $(toast_text).empty().append(text);
        $(toast_action).empty().append("copier");
        $(toast_action).bind('click', function () {
            pointdevente.copyToClipboard(value);
        });
    };

    return {
        show: function (text) {
            show(4000, text);
        },
        showLong: function (text, value) {
            show(8000, text, value);
        },
        hide: function () {
            hide();
        }
    }
}();