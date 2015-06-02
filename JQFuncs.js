// Scroll smoothly between html anchors
// Taken from: http://codepen.io/mattsince87/pen/exByn
function scrollNav() {
    $('.nav a').click(function(){  
        //Toggle Class
        $(".active").removeClass("active");      
        $(this).closest('li').addClass("active");
        var theClass = $(this).attr("class");
        $('.'+theClass).parent('li').addClass('active');
        //Animate
        $('html, body').stop().animate({
            scrollTop: $( $(this).attr('href') ).offset().top - 160
        }, 400);
        return false;
    });
    $('.scrollTop a').scrollTop();
}

//Toggle smoothly revealing/hiding divs
function showHide() {
    $(".showhide").click(function(){
        var parentDiv = $(this).parent("div");
        parentDiv.find(".panel").slideToggle("slow");
    });
}

function highlightDiv() {
}

//Make sure document is ready before executing javascript
$(document).ready(function(){
    scrollNav();
    showHide();
});
