import "../css/options.css";

let changeColor = document.getElementById('apply-color-change');

changeColor.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log("Clicked the button");
    // Inject content script into current tab
    chrome.tabs.executeScript(tabs[0].id, {
      file: 'contentScript.bundle.js'
    }, () => {
      const port = chrome.tabs.connect(tabs[0].id);
      // port.onMessage.addListener(response => {
      //   console.log(response);
      // });
      port.postMessage({ name: 'cvdExtension'});
    });
  });
};

