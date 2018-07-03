// Fonction principale
function main() {
    var touche = false;

    // // Dans cette  exemples, nous avons commencé par vérifier que
    //  la key Ctrl ou cmd "  " est appuyé par l'utilisateur. 
    //  Si oui, la valeur initiale de la variable touche est définie sur true . 
    //  Si les clés sont libérées, la variable touche sera à nouveau défini sur false . 
    // // Une fois fait, nous devons vérifier que la deuxième key G est appuyer. 
    // Comme le raccourci consiste en une combinaison de clavier, 
    // nous devons également vérifier que la variable touche a la valeur true . 
    // // Si la variable touche est définie sur true et que la seconde key est G, 
    // la fonction est déclencher au Ctrl+G

    $(document).keyup(function(e) {
        if (e.which == 17 || e.which == 91) touche = false;
    }).keydown(function(e) {
        if (e.which == 17 || e.which == 91) touche = true;
        if (e.which == 71 && touche == true) {
            actionOnText("bold", false, null);
            return false;
        }
    });
    $('#italique').on('click', function() {
        actionOnText("italic", false, null);
    });
    $(document).keyup(function(e) {
        if (e.which == 17 || e.which == 91) touche = false;
    }).keydown(function(e) {
        if (e.which == 17 || e.which == 91) touche = true;
        if (e.which == 73 && touche == true) {
            actionOnText("italic", false, null);
            return false;
        }
    });
    $('#liste-ul').on('click', function() {
        actionOnText("InsertUnorderedList", false, null);
    });
    $(document).keyup(function(e) {
        if (e.which == 17 || e.which == 91) touche = false;
    }).keydown(function(e) {
        if (e.which == 17 || e.which == 91) touche = true;
        if (e.which == 76 && e.which == 16 touche == true) {
            actionOnText("InsertUnorderedList", false, null);
            return false;
        }
    });
    $('#liste-ol').on('click', function() {
        actionOnText("InsertOrderedList", false, null);
    });
    $('#al-gauche').on('click', function() {
        actionOnText("justifyLeft", false, null);
    });
    $(document).keyup(function(e) {
        if (e.which == 17 || e.which == 91) touche = false;
    }).keydown(function(e) {
        if (e.which == 17 || e.which == 91) touche = true;
        if (e.which == 76 && touche == true) {
            // Votre fonction à déclencher au Ctrl+S
            actionOnText("justifyLeft", false, null);
            return false;
        }
    });
    $('#al-centre').on('click', function() {
        actionOnText("justifyCenter", false, null);
    });
    $(document).keyup(function(e) {
        if (e.which == 17 || e.which == 91) touche = false;
    }).keydown(function(e) {
        if (e.which == 17 || e.which == 91) touche = true;
        if (e.which == 69 && touche == true) {
            // Votre fonction à déclencher au Ctrl+S
            actionOnText("justifyCenter", false, null);
            return false;
        }
    });

    $('#al-droite').on('click', function() {
        actionOnText("justifyRight", false, null);
    });
    $(document).keyup(function(e) {
        if (e.which == 17 || e.which == 91) touche = false;
    }).keydown(function(e) {
        if (e.which == 17 || e.which == 91) touche = true;
        if (e.which == 82 && touche == true) {
            actionOnText("justifyRight", false, null);
            return false;
        }
    });
    $('#al-justifie').on('click', function() {
        actionOnText("justifyFull", false, null);
    });
    $(document).keyup(function(e) {
        if (e.which == 17 || e.which == 91) touche = false;
    }).keydown(function(e) {
        if (e.which == 17 || e.which == 91) touche = true;
        if (e.which == 74 && touche == true) {
            actionOnText("justifyFull", false, null);
            return false;
        }
    });
