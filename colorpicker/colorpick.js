//Pour changer la couleur d'un texte d'après un color picker
//DOC SUR https://developer.mozilla.org/fr/docs/Web/HTML/Element/Input/color

var colorWell;
var defaultColor = "#000000";

window.addEventListener("load", startup, false);
function startup() {
  colorWell = document.querySelector("#colorset");
  colorWell.value = defaultColor;
  colorWell.addEventListener("input", updateFirst, false);
  colorWell.addEventListener("change", updateAll, false);
  colorWell.select();
}
function updateFirst(event) {
  var p = document.querySelector("#colortext");

  if (p) {
    p.style.color = event.target.value;
  }
}function updateAll(event) {
  $('#colortext').select.forEach(function(p) {
    p.style.color = event.target.value;
  });
}
