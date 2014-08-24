$(document).ready(function(){

  // Click test  
  var clickStream = Stream.fromEvent($("#btn"), "click");
  clickStream
    .buffer(function() { return clickStream.throttle(250); })
    .map(function(clicks) {
      return clicks.length;
    })
    .filter(function(clickCount) {
      return clickCount > 1;
    })
    .subscribe(function(n) {
      // subscribe triggers subscribers of prev stream objects!!!
      console.log(n, "multiple clicks");
    });

  // Follow test
/*
  var refreshButton = $('.refresh');
  var closeButton1 = $('.close1');
  var closeButton2 = $('.close2');
  var closeButton3 = $('.close3');
  
  var refreshClickStream = Stream.fromEvent(refreshButton, 'click');
  var close1ClickStream = Stream.fromEvent(closeButton1, 'click');
  var close2ClickStream = Stream.fromEvent(closeButton2, 'click');
  var close3ClickStream = Stream.fromEvent(closeButton3, 'click');

  var requestStream = refreshClickStream.startWith('startup click')
    .map(function() {
        var randomOffset = Math.floor(Math.random()*500);
        return 'https://api.github.com/users?since=' + randomOffset;
    });
*/
});
