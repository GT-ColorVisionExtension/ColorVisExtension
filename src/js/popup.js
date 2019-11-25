import "../css/options.css";
import { getSavedSettings, saveSettings } from './storage';
import { generateSeverityMatrix, generateHSVMatrix} from './filterWindow';
import ANOMALY from "./anomalyDefaults";

/* Set up the pop up's SVG filters */
// Create an SVG Element
const NS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(NS, "svg");
svg.setAttributeNS(null, "width", "0");
svg.setAttributeNS(null, "height", "0");

// Create filters
const filter_0 = document.createElementNS(NS, "filter");
filter_0.setAttributeNS(null, "id", "cvd_0");
const matrix_0 = document.createElementNS(NS, "feColorMatrix");
matrix_0.setAttributeNS(null, "in", "hsv");
matrix_0.setAttributeNS(null, "type", "matrix");
matrix_0.setAttributeNS(
  null,
  "values",
  "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
);
const matrix_0_hsv = document.createElementNS(NS, "feColorMatrix");
matrix_0_hsv.setAttributeNS(null, "in", "rgb");
matrix_0_hsv.setAttributeNS(null, "type", "matrix");
matrix_0_hsv.setAttributeNS(
  null,
  "values",
  "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
);
matrix_0_hsv.setAttributeNS(null, "result", "hsv");
const matrix_0_rgb = document.createElementNS(NS, "feColorMatrix");
matrix_0_rgb.setAttributeNS(null, "in", "SourceGraphic")
matrix_0_rgb.setAttributeNS(null, "type", "matrix");
matrix_0_rgb.setAttributeNS(
  null,
  "values",
  "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
);
matrix_0_rgb.setAttributeNS(null, "result", "rgb");

const filter_1 = document.createElementNS(NS, "filter");
filter_1.setAttributeNS(null, "id", "cvd_1");
const matrix_1 = document.createElementNS(NS, "feColorMatrix");
matrix_1.setAttributeNS(null, "in", "hsv");
matrix_1.setAttributeNS(null, "type", "matrix");
matrix_1.setAttributeNS(
  null,
  "values",
  "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
);
const matrix_1_hsv = document.createElementNS(NS, "feColorMatrix");
matrix_1_hsv.setAttributeNS(null, "in", "rgb");
matrix_1_hsv.setAttributeNS(null, "type", "matrix");
matrix_1_hsv.setAttributeNS(
  null,
  "values",
  "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
);
matrix_1_hsv.setAttributeNS(null, "result", "hsv");
const matrix_1_rgb = document.createElementNS(NS, "feColorMatrix");
matrix_1_rgb.setAttributeNS(null, "in", "SourceGraphic")
matrix_1_rgb.setAttributeNS(null, "type", "matrix");
matrix_1_rgb.setAttributeNS(
  null,
  "values",
  "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
);
matrix_1_rgb.setAttributeNS(null, "result", "rgb");

filter_0.appendChild(matrix_0_rgb)
filter_0.appendChild(matrix_0_hsv);
filter_0.appendChild(matrix_0);
filter_1.appendChild(matrix_1_rgb);
filter_1.appendChild(matrix_1_hsv);
filter_1.appendChild(matrix_1);
svg.appendChild(filter_0);
svg.appendChild(filter_1);
document.body.appendChild(svg);

// Apply SVG filters to radios div
let settings = {};
const radios = document.getElementById("radios");
let anomalyName = 'NONE';
let anomalyData = ANOMALY.NONE;
let currentMatrix = 0;
let next = 0;
radios.style.filter = "url('#cvd_0')";

// Functions to update the popup.html filters
function updateThumbnailSeverity(value) {
  next = 1 - currentMatrix;
  const matrixString = generateSeverityMatrix(value, anomalyData);
  matrix_0.setAttribute("values", matrixString);
  matrix_1.setAttribute("values", matrixString);
  radios.style.filter = `url('#cvd_${next}')`;
  currentMatrix = next;
}

