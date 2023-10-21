import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { today as toDay } from "user-activity";
import * as util from "../resources/utils";

const day1 = [];
const day2 = [];

const date1 = [];
const date2 = [];

const st1 = [];
const st2 = [];
const st3 = [];
const st4 = [];
const st5 = [];
const st6 = [];

for (let i = 0; i < 7; i++) {
  date1[i] = document.getElementById(`date1_${i}`);
  date2[i] = document.getElementById(`date2_${i}`);

  st1[i] = document.getElementById(`s1_${i}`);
  st2[i] = document.getElementById(`s2_${i}`);
  st3[i] = document.getElementById(`s3_${i}`);
  st4[i] = document.getElementById(`s4_${i}`);
  st5[i] = document.getElementById(`s5_${i}`);
  st6[i] = document.getElementById(`s6_${i}`);
}

for (let i = 0; i < 11; i++) {
  day1[i] = document.getElementById(`day1_${i}`);
  day2[i] = document.getElementById(`day2_${i}`);
}

// number segments
const numbers = [
  [1, 1, 1, 0, 1, 1, 1], // 0
  [0, 0, 1, 0, 0, 1, 0], // 1
  [1, 0, 1, 1, 1, 0, 1], // 2
  [1, 0, 1, 1, 0, 1, 1], // 3
  [0, 1, 1, 1, 0, 1, 0], // 4
  [1, 1, 0, 1, 0, 1, 1], // 5
  [1, 1, 0, 1, 1, 1, 1], // 6
  [1, 0, 1, 0, 0 ,1, 0], // 7
  [1, 1, 1, 1, 1, 1, 1], // 8
  [1, 1, 1, 1, 0, 1, 0]  // 9
]

// extra segments: top vertical, bottom vertical, alt middle, wing 
const letters = [
  [[1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0], [0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0]], // SU
  [[1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0], [1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0]], // MO
  [[1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0], [0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0]], // TU
  [[0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0], [1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0]], // WE
  [[1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]], // TH
  [[1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0], [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1]], // FR
  [[1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0], [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]]  // SA
]

// tick every second
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
  let date = util.zeroPad(today.getDate());
  let day = today.getDay();
  let steps = toDay.adjusted.steps;

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, minutes, pcd);
  minHand.groupTransform.rotate.angle = minutesToAngle(minutes);
  secHand.groupTransform.rotate.angle = secondsToAngle(seconds);

  for (let i = 0; i < 11; i++) {
    day1[i].style.visibility = letters[day][0][i] == 0 ? "hidden" : "visible";
    day2[i].style.visibility = letters[day][1][i] == 0 ? "hidden" : "visible";
  }

  let dt = util.zeroPad(date);
  let date_array = [dt.toString()[0], dt.toString()[1]];
  for (let i = 0; i < 7; i++) {
    date1[i].style.visibility = numbers[date_array[0]][i] == 0 ? "hidden" : "visible";
    date2[i].style.visibility = numbers[date_array[1]][i] == 0 ? "hidden" : "visible";
  }

  let st = util.zeroPad(steps, 6);
  let steps_array = [st.toString()[0], st.toString()[1], st.toString()[2], st.toString()[3], st.toString()[4], st.toString()[5]];
  for (let i = 0; i < 7; i++) {
    st1[i].style.visibility = numbers[steps_array[0]][i] == 0 ? "hidden" : "visible";
    st2[i].style.visibility = numbers[steps_array[1]][i] == 0 ? "hidden" : "visible";
    st3[i].style.visibility = numbers[steps_array[2]][i] == 0 ? "hidden" : "visible";
    st4[i].style.visibility = numbers[steps_array[3]][i] == 0 ? "hidden" : "visible";
    st5[i].style.visibility = numbers[steps_array[4]][i] == 0 ? "hidden" : "visible";
    st6[i].style.visibility = numbers[steps_array[5]][i] == 0 ? "hidden" : "visible";
  }
}

// Update the clock every tick event
clock.addEventListener("tick", updateClock);