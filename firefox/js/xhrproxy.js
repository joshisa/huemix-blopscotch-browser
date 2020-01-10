function inject(url) {
  var myPort = browser.runtime.connect({name:"XHRProxy_"});
  var settings = {
    method : 'GET',
    url    : url
  };
  myPort.postMessage(settings);
  myPort.onMessage.addListener(function(m) {
    if (m.status === 200) {
      eval(m.data);
      console.log("Injection code fetched ...");
    } else {
      console.error("Huemix-Blopscotch :: HTTP Error :: Status:" + m.status);
      console.error("Huemix-Blopscotch :: HTTP Error :: Status:" + m.data);
    }
  });
}
