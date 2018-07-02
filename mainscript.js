$(function() {
    console.log('ready');
});


// Récupère le code HTML du contenu de la div #main
function getMainContent(){
    var c = $('#main')[0].outerHTML;
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
    $('#code').html(text);
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

// Déselectionne toute sélection
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
    document.execCommand("selectAll",false,null);
    document.execCommand(style,status,value);
    document.execCommand("formatBlock",false,"<p>");
    document.execCommand("justifyLeft",false, null);
    document.execCommand("unlink",false,null);
    document.execCommand("foreColor",false,"#000000"); // A tester
    //retirer le format liste
    clearSelection();
    $('#efface').removeClass('pin');
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
    $('#main').on('keyup', function(){
        var main_content = getMainContent();  
        displayCode(main_content);
    });
    
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

    $('#gras').on('click', function(){
        actionOnText("bold",false,null);
    });

    $('#italique').on('click', function(){
        actionOnText("italic",false,null);
    });

    $('#liste-ul').on('click', function(){
        actionOnText("InsertUnorderedList",false,null);
    });

    $('#liste-ol').on('click', function(){
        actionOnText("InsertOrderedList",false,null);
    });

    $('#al-gauche').on('click', function(){
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

    // Ajouter cursor pointer sur le lien
    $('#lien').on('click', function(){
        var linkURL = prompt("Entrez l'URL du lien : ")
        actionOnText("createLink",false,linkURL);
    });

    $('#pas-de-lien').on('click', function(){
        actionOnText("unlink",false,null);
    });   

    // ne fonctionne pas / Intégrer le color picker
    $('#couleur').on('click', function(){
        var color = prompt('Saisissez une couleur prédéfinie ou un code hexadécimal :');
        document.onclick = actionOnText("foreColor",false,color);
    });

    // ne fonctionne pas / Intégrer le travail de Loutfi
    $('#image').on('click', function(){
        var imgSrc = prompt("Entrez l'URL de l'image : ")
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

main();


// document.execCommand("bold")







