// Credit to SeanJM
// https://gist.github.com/romannurik/192538
//console.log("Huemix-Blopscotch:: We have entered the background.js");

window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

browser.runtime.onConnect.addListener(function(port) {
  if (port.name != 'XHRProxy_')
    return;
  //console.log("Huemix-Blopscotch Port Name: " + port.name);
  port.onMessage.addListener(function(xhrOptions) {
    var xhr = new XMLHttpRequest();
    xhr.open(xhrOptions.method || "GET", xhrOptions.url, true);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4) {
        try {
          port.postMessage({
            status : this.status,
            data : this.responseText,
          });
        } catch(error){
          // Let's just eat the error.  This can fail intermittently for many reasons
          console.error("postMessage error: " + error);
        }
      }
    }
    xhr.send();
  });
});
