import ANOMALY from "./anomalyDefaults";
import { getSavedSettings, saveSettings } from "./storage";

class FilterWindow {
  /**
   * @param {HTMLElement} target
   */
  constructor(target) {
    this.getSettings().then(settings => {
      // General settings
      this.target = target;
      this.defaultWidth = settings.width;
      this.defaultHeight = settings.height;
      this.width = this.defaultWidth;
      this.height = this.defaultHeight;
      this.cornerSize = 20;
      this.lineThickness = 3;
      this.x = settings.x;
      this.y = settings.y;
      this.severityType = ANOMALY.NONE;
      this.anomaly = 'NONE';
      this.severity = 1;
      this.hue = 0;
      this.saturation = 100;
      this.value = 100;
      this.redBoost = 0;
      this.greenBoost = 0;
      this.blueBoost = 0;
      this.fullscreen = false;
  
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
  
      filter_0.appendChild(matrix_0_rgb);
      filter_0.appendChild(matrix_0_hsv);
      filter_0.appendChild(matrix_0);
      filter_1.appendChild(matrix_1_rgb);
      filter_1.appendChild(matrix_1_hsv);
      filter_1.appendChild(matrix_1);
      svg.appendChild(filter_0);
      svg.appendChild(filter_1);
      document.body.appendChild(svg);
  
      this.svg = svg;
      this.filter_0 = filter_0;
      this.matrix_0 = matrix_0;
      this.matrix_0_hsv = matrix_0_hsv;
      this.matrix_0_rgb = matrix_0_rgb;
      this.filter_1 = filter_1;
      this.matrix_1 = matrix_1;
      this.matrix_1_hsv = matrix_1_hsv;
      this.matrix_1_rgb = matrix_1_rgb;
      this.currentMatrix = 0;
  
      // Set objects
      this.ccInner = document.createElement("div");
      // this.ccInner.innerHTML = svgContent;
      this.target.appendChild(this.ccInner);
      this.ccInner.style.position = "fixed";
      this.ccInner.style.width = `${this.defaultWidth}px`;
      this.ccInner.style.height = `${this.defaultHeight}px`;
      this.ccInner.style.left = `${this.x}px`;
      this.ccInner.style.top = `${this.y}px`;
      this.ccInner.style.zIndex = "99999999";
      this.ccInner.style["backdrop-filter"] = "url('#cvd_0')";
      this.ccInner.style["pointer-events"] = "none";
      this.ccInner.style.transformOrigin = "top left";
  
      // TopLeft Corner
      this.ccTopLeft = document.createElement("div");
      this.target.appendChild(this.ccTopLeft);
      this.ccTopLeft.setAttribute("class", "ccTopLeft");
      this.ccTopLeft.style.position = "fixed";
      this.ccTopLeft.style.width = `${this.cornerSize}px`;
      this.ccTopLeft.style.height = `${this.cornerSize}px`;
      // this.ccTopLeft.style.borderLeft = `${this.lineThickness}px solid red`;
      // this.ccTopLeft.style.borderTop = `${this.lineThickness}px solid red`;
      this.ccTopLeft.style.boxSizing = "border-box";
      this.ccTopLeft.style.left = `${this.x}px`;
      this.ccTopLeft.style.top = `${this.y}px`;
      this.ccTopLeft.style.zIndex = "99999999";
      this.ccTopLeft.style.backgroundColor = "rgba(0, 0, 0, 0)";
      this.ccTopLeft.style.transformOrigin = "top left";
  
      // TopRight Corner
      this.ccTopRight = document.createElement("div");
      this.target.appendChild(this.ccTopRight);
      this.ccTopRight.setAttribute("class", "ccTopRight");
      this.ccTopRight.style.position = "fixed";
      this.ccTopRight.style.width = `${this.cornerSize}px`;
      this.ccTopRight.style.height = `${this.cornerSize}px`;
      // this.ccTopRight.style.borderRight = `${this.lineThickness}px solid red`;
      // this.ccTopRight.style.borderTop = `${this.lineThickness}px solid red`;
      this.ccTopRight.style.boxSizing = "border-box";
      this.ccTopRight.style.left = `${this.x +
        this.defaultWidth -
        this.cornerSize}px`;
      this.ccTopRight.style.top = `${this.y}px`;
      this.ccTopRight.style.zIndex = "99999999";
      this.ccTopRight.style.backgroundColor = "rgba(0, 0, 0, 0)";
      this.ccTopRight.style.transformOrigin = "top right";
  
      this.ccBottomLeft = document.createElement("div");
      this.target.appendChild(this.ccBottomLeft);
      this.ccBottomLeft.setAttribute("class", "ccBottomLeft");
      this.ccBottomLeft.style.position = "fixed";
      this.ccBottomLeft.style.width = `${this.cornerSize}px`;
      this.ccBottomLeft.style.height = `${this.cornerSize}px`;
      // this.ccBottomLeft.style.borderLeft = `${this.lineThickness}px solid red`;
      // this.ccBottomLeft.style.borderBottom = `${this.lineThickness}px solid red`;
      this.ccBottomLeft.style.boxSizing = "border-box";
      this.ccBottomLeft.style.left = `${this.x}px`;
      this.ccBottomLeft.style.top = `${this.y +
        this.defaultHeight -
        this.cornerSize}px`;
      this.ccBottomLeft.style.zIndex = "99999999";
      this.ccBottomLeft.style.backgroundColor = "rgba(0, 0, 0, 0)";
      this.ccBottomLeft.style.transformOrigin = "bottom left";
  
      this.ccBottomRight = document.createElement("div");
      this.target.appendChild(this.ccBottomRight);
      this.ccBottomRight.setAttribute("class", "ccBottomRight");
      this.ccBottomRight.style.position = "fixed";
      this.ccBottomRight.style.width = `${this.cornerSize}px`;
      this.ccBottomRight.style.height = `${this.cornerSize}px`;
      // this.ccBottomRight.style.borderRight = `${this.lineThickness}px solid red`;
      // this.ccBottomRight.style.borderBottom = `${this.lineThickness}px solid red`;
      this.ccBottomRight.style.boxSizing = "border-box";
      this.ccBottomRight.style.left = `${this.x +
        this.defaultWidth -
        this.cornerSize}px`;
      this.ccBottomRight.style.top = `${this.y +
        this.defaultHeight -
        this.cornerSize}px`;
      this.ccBottomRight.style.zIndex = "99999999";
      this.ccBottomRight.style.backgroundColor = "rgba(0, 0, 0, 0)";
      this.ccBottomRight.style.transformOrigin = "bottom right";
  
      // Enable drag
      this.enableDrag(this.ccTopLeft, "TopLeft");
      this.enableDrag(this.ccTopRight, "TopRight");
      this.enableDrag(this.ccBottomLeft, "BottomLeft");
      this.enableDrag(this.ccBottomRight, "BottomRight");
    })
    
  }

