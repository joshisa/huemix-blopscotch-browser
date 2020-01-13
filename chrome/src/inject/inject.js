window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

var autoPlayEnabledValue='';
var playBackDelayValue='';
var categoryValues='';
var toplineFilterValue='';
browser.storage.local.get({
    autoPlayEnabled: autoPlayEnabledValue,
    playBackDelay: playBackDelayValue,
    categories: categoryValues,
    toplineFilter: toplineFilterValue,
  }, function(items) {
    // Let's check if the extension has never had its preferences stored (fresh install)
    if (items.playBackDelay === '') {
      var autoPlayEnabledValue = true;
      var playBackDelayValue = 7;
      var categoryValues = JSON.stringify(['default']);
      var toplineFilterValue = '^https?:\/\/icp-console(.*?)';
      browser.storage.local.set({
        autoPlayEnabled: autoPlayEnabledValue,
        playBackDelay: playBackDelayValue,
        categories: categoryValues,
        toplineFilter: toplineFilterValue,
      }, function(initItems) {
        var toplineFilterRegex = new RegExp(initItems.toplineFilter, "i");
        if (toplineFilterRegex.test(window.location.href)) {
          proxyXHR.get('https://raw.githack.com/joshisa/huemix-blopscotch/master/js/inject.js').onSuccess(function (data) {
              eval(data);
              console.log("Injection code fetched ...");
          }).onFailure(function (status) {
            console.error("HTTP Error " + status + " while retrieving data for the Huemix Blopscotch Tour Chrome Plugin");
            console.error("Check network connectivity.  This extension requires network access to function correctly");
          });
        }
      });
    // Cool, our low rez test has confirmed prefs (at least this one) has been stored. Initialization has happened.
    } else {
      var toplineFilterRegex = new RegExp(items.toplineFilter, "i");
      if (toplineFilterRegex.test(window.location.href)) {
        proxyXHR.get('https://raw.githack.com/joshisa/huemix-blopscotch/master/js/inject.js').onSuccess(function (data) {
            eval(data);
            console.log("Injection code fetched ...");
        }).onFailure(function (status) {
          console.error("HTTP Error " + status + " while retrieving data for the Huemix Blopscotch Tour Chrome Plugin");
          console.error("Check network connectivity.  This extension requires network access to function correctly");
        });
      }
    }
  }
);
