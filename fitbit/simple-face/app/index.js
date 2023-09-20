import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../resources/utils";
import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";
import { today as toDay } from "user-activity";
//import { me as device } from "device";
import { battery } from "power";

// update the clock every minute
clock.granularity = "minutes";

// get handles for <text> elements
const theTime = document.getElementById("theTime");
const caTime = document.getElementById("caTime");
const justForJay = document.getElementById("justForJay");
const theDate = document.getElementById("theDate");
const heartRate = document.getElementById("heartRate");
const heartIcon = document.getElementById("heartIcon");
const kCalories = document.getElementById("kCalories");
const steps = document.getElementById("steps");
const floors = document.getElementById("floors");
const power = document.getElementById("power");

const bg = document.getElementById("image");
const bgLastChanged = 0;

const batteryIcon = document.getElementById("batteryIcon");

const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

heartRate.text = "N/A";
if (HeartRateSensor) {
  const hrm = new HeartRateSensor();
  hrm.start();
  heartRate.style.visibility = "visible";
  heartIcon.style.visibility = "visible";
}

// update the <text> element every tick with the current time
// includes naive code to generate CA time... cuz no tumezone support in Fitbit API
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  let caHours = hours - 8;

  if (preferences.clockDisplay === "12h") {
    hours = hours % 12 || 12;
    caHours += util.calcOffset(today);
    caHours = caHours < 0?caHours + 24:caHours;
    caHours = caHours % 12 || 12;
  } else {
    hours = util.zeroPad(hours);
    caHours += util.calcOffset(today);
    caHours = caHours < 0?caHours + 24:caHours;
    caHours = util.zeroPad(caHours);
  }
    
  let mins = util.zeroPad(today.getMinutes());
  theTime.text = `${hours}:${mins}`;
  caTime.text = `${caHours}:${mins}`;

  caTime.style.fill = util.getCaTimeColor(today);
  
  let thisMonth = today.getMonth();
  let thisDay = today.getDay();
  let thisDate = today.getDate();
  
  theDate.text = `${daysOfWeek[thisDay]}, ${monthsOfYear[thisMonth]} ${thisDate}${util.getSuffix(thisDate)}`;

  /* heart rate */
  if (HeartRateSensor) {
    hrm.addEventListener("reading", () => {
      heartRate.text = `${hrm.heartRate}`;
    });
  }

  /* activity */
  if (appbit.permissions.granted("access_activity")) {
    kCalories.text = `${toDay.adjusted.calories}`;
    steps.text = `${toDay.adjusted.steps}`;
    
    steps.style.fill = util.getStepColor(toDay.adjusted.steps);
    
    if (toDay.local.elevationGain !== undefined) {
      floors.text = `${toDay.adjusted.elevationGain}`;
    }
  }
  
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
  
  /* bg images */
  if(Math.abs(bgLastChanged - mins) >= 15) {
    bg.href = `images/${util.getImage(hours)}.jpg`;
    bgLastChanged = mins;
  }
}