  async getSettings() {
    return await getSavedSettings();
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

    function mouseDown(e) {
      e.preventDefault();
      offsetX = e.clientX - element.offsetLeft;
      offsetY = e.clientY - element.offsetTop;

      document.onmouseup = mouseUp;
      document.onmousemove = mouseMove;
    }

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

      const width =
        self.ccTopRight.offsetLeft -
        self.ccTopLeft.offsetLeft +
        self.cornerSize;
      const height =
        self.ccBottomLeft.offsetTop -
        self.ccTopLeft.offsetTop +
        self.cornerSize;
      self.ccInner.style.width = `${Math.abs(width)}px`;
      self.ccInner.style.height = `${Math.abs(height)}px`;
      self.ccInner.style.left = `${self.ccTopLeft.offsetLeft}px`;
      self.ccInner.style.top = `${self.ccTopLeft.offsetTop}px`;

      // Also set it in instance variable
      self.width = width;
      self.height = height;
      self.x = self.ccTopLeft.offsetLeft;
      self.y = self.ccTopLeft.offsetTop;
      self.fullscreen = false;

      if (
        self.ccTopLeft.offsetLeft <=
          self.ccTopRight.offsetLeft + self.cornerSize &&
        self.ccTopLeft.offsetTop <=
          self.ccBottomLeft.offsetTop + self.cornerSize
      ) {
        self.ccInner.style.transform = "scaleX(1) scaleY(1)";
        self.ccTopLeft.style.transform = "scaleX(1) scaleY(1)";
        self.ccTopRight.style.transform = "scaleX(1) scaleY(1)";
        self.ccBottomLeft.style.transform = "scaleX(1) scaleY(1)";
        self.ccBottomRight.style.transform = "scaleX(1) scaleY(1)";
      } else if (
        self.ccTopLeft.offsetLeft >
          self.ccTopRight.offsetLeft + self.cornerSize &&
        self.ccTopLeft.offsetTop <=
          self.ccBottomLeft.offsetTop + self.cornerSize
      ) {
        self.ccInner.style.transform = "scaleX(-1) scaleY(1)";
        self.ccTopLeft.style.transform = "scaleX(-1) scaleY(1)";
        self.ccTopRight.style.transform = "scaleX(-1) scaleY(1)";
        self.ccBottomLeft.style.transform = "scaleX(-1) scaleY(1)";
        self.ccBottomRight.style.transform = "scaleX(-1) scaleY(1)";
      } else if (
        self.ccTopLeft.offsetLeft <=
          self.ccTopRight.offsetLeft + self.cornerSize &&
        self.ccTopLeft.offsetTop > self.ccBottomLeft.offsetTop + self.cornerSize
      ) {
        self.ccInner.style.transform = "scaleX(1) scaleY(-1)";
        self.ccTopLeft.style.transform = "scaleX(1) scaleY(-1)";
        self.ccTopRight.style.transform = "scaleX(1) scaleY(-1)";
        self.ccBottomLeft.style.transform = "scaleX(1) scaleY(-1)";
        self.ccBottomRight.style.transform = "scaleX(1) scaleY(-1)";
      } else if (
        self.ccTopLeft.offsetLeft >
          self.ccTopRight.offsetLeft + self.cornerSize &&
        self.ccTopLeft.offsetTop > self.ccBottomLeft.offsetTop + self.cornerSize
      ) {
        self.ccInner.style.transform = "scaleX(-1) scaleY(-1)";
        self.ccTopLeft.style.transform = "scaleX(-1) scaleY(-1)";
        self.ccTopRight.style.transform = "scaleX(-1) scaleY(-1)";
        self.ccBottomLeft.style.transform = "scaleX(-1) scaleY(-1)";
        self.ccBottomRight.style.transform = "scaleX(-1) scaleY(-1)";
      }
    }

