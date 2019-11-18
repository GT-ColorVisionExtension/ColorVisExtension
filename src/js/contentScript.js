import ANOMALY from "./anomalyDefaults";
import FilterWindow from './filterWindow';

let filterWindows = [new FilterWindow(document.body)];

/**
 * Returns the current FilterWindows in the window object.
 * If there aren't any, the function will create them and then return them.
 * @returns {FilterWindow[]}
 */
function getFilterWindows() {
  // // Set filterWindows global variable if not found
  // if (window.filterWindows === undefined || window.filterWindows === null) {
  //   window.filterWindows = [new FilterWindow(document.body)];
  //   window.filterWindowsEnabled = true;
  //   return window.filterWindows;
  // }
  // // Otherwise, just return the variable
  // else {
  //   return window.filterWindows;
  // }
  return filterWindows;
}

function addFilterWindow() {
  filterWindows.push(new FilterWindow(document.body));
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  // When the pop-up window is opened, it'll ask if the script is already injected
  if (msg.text === "script_injected?") {
    sendResponse({ status: "yes" });
  }

  // When the Enable/Disable button is pressed, set the current state of the windows.
  if (msg.toggleStatus === 'toggleStatus') {
    // Get the current status
    if (filterWindows.length > 0) {
      // If currently enable, disable by first telling each window to remove themselves
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
  }

  // Get windows and/or initialize them
  const windows = getFilterWindows();
  console.log(msg);

  if (msg.svgFilter) {
    for (let i = 0; i < windows.length; i++) {
      windows[i].updateSeverityFilter(parseFloat(msg.svgFilter));
    }
  }

  if (msg.hueValue && msg.saturationValue && msg.valueValue) {
    console.log(msg);
    for (let i = 0; i < windows.length; i++) {
      windows[i].updateHSV(msg.hueValue, msg.saturationValue, msg.valueValue);
    }
  }
});
