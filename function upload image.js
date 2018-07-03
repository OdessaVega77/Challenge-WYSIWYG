
// Fonction principale
function main() {


    $("#image").on('click', function() {
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    //on récupere l'url de notre ordinateur
                    $('#imgs').attr('src', e.target.result);
                    console.log(($('#imgs').attr('src')));
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
        $("input[id='test']").change(function() {
            //on place l'image dans une div 
            $('#colorWell').append('<div id="voir"></div>');
            $('#voir').append('<img id="imgs"></img>');

            readURL(this);
            //on met le l'url dans une variable 
            imgSrc = $('#imgs').attr('src');

            if (imgSrc != null) {
                document.onclick = actionOnText("insertImage", false, imgSrc);
            }
        });
    });
}