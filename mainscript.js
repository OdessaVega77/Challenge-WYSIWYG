'use strict';


var selColor;


// Récupère le code HTML du contenu de la div #main
function getMainContent() {
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
    if (document.selection) {
        document.selection.empty();
    }
}


// Supprime la mise en forme de tout le document
function eraser(style, status, value) {
    var str = $('#visuel main').text();
    $('#visuel main').html(str);
    // $('#visuel main').wrap('<div></div>');
}


// Action sur le texte sélectionné
function actionOnText(style, status, value) {
    var selectedText = getSelectedText();
    if (selectedText) {
        console.log("ca se passe là");
        document.execCommand(style, status, value);
    } //si rien n'est selectionné et qu'il y a un clic sur le bouton eraser
    else if (!selectedText && $('#efface').hasClass('pin')) {
        console.log("Me voila!!");
        eraser(style, status, value);
    }
}


// Récupère l'URL de l'image sélectionnée
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            // récupération de l'url de l'image sur notre ordinateur
            $('#imgs').attr('src', e.target.result);
            console.log(($('#imgs').attr('src')));
        };
        reader.readAsDataURL(input.files[0]);
    }
}


// Fonction principale
function main() {

    var is_chrome = (typeof window.chrome === "object" && navigator.appVersion.indexOf('Edge') === -1);
    console.log("is_chrome = ", is_chrome);

    // var cursor_pos = $('#visuel main')[0].selectionStart;
    // $('#visuel main').on('click',function(){
    //     console.log(cursor_pos);
    // // $('#myarea')[0].selectionStart;
    // });


    // Au clic sur l'onglet 'code'
    $(".second").on("click", function() {
        $("#code").removeClass("hidden");
        $("#visuel").addClass("hidden");
        $(".first").css('background', '#b8b8b8')
        $(this).css('background', '#d8d8d8')
        $(this).addClass("active");
        var main_content = getMainContent();
        displayCode(main_content);
    });


    // Au clic sur l'onglet visuel
    $(".first").on("click", function() {
        $("#visuel").removeClass("hidden");
        $("#code").addClass("hidden");
        $(this).css('background', '#d8d8d8')
        $(".second").css('background', '#b8b8b8');
    });


    // Au clic sur les éléments de la liste déroulante
    $('#liste-deroulante').on('change', function() {
        var sel_opt = $(this).val()
        console.log("value = " + sel_opt);
        if (sel_opt == "paragraphe") {
            actionOnText("formatBlock", false, "<p>");
        } else if (sel_opt == "titre1") {
            actionOnText("formatBlock", false, "<h1>");
        } else if (sel_opt == "titre2") {
            actionOnText("formatBlock", false, "<h2>");
        } else if (sel_opt == "titre3") {
            actionOnText("formatBlock", false, "<h3>");
        } else if (sel_opt == "titre4") {
            actionOnText("formatBlock", false, "<h4>");
        } else if (sel_opt == "titre5") {
            actionOnText("formatBlock", false, "<h5>");
        } else if (sel_opt == "titre6") {
            actionOnText("formatBlock", false, "<h6>");
        }
    });


    // Au clic sur les boutons de style
    $('#gras').on('click', function() {
        actionOnText("bold", false, null);
    });
    $('#italique').on('click', function() {
        actionOnText("italic", false, null);
    });

    // Au clic sur les boutons de liste
    $('#liste-ul').on('click', function() {
        actionOnText("insertUnorderedList", false, null);
    });
    $('#liste-ol').on('click', function() {
        actionOnText("insertOrderedList", false, null);
    });


    // Au clic sur les boutons d'alignement de texte
    $('#al-gauche').on('click', function() {
        actionOnText("justifyLeft", false, null);
    });
    $('#al-centre').on('click', function() {
        actionOnText("justifyCenter", false, null);
    });
    $('#al-droite').on('click', function() {
        actionOnText("justifyRight", false, null);
    });
    $('#al-justifie').on('click', function() {
        actionOnText("justifyFull", false, null);
    });


    // Ajouter ou supprimer un lien
    // A AMELIORER ?
    $('#lien').on('click', function() {
        var linkURL = prompt("Entrez l'URL du lien (http(s)://) : ")
        actionOnText("createLink", false, linkURL);
    });
    $('#pas-de-lien').on('click', function() {
        actionOnText("unlink", false, null);
    });



    // Palette de couleur
    // Au clic sur le bouton 'A'
    $('#couleur').on('click', function() {
        $('#palette').toggleClass('hidden');
        //document.onclick = actionOnText("foreColor",false,selColor);
    });
    // Au clic sur sur une des cases de couleur
    //CERTAINES COULEURS NE SONT PAS OK
    // ELLES SONT DECALEES
    $("#camaieu div").on("click", function() {
        selColor = $(this).attr("class");
        console.log(selColor);
        document.onclick = actionOnText("foreColor", false, selColor);
    });



    // Au clic insérer une image
    // TROUVER COMMENT INSERER L'IMAGE LA OU SE TROUVE LE CURSEUR
    $('#image').on('click', function() {
        $("input[id='insert_img']").change(function() {
            // Création d'une div et d'une img pour placer l'img
            $('#editable').append('<div id="voir"></div>');
            $('#voir').append('<img id="imgs"></img>');
            readURL(this);
            // L'url est stockée dans une variable 
            var imgSrc = $('#imgs').attr('src');
            if (imgSrc != null) {
                document.onclick = actionOnText("insertImage", false, imgSrc);
            }
        });

    });



    // Supprime les styles de la feuille, l'alignement
    // SUPPRIME L'IMAGE AUSSI !
    $('#efface').on('click', function() {
        $(this).addClass('pin');
        actionOnText("removeFormat", false, null);
    });



    // Raccourcis clavier
    var touche = false;

    // Raccourci Bold crtl+b(firefox) ou cmd+b(chrome)
    $(document).keyup(function(e) {
        if (e.which == 17 || e.which == 91) touche = false;
    }).keydown(function(e) {
        if (e.which == 17 || e.which == 91) touche = true;
        if (e.which == 66 && touche == true) {
            actionOnText("bold", false, null);
            return false;
        }
    });

    // Raccourci Italique crtl+i(firefox) ou cmd+i(chrome)
    $(document).keyup(function(e) {
        if (e.which == 17 || e.which == 91) touche = false;
    }).keydown(function(e) {
        if (e.which == 17 || e.which == 91) touche = true;
        if (e.which == 73 && touche == true) {
            actionOnText("italic", false, null);
            return false;
        }
    });

    // Raccourci liste crtl+j(firefox) ou cmd+j(chrome)
    $(document).keyup(function(e) {
        if (e.which == 17 || e.which == 91) touche = false;
    }).keydown(function(e) {
        if (e.which == 17 || e.which == 91) touche = true;
        if (e.which == 74 && touche == true) {
            actionOnText("insertUnorderedList", false, null);
            return false;
        }
    });

    // Raccourci alignement à gauche crtl+shift+l(firefox) ou cmd+shift+l(chrome)
    $(document).keyup(function(e) {
        if (e.which == 17 || e.which == 91) touche = false;
    }).keydown(function(e) {
        if (e.which == 17 || e.which == 91) touche = true;
        if (e.which == 76 && touche == true) {
            actionOnText("justifyLeft", false, null);
            return false;
        }
    });

    // Raccourci liste crtl+e(firefox) ou cmd+e(chrome)
    $(document).keyup(function(e) {
        if (e.which == 17 || e.which == 91) touche = false;
    }).keydown(function(e) {
        if (e.which == 17 || e.which == 91) touche = true;
        if (e.which == 69 && touche == true) {
            actionOnText("justifyCenter", false, null);
            return false;
        }
    });

    // Raccourci liste crtl+r(firefox) ou cmd+r(chrome)
    $(document).keyup(function(e) {
        if (e.which == 17 || e.which == 91) touche = false;
    }).keydown(function(e) {
        if (e.which == 17 || e.which == 91) touche = true;
        if (e.which == 82 && touche == true) {
            actionOnText("justifyRight", false, null);
            return false;
        }
    });

    // Raccourci liste crtl+j(firefox) ou cmd+j(chrome)
    $(document).keyup(function(e) {
        if (e.which == 17 || e.which == 91) touche = false;
    }).keydown(function(e) {
        if (e.which == 17 || e.which == 91) touche = true;
        if (e.which == 74 && touche == true) {
            actionOnText("justifyFull", false, null);
            return false;
        }
    });

}


main();