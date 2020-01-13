window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

browser.storage.local.get(['toplineFilter','playBackDelay'], function(items) {
    //Checking if prefs are uninitialized.  If so, we need to set their defaults
    if ((items.playBackDelay === undefined) || (items.playBackDelay === '')) {
      var autoPlayEnabledValue = true;
      var playBackDelayValue = 7;
      var categoryValues = JSON.stringify(['default']);
      var toplineFilterValue = '^https?:\/\/icp-console(.*?)';
      browser.storage.local.set({
        autoPlayEnabled: autoPlayEnabledValue,
        playBackDelay: playBackDelayValue,
        categories: categoryValues,
        toplineFilter: toplineFilterValue,
      }, function() {
        var toplineFilterRegex = new RegExp(toplineFilterValue, "i");
        if (toplineFilterRegex.test(window.location.href)) {
          try {
            console.info("Huemix-Blopscotch:: Injecting code for the Firefox Plugin ...")
            inject('https://raw.githack.com/joshisa/huemix-blopscotch/master/js/inject.js');
          } catch(error){
            // Let's just eat the error.  This can fail intermittently for many reasons
            console.error("Huemix-Blopscotch:: Injection Error: " + error);
          }
        }
      });
    // Cool, our low rez test has confirmed prefs (at least this one) has been stored. 
    // Initialization has happened at some point.
    } else {
      var toplineFilterRegex = new RegExp(items.toplineFilter, "i");
      if (toplineFilterRegex.test(window.location.href)) {
        try {
          console.info("Huemix-Blopscotch:: Injecting code for the Firefox Plugin ...")
          inject('https://raw.githack.com/joshisa/huemix-blopscotch/master/js/inject.js');
        } catch(error){
          // Let's just eat the error.  This can fail intermittently for many reasons
          console.error("Huemix-Blopscotch:: Injection Error: " + error);
        }
      }
    }
  }
);