function updateThumbnailSeverityType(severity, severityType) {
  if (severityType === 'NONE') {
    anomalyData = ANOMALY.NONE;
  } else if (severityType === 'PROTANOMALIES') {
    anomalyData = ANOMALY.PROTANOMALIES;
  } else if (severityType === 'DEUTERANOMALIES') {
    anomalyData = ANOMALY.DEUTERANOMALIES;
  } else if (severityType === 'TRITANOMALIES') {
    anomalyData = ANOMALY.TRITANOMALIES;
  }

  anomalyName = severityType;
  updateThumbnailSeverity(severity);
}

function updateThumbnailHSV(hue, sat, val) {
  const next = 1 - currentMatrix;
  const h = hue;
  const s = sat / 100;
  const v = val / 100;
  const matrixString = generateHSVMatrix(h, s, v);

  matrix_0_hsv.setAttribute("values", matrixString);
  matrix_1_hsv.setAttribute("values", matrixString);
  radios.style.filter = `url('#cvd_${next}')`;
  currentMatrix = next;
}

function updateThumbnailRGB(red, green, blue) {
  const r = red / 100;
  const g = green / 100;
  const b = blue / 100;
  const next = 1 - currentMatrix;

  const matrixString = `
    1  0  0  0  0
    ${-r}  1  0  0  0
    ${-g}  ${-b}  1  0  0
    0  0  0  1  0
  `

  matrix_0_rgb.setAttribute("values", matrixString);
  matrix_1_rgb.setAttribute("values", matrixString);
  radios.style.filter = `url('#cvd_${next}')`;
  currentMatrix = next;
}

// Apply filters to the thumbnails on first run using loaded data
(async function() {
  settings = await getSavedSettings();
  updateThumbnailSeverityType(settings['severity'], settings['anomaly']);
  updateThumbnailHSV(settings['hue'], settings['saturation'], settings['value']);
})();


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
    severityText.innerText = Math.round(percent * 100) + '%';
  
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { severity: percent }, msg => {
        // Also set new severity values to the popup's state data.
        updateThumbnailSeverity(percent);
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
    hueText.innerText = value + '°';
  
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        hueValue: value,
        saturationValue: parseInt(saturationSlider.value, 10),
        valueValue: parseInt(valueSlider.value, 10)
      }, msg => {
        updateThumbnailHSV(value, parseInt(saturationSlider.value, 10), parseInt(valueSlider.value, 10));
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
        updateThumbnailHSV(parseInt(hueSlider.value, 10), value, parseInt(valueSlider.value, 10));
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
        updateThumbnailHSV(parseInt(hueSlider.value, 10), parseInt(saturationSlider.value, 10), value);
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
    hueText.innerText = h + '°';
    saturationText.innerText = s + '%';
    valueText.innerText = v + '%';

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        hueValue: h,
        saturationValue: s,
        valueValue: v
      }, msg => {
        updateThumbnailHSV(h, s, v);
        resolve();
      });
    });
  });
}

const redSlider = document.getElementById("red-slider");
const redText = document.getElementById("red-value");
const greenSlider = document.getElementById("green-slider");
const greenText = document.getElementById("green-value");
const blueSlider = document.getElementById("blue-slider");
const blueText = document.getElementById("blue-value");
redSlider.oninput = updateRGB;
greenSlider.oninput = updateRGB;
blueSlider.oninput = updateRGB;

function updateRGB(e, r, g, b) {
  return new Promise((resolve, reject) => {
    let red, green, blue;

    if (r !== undefined && g !== undefined && b !== undefined) {
      red = r;
      green = g;
      blue = b;
      redSlider.value = red.toString();
      greenSlider.value = green.toString();
      blueSlider.value = blue.toString();
    } else {
      red = parseInt(redSlider.value, 10);
      green = parseInt(greenSlider.value, 10);
      blue = parseInt(blueSlider.value, 10);
    }

    redText.innerText = red + "%";
    greenText.innerText = green + "%";
    blueText.innerText = blue + "%";

    updateThumbnailRGB(red, green, blue);

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        redBoost: red,
        greenBoost: green,
        blueBoost: blue,
      }, () => {
        resolve();
      });
    });
  });
}

