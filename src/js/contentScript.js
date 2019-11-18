import ANOMALY from "./anomalyDefaults";
import FilterWindow from './filterWindow';

/* Inject CSS */
function addCss(rule) {
  let css = document.createElement('style');
  css.type = 'text/css';
  if (css.styleSheet) css.styleSheet.cssText = rule; // Support for IE
  else css.appendChild(document.createTextNode(rule)); // Support for the rest
  document.getElementsByTagName("head")[0].appendChild(css);
}

function addExtensionCss() {
  addCss(`
  :root {
    --border-color-one: blue;
  }  

  @keyframes border-tl {
    0% {
      background-position: 0px 0px, 100px 100px, 0px 100px, 100px 0px;
    }
    100% {
      background-position: 100px 0px, 0px 100px, 0px 0px, 100px 100px;
    }
  }
  
  @keyframes border-tr {
    0% {
      background-position: 0px 0px, 100px 100px, -10px 100px, 16px 0px;
    }
    100% {
      background-position: 100px 0px, 0px 100px, -10px 0px, 16px 100px;
    }
  }

  @keyframes border-bl {
    0% {
      background-position: 100px 100px, 100px 16px, 0px 100px, 100px 100px;
    }
    100% {
      background-position: 100px 100px, 0px 16px, 0px 0px, 100px 100px;
    }
  }

  @keyframes border-br {
    0% {
      background-position: 100px 100px, 100px 16px, -100px 100px, 16px 0px;
    }
    100% {
      background-position: 100px 100px, 0px 16px, -100px 100px, 16px 100px;
    }
  }
  
  `)
  addCss(`
  .ccTopLeft, .ccTopRight, .ccBottomLeft, .ccBottomRight {
    height: 100px;
    width: 200px;
    background: linear-gradient(90deg, blue 50%, transparent 50%), linear-gradient(90deg, blue 50%, transparent 50%), linear-gradient(0deg, blue 50%, transparent 50%), linear-gradient(0deg, blue 50%, transparent 50%);
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-size: 15px 4px, 15px 4px, 4px 15px, 4px 15px;
    padding: 10px;
  }
  .ccTopLeft {
    animation: border-tl 4s infinite linear;
  }
  .ccTopRight {
    animation: border-tr 4s infinite linear;
  }
  .ccBottomLeft {
    animation: border-bl 4s infinite linear;
  }
  .ccBottomRight {
    animation: border-br 4s infinite linear;
  }

  `)
}

if (document.readyState === "complete") {
  addExtensionCss();
} else {
  window.onload = () => addExtensionCss();
}


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
    filterWindows.length = 0;
    // Send back a response that the windows are now disabled.
    sendResponse({ currentStatus: 'disabled' });

    return;
  }


  if (msg.enable === 'enable') {
    // If an enable request is sent, add a filter window.
    if (filterWindows.length < 1) {
      console.log(filterWindows);
      console.log(filterWindows.length);
      filterWindows.push(new FilterWindow(document.body));
    }
    sendResponse({ currentStatus: 'enabled' });
    return;
  }

  if (msg.fullscreen === 'fullscreen') {
    for (let i = 0; i < filterWindows.length; i++) {
      filterWindows[i].ccTopLeft.style.left = `0px`;
      filterWindows[i].ccTopLeft.style.top = `0px`;
      filterWindows[i].ccTopRight.style.left = `${document.body.clientWidth - filterWindows[i].cornerSize}px`;
      filterWindows[i].ccTopRight.style.top = `0px`;
      filterWindows[i].ccBottomLeft.style.left = `0px`;
      filterWindows[i].ccBottomLeft.style.top = `${window.innerHeight - filterWindows[i].cornerSize}px`;
      filterWindows[i].ccBottomRight.style.left = `${document.body.clientWidth - filterWindows[i].cornerSize}px`;
      filterWindows[i].ccBottomRight.style.top = `${window.innerHeight - filterWindows[i].cornerSize}px`;

      const width =
        filterWindows[i].ccTopRight.offsetLeft -
        filterWindows[i].ccTopLeft.offsetLeft +
        filterWindows[i].cornerSize;
      const height =
        filterWindows[i].ccBottomLeft.offsetTop -
        filterWindows[i].ccTopLeft.offsetTop +
        filterWindows[i].cornerSize;
      filterWindows[i].ccInner.style.width = `${Math.abs(width)}px`;
      filterWindows[i].ccInner.style.height = `${Math.abs(height)}px`;
      filterWindows[i].ccInner.style.left = `${filterWindows[i].ccTopLeft.offsetLeft}px`;
      filterWindows[i].ccInner.style.top = `${filterWindows[i].ccTopLeft.offsetTop}px`;

      self.ccInner.style.transform = "scaleX(1) scaleY(1)";
      self.ccTopLeft.style.transform = "scaleX(1) scaleY(1)";
      self.ccTopRight.style.transform = "scaleX(1) scaleY(1)";
      self.ccBottomLeft.style.transform = "scaleX(1) scaleY(1)";
      self.ccBottomRight.style.transform = "scaleX(1) scaleY(1)";
    }
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
