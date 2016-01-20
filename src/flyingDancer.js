var FlyingDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
      this.$node.addClass("fox");

};

FlyingDancer.prototype = Object.create(Dancer.prototype);
FlyingDancer.prototype.constructor = FlyingDancer;


FlyingDancer.prototype.step = function() {
	Dancer.prototype.step.call(this);
	var top = Math.min($("body").height()-155,$("body").height() * Math.random());
	var left = Math.min($("body").width()-100,$("body").width() * Math.random());  
	$(".fox").animate({
		opacity: 1,
		top: top,
		left: left
	}, 5000);
};