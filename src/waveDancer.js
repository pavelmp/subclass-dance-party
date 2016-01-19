var WaveDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass("wave");
};

WaveDancer.prototype = Object.create(Dancer.prototype);
WaveDancer.prototype.constructor = WaveDancer;


WaveDancer.prototype.step = function() {
    Dancer.prototype.step.call(this);
};