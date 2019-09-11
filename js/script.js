$(document).ready(function(){
    
    //activates superslides code
    $('#slides').superslides({
        animation:'fade',
        play: 5000,
        pagination: false,
    })

    var typed = new Typed(".typedMain", {
        strings: ["Nick Paisley"],
        typeSpeed: 90,
        loop: false,
        startDelay: 1000,
        showCursor: false
    });

    var typed = new Typed(".typedSub", {
        strings: ["Software Developer ^1000", "Web Developer ^1000", "Problem Solver ^1000"],
        typeSpeed: 90,
        loop: true,
        startDelay: 2500,
        showCursor: false
    });

});