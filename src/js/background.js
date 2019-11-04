import '../img/icon-128.png'
import '../img/icon-34.png'

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
});


console.log("Hello!");