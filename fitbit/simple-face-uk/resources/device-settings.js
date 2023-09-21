/*
  Responsible for loading, applying and saving settings.
  Requires companion/simple/companion-settings.js
  Callback should be used to update your UI.
*/

// https://github.com/Fitbit/sdk-moment/blob/master/app/simple/device-settings.js

import { me } from "appbit";
//import { me as device } from "device";
import * as fs from "fs";
import * as messaging from "messaging";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let settings, onsettingschange;

export function initialize(callback) {
  settings = loadSettings();
  onsettingschange = callback;
  onsettingschange(settings);
  let s = JSON.stringify(settings)
  console.log(`SETTINGS? ${s}`);
}

// Received message containing settings data
messaging.peerSocket.addEventListener("message", function(evt) {
  settings[evt.data.key] = evt.data.value;
  onsettingschange(settings);
})

// Register for the unload event
me.addEventListener("unload", saveSettings);

me.onunload = () => {
  console.log("We're about to exit");
}

// Load settings from filesystem
function loadSettings() {
  console.log("...loading settings");
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    return {};
  }
}

// Save settings to the filesystem
function saveSettings() {
  console.log("...saving settings");
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}
