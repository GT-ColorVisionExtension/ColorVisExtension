// "testCvdExtension1" => "cvdExtension"

function getSavedSettings() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("testCvdExtension1", data => {
      if (data["testCvdExtension1"] === undefined) {
        console.log("Data does not exist yet.");
        
        const defaultSettings = {
          anomaly: "NONE",
          severity: 100,
          hue: 0,
          saturation: 100,
          value: 100
        }
  
        chrome.storage.sync.set({ testCvdExtension1: defaultSettings }, () => {
          console.log(defaultSettings);
          console.log("Set the default settings!");
          resolve(defaultSettings);
        });
  
      } else {
        console.log("Data exists. Loading data.");
        console.log(data["testCvdExtension1"]);
        resolve(data["testCvdExtension1"]);
      }
    });
  });
}

function saveSettings(anomaly, severity, hue, saturation, value) {
  return new Promise((resolve, reject) => {
    const settingsToSave = {
      anomaly: anomaly,
      severity: severity,
      hue: hue,
      saturation: saturation,
      value: value
    }
    chrome.storage.sync.set({ testCvdExtension1: settingsToSave }, () => {
      console.log('Saved the new settings.');
      console.log(settingsToSave);
      resolve(settingsToSave);
    })
  });
}

export { getSavedSettings, saveSettings };