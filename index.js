

    $(".second").on("click",function() {
    	$("#code").removeClass("hidden");
    	$("#visuel").addClass("hidden");
    	$(".first").css('background','#b8b8b8')
    	$(this).css('background','#d8d8d8')
        $(this).addClass("active");
  
    });

    $(".first").on("click",function(){
    	$("#visuel").removeClass("hidden");
    	$("#code").addClass("hidden");
    	$(this).css('background','#d8d8d8')
    	$(".second").css('background','#b8b8b8');


    });
    

