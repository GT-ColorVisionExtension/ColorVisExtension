import ANOMALY from "./anomalyDefaults";
import FilterWindow from './filterWindow';

let filterWindows = [new FilterWindow(document.body)];

function updateSeverities(severity) {
  if (severity !== undefined) {
    for (let i = 0; i < filterWindows.length; i++) {
      filterWindows[i].updateSeverityFilter(severity);
    }
  }
}

function updateHSVs(h, s, v) {
  if (h !== undefined && s !== undefined && v !== undefined) {
    for (let i = 0; i < filterWindows.length; i++) {
      filterWindows[i].updateHSV(h, s, v);
    }
  }
}

function updateSeverityTypes(severity, severityType) {
  if (severityType !== undefined) {
    for (let i = 0; i < filterWindows.length; i++) {
      filterWindows[i].updateSeverityType(severity, severityType);
    }
  }
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  // When the pop-up window is opened, it'll ask if the script is already injected
  if (msg.text === "script_injected?") {
    sendResponse({ status: "yes" });
    return;
  }
  
  if (msg.currentStatus === 'currentStatus?') {
    // If a request to learn the current status is sent, return it
    console.log(filterWindows.length);
    if (filterWindows.length > 0) {
      sendResponse({ currentStatus: 'enabled' });
    } else {
      sendResponse({ currentStatus: 'disabled' });
    }

    return;
  }

  if (msg.disable === 'disable') {
    // If a disable request is sent, remove the filter windows.
    for (let i = 0; i < filterWindows.length; i++) {
      filterWindows[i].removeFromDOM();
    }
    filterWindows = [];
    // Send back a response that the windows are now disabled.
    sendResponse({ currentStatus: 'disabled' });

    return;
  }


  if (msg.enable === 'enable') {
    // If an enable request is sent, add a filter window.
    if (filterWindows.length < 0) {
      filterWindows.push(new FilterWindow(document.body));
    }
    sendResponse({ currentStatus: 'enabled' });
    return;
  }

  if (msg.severityType !== undefined && typeof msg.severity === 'number') {
    console.log(msg.severityType);
    updateSeverityTypes(msg.severity, msg.severityType);
    sendResponse({ updated: true });
  } else if (typeof msg.severity === 'number') {
    console.log('Got the severity number!');
    console.log(msg.severity);
    updateSeverities(msg.severity);
    sendResponse({ updated: true });
  }

  if (typeof msg.hueValue === 'number' && typeof msg.saturationValue === 'number' && typeof msg.valueValue === 'number') {
    updateHSVs(msg.hueValue, msg.saturationValue, msg.valueValue);
    sendResponse({ updated: true });
  }
});
