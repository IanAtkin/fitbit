import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
//import * as util from "../resources/utils";

// Tick every second
clock.granularity = "seconds";

const hourHand = document.getElementById("hours");
const minHand = document.getElementById("mins");
const secHand = document.getElementById("secs");

const twelveHour = document.getElementById("twelveHour");
const twentyFourHour = document.getElementById("twentyFourHour");

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes, pcd) {
  switch (pcd) {
    case 12:
      twelveHour.style.visibility = "visible";
      twentyFourHour.style.visibility = "hidden";
      break;
    case 24:
      twentyFourHour.style.visibility = "visible";
      twelveHour.style.visibility = "hidden";
      break;
  }

  let hourAngle = (360 / pcd) * hours;
  let minAngle = (360 / pcd / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

// Rotate the hands every tick
function updateClock() {
  let pcd = (preferences.clockDisplay === "12h") ? 12 : 24;
  let today = new Date();
  let hours = today.getHours() % pcd;
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, minutes, pcd);
  minHand.groupTransform.rotate.angle = minutesToAngle(minutes);
  secHand.groupTransform.rotate.angle = secondsToAngle(seconds);
}

// Update the clock every tick event
clock.addEventListener("tick", updateClock);