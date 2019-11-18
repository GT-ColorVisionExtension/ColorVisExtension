import "../css/options.css";
import { getCurrentTabs } from "./promises";

/* Set up Sliders */
const severitySlider = document.getElementById("severity-slider");
const severityText = document.getElementById("severity-value");
severitySlider.oninput = updateSeverity;
function updateSeverity() {
  const percent = parseInt(severitySlider.value, 10) / 100;
  severityText.innerText = percent;

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { svgFilter: percent });
  });
}

const hueSlider = document.getElementById("hue-slider");
const hueText = document.getElementById("hue-value");
hueSlider.oninput = updateHue;
function updateHue() {
  const value = parseInt(hueSlider.value, 10);
  hueText.innerText = value;

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      hueValue: parseInt(hueSlider.value, 10),
      saturationValue: parseInt(saturationSlider.value, 10),
      valueValue: parseInt(valueSlider.value, 10)
    });
  });
}

const saturationSlider = document.getElementById("saturation-slider");
const saturationText = document.getElementById("saturation-value");
saturationSlider.oninput = updateSaturation;
function updateSaturation() {
  const value = parseInt(saturationSlider.value, 10);
  saturationText.innerText = value + "%";

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      hueValue: parseInt(hueSlider.value, 10),
      saturationValue: parseInt(saturationSlider.value, 10),
      valueValue: parseInt(valueSlider.value, 10)
    });
  });
}

const valueSlider = document.getElementById("value-slider");
const valueText = document.getElementById("value-value");
valueSlider.oninput = updateValue;
function updateValue() {
  const value = parseInt(valueSlider.value, 10);
  valueText.innerText = value + "%";

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      hueValue: parseInt(hueSlider.value, 10),
      saturationValue: parseInt(saturationSlider.value, 10),
      valueValue: parseInt(valueSlider.value, 10)
    });
  });
}

// Run script when extension pop-up is opened.
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  // Inject content script into current tab
  chrome.tabs.sendMessage(tabs[0].id, { text: "script_injected?" }, function(msg) {
    msg = msg || {};
    if (msg.status != "yes") {
      console.log("Script hasn't run yet. Injecting.");
      chrome.tabs.executeScript(
        tabs[0].id, { file: "contentScript.bundle.js"}, () => {
          chrome.tabs.sendMessage(tabs[0].id, { init: "windows" });
        }
      );
    }
  });
});

// Enable/disable window when extension is clicked.
const toggleButton = document.getElementById("apply-color-change");
toggleButton.onclick = async function(element) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    // Request the current toggle status
    chrome.tabs.sendMessage(tabs[0].id, { enabledStatus: 'enabledStatus' }, msg => {
      msg = msg || {};
      if (msg.enabledStatus && msg.enabledStatus === "enabled") {
        toggleButton.innerText = 'Enabled';
      } else {
        toggleButton.innerText = 'Disabled';
      }
    });
  });
};
