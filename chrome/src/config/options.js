window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

var autoPlayEnabledValue = true;
var playBackDelayValue = 7;
var categoryValues = JSON.stringify(['default']);
var toplineFilterValue = '^https?:\/\/icp-console(.*?)';

// Returns if a value is a string
function isString (value) {
  return typeof value === 'string' || value instanceof String;
}

function loadOptions() {
  browser.storage.local.get({
    autoPlayEnabled: autoPlayEnabledValue,
    playBackDelay: playBackDelayValue,
    categories: categoryValues,
    toplineFilter: toplineFilterValue,
  }, function(items) {

   // Add a "default" category entry if one does not exist
    document.getElementById('autoplay').checked = items.autoPlayEnabled;
    document.getElementById('playBackDelay').value = items.playBackDelay;
    document.getElementById('toplineFilter').value = items.toplineFilter;
    //Adding the saved category filters back
    JSON.parse(items.categories).forEach(element => newElement(element));
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = items.categories;
    //status.textContent = 'Options loaded.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function saveOptions() {
	var autoPlayEnabledValue = document.getElementById('autoplay').checked;
  var playBackDelayValue = document.getElementById('playBackDelay').value;
  var toplineFilterValue = document.getElementById('toplineFilter').value;
  var categoryValues = Array.from(document.querySelectorAll('#categories>li:not([style*="display:none"]):not([style*="display: none"])')).map(function(e) { return e.firstChild.nodeValue; });
  browser.storage.local.set({
    autoPlayEnabled: autoPlayEnabledValue,
    playBackDelay: playBackDelayValue,
    categories: JSON.stringify(categoryValues),
    toplineFilter: toplineFilterValue,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = JSON.stringify(categoryValues);
    //status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restoreOptions() {
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
    // Reset category list to empty
    document.querySelectorAll('#categories>li').forEach(e => e.parentNode.removeChild(e));
    loadOptions();
  });
}

// Create a new list item when clicking on the "Add" button
function newElement(providedValue) {
  //console.log("New Element");
  var li = document.createElement("li");
  var inputValue = '';
  if (isString(providedValue)) {
    inputValue = providedValue;
  } else {
    inputValue = document.getElementById("myInput").value;
  }
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("categories").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
      //Conveniently persist the state for the user after closing the entry
      saveOptions();
    }
  }

  //Conveniently persist the state for the user after adding an entry
  saveOptions();
}


document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('autoplay').addEventListener('click', saveOptions);
document.getElementById('playBackDelay').addEventListener('click', saveOptions);
document.getElementById('toplineFilter').addEventListener('input', saveOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', restoreOptions);
document.getElementById("addBtn").addEventListener("click", newElement);

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
console.log("Adding Close Buttons");
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);
