reactive-simple-js
==================

Simple FRP implementation to run [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) (Not yet completed)

Example to subscribe multiple click stream:
```javascript
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
      console.log(n, "multiple clicks");
    });
```