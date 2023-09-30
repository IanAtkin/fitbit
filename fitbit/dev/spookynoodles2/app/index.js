import clock from "clock";
//import * as document from "document";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../resources/utils";
//import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";
import { today as toDay } from "user-activity";
import { battery } from "power";

// update the clock every second
clock.granularity = "seconds";

// get handles for <text> elements

const hourRing = document.getElementById("hourRing");
const minuteRing = document.getElementById("minuteRing");
const secondRing = document.getElementById("secondRing");

const stepRing10k = document.getElementById("stepRing10k");
const stepRing20k = document.getElementById("stepRing20k");
const stepRing30k = document.getElementById("stepRing30k");

const theTime = document.getElementById("theTime");

const batteryIcon = document.getElementById("batteryIcon");
const power = document.getElementById("power");

/*
heartRate.text = "N/A";
if (HeartRateSensor) {
  const hrm = new HeartRateSensor();
  hrm.start();
  heartRate.style.visibility = "visible";
  heartIcon.style.visibility = "visible";
}
*/

// update the <text> element every tick with the current time
// includes naive code to generate CA time... cuz no tumezone support in Fitbit API
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = util.zeroPad(today.getHours());
  let minutes = util.zeroPad(today.getMinutes());
  let seconds = today.getSeconds();

  if (preferences.clockDisplay === "12h") {
    hours = util.zeroPad(hours % 12) || 12;
  } else {
    hours = util.zeroPad(hours);
  }

  theTime.text = `${hours}:${minutes}`;

  /* heart rate */
  /*
  if (HeartRateSensor) {
    hrm.addEventListener("reading", () => {
      heartRate.text = `${hrm.heartRate}`;
    });
  }
  */

  /* activity */
  /*
  if (appbit.permissions.granted("access_activity")) {
    kCalories.text = `${toDay.adjusted.calories}`;
    steps.text = `${toDay.adjusted.steps}`;
    
    steps.style.fill = util.getStepColor(toDay.adjusted.steps);
    
    if (toDay.local.elevationGain !== undefined) {
      floors.text = `${toDay.adjusted.elevationGain}`;
    }
  }
  */
  
  /* battery */
  power.text = `${Math.floor(battery.chargeLevel) + "%"}`;

  if(battery.chargeLevel > 25) {
    batteryIcon.href = "icons/battery_icon.png"
  }
  if(battery.chargeLevel <= 25) {
    batteryIcon.href = "icons/low_battery_icon.png"
  }
  if(battery.chargeLevel <= 10) {
    batteryIcon.href = "icons/critical_battery_icon.png"
  }
  
  updateHourArc(hours);
  updateMinuteArc(minutes);
  updateSecondArc(seconds);

  if (appbit.permissions.granted("access_activity")) {
    updateStepArc(toDay.adjusted.steps);
  }
}

function updateHourArc(h) {
  if(h != 0) {
    if (preferences.clockDisplay === "12h") {
      hourRing.sweepAngle = h * 22.5;
    } else {
      hourRing.sweepAngle = h * 11.25;
    }
  }
}

function updateMinuteArc(m) {
  if(m != 0) {
    minuteRing.sweepAngle = m * 4.5;
  }
}

function updateSecondArc(s) {
  secondRing.sweepAngle = s * 4.5;
}

function updateStepArc(s) {
  //console.log(s);
  if(s <= 10000) {
    stepRing10k.sweepAngle = s * .036;
  } else {
    stepRing10k.sweepAngle = 360;
  }

  if(s > 10000) {
    if(s <= 20000) {
      stepRing20k.sweepAngle = (s - 10000) * .036;
    }
    if(s >= 20000) {
      stepRing20k.sweepAngle = 360;
    }
  }

  if(s > 20000) {
    if(s <= 30000) {
      stepRing30k.sweepAngle = (s - 20000) * .036;
    }
    if(s >= 30000) {
      stepRing30k.sweepAngle = 360;
    }
  }

}