var FlyingDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  
};

FlyingDancer.prototype = Object.create(Dancer.prototype);
FlyingDancer.prototype.constructor = FlyingDancer;


FlyingDancer.prototype.step = function() {
    Dancer.prototype.step.call(this);
    // toggle() is a jQuery method to show/hide the <span> tag.
    // See http://api.jquery.com/category/effects/ for this and
    // other effects you can use on a jQuery-wrapped html tag.
    this.$node.toggle();
  };