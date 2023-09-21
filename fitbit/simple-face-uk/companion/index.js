import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me as companion } from "companion";

// https://dev.fitbit.com/build/guides/settings/
// https://github.com/Fitbit/sdk-moment/blob/master/app/simple/device-settings.js

settingsStorage.addEventListener("change", (evt) => {
    if (evt.oldValue !== evt.newValue) {
        sendValue(evt.key, evt.newValue);
    }
});

if (companion.launchReasons.settingsChanged) {
    sendValue("trading", settingsStorage.getItem("trading"));
}

function sendValue(key, val) {
    if (val) {
        sendSettingData({
            key: key,
            value: JSON.parse(val)
        });
    }
}

function sendSettingData(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    } else {
        console.log("No peerSocket connection");
    }
}

console.log("Companion code started");