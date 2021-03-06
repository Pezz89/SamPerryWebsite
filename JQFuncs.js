// Scroll smoothly between html anchors
// Taken from: http://codepen.io/mattsince87/pen/exByn
function varyScrollSpeed(){
  var boxes = $('[data-scroll-speed]'),
      $window = $(window);
  $window.on('scroll', function(){
    var scrollTop = $window.scrollTop();
    boxes.each(function(){
      var $this = $(this),
          scrollspeed = parseInt($this.data('scroll-speed')),
          val = - scrollTop / scrollspeed;
      $this.css('transform', 'translateY(' + val + 'px)');
    });
  });
}

function updateMagicLine($li, $magicLine) {
    topPos = $li.position().top;
    newHeight = $li.parent().outerHeight();
    $magicLine.stop().animate({
        top: topPos,
        height: newHeight
    });
}

function scrollNav() {
    var $el, 
        leftPos, 
        newWidth, 
        $mainNav = $("#navLinks");
    //Add a list item to the navigation to act as the highlight bar
    $mainNav.append("<li id='magic-line'></li>");
    var $magicLine = $("#magic-line");

    $magicLine
        .height($(".active").outerHeight())
        .css("top", $(".active a").position().top)
        .data("origLeft", $magicLine.position().left)
        .data("origHeight", $magicLine.outerHeight());

    var clickRunning = false;
    $("#navLinks li a").click(function() {
        clickRunning = true;
        //Animate smooth scrolling to section
        $('html, body').stop().animate({
            scrollTop: $( $(this).attr('href') ).offset().top 
        }, 400, function(){clickRunning = false;});
        updateMagicLine($(this), $magicLine);
        return false;
    });
    $('.scrollTop a').scrollTop();

    var prevDivPos = null;
    var aChildren = $("nav li").children(); // find the a children of the list items
    var aArray = []; // create the empty array
    for (var i=0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values
    
    $(window).scroll(function(){
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).outerHeight(); // get the height of the window
        var docHeight = $(document).outerHeight();
        
        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $(theID).outerHeight(); // get the height of the div in question
            if (windowPos + (windowHeight / 3)>= divPos && windowPos + (windowHeight / 3) < (divPos + divHeight)) {
                $("a[href='" + theID + "']").closest('li').addClass("active");
                if (divPos != prevDivPos) {
                    if (!clickRunning) {
                        updateMagicLine($(".active a"), $magicLine);
                    }
                    prevDivPos = divPos;
                }
            } else {
                $("a[href='" + theID + "']").closest('li').removeClass("active");
            }
        }
        
        if(windowPos + windowHeight == docHeight) {
            if (!$("nav li:last-child a").hasClass("nav-active")) {
                var navActiveCurrent = $(".nav-active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                $("nav li:last-child a").addClass("nav-active");
            }
        }
    });
}

//Toggle plus/minus icon
function iconToggle(showhideDiv) {
    event.preventDefault();
    showhideDiv.toggleClass("open");
    var icon = showhideDiv.find(".plusminus");
    if (showhideDiv.hasClass("open")) {
        icon.html("<i class='fa fa-minus'></i>");
    }
    else {
        icon.html("<i class='fa fa-plus'></i>");
    }
}

//Toggle smoothly revealing/hiding divs
function showHide() {
    $(".showhide").click(function(){
        $(this).find(".panel").slideToggle("slow");
        iconToggle($(this));
        
    });
}

function hideByDefault() {
    /*Hide all collapsable panels by default*/
    $(".panel").css("display", "none");
}

//Make sure document is ready before executing javascript
$(document).ready(function() {
    scrollNav();
    showHide();
    hideByDefault();
    varyScrollSpeed();
});
