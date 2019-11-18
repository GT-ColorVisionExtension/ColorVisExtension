import "../css/options.css";
import { getSavedSettings } from './storage';

/* Set up Sliders */
const severitySlider = document.getElementById("severity-slider");
const severityText = document.getElementById("severity-value");
severitySlider.oninput = updateSeverity;
function updateSeverity(e, severity) {
  return new Promise((resolve, reject) => {
    if (severity !== undefined) {
      severitySlider.value = severity.toString();
    }
    const percent = severity !== undefined ? severity / 100 : parseInt(severitySlider.value, 10) / 100;
    severityText.innerText = percent;
  
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { severity: percent }, msg => {
        resolve();
      });
    });
  })
}

const hueSlider = document.getElementById("hue-slider");
const hueText = document.getElementById("hue-value");
hueSlider.oninput = updateHue;
function updateHue(e, hue) {
  return new Promise((resolve, reject) => {
    if (hue !== undefined) {
      hueSlider.value = hue.toString();
    }
    const value = hue !== undefined? hue : parseInt(hueSlider.value, 10);
    hueText.innerText = value;
  
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        hueValue: value,
        saturationValue: parseInt(saturationSlider.value, 10),
        valueValue: parseInt(valueSlider.value, 10)
      }, msg => {
        resolve();
      });
    });
  });
}

const saturationSlider = document.getElementById("saturation-slider");
const saturationText = document.getElementById("saturation-value");
saturationSlider.oninput = updateSaturation;
function updateSaturation(e, sat) {
  return new Promise((resolve, reject) => {
    if (sat !== undefined) {
      saturationSlider.value = sat.toString();
    }
    const value = sat !== undefined ? sat : parseInt(saturationSlider.value, 10);
    saturationText.innerText = value + "%";
  
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        hueValue: parseInt(hueSlider.value, 10),
        saturationValue: value,
        valueValue: parseInt(valueSlider.value, 10)
      }, msg => {
        resolve();
      });
    });
  });
}

const valueSlider = document.getElementById("value-slider");
const valueText = document.getElementById("value-value");
valueSlider.oninput = updateValue;
function updateValue(e, val) {
  return new Promise((resolve, reject) => {
    if (val !== undefined) {
      valueSlider.value = val.toString();
    }
    const value = val !== undefined ? val : parseInt(valueSlider.value, 10);
    valueText.innerText = value + "%";
  
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        hueValue: parseInt(hueSlider.value, 10),
        saturationValue: parseInt(saturationSlider.value, 10),
        valueValue: value
      }, msg => {
        resolve();
      });
    });
  });
}

function updateHueSaturationValue(h, s, v) {
  return new Promise((resolve, reject) => {
    if (h !== undefined && s !== undefined && v !== undefined) {
      hueSlider.value = h.toString();
      saturationSlider.value = s.toString();
      valueSlider.value = v.toString();
    }
    hueText.innerText = h;
    saturationText.innerText = s + '%';
    valueText.innerText = v + '%';

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        hueValue: h,
        saturationValue: s,
        valueValue: v
      }, msg => {
        resolve();
      });
    });
  });
}

const anomalies = ['NONE', 'PROTANOMALIES', 'DEUTERANOMALIES', 'TRITANOMALIES'];
const rad = document['cvd-types']['vision-type'];
for (let i = 0; i < rad.length; i++) {
  rad[i].addEventListener('change', function() {
    console.log('Updating severity type!?');
    console.log(anomalies[i]);
    updateSeverityType(anomalies[i]);
  })
}

function updateSeverityType(type) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const rad = document['cvd-types']['vision-type'];
      // Uncheck all radios
      for (let i = 0; i < rad.length; i++) {
        rad[i].checked = false;
      }
      // Unset outlines
      const radContainers = document.getElementsByClassName("cc-radio-container");
      for (let i = 0; i < radContainers.length; i++) {
        radContainers[i].className = radContainers[i].className.replace(' active-cvd-choice', '');
      }

      // Get index of the updated selection
      const index = anomalies.indexOf(type);

      // Check radio at index
      rad[index].checked = true;
      // Set outline at index
      radContainers[index].className = radContainers[index].className + ' active-cvd-choice';

      // Send message to update severity type
      chrome.tabs.sendMessage(tabs[0].id, {severity: parseInt(severitySlider.value, 10) / 100, severityType: rad[index].value}, () => {
        resolve();
      })
    });
  })
}

// Run script when extension pop-up is opened.
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  // Inject content script into current tab
  chrome.tabs.sendMessage(tabs[0].id, { text: "script_injected?" }, function(msg) {
    msg = msg || {};
    if (msg.status != "yes") {
      console.log("Script hasn't run yet. Injecting.");
      chrome.tabs.executeScript(
        tabs[0].id, { file: "contentScript.bundle.js"}, async () => {
          // chrome.tabs.sendMessage(tabs[0].id, { init: "windows" });

          // Run severity and HSV update immediately.
          // const settings = await getSavedSettings();
          // await updateSeverity(null, settings['severity']);
          // console.log(settings['hue'], settings['saturation'], settings['value']);
          // await updateHueSaturationValue(settings['hue'], settings['saturation'], settings['value']);
          // await updateSeverity(null, settings['severity']);
          enableExtension(tabs);
        }
      );
    } else {
      enableExtension(tabs);
    }
  });
});

// Enable/disable window when extension is clicked.
const toggleButton = document.getElementById("enable-disable");
toggleButton.onclick = async function(element) {
  console.log('Button clicked');
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    // Request the current toggle status
    chrome.tabs.sendMessage(tabs[0].id, { currentStatus: 'currentStatus?' }, msg => {
      msg = msg || {};
      if (msg.currentStatus && msg.currentStatus === "enabled") {
        // Since the extension is currently enabled, disable it.
        disableExtension(tabs);
      } else {
        // Since the extension is currently disabled, enable it.
        enableExtension(tabs);
      }
    });
  });
};

function disableExtension(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { disable: 'disable' }, msg => {
    toggleButton.innerText = 'Enable';
  });
}

function enableExtension(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { enable: 'enable' }, async (msg) => {
    const settings = await getSavedSettings();
    console.log(settings);
    await updateSeverity(null, settings['severity'] * 100);
    await updateSeverityType(settings['anomaly']);
    await updateHueSaturationValue(settings['hue'], settings['saturation'], settings['value']);
    // await updateSeverity(null, settings['severity']);

    toggleButton.innerText = 'Disable';
  });
}