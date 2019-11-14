const PROTANOMALIES = {
  "0.0": [[1, 0, 0, 0, 0],
          [0, 1, 0, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.1": [[0.856167, 0.182038, -0.038205, 0, 0],
          [0.029342, 0.955115, 0.015544, 0, 0],
          [-0.002880, -0.001563, 1.004443, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.2": [[0.734766, 0.334872, -0.069637, 0, 0],
          [0.051840, 0.919198, 0.028963, 0, 0],
          [-0.004928, -0.004209, 1.009137, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.3": [[0.630323, 0.465641, -0.095964, 0, 0],
          [0.069181, 0.890046, 0.040773, 0, 0],
          [-0.006308, -0.007724, 1.014032, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.4": [[0.539009, 0.579343, -0.118352, 0, 0],
          [0.082546, 0.866121, 0.051332, 0, 0],
          [-0.007136, -0.011959, 1.019095, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.5": [[0.458064, 0.679578, -0.137642, 0, 0],
          [0.092785, 0.846313, 0.060902, 0, 0],
          [-0.007494, -0.016807, 1.024301, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.6": [[0.385450, 0.769005, -0.154455, 0, 0],
          [0.100526, 0.829802, 0.069673, 0, 0],
          [-0.007442, -0.022190, 1.029632, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.7": [[0.319627, 0.849633, -0.169261, 0, 0],
          [0.106241, 0.815969, 0.077790, 0, 0],
          [-0.007025, -0.028051, 1.035076, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.8": [[0.259411, 0.923008, -0.182420, 0, 0],
          [0.110296, 0.804340, 0.085364, 0, 0],
          [-0.006276, -0.034346, 1.040622, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.9": [[0.203876, 0.990338, -0.194214, 0, 0],
          [0.112975, 0.794542, 0.092483, 0, 0],
          [-0.005222, -0.041043, 1.046265, 0, 0],
          [0, 0, 0, 1, 0]],
  "1.0": [[0.152286, 1.052583, -0.204868, 0, 0],
          [0.114503, 0.786281, 0.099216, 0, 0],
          [-0.003882, -0.048116, 1.051998, 0, 0],
          [0, 0, 0, 1, 0]]
}

const DEUTERANOMALIES = {
  "0.0": [[1.000000, 0.000000, -0.000000, 0, 0],
          [0.000000, 1.000000, 0.000000, 0, 0],
          [-0.000000, -0.000000, 1.000000, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.1": [[0.866435, 0.177704, -0.044139, 0, 0],
          [0.049567, 0.939063, 0.011370, 0, 0],
          [-0.003453, 0.007233, 0.996220, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.2": [[0.760729, 0.319078, -0.079807, 0, 0],
          [0.090568, 0.889315, 0.020117, 0, 0],
          [-0.006027, 0.013325, 0.992702, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.3": [[0.675425, 0.433850, -0.109275, 0, 0],
          [0.125303, 0.847755, 0.026942, 0, 0],
          [-0.007950, 0.018572, 0.989378, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.4": [[0.605511, 0.528560, -0.134071, 0, 0],
          [0.155318, 0.812366, 0.032316, 0, 0],
          [-0.009376, 0.023176, 0.986200, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.5": [[0.547494, 0.607765, -0.155259, 0, 0],
          [0.181692, 0.781742, 0.036566, 0, 0],
          [-0.010410, 0.027275, 0.983136, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.6": [[0.498864, 0.674741, -0.173604, 0, 0],
          [0.205199, 0.754872, 0.039929, 0, 0],
          [-0.011131, 0.030969, 0.980162, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.7": [[0.457771, 0.731899, -0.189670, 0, 0],
          [0.226409, 0.731012, 0.042579, 0, 0],
          [-0.011595, 0.034333, 0.977261, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.8": [[0.422823, 0.781057, -0.203881, 0, 0],
          [0.245752, 0.709602, 0.044646, 0, 0],
          [-0.011843, 0.037423, 0.974421, 0, 0],
          [0, 0, 0, 1, 0]],
  "0.9": [[0.392952, 0.823610, -0.216562, 0, 0],
          [0.263559, 0.690210, 0.046232, 0, 0],
          [-0.011910, 0.040281, 0.971630, 0, 0],
          [0, 0, 0, 1, 0]],
  "1.0": [[0.367322, 0.860646, -0.227968, 0, 0],
          [0.280085, 0.672501, 0.047413, 0, 0],
          [-0.011820, 0.042940, 0.968881, 0, 0],
          [0, 0, 0, 1, 0]]
}

const TRITANOMALIES = {
  "0.0": [[1.000000, 0.000000, -0.000000],
          [0.000000, 1.000000, 0.000000],
          [-0.000000, -0.000000, 1.000000]],
  "0.1": [[0.926670, 0.092514, -0.019184],
          [0.021191, 0.964503, 0.014306],
          [0.008437, 0.054813, 0.936750]],
  "0.2": [[0.895720, 0.133330, -0.029050],
          [0.029997, 0.945400, 0.024603],
          [0.013027, 0.104707, 0.882266]],
  "0.3": [[0.905871, 0.127791, -0.033662],
          [0.026856, 0.941251, 0.031893],
          [0.013410, 0.148296, 0.838294]],
  "0.4": [[0.948035, 0.089490, -0.037526],
          [0.014364, 0.946792, 0.038844],
          [0.010853, 0.193991, 0.795156]],
  "0.5": [[1.017277, 0.027029, -0.044306],
          [-0.006113, 0.958479, 0.047634],
          [0.006379, 0.248708, 0.744913]],
  "0.6": [[1.104996, -0.046633, -0.058363],
          [-0.032137, 0.971635, 0.060503],
          [0.001336, 0.317922, 0.680742]],
  "0.7": [[1.193214, -0.109812, -0.083402],
          [-0.058496, 0.979410, 0.079086],
          [-0.002346, 0.403492, 0.598854]],
  "0.8": [[1.257728, -0.139648, -0.118081],
          [-0.078003, 0.975409, 0.102594],
          [-0.003316, 0.501214, 0.502102]],
  "0.9": [[1.278864, -0.125333, -0.153531],
          [-0.084748, 0.957674, 0.127074],
          [-0.000989, 0.601151, 0.399838]],
  "1.0": [[1.255528, -0.076749, -0.178779],
          [-0.078411, 0.930809, 0.147602],
          [0.004733, 0.691367, 0.303900]]
}

class FilterWindow {
  /**
   * @param {HTMLElement} target
   */
  constructor(target) {
    // General settings
    this.target = target;
    this.defaultWidth = 800;
    this.defaultHeight = 600;
    this.cornerSize = 20;
    this.lineThickness = 3;
    this.x = 100;
    this.y = 100;

    // Create an SVG Element
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    const filter_0 = document.createElementNS(NS, "filter");
    filter_0.setAttributeNS(null, "id", "cvd_0");
    const matrix_0 = document.createElementNS(NS, "feColorMatrix");
    matrix_0.setAttributeNS(null, "in", "hsv");
    matrix_0.setAttributeNS(null, "type", "matrix");
    matrix_0.setAttributeNS(null, "values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0");
    const matrix_0_hsv = document.createElementNS(NS, "feColorMatrix");
    matrix_0_hsv.setAttributeNS(null, "in", "SourceGraphic");
    matrix_0_hsv.setAttributeNS(null, "type", "matrix");
    matrix_0_hsv.setAttributeNS(null, "values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0");
    matrix_0_hsv.setAttributeNS(null, "result", "hsv");

    const filter_1 = document.createElementNS(NS, "filter");
    filter_1.setAttributeNS(null, "id", "cvd_1");
    const matrix_1 = document.createElementNS(NS, "feColorMatrix");
    matrix_1.setAttributeNS(null, "in", "hsv");
    matrix_1.setAttributeNS(null, "type", "matrix");
    matrix_1.setAttributeNS(null, "values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0");
    const matrix_1_hsv = document.createElementNS(NS, "feColorMatrix");
    matrix_1_hsv.setAttributeNS(null, "in", "SourceGraphic");
    matrix_1_hsv.setAttributeNS(null, "type", "matrix");
    matrix_1_hsv.setAttributeNS(null, "values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0");
    matrix_1_hsv.setAttributeNS(null, "result", "hsv");

    filter_0.appendChild(matrix_0_hsv);
    filter_0.appendChild(matrix_0);
    filter_1.appendChild(matrix_1_hsv);
    filter_1.appendChild(matrix_1);
    svg.appendChild(filter_0);
    svg.appendChild(filter_1);
    document.body.appendChild(svg);

    this.svg = svg;
    this.filter_0 = filter_0;
    this.matrix_0 = matrix_0;
    this.matrix_0_hsv = matrix_0_hsv;
    this.filter_1 = filter_1;
    this.matrix_1 = matrix_1;
    this.matrix_1_hsv = matrix_1_hsv;
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
    this.ccInner.style['backdrop-filter'] = "url('#cvd_0')";
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
   * @param {number} value
   */
  updateSVGFilter(value) {
    const next = 1 - this.currentMatrix;
    const matrixString = generateSeverityMatrix(value, PROTANOMALIES);
    this['matrix_' + 0].setAttribute("values", matrixString);
    this['matrix_' + 1].setAttribute("values", matrixString);
    this.ccInner.style['backdrop-filter'] = `url('#cvd_${next}')`;

    this.currentMatrix = next;
  }

  updateHSV(hue, sat, val) {
    const next = 1 - this.currentMatrix;
    const h = hue;
    const s = sat / 100;
    const v = val / 100;
    const matrixString = generateHSVMatrix(h, s, v);
    this['matrix_' + 0 + '_hsv'].setAttribute("values", matrixString);
    this['matrix_' + 1 + '_hsv'].setAttribute("values", matrixString);
    this.ccInner.style['backdrop-filter'] = `url('#cvd_${next}')`;
    this.currentMatrix = next;
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

function generateHSVMatrix(hue, sat, val) {
  // Hue should be a value between 0 to 360
  // Sat should be a value between 0 to 1
  // Val should be a value between 0 to 1

  // https://beesbuzz.biz/code/16-hsv-color-transforms

  const u = Math.cos(hue * Math.PI / 180);
  const w = Math.sin(hue * Math.PI / 180);
  const s = sat;
  const v = val;
  const vsu = v * s * u;
  const vsw = v * s * w;

  const matrix = [
    [0.299 * v + 0.701 * vsu + 0.168 * vsw, 0.587 * v - 0.587 * vsu + 0.330 * vsw, 0.114 * v - 0.114 * vsu - 0.497 * vsw],
    [0.299 * v - 0.299 * vsu - 0.328 * vsw, 0.587 * v + 0.413 * vsu + 0.035 * vsw, 0.114 * v - 0.114 * vsu + 0.292 * vsw],
    [0.299 * v - 0.300 * vsu + 1.250 * vsw, 0.587 * v - 0.588 * vsu - 1.050 * vsw, 0.114 * v + 0.886 * vsu - 0.203 * vsw]
  ]

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      matrix[y][x] = matrix[y][x].toFixed(3);
    }
  }

  for (let y = 0; y < matrix.length; y++) {
    matrix[y].push("0");
    matrix[y].push("0");
  }

  matrix.push(["0", "0", "0", "1", "0"])

  console.log(matrix);
  return matrix.flat().join(' ');
}

/**
 * @param {number} severity 
 * @param {string} visionType 
 */
function generateSeverityMatrix(severity, visionType) {
  const lower = (Math.floor(severity * 10) / 10).toFixed(1);
  const upper = (Math.ceil(severity * 10) / 10).toFixed(1);
  
  if (lower === upper) {
    return upper.flat().join(' ');
  }

  const matrix = interpolateMatrices(visionType[lower], visionType[upper], parseFloat(lower), parseFloat(upper), severity);
  return matrix.flat().join(' ');
}

function interpolateMatrices(matrix1, matrix2, min, max, value) {
  const range = max - min;
  const percent = (value - min) / range;

  // Create output matrix
  matrixOut = []

  for (let y = 0; y < matrix1.length; y++) {
    matrixOut[y] = [];
    for (let x = 0; x < matrix1[y].length; x++) {
      const diff = matrix2[y][x] - matrix1[y][x];
      matrixOut[y][x] = matrix1[y][x] + diff * percent;
    }
  }

  return matrixOut;
}



chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text === 'script_injected?') {
    sendResponse({status: "yes"});
  }

  // Get windows and/or initialize them
  const windows = getFilterWindows();
  console.log(msg);

  if (msg.svgFilter) {
    for (let i = 0; i < windows.length; i++) {
      windows[i].updateSVGFilter(parseFloat(msg.svgFilter));
    }
  }

  if (msg.hueValue && msg.saturationValue && msg.valueValue) {
    console.log(msg);
    for (let i = 0; i < windows.length; i++) {
      windows[i].updateHSV(msg.hueValue, msg.saturationValue, msg.valueValue);
    }
  }
});