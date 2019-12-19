// Credit to SeanJM
// https://gist.github.com/romannurik/192538

var proxyXHR = {};

proxyXHR.get = function (url) {
  var port     = chrome.extension.connect({ name: 'XHRProxy_' });
  var settings = {
    method : 'GET',
    url    : url
  };
  var onSuccess;
  var onFailure;
  var self = {
    onSuccess: function (callback) {
      onSuccess = callback;
      return self;
    },
    onFailure: function (callback) {
      onFailure = callback;
      return self;
    }
  };
  port.onMessage.addListener(function (msg) {
    if (msg.status === 200 && typeof onSuccess === 'function') {
      onSuccess(msg.data, msg.xhr);
    } else if (typeof onFailure === 'function') {
      onFailure(msg.data, msg.xhr);
    }
  });

  ping(port,settings);
  return self;
};

function ping(port, settings) {
   if (chrome.runtime.lastError) {
     console.warn(chrome.runtime.lastError.message);
   } else {
     port.postMessage(settings);
   }
}
