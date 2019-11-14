import "../css/options.css";

let changeColor = document.getElementById('apply-color-change');

changeColor.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log("Clicked the button");
    // Inject content script into current tab
    chrome.tabs.sendMessage(tabs[0].id, {text: "script_injected?"}, function(msg) {
      msg = msg || {};
      if (msg.status != 'yes') {
        console.log("Script hasn't run yet. Injecting.");
        chrome.tabs.executeScript(tabs[0].id, {
          file: 'contentScript.bundle.js'
        }, () => {
          chrome.tabs.sendMessage(tabs[0].id, {init: 'windows'});
        });
      }
    });
  });
};

// Severity slider
/**
 * @type {HTMLInputElement}
 */
const severitySlider = document.getElementById('severity-slider');
const severityText = document.getElementById('severity-value');

severitySlider.oninput = updateSeverity;

function updateSeverity() {
  const percent = parseInt(severitySlider.value, 10);
  severityText.innerText = percent;

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {svgFilter: percent});
  });
}

// Hue slider
/**
 * @type {HTMLInputElement}
 */
const hueSlider = document.getElementById('hue-slider');
const hueText = document.getElementById('hue-value');

hueSlider.oninput = updateHue;

function updateHue() {
  const value = parseInt(hueSlider.value, 10);
  hueText.innerText = value;

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {hueValue: value});
  });
}