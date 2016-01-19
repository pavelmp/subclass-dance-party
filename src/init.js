$(document).ready(function() {
  window.dancers = [];

  $(".addDancerButton").on("click", function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];
    // if dancerMakerFunction is window.water
    if(dancerMakerFunctionName === 'WaterDancer'){
      // put only one image on screen in the water, in the center
      var dancer = new dancerMakerFunction(
        $("body").height()/2-160,
        $("body").width()/2-200, 0
      );
    } else {
      // otherwise make a dancer with a random position
      var dancer = new dancerMakerFunction(
        Math.min($("body").height()-155,$("body").height() * Math.random()),
        Math.min($("body").width()-100,$("body").width() * Math.random()),
        Math.random() * 1000
      );
    }

    $('body').append(dancer.$node);

    window.dancers.push(dancer);
  });

$(document).on("click",".lineUpButton", function(event) {
    console.log(window.dancers[0] instanceof WaterDancer);
    // loop through window.dancer and exclude WaterDancer
    var lineUpDancers = window.dancers.filter(function(v){return !(v instanceof WaterDancer)});
    var howMany = lineUpDancers.length;
    var currentAngle = 0;

    var angleStep = 360/howMany;
    var radius = Math.min($(window).height()*0.35-100,$(window).width()/2-100,0.8 * 100 / (2*Math.PI) * howMany);
    var centerX = $(window).height()*0.55;
    var centerY = $(window).width()*0.15;

    for(var i = 0; i < lineUpDancers.length; i++) {
      var x = centerX + radius * Math.sin(currentAngle * Math.PI/180);
      var y = centerY + radius * Math.cos(currentAngle * Math.PI/180);
      lineUpDancers[i].setPosition(x,y);
      currentAngle+=angleStep;
    }
  });

  $(document).on("click", "span",function(event) {
    $(this).toggleClass("flip");
  });

  $( document ).click(function() {
  $( ".water" ).animate({
    opacity: 1,
    top: "-=100",
    height: "+=100"
  }, 5000, function() {
    // Animation complete.
    $( ".water" ).animate({
    opacity: 0,
    top: "+=100",
    height: "-=100"
  }, 5000);
  });
});


});