const anomalies = ['NONE', 'PROTANOMALIES', 'DEUTERANOMALIES', 'TRITANOMALIES'];
const rad = document['cvd-types']['vision-type'];
for (let i = 0; i < rad.length; i++) {
  rad[i].addEventListener('change', function() {
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
        updateThumbnailSeverityType(parseInt(severitySlider.value, 10) / 100, rad[index].value)
        resolve();
      })
    });
  })
}

function updatePositionAndSize(x, y, width, height) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { x: x, y: y, width: width, height: height }, () => {
        resolve();
      })
    })
  })
}

/* Slider Reset Buttons */
const btnResetSev = document.getElementById("reset-severity");
btnResetSev.onclick = () => updateSeverity(null, 0);
const btnResetHue = document.getElementById("reset-hue");
btnResetHue.onclick = () => updateHue(null, 0);
const btnResetSat = document.getElementById("reset-sat");
btnResetSat.onclick = () => updateSaturation(null, 100);
const btnResetVal = document.getElementById("reset-val");
btnResetVal.onclick = () => updateValue(null, 100);
const btnResetRed = document.getElementById("reset-red");
btnResetRed.onclick = () => updateRGB(null, 0, parseInt(greenSlider.value, 10), parseInt(blueSlider.value, 10));
const btnResetGreen = document.getElementById("reset-green");
btnResetGreen.onclick = () => updateRGB(null, parseInt(redSlider.value, 10), 0, parseInt(blueSlider.value, 10));
const btnResetBlue = document.getElementById("reset-blue");
btnResetBlue.onclick = () => updateRGB(null, parseInt(redSlider.value, 10), parseInt(greenSlider.value, 10), 0);

// Run script when extension pop-up is opened.
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  // Inject content script into current tab
  chrome.tabs.sendMessage(tabs[0].id, { text: "script_injected?" }, function(msg) {
    msg = msg || {};
    if (msg.status != "yes") {
      console.log("Script hasn't run yet. Injecting.");
      chrome.tabs.executeScript(
        tabs[0].id, { file: "contentScript.bundle.js"}, async () => {
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
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    // Request the current toggle status
    chrome.tabs.sendMessage(tabs[0].id, { currentStatus: 'currentStatus?' }, msg => {
      msg = msg || {};
      if (msg.currentStatus && msg.currentStatus === "enabled") {
        // Since the extension is currently enabled, disable it.
        console.log('Disabling extension');
        disableExtension(tabs);
      } else {
        // Since the extension is currently disabled, enable it.
        console.log('Enable extension');
        enableExtension(tabs);
      }
    });
  });
};

// Allow option for full screen once the filter windows are already drawn
const toggleFullScreen = document.getElementById("cc-full-screen");
toggleFullScreen.onclick = function() {
  console.log('Enabling full screen');
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { fullscreen: 'fullscreen' });
  });
}

function disableExtension(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { disable: 'disable' }, async msg => {
    toggleButton.innerText = 'Enable';
    const settings = await getSavedSettings();
    settings.enabled = false;
    saveSettings(...settings);
  });

  toggleFullScreen.style.display = 'none';
}

function enableExtension(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { enable: 'enable' }, async (msg) => {
    const settings = await getSavedSettings();
    // Have to use setTimeout to increase the chances that the browser will
    // recognize and paint the changes we're making to the DOM
    updateSeverity(null, Math.max(settings['severity'] * 100, 100)).then(() => {
      setTimeout(() => {
        updateSeverityType(settings['anomaly']).then(() => {
          setTimeout(() => {
            updateHueSaturationValue(settings['hue'], settings['saturation'], settings['value']).then(() => {
              setTimeout(() => {
                updateRGB(null, settings['redBoost'], settings['greenBoost'], settings['blueBoost']).then(() => {
                  toggleButton.innerText = 'Disable';
                  toggleFullScreen.style.display = 'inline';
                })
              }, 60)
            })
          }, 60)
        })
      }, 60)
    });
  });
}