import "../css/popup.css";

let changeColor = document.getElementById('changeColor');
// var makeItGreen = 'document.body.style.border = "5px solid green"';

changeColor.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      file: 'contentScript.bundle.js'
    });
  });
};