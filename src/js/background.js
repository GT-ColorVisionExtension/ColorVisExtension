import '../img/icon-128.png'
import '../img/icon-34.png'
import { getSavedSettings } from './storage';

// let loadedWindow = 0;

// function updateSeverity(e, severity) {
//   return new Promise((resolve, reject) => {
//     const percent = severity / 100;
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { severity: percent }, msg => {
//         resolve();
//       });
//     });
//   })
// }

// function updateSeverityType(type, severity) {
//   return new Promise((resolve, reject) => {
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       // Send message to update severity type
//       chrome.tabs.sendMessage(tabs[0].id, {severity: severity / 100, severityType: type}, () => {
//         resolve();
//       })
//     });
//   })
// }

// function updateHueSaturationValue(h, s, v) {
//   return new Promise((resolve, reject) => {
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, {
//         hueValue: h,
//         saturationValue: s,
//         valueValue: v
//       }, msg => {
//         resolve();
//       });
//     });
//   });
// }

// function updateRGB(e, r, g, b) {
//   return new Promise((resolve, reject) => {
//     let red, green, blue;

//     if (r !== undefined && g !== undefined && b !== undefined) {
//       red = r;
//       green = g;
//       blue = b;
//     }

//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, {
//         redBoost: red,
//         greenBoost: green,
//         blueBoost: blue,
//       }, () => {
//         // updateThumbnailRGB();
//         resolve();
//       });
//     });
//   });
// }

// function verifyAndInject() {
//   chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
//     const settings = await getSavedSettings();

//     if (settings.enabled === true) {
//       chrome.tabs.sendMessage(tabs[0].id, { text: "script_injected?" }, function(msg) {
//         msg = msg || {};
//         if (msg.status != "yes") {
//           chrome.tabs.executeScript(
//             tabs[0].id, { file: "contentScript.bundle.js"}, async () => {
//               updateSeverity(null, Math.max(settings['severity'] * 100, 100)).then(() => {
//                 setTimeout(() => {
//                   updateSeverityType(settings['anomaly']).then(() => {
//                     setTimeout(() => {
//                       updateHueSaturationValue(settings['hue'], settings['saturation'], settings['value']).then(() => {
//                         setTimeout(() => {
//                           updateRGB(null, settings['redBoost'], settings['greenBoost'], settings['blueBoost']).then(() => {

//                           })
//                         }, 60)
//                       })
//                     }, 60)
//                   })
//                 }, 60)
//               });
//             }
//           );
//         }
//       });
//     }
//   });
// }

// // 2. If the content script was already injected, skip to setting up page change listener.
// // Else, look up the current settings in browser storage(?)


// // With the current settings, inject the window if the settings say it should be enabled
// // Make sure it's in the same x y position and full screen.
// // Dont bother saving width and height because those can change dynamically.

// // Add a listener that tracks when the page changes 
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (loadedWindow % 2 === 0) {
//     verifyAndInject();
//   }
//   loadedWindow += 1;
// });
