proxyXHR.get('https://rawgit.com/joshisa/huemix-blopscotch/master/js/inject.js').onSuccess(function (data) {
  eval(data);
}).onFailure(function (status) {
  alert("HTTP Error " + status + " while retrieving data for the Huemix Blopscotch Tour Chrome Plugin");
});
