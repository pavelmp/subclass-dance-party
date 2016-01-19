describe('init', function() {

  var waveDancer;
  var timeBetweenSteps = 100;
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    waveDancer = new WaveDancer(10, 20, timeBetweenSteps);
  });

  it("should have a wave class", function() {
    var spy = sinon.spy('wave');
    $('.addDanceButton').trigger('click')
    sinon.assert(spy.called);
  });
 });