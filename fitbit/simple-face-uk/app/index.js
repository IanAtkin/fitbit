import clock from "clock";
//import * as document from "document";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../resources/utils";
import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";
import { today as toDay } from "user-activity";
import { battery } from "power";
import * as messaging from "messaging";
import * as simpleSettings from "../resources/device-settings";

// update the clock every minute
clock.granularity = "minutes";

// get handles for <text> elements
const theTime = document.getElementById("theTime");
const caTime = document.getElementById("caTime");
const theDate = document.getElementById("theDate");
const heartRate = document.getElementById("heartRate");
const heartIcon = document.getElementById("heartIcon");
const kCalories = document.getElementById("kCalories");
const steps = document.getElementById("steps");
const floors = document.getElementById("floors");
const power = document.getElementById("power");

const bg = document.getElementById("image");
bg.href = `images/${util.getImage(0)}.jpg`;

const batteryIcon = document.getElementById("batteryIcon");

const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const TRADING = null;

function settingsCallback(data) {
  if (!data) {
    console.log("NO!");
    return;
  }
  console.log(`DATA? ${data.trading}`);
  if (data.trading) {
    console.log(`BOOM! data.trading? ${data.trading}`);
    TRADING = data.trading;
    updateCaTimeColor(new Date(), TRADING);
  }
}
simpleSettings.initialize(settingsCallback);

settingsCallback();

heartRate.text = "N/A";
if (HeartRateSensor) {
  const hrm = new HeartRateSensor();
  hrm.start();
  heartRate.style.visibility = "visible";
  heartIcon.style.visibility = "visible";
}

/* settings */
messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt && evt.data && evt.data.key === "trading") {
    TRADING = evt.data.value;
    updateCaTimeColor(new Date(), TRADING);
    console.log(`Trading? ${TRADING}`);
  }
});

// update the <text> element every tick with the current time
// includes naive code to generate CA time... cuz no tumezone support in Fitbit API
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  let seconds = today.getSeconds();
  let caHours = hours - 8;

  console.log(seconds);

  if (preferences.clockDisplay === "12h") {
    hours = hours % 12 || 12;
    caHours += util.getOffset(today);
    caHours = caHours < 0?caHours + 24:caHours;
    caHours = caHours % 12 || 12;
  } else {
    hours = util.zeroPad(hours);
    caHours += util.getOffset(today);
    caHours = caHours < 0?caHours + 24:caHours;
    caHours = util.zeroPad(caHours);
  }
    
  let mins = util.zeroPad(today.getMinutes());
  theTime.text = `${hours}:${mins}`;
  caTime.text = `${caHours}:${mins}`;

  caTime.style.fill = util.getTimeColor(today, TRADING);

  let thisMonth = today.getMonth();
  let thisDay = today.getDay();
  let thisDate = today.getDate();
  
  theDate.text = `${daysOfWeek[thisDay]}, ${monthsOfYear[thisMonth]} ${thisDate}${util.getSuffix(thisDate)}`;

  updateCaTimeColor(today, TRADING);

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
  if(mins % 15 == 0 && seconds == 0) {
    bg.href = `images/${util.getImage(hours)}.jpg`;
    console.log(bg.href);
  }
}

function updateCaTimeColor(t, T) {
  caTime.style.fill = util.getTimeColor(t, T);
}