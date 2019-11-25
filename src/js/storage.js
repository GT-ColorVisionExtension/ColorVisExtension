// "testCvdExtension4" => "cvdExtension"

function getSavedSettings() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("testCvdExtension4", data => {
      if (data["testCvdExtension4"] === undefined) {
        console.log("Data does not exist yet.");
        
        const defaultSettings = {
          anomaly: "NONE",
          severity: 1,
          hue: 0,
          saturation: 100,
          value: 100,
          redBoost: 0,
          greenBoost: 0,
          blueBoost: 0,
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          fullscreen: false,
          enabled: false,
        }
  
        chrome.storage.sync.set({ testCvdExtension4: defaultSettings }, () => {
          console.log(defaultSettings);
          console.log("Set the default settings!");
          resolve(defaultSettings);
        });
  
      } else {
        console.log("Data exists. Loading data.");
        console.log(data["testCvdExtension4"]);
        resolve(data["testCvdExtension4"]);
      }
    });
  });
}

function saveSettings(anomaly, severity, hue, saturation, value, redBoost, greenBoost, blueBoost, x, y, width, height, fullscreen, enabled) {
  return new Promise((resolve, reject) => {
    const settingsToSave = {
      anomaly: anomaly,
      severity: severity,
      hue: hue,
      saturation: saturation,
      value: value,
      redBoost: redBoost,
      greenBoost: greenBoost,
      blueBoost: blueBoost,
      x: x,
      y: y,
      width: width,
      height: height,
      fullscreen: fullscreen,
      enabled: enabled
    }
    chrome.storage.sync.set({ testCvdExtension4: settingsToSave }, () => {
      console.log('Saved the new settings.');
      console.log(settingsToSave);
      resolve(settingsToSave);
    })
  });
}

export { getSavedSettings, saveSettings };