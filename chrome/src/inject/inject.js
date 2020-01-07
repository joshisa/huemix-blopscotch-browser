proxyXHR.get('https://raw.githack.com/joshisa/huemix-blopscotch/master/js/inject.js').onSuccess(function (data) {
    eval(data);
    console.log("Injection code fetched ...");
}).onFailure(function (status) {
  console.error("HTTP Error " + status + " while retrieving data for the Huemix Blopscotch Tour Chrome Plugin");
  console.error("Check network connectivity.  This extension requires network access to function correctly");
});