    function mouseUp(e) {
      e.preventDefault(e);
      document.onmouseup = null;
      document.onmousemove = null;
      self.onUpdate();
    }
  }

  updateSeverityFilter(value) {
    const next = 1 - this.currentMatrix;
    const matrixString = generateSeverityMatrix(value, this.severityType);
    this["matrix_" + 0].setAttribute("values", matrixString);
    this["matrix_" + 1].setAttribute("values", matrixString);
    this.ccInner.style["backdrop-filter"] = `url('#cvd_${next}')`;

    this.currentMatrix = next;

    this.severity = value;
    this.onUpdate();
  }

  updateHSV(hue, sat, val) {
    const next = 1 - this.currentMatrix;
    const h = hue;
    const s = sat / 100;
    const v = val / 100;
    const matrixString = generateHSVMatrix(h, s, v);

    // Ensure the app will round to normal values near the defaults
    // if ((h < 1 || h > 359) && (s > 0.97 && s < 1.07) && (v > 0.97 && v < 1.07)) {
    //   this["matrix_" + 0 + "_hsv"].setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0");
    //   this["matrix_" + 1 + "_hsv"].setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0");
    // }

    this["matrix_" + 0 + "_hsv"].setAttribute("values", matrixString);
    this["matrix_" + 1 + "_hsv"].setAttribute("values", matrixString);
    this.ccInner.style["backdrop-filter"] = `url('#cvd_${next}')`;
    this.currentMatrix = next;

    this.hue = hue;
    this.saturation = sat;
    this.value = val;
    this.onUpdate();
  }

  updateSeverityType(severity, severityType) {
    if (severityType === 'NONE') {
      this.severityType = ANOMALY.NONE;
    } else if (severityType === 'PROTANOMALIES') {
      this.severityType = ANOMALY.PROTANOMALIES;
    } else if (severityType === 'DEUTERANOMALIES') {
      this.severityType = ANOMALY.DEUTERANOMALIES;
    } else if (severityType === 'TRITANOMALIES') {
      this.severityType = ANOMALY.TRITANOMALIES;
    }

    this.anomaly = severityType;
    this.updateSeverityFilter(severity); // this calls onUpdate to save later
  }

  updateRGB(red, green, blue) {
    /** Parameters are expected to be integers from -300 to 300 */
    const r = red / 100;
    const g = green / 100;
    const b = blue / 100;
    const next = 1 - this.currentMatrix;

    const matrixString = `
      1  0  0  0  0
      ${-r}  1  0  0  0
      ${-g}  ${-b}  1  0  0
      0  0  0  1  0
    `

    this["matrix_" + 0 + "_rgb"].setAttribute("values", matrixString);
    this["matrix_" + 1 + "_rgb"].setAttribute("values", matrixString);
    this.ccInner.style["backdrop-filter"] = `url('#cvd_${next}')`;
    this.currentMatrix = next;

    this.redBoost = red;
    this.greenBoost = green;
    this.blueBoost = blue;
    this.onUpdate();
  }

  updatePositionAndSize(x, y, width, height) {
    
  }

  onUpdate() {
    saveSettings(this.anomaly, this.severity, this.hue, this.saturation, this.value, this.redBoost, this.greenBoost, this.blueBoost, this.x, this.y, this.width, this.height, this.fullscreen, true);
  }

  removeFromDOM() {
    this.svg.remove();
    this.filter_0.remove();
    this.matrix_0.remove();
    this.matrix_0_hsv.remove();
    this.filter_1.remove();
    this.matrix_1.remove();
    this.matrix_1_hsv.remove();
    this.ccInner.remove();
    this.ccTopLeft.remove();
    this.ccTopRight.remove();
    this.ccBottomLeft.remove();
    this.ccBottomRight.remove();
  }
}

