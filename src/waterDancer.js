var WaterDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
    this.$node.addClass("water");

};

WaterDancer.prototype = Object.create(Dancer.prototype);
WaterDancer.prototype.constructor = WaterDancer;


WaterDancer.prototype.step = function() {
    Dancer.prototype.step.call(this);
  };