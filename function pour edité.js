
     /*.toString*/
// te renvoie une chaîne de caractères que tu peux par exemple stocker quelque part 
// pour l'utiliser d'une manière ou d'une autre dans la suite de ton code. De plus, 
// la méthode toString() est définie dans la classe Object
// Parce que comme ça tu peux faire des "sommes" de n'importe quels objets possédant
 // la méthode toString : "blabla" + objet1 + objet3. Ca va concaténer les chaînes de 
 // caractères renvoyées par ces fonctions, ce qui est souvent pratique.

 	/*createRange*/
// L'objet Range (littéralement : "étendue" ou "portée", ici : "segment") représente un 
// fragment de document qui peut contenir des nœuds et des parties de nœuds texte dans un 
// document donné.
// Un segment peut être crée en utilisant la méthode createRange de l'objet document. Les 
// objets range peuvent également être récupérés en utilisant la méthode getRangeAt de l'objet
// selection.

function getSelectedText() {
    var text = "";
    if (window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}

function queFaireAvecLeText() {
    var selectedText = getSelectedText();
    if (selectedText) {
        alert("qu'est tu veux faire avec ? " + selectedText);
    }
}

document.onmouseup = queFaireAvecLeText;
document.onkeyup = queFaireAvecLeText;