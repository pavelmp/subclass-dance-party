$(document).ready(function() {
  window.dancers = [];
  window.waterCalled = false;
  window.spongeBobCount = 0;
  window.centerY = $(window).height()*0.55;
  window.centerX = $(window).width()*0.15;
  window.spongeBob = null;

  window.showOverlap = function(){
    return function(){
      var foxes = window.dancers.filter(function(v){return v instanceof FlyingDancer;});

      for(var i=0;i<foxes.length;i++){
        var thisFox = foxes[i].$node.offset();
        for(var j=0;j<foxes.length;j++){
          if(j !== i){
            var otherFox = foxes[j].$node.offset();
            if(Math.abs(thisFox.left-otherFox.left)<=30 && Math.abs(thisFox.top-otherFox.top)<=30){
              foxes[i].$node.hide();
              foxes[j].$node.hide();
            }
          }
        }  
      }
    window.setTimeout(window.showOverlap(),25);      
    };  
  };

  window.setTimeout(window.showOverlap(),25);


  if(!window.waterCalled) {
        window.waterCalled = true;

    var waterWindow = window['WaterDancer'];
    var water = new waterWindow($("body").height()/2-160,$("body").width()/2-200, 0);
    $('body').append(water.$node);

    window.water = water; 

    $(".water").animate({
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
  }

  window.moveSpongeBob = function(){
    if(window.spongeBobCount>0){
      window.spongeBob.setPosition(window.centerY,window.centerX);
    }
  };


  $(".addDancerButton").on("click", function(event) {
  
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");
    
    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    if(dancerMakerFunctionName == 'SpongeBob' && window.spongeBobCount > 0){
      window.moveSpongeBob();
    }

    if(dancerMakerFunctionName !== 'SpongeBob' || (dancerMakerFunctionName == 'SpongeBob' && window.spongeBobCount === 0)){
      
      if(dancerMakerFunctionName == 'SpongeBob'){
        window.spongeBobCount++;
      }
      
      var top = Math.min($("body").height()-150,$("body").height()*(1-0.70 * Math.random()));//Math.min($("body").height()*2-155,$("body").height()*2 * Math.random());
      var left = Math.min($("body").width()-100,$("body").width() * Math.random());

       var duration = dancerMakerFunctionName == 'FlyingDancer' ? 5000 : Math.random() * 1000;

      if(dancerMakerFunctionName == 'SpongeBob'){
        top = window.centerY;
        left = window.centerX;
      }

      var dancer = new dancerMakerFunction(top,left, duration);

      $('body').append(dancer.$node);

      if(dancerMakerFunctionName == 'SpongeBob'){
        window.spongeBob = dancer;
      }  
      window.dancers.push(dancer);
    }
    
  });

  $(document).on("click",".lineUpButton", function(event) {

      // loop through window.dancer and exclude WaterDancer
      var lineUpDancers = window.dancers.filter(function(v){return !(v instanceof WaterDancer || v instanceof SpongeBob || v instanceof FlyingDancer)});
      var howMany = lineUpDancers.length;
      var currentAngle = 0;

      var angleStep = 360/howMany;
      var radius = Math.min($(window).height()*0.33-100,$(window).width()/2-100,0.8 * 100 / (2*Math.PI) * howMany);

      for(var i = 0; i < lineUpDancers.length; i++) {
        var x = window.centerY + radius * Math.sin(currentAngle * Math.PI/180);
        var y = window.centerX + radius * Math.cos(currentAngle * Math.PI/180);
        lineUpDancers[i].setPosition(x,y);
        currentAngle+=angleStep;
      }
      window.moveSpongeBob();
  });

  $(document).on("click", "span",function(event) {
    if($(this).hasClass("fox") && $(this).is(':visible')){
      $(this).hide();
    }
    $(this).toggleClass("flip");
  });

  $(document).click(function() {
    $( ".water" ).animate({
      opacity: 1,
    }, 1000);
  });

  $(document).on("keydown",function(event) {
    if(event.which == 37 || event.which == 39){
      event.preventDefault();
      if(!$('.spongeBob').hasClass("spongeSide")){
        $('.spongeBob').addClass("spongeSide");
      }
      if(event.which == 37){
        if($('.spongeBob').hasClass("flip")){
          $('.spongeBob').removeClass("flip");
        }
        $(".spongeBob").animate({
        opacity: 1,
        left: "-=50",
        }, 500, function() {
          $('.spongeBob').removeClass("spongeSide");
          $('.spongeBob').removeClass("flip")
        });
      } else {
        $('.spongeSide').addClass("flip");  
        $(".spongeBob").animate({
        opacity: 1,
        left: "+=50",
        }, 500, function() {
          $('.spongeBob').removeClass("spongeSide");
          $('.spongeBob').removeClass("flip");
        });        
      }
    }
    
    if(event.which == 38 || event.which == 40){
      event.preventDefault();
      if($('.spongeBob').hasClass("spongeSide")){
        $('.spongeBob').removeClass("spongeSide");
        $('.spongeBob').removeClass("flip");
      } 
      if(event.which == 38){
        $(".spongeBob").animate({
        opacity: 1,
        top: "-=50",
        }, 500);
      }
      if(event.which == 40){
        $(".spongeBob").animate({
        opacity: 1,
        top: "+=50",
        }, 500);
      }
    }
  });

});
