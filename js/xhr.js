function parseIfJSON(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}

function xhr(type, url, data) {
  var callbacks = {
    success: function() { },
    error: function() { }
  };

  var request = XMLHttpRequest ?
    new XMLHttpRequest() :
    new ActiveXObject('MSXML2.XMLHTTP.3.0');

  request.open(type, url, true);
  request.setRequestHeader(
    'Content-type',
    'application/x-www-form-urlencoded'
  );

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      var callbackArguments = [
        parseIfJSON(request.responseText),
        request
      ];

      if (request.status > 99 && request.status < 400) {
        callbacks.success.apply(undefined, callbackArguments);
      } else {
        callbacks.error.apply(undefined, callbackArguments);
      }
    }
  };

  request.send(data);

  return {
    success: function(callback) {
      callbacks.success = callback;
    },
    error: function(callback) {
      callbacks.error = callback;
    }
  }
}

module.exports = xhr;