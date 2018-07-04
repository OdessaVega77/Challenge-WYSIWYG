'use strict';

$(function() {
    console.log('ready');

var selColor;


// Récupère le code HTML du contenu de la div #main
function getMainContent(){
    var c = $('#visuel main')[0].outerHTML;
    return c; 
}


// Affiche le code HTML de la div #main dans la div #code
function displayCode(tab) {
    var text = "";
    for (let i = 0; i < tab.length; i++) {
        if (tab[i] == '<') {
            text = text + '&lt;';
        } else if (tab[i] == '>') {
            text = text + '&gt;';
        } else {
            text = text + tab[i];
        }
    }
    $('#code main').html(text);
}


// Récupère le texte sélectionné
function getSelectedText() {
    var text = "";
    if (window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}


// Déselectionne toute la sélection
function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }
    if (document.selection){
        document.selection.empty();
    }
}


// Supprime la mise en forme de tout le document
function eraser(style, status,value) {
    var str = $('#visuel main').text();
        $('#visuel main').html(str);
        // $('#visuel main').wrap('<div></div>');
}


// Action sur le texte sélectionné
function actionOnText(style, status,value) {
    var selectedText = getSelectedText();
    if (selectedText) {
        console.log("ca se passe là");
        document.execCommand(style,status,value);
    } //si rien n'est selectionné et qu'il y a un clic sur le bouton eraser
    else if (!selectedText && $('#efface').hasClass('pin')) {
        console.log("Me voila!!"); 
        eraser(style,status,value);
    }
}



// Fonction principale
function main() {


    // Au clic sur l'onglet 'code'
    $(".second").on("click",function() {
        $("#code").removeClass("hidden");
        $("#visuel").addClass("hidden");
        $(".first").css('background','#b8b8b8')
        $(this).css('background','#d8d8d8')
        $(this).addClass("active");
        var main_content = getMainContent();  
        displayCode(main_content);
    });


    // Au clic sur l'onglet visuel
    $(".first").on("click",function(){
        $("#visuel").removeClass("hidden");
        $("#code").addClass("hidden");
        $(this).css('background','#d8d8d8')
        $(".second").css('background','#b8b8b8');
    });


    // Au clic sur les éléments de la liste déroulante
    // NE FONCTIONNE PAS SOUS CHROME
    $('#liste-deroulante option:nth-of-type(1)').on('click', function(){
        actionOnText("formatBlock",false,"<p>");
    });
    $('#liste-deroulante option:nth-of-type(2)').on('click', function(){
        actionOnText("formatBlock",false,"<h1>");
    });
    $('#liste-deroulante option:nth-of-type(3)').on('click', function(){
        actionOnText("formatBlock",false,"<h2>");
    });
    $('#liste-deroulante option:nth-of-type(4)').on('click', function(){
        actionOnText("formatBlock",false,"<h3>");
    });
    $('#liste-deroulante option:nth-of-type(5)').on('click', function(){
        actionOnText("formatBlock",false,"<h4>");
    });
    $('#liste-deroulante option:nth-of-type(6)').on('click', function(){
        actionOnText("formatBlock",false,"<h5>");
    });
    $('#liste-deroulante option:nth-of-type(7)').on('click', function(){
        actionOnText("formatBlock",false,"<h6>");
    });


    // Au clic sur les boutons de style
    $('#gras').on('click', function(){
        actionOnText("bold",false,null);
    });
    $('#italique').on('click', function(){
        actionOnText("italic",false,null);
    });

    // Au clic sur les boutons de liste
    $('#liste-ul').on('click', function(){
        actionOnText("insertUnorderedList",false,null);
    });
    $('#liste-ol').on('click', function(){
        actionOnText("insertOrderedList",false,null);
    });


    // Au clic sur les boutons d'alignement de texte
    $('#al-gauche').on('click', function(){ 
        // NE FONCTIONNE PAS
        actionOnText("justifyLeft",false,null);
    });
    $('#al-centre').on('click', function(){
        actionOnText("justifyCenter",false,null);
    });
    $('#al-droite').on('click', function(){
        actionOnText("justifyRight",false,null);
    });
    $('#al-justifie').on('click', function(){
        actionOnText("justifyFull",false,null);
    });


    // Ajouter ou supprimer un lien
    // A AMELIORER ?
    $('#lien').on('click', function(){
        var linkURL = prompt("Entrez l'URL du lien (http(s)://) : ")
        actionOnText("createLink",false,linkURL);
    });
    $('#pas-de-lien').on('click', function(){
        actionOnText("unlink",false,null);
    });   


    // Palette de couleur
    // Au clic sur le bouton 'A'
    $('#couleur').on('click', function(){
        $('#palette').toggleClass('hidden');
        //document.onclick = actionOnText("foreColor",false,selColor);
    });
    // Au clic sur sur une des cases de couleur
    //CERTAINES COULEURS NE SONT PAS OK
    // ELLES SONT DECALEES
     $("#camaieu div").on("click",function() {
        selColor = $(this).attr("class");
        console.log(selColor);
        document.onclick = actionOnText("foreColor",false,selColor);
    });
    
    




    // ne fonctionne pas / Intégrer le travail de Loutfi
    $('#image').on('click', function(){
        var imgSrc = prompt("Entrez l'URL de l'image : ")
        console.log("url = " + imgSrc);
        if (imgSrc != null) {
            document.onclick = actionOnText("insertImage",false,imgSrc);
            }
    });

    $('#efface').on('click', function(){
        $(this).addClass('pin');
        actionOnText("removeFormat",false,null);
    }); 




   

    

    //document.onkeyup = actionOnText;
    //document.onmouseup = actionOnText;
    //document.onmouseup = bold;
      
}
//initialiseLeColorPicker();
main();


});








