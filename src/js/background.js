import '../img/icon-128.png'
import '../img/icon-34.png'
import { getSavedSettings } from './storage';

// 1. Check if the content script was injected into the page yet.
// There's some code I can reuse for this.
function verifyAndInject() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    // Inject content script into current tab
    chrome.tabs.sendMessage(tabs[0].id, { text: "script_injected?" }, function(msg) {
      msg = msg || {};
      if (msg.status != "yes") {
        console.log("Script hasn't run yet. Injecting.");
        chrome.tabs.executeScript(
          tabs[0].id, { file: "contentScript.bundle.js"}, async () => {
            // Chain messages to set up window
          }
        );
      } else {
        // Chain messages to set up window
      }
    });
  });
}

// 2. If the content script was already injected, skip to setting up page change listener.
// Else, look up the current settings in browser storage(?)


// With the current settings, inject the window if the settings say it should be enabled
// Make sure it's in the same x y position and full screen.
// Dont bother saving width and height because those can change dynamically.

// Add a listener that tracks when the page changes 
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("Page change detected!");
  verifyAndInject();
});
