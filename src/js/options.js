import "../css/options.css";

let changeColor = document.getElementById('apply-color-change');

changeColor.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      file: 'contentScript.bundle.js'
    });
  });
};