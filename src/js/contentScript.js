const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter x="0" y="0" width="99999" height="99999" id="cvd">
      <feGaussianBlur stdDeviation="8"/>
    </filter>
  </defs>
</svg>
`; 

class FilterWindow {
  /**
   * @param {HTMLElement} target
   */
  constructor(target) {
    // General settings
    this.target = target;
    this.defaultWidth = 100;
    this.defaultHeight = 100;
    this.cornerSize = 20;
    this.lineThickness = 3;
    this.x = 100;
    this.y = 100;

    // Set objects
    this.ccInner = document.createElement("div");
    this.ccInner.innerHTML = svgContent;
    this.target.appendChild(this.ccInner);
    this.ccInner.style.position = "fixed";
    this.ccInner.style.width = `${this.defaultWidth}px`;
    this.ccInner.style.height = `${this.defaultHeight}px`;
    this.ccInner.style.left = `${this.x}px`;
    this.ccInner.style.top = `${this.y}px`;
    this.ccInner.style.zIndex = "99999999";
    this.ccInner.style['backdrop-filter'] = "url('#cvd')";
    this.ccInner.style['pointer-events'] = 'none';
    this.ccInner.style.transformOrigin = 'top left';

    // TopLeft Corner
    this.ccTopLeft = document.createElement("div");
    this.target.appendChild(this.ccTopLeft);
    this.ccTopLeft.style.position = "fixed";
    this.ccTopLeft.style.width = `${this.cornerSize}px`;
    this.ccTopLeft.style.height = `${this.cornerSize}px`;
    this.ccTopLeft.style.borderLeft = `${this.lineThickness}px solid red`;
    this.ccTopLeft.style.borderTop = `${this.lineThickness}px solid red`;
    this.ccTopLeft.style.boxSizing = "border-box";
    this.ccTopLeft.style.left = `${this.x}px`;
    this.ccTopLeft.style.top = `${this.y}px`;
    this.ccTopLeft.style.zIndex = "99999999";
    this.ccTopLeft.style.backgroundColor = "rgba(0, 0, 0, 0)";
    this.ccTopLeft.style.transformOrigin = 'top left';

    // TopRight Corner
    this.ccTopRight = document.createElement("div");
    this.target.appendChild(this.ccTopRight);
    this.ccTopRight.style.position = "fixed";
    this.ccTopRight.style.width = `${this.cornerSize}px`;
    this.ccTopRight.style.height = `${this.cornerSize}px`;
    this.ccTopRight.style.borderRight = `${this.lineThickness}px solid red`;
    this.ccTopRight.style.borderTop = `${this.lineThickness}px solid red`;
    this.ccTopRight.style.boxSizing = "border-box";
    this.ccTopRight.style.left = `${this.x + this.defaultWidth - this.cornerSize}px`;
    this.ccTopRight.style.top = `${this.y}px`;
    this.ccTopRight.style.zIndex = "99999999";
    this.ccTopRight.style.backgroundColor = "rgba(0, 0, 0, 0)";
    this.ccTopRight.style.transformOrigin = 'top right';

    this.ccBottomLeft = document.createElement("div");
    this.target.appendChild(this.ccBottomLeft);
    this.ccBottomLeft.style.position = "fixed";
    this.ccBottomLeft.style.width = `${this.cornerSize}px`;
    this.ccBottomLeft.style.height = `${this.cornerSize}px`;
    this.ccBottomLeft.style.borderLeft = `${this.lineThickness}px solid red`;
    this.ccBottomLeft.style.borderBottom = `${this.lineThickness}px solid red`;
    this.ccBottomLeft.style.boxSizing = "border-box";
    this.ccBottomLeft.style.left = `${this.x}px`;
    this.ccBottomLeft.style.top = `${this.y + this.defaultHeight - this.cornerSize}px`;
    this.ccBottomLeft.style.zIndex = "99999999";
    this.ccBottomLeft.style.backgroundColor = "rgba(0, 0, 0, 0)";
    this.ccBottomLeft.style.transformOrigin = 'bottom left';

    this.ccBottomRight = document.createElement("div");
    this.target.appendChild(this.ccBottomRight);
    this.ccBottomRight.style.position = "fixed";
    this.ccBottomRight.style.width = `${this.cornerSize}px`;
    this.ccBottomRight.style.height = `${this.cornerSize}px`;
    this.ccBottomRight.style.borderRight = `${this.lineThickness}px solid red`;
    this.ccBottomRight.style.borderBottom = `${this.lineThickness}px solid red`;
    this.ccBottomRight.style.boxSizing = "border-box";
    this.ccBottomRight.style.left = `${this.x + this.defaultWidth - this.cornerSize}px`;
    this.ccBottomRight.style.top = `${this.y + this.defaultHeight - this.cornerSize}px`;
    this.ccBottomRight.style.zIndex = "99999999";
    this.ccBottomRight.style.backgroundColor = "rgba(0, 0, 0, 0)";
    this.ccBottomRight.style.transformOrigin = 'bottom right';

    // Enable drag
    this.enableDrag(this.ccTopLeft, "TopLeft");
    this.enableDrag(this.ccTopRight, "TopRight");
    this.enableDrag(this.ccBottomLeft, "BottomLeft");
    this.enableDrag(this.ccBottomRight, "BottomRight");
  }

  /**
   * 
   * @param {HTMLElement} element 
   * @param {("TopLeft"|"TopRight"|"BottomLeft"|"BottomRight")} corner 
   */
  enableDrag(element, corner) {
    const self = this;
    
    element.onmousedown = mouseDown;

    let offsetX = 0;
    let offsetY = 0;

    /**
     * @param {MouseEvent} e 
     */
    function mouseDown(e) {
      e.preventDefault();
      offsetX = e.clientX - element.offsetLeft;
      offsetY = e.clientY - element.offsetTop;

      document.onmouseup = mouseUp;
      document.onmousemove = mouseMove;
    }

    /**
     * @param {MouseEvent} e 
     */
    function mouseMove(e) {
      e.preventDefault();

      // Set the element's new position
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;

      // Calculate how the other buttons should move.
      if (corner === "TopLeft") {
        self.ccBottomLeft.style.left = `${e.clientX - offsetX}px`;
        self.ccTopRight.style.top = `${e.clientY - offsetY}px`;
      } else if (corner === "TopRight") {
        self.ccBottomRight.style.left = `${e.clientX - offsetX}px`;
        self.ccTopLeft.style.top = `${e.clientY - offsetY}px`;
      } else if (corner === "BottomLeft") {
        self.ccTopLeft.style.left = `${e.clientX - offsetX}px`;
        self.ccBottomRight.style.top = `${e.clientY - offsetY}px`;
      } else if (corner === "BottomRight") {
        self.ccTopRight.style.left = `${e.clientX - offsetX}px`;
        self.ccBottomLeft.style.top = `${e.clientY - offsetY}px`;
      }

      const width = self.ccTopRight.offsetLeft - self.ccTopLeft.offsetLeft + self.cornerSize;
      const height = self.ccBottomLeft.offsetTop - self.ccTopLeft.offsetTop + self.cornerSize;
      self.ccInner.style.width = `${Math.abs(width)}px`;
      self.ccInner.style.height = `${Math.abs(height)}px`;
      self.ccInner.style.left = `${self.ccTopLeft.offsetLeft}px`;
      self.ccInner.style.top = `${self.ccTopLeft.offsetTop}px`;

      if (self.ccTopLeft.offsetLeft <= self.ccTopRight.offsetLeft + self.cornerSize && self.ccTopLeft.offsetTop <= self.ccBottomLeft.offsetTop + self.cornerSize) {
        self.ccInner.style.transform = 'scaleX(1) scaleY(1)';
        self.ccTopLeft.style.transform = 'scaleX(1) scaleY(1)';
        self.ccTopRight.style.transform = 'scaleX(1) scaleY(1)';
        self.ccBottomLeft.style.transform = 'scaleX(1) scaleY(1)';
        self.ccBottomRight.style.transform = 'scaleX(1) scaleY(1)';
      } else if (self.ccTopLeft.offsetLeft > self.ccTopRight.offsetLeft + self.cornerSize && self.ccTopLeft.offsetTop <= self.ccBottomLeft.offsetTop + self.cornerSize) {
        self.ccInner.style.transform = 'scaleX(-1) scaleY(1)';
        self.ccTopLeft.style.transform = 'scaleX(-1) scaleY(1)';
        self.ccTopRight.style.transform = 'scaleX(-1) scaleY(1)';
        self.ccBottomLeft.style.transform = 'scaleX(-1) scaleY(1)';
        self.ccBottomRight.style.transform = 'scaleX(-1) scaleY(1)';
      } else if (self.ccTopLeft.offsetLeft <= self.ccTopRight.offsetLeft + self.cornerSize && self.ccTopLeft.offsetTop > self.ccBottomLeft.offsetTop + self.cornerSize) {
        self.ccInner.style.transform = 'scaleX(1) scaleY(-1)'
        self.ccTopLeft.style.transform = 'scaleX(1) scaleY(-1)';
        self.ccTopRight.style.transform = 'scaleX(1) scaleY(-1)';
        self.ccBottomLeft.style.transform = 'scaleX(1) scaleY(-1)';
        self.ccBottomRight.style.transform = 'scaleX(1) scaleY(-1)';
      } else if (self.ccTopLeft.offsetLeft > self.ccTopRight.offsetLeft + self.cornerSize && self.ccTopLeft.offsetTop > self.ccBottomLeft.offsetTop + self.cornerSize) {
        self.ccInner.style.transform = 'scaleX(-1) scaleY(-1)'
        self.ccTopLeft.style.transform = 'scaleX(-1) scaleY(-1)';
        self.ccTopRight.style.transform = 'scaleX(-1) scaleY(-1)';
        self.ccBottomLeft.style.transform = 'scaleX(-1) scaleY(-1)';
        self.ccBottomRight.style.transform = 'scaleX(-1) scaleY(-1)';
      }
    }

    /**
     * @param {MouseEvent} e
     */
    function mouseUp(e) {
      e.preventDefault(e);
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  /**
   * @param {string} filter
   */
  updateSVGFilter(filter) {
    this.ccInner.innerHTML = `
    	<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    		<defs>
      		<filter x="0" y="0" width="99999" height="99999" id="cvd">
        		${filter}
      		</filter>
    		</defs>
  		</svg>
    `
  }
}

/**
 * @returns {FilterWindow[]}
 */
function getFilterWindows() {
  // Set filterWindows global variable if not found
  if (window.filterWindows === undefined) {
    window.filterWindows = [new FilterWindow(document.body)];
    return window.filterWindows;
  }
  // Otherwise, just return the variable
  else {
    return window.filterWindows;
  }
}

// Page messaging
// https://developer.chrome.com/extensions/messaging#connect
chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    const windows = getFilterWindows();
    console.log(windows);
  });
});