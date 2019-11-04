// import svgImage from '../img/testfilter.svg';
const svgImage = chrome.extension.getURL(require('./../img/testfilter.svg'));
const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter x="0" y="0" width="99999" height="99999" id="cvd">
      <feGaussianBlur stdDeviation="8"/>
    </filter>
  </defs>
</svg>
`

// Add a fixed div to the web page
// const appWindow = document.createElement("div");
// document.body.appendChild(appWindow);
// appWindow.style.position = "fixed";
// appWindow.style.width = "200px";
// appWindow.style.height = "200px";
// appWindow.style.top = "100px";
// appWindow.style.left = "100px";
// appWindow.style.zIndex = "999999999";
// appWindow.style['background-color'] = "rgba(0, 0, 0, 0)";
// appWindow.style.border = "3px solid red";
// appWindow.style['backdrop-filter'] = "invert(0.8)";
// appWindow.style['pointer-events'] = 'none';

// Make the color change container
// const ccContainer = document.createElement("div");
// document.body.appendChild(ccContainer);
// ccContainer.id = "CVExtension-Container";
// ccContainer.style.position = "fixed";
// ccContainer.style.width = "200px";
// ccContainer.style.height = "200px";
// ccContainer.style.top = "100px";
// ccContainer.style.left = "100px";
// ccContainer.style.zIndex = "999999999";
// ccContainer.style['background-color'] = "rgba(0, 0, 0, 0)";
// ccContainer.style.border = "3px solid red";
// appWindow.style['backdrop-filter'] = "invert(0.8)";
// ccContainer.style['pointer-events'] = 'none';

// Make the inner part of the color change container.
// This part can't be clicked?

ccSettings = {
  width: 200,
  height: 200,
  corner: 20,
  thickness: 3,
  x: 100,
  y: 100,
}

console.log(ccSettings);
console.log(svgImage);
console.log(typeof svgImage);

// Inner
const ccInner = document.createElement("div");
ccInner.innerHTML = svgContent;
document.body.appendChild(ccInner);
ccInner.id = "ccInner";
ccInner.style.position = "fixed";
ccInner.style.width = `${ccSettings.width}px`;
ccInner.style.height = `${ccSettings.height}px`;
ccInner.style.left = `${ccSettings.x}px`;
ccInner.style.top = `${ccSettings.y}px`;
ccInner.style.zIndex = "99999999";
// ccInner.style['backdrop-filter'] = `url("${svgImage}#myFilter")`
// ccInner.style['backdrop-filter'] = 'invert(0.8)';
ccInner.style['backdrop-filter'] = "url('#cvd')";
ccInner.style['pointer-events'] = 'none';

// TopLeft Corner
const ccTopLeft = document.createElement("div");
document.body.appendChild(ccTopLeft);
ccTopLeft.id = "ccTopLeft";
ccTopLeft.style.position = "fixed";
ccTopLeft.style.width = `${ccSettings.corner}px`;
ccTopLeft.style.height = `${ccSettings.corner}px`;
ccTopLeft.style.borderLeft = `${ccSettings.thickness}px solid red`;
ccTopLeft.style.borderTop = `${ccSettings.thickness}px solid red`;
ccTopLeft.style.boxSizing = "border-box";
ccTopLeft.style.left = `${ccSettings.x}px`;
ccTopLeft.style.top = `${ccSettings.y}px`;
ccTopLeft.style.zIndex = "99999999";
ccTopLeft.style.backgroundColor = "rgba(0, 0, 0, 0)";

// TopRight Corner
const ccTopRight = document.createElement("div");
document.body.appendChild(ccTopRight);
ccTopRight.id = "ccTopRight";
ccTopRight.style.position = "fixed";
ccTopRight.style.width = `${ccSettings.corner}px`;
ccTopRight.style.height = `${ccSettings.corner}px`;
ccTopRight.style.borderRight = `${ccSettings.thickness}px solid red`;
ccTopRight.style.borderTop = `${ccSettings.thickness}px solid red`;
ccTopRight.style.boxSizing = "border-box";
ccTopRight.style.left = `${ccSettings.x + ccSettings.width - ccSettings.corner}px`;
ccTopRight.style.top = `${ccSettings.y}px`;
ccTopRight.style.zIndex = "99999999";
ccTopRight.style.backgroundColor = "rgba(0, 0, 0, 0)";

// BottomLeft corner
const ccBottomLeft = document.createElement("div");
document.body.appendChild(ccBottomLeft);
ccBottomLeft.id = "ccBottomLeft";
ccBottomLeft.style.position = "fixed";
ccBottomLeft.style.width = `${ccSettings.corner}px`;
ccBottomLeft.style.height = `${ccSettings.corner}px`;
ccBottomLeft.style.borderLeft = `${ccSettings.thickness}px solid red`;
ccBottomLeft.style.borderBottom = `${ccSettings.thickness}px solid red`;
ccBottomLeft.style.boxSizing = "border-box";
ccBottomLeft.style.left = `${ccSettings.x}px`;
ccBottomLeft.style.top = `${ccSettings.y + ccSettings.height - ccSettings.corner}px`;
ccBottomLeft.style.zIndex = "99999999";
ccBottomLeft.style.backgroundColor = "rgba(0, 0, 0, 0)";

// BottomRight corner 
const ccBottomRight = document.createElement("div");
document.body.appendChild(ccBottomRight);
ccBottomRight.id = "ccBottomRight";
ccBottomRight.style.position = "fixed";
ccBottomRight.style.width = `${ccSettings.corner}px`;
ccBottomRight.style.height = `${ccSettings.corner}px`;
ccBottomRight.style.borderRight = `${ccSettings.thickness}px solid red`;
ccBottomRight.style.borderBottom = `${ccSettings.thickness}px solid red`;
ccBottomRight.style.boxSizing = "border-box";
ccBottomRight.style.left = `${ccSettings.x + ccSettings.width - ccSettings.corner}px`;
ccBottomRight.style.top = `${ccSettings.y + ccSettings.height - ccSettings.corner}px`;
ccBottomRight.style.zIndex = "99999999";
ccBottomRight.style.backgroundColor = "rgba(0, 0, 0, 0)";

enableDrag(ccTopLeft, "TopLeft");
enableDrag(ccTopRight, "TopRight");
enableDrag(ccBottomLeft, "BottomLeft");
enableDrag(ccBottomRight, "BottomRight");

function enableDrag(element, corner) {
  let startX = element.offsetLeft;
  let startY = element.offsetTop;
  let offsetX = 0;
  let offsetY = 0;

  element.onmousedown = dragMousedown;

  function dragMousedown(e) {
    e = e || window.event;
    e.preventDefault();
  
    // Get the mouse cursor position at startup
    startX = e.clientX;
    startY = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position
    offsetX = startX - e.clientX;
    offsetY = startY - e.clientY;
    startX = e.clientX;
    startY = e.clientY;

    // Set the element's new position:
    element.style.top = (element.offsetTop - offsetY) + "px";
    element.style.left = (element.offsetLeft - offsetX) + "px";

    // Calculate the new size of the app window
    if (corner === "TopLeft") {
      ccBottomLeft.style.left = (element.offsetLeft - offsetX) + "px";
      ccTopRight.style.top = (element.offsetTop - offsetY) + "px";
      ccInner.style.left = (element.offsetLeft - offsetX) + "px";
      ccInner.style.top = (element.offsetTop - offsetY) + "px";
      ccInner.style.width = ccInner.offsetWidth + offsetX + "px";
      ccInner.style.height = ccInner.offsetHeight + offsetY + "px";
    } else if (corner === "TopRight") {
      ccBottomRight.style.left = (element.offsetLeft - offsetX) + "px";
      ccTopLeft.style.top = (element.offsetTop - offsetY) + "px";
      ccInner.style.left = (element.offsetLeft - offsetX - ccInner.offsetWidth + ccSettings.corner) + "px";
      ccInner.style.top = (element.offsetTop - offsetY) + "px";
      ccInner.style.width = ccInner.offsetWidth - offsetX + "px";
      ccInner.style.height = ccInner.offsetHeight + offsetY + "px";
    } else if (corner === "BottomLeft") {
      ccTopLeft.style.left = (element.offsetLeft - offsetX) + "px";
      ccBottomRight.style.top = (element.offsetTop - offsetY) + "px";
      ccInner.style.left = (element.offsetLeft - offsetX) + "px";
      ccInner.style.top = (element.offsetTop - offsetY - ccInner.offsetHeight + ccSettings.corner) + "px";
      ccInner.style.width = ccInner.offsetWidth + offsetX + "px";
      ccInner.style.height = ccInner.offsetHeight - offsetY + "px";
    } else if (corner === "BottomRight") {
      ccTopRight.style.left = (element.offsetLeft - offsetX) + "px";
      ccBottomLeft.style.top = (element.offsetTop - offsetY) + "px";
      ccInner.style.left = (element.offsetLeft - offsetX - ccInner.offsetWidth + ccSettings.corner) + "px";
      ccInner.style.top = (element.offsetTop - offsetY - ccInner.offsetHeight + ccSettings.corner) + "px";
      ccInner.style.width = ccInner.offsetWidth - offsetX + "px";
      ccInner.style.height = ccInner.offsetHeight - offsetY + "px";
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}