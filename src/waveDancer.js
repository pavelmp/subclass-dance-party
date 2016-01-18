var WaveDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);

};

WaveDancer.prototype = Object.create(Dancer.prototype);
WaveDancer.prototype.constructor = WaveDancer;


WaveDancer.prototype.step = function() {
    Dancer.prototype.step.call(this);
    // toggle() is a jQuery method to show/hide the <span> tag.
    // See http://api.jquery.com/category/effects/ for this and
    // other effects you can use on a jQuery-wrapped html tag.
    this.$node.toggle();
  };