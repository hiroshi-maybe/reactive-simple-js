function Observer(onEvent) {
  this._onEvent = onEvent;
}
Observer.create = function(onEvent) {
  return new Observer(onEvent);
};
Observer.prototype = {
  onEvent: function(value) {
    this._onEvent(value);
  }
};

function Stream(subscribe) {
  this._subscribe = subscribe;
}
Stream.fromEvent = function($el, eventName) {
  return new Stream(function(observer) {
    $el[eventName](function(event) {
      observer.onEvent(event);
    });   
  });
};
Stream.prototype = {
  subscribe: function(onEvent) {
    var observer = new Observer.create(onEvent);
    return this._subscribe(observer);
  },
  map: function(selector) {
    var parent = this;
    return new Stream(function(observer) {
      parent.subscribe(function(value) {
	var valueNew = selector(value);
	observer.onEvent(valueNew);
      });
    });
  },
  filter: function(selector) {
    var parent = this;
    return new Stream(function(observer) {
      parent.subscribe(function(value) {
	if (selector(value)) {
	  observer.onEvent(value);
	}
      });
    });
  },
  scan: function(selector, init) {
    var acc = init, parent = this;
    return new Stream(function(observer) {
      parent.subscribe(function(value) {
	acc = selector(acc, value);
	observer.onEvent(acc);
      });
    });
  },
  throttle: function(due) {
    var parent = this, lastTime = 0, id = null;
    return new Stream(function(observer) {
      parent.subscribe(function(value) {
	if (id != null) {
	  // cancel timer to debounce
	  clearTimeout(id);
	}
	id = setTimeout(function() {
	  clearTimeout(id);
	  id = null;
	  observer.onEvent(value);
	}, due);
      });
    });
  },
  buffer: function(closing) {
    var parent = this, buffer = [];
    return new Stream(function(observer) {
      var closeEventStream = closing();
      parent.subscribe(function(value) {
	buffer.push(value); // buffering
      });
      closeEventStream.subscribe(function(value) {
	// omit buffer and flush;
	observer.onEvent(buffer.slice());
	buffer = []; 
      });
    });
  },
  startWith: function() {
    var parent = this;
    return new Stream(function(observer) {
      
    });
  }
};
