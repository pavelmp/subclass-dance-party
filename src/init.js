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
    // if(dancerMakerFunction = window['water']){
      // put only one image on screen in the water, in the center
    //   var dancer = new dancerMakerFunction(
    //     Math.min($("body").height()%2,$("body").height() * Math.random()),
    //     Math.min($("body").width()%2,$("body").width() * Math.random()), 0
    //   );
    // } else {
      // otherwise make a dancer with a random position
      var dancer = new dancerMakerFunction(
        Math.min($("body").height()-155,$("body").height() * Math.random()),
        Math.min($("body").width()-100,$("body").width() * Math.random()),
        Math.random() * 1000
      );
    // }

    $('body').append(dancer.$node);

    window.dancers.push(dancer);
  });

$(".lineUpButton").on("click", function(event) {
    for(var i = 0; i < window.dancers.length; i++) {
      window.dancers[i].lineUp();
    }
  });

  $(document).on("click", "span",function(event) {
    $(this).toggleClass("flip");
  });

  $( document ).click(function() {
  $( ".water" ).animate({
    opacity: 0.25,
    top: "+=100",
    height: "toggle"
  }, 5000, function() {
    // Animation complete.
  });
});


});
