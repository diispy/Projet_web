$(document).ready(function (){
    $('.btn_menu').click(function(){
        $(this).find('.barre').toggleClass('ouvert'); /* Changement de classe pour changer la couleur du bouton*/
        $('.menu').toggleClass('ouvert'); /* Changement de classe pour ouvrir le menu*/
    })
});