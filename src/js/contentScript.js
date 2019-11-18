import ANOMALY from "./anomalyDefaults";
import FilterWindow from './filterWindow';

let filterWindows = [new FilterWindow(document.body)];

function addFilterWindow() {
  filterWindows.push(new FilterWindow(document.body));
}

function updateSeverity(severity) {
  if (severity !== undefined) {
    for (let i = 0; i < filterWindows.length; i++) {
      filterWindows[i].updateSeverityFilter(parseFloat(msg.severity));
    }
  }
}

function updateHSV(h, s, v) {
  if (h !== undefined && s !== undefined && v !== undefined) {
    for (let i = 0; i < filterWindows.length; i++) {
      filterWindows[i].updateHSV(h, s, v);
    }
  }
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  // When the pop-up window is opened, it'll ask if the script is already injected
  if (msg.text === "script_injected?") {
    sendResponse({ status: "yes" });
    return;
  }

  // When the Enable/Disable button is pressed, set the current state of the windows.
  if (msg.toggleStatus === 'toggleStatus') {
    // Get the current status
    if (filterWindows.length > 0) {
      // If currently enabled, disable by first telling each window to remove themselves
      // from the DOM. Then, delete each FilterWindow in filterWindows
      for (let i = 0; i < filterWindows.length; i++) {
        filterWindows[i].removeFromDOM();
      }
      filterWindows = [];

      // Send back a response that the windows are now disabled.
      sendResponse({ currentStatus: 'disabled' });
    } else {
      // If currently disabled, reenable by adding a new window.
      filterWindows.push(new FilterWindow(document.body));
      sendResponse({ currentStatus: 'enabled' });
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
    filterWindows.push(new FilterWindow(document.body));
    sendResponse({ currentStatus: 'enabled' });

    return;
  }

  if (msg.currentStatus === 'currentStatus?') {
    // If a request to learn the current status is sent, return it
    if (filterWindows.length > 0) {
      sendResponse({ currentStatus: 'enabled' });
    } else {
      sendResponse({ currentStatus: 'disabled' });
    }

    return;
  }

  //
});