function generateHSVMatrix(hue, sat, val) {
  // Hue should be a value between 0 to 360
  // Sat should be a value between 0 to 1
  // Val should be a value between 0 to 1

  // https://beesbuzz.biz/code/16-hsv-color-transforms

  const u = Math.cos((hue * Math.PI) / 180);
  const w = Math.sin((hue * Math.PI) / 180);
  const s = sat;
  const v = val;
  const vsu = v * s * u;
  const vsw = v * s * w;

  const matrix = [
    [
      0.299 * v + 0.701 * vsu + 0.168 * vsw,
      0.587 * v - 0.587 * vsu + 0.33 * vsw,
      0.114 * v - 0.114 * vsu - 0.497 * vsw
    ],
    [
      0.299 * v - 0.299 * vsu - 0.328 * vsw,
      0.587 * v + 0.413 * vsu + 0.035 * vsw,
      0.114 * v - 0.114 * vsu + 0.292 * vsw
    ],
    [
      0.299 * v - 0.3 * vsu + 1.25 * vsw,
      0.587 * v - 0.588 * vsu - 1.05 * vsw,
      0.114 * v + 0.886 * vsu - 0.203 * vsw
    ]
  ];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      matrix[y][x] = matrix[y][x].toFixed(3);
    }
  }

  for (let y = 0; y < matrix.length; y++) {
    matrix[y].push("0");
    matrix[y].push("0");
  }

  matrix.push(["0", "0", "0", "1", "0"]);
  return matrix.flat().join(" ");
}

/**
 * @param {number} severity
 * @param {string} visionType
 */
function generateSeverityMatrix(severity, visionType) {
  const lower = (Math.floor(severity * 10) / 10).toFixed(1);
  const upper = (Math.ceil(severity * 10) / 10).toFixed(1);

  if (lower === upper) {
    return visionType[upper].flat().join(" ");
  }

  const matrix = interpolateMatrices(
    visionType[lower],
    visionType[upper],
    parseFloat(lower),
    parseFloat(upper),
    severity
  );
  return matrix.flat().join(" ");
}

function interpolateMatrices(matrix1, matrix2, min, max, value) {
  const range = max - min;
  const percent = (value - min) / range;

  // Create output matrix
  const matrixOut = [];

  for (let y = 0; y < matrix1.length; y++) {
    matrixOut[y] = [];
    for (let x = 0; x < matrix1[y].length; x++) {
      const diff = matrix2[y][x] - matrix1[y][x];
      matrixOut[y][x] = matrix1[y][x] + diff * percent;
    }
  }

  return matrixOut;
}

export default FilterWindow;
export { generateSeverityMatrix, generateHSVMatrix };