import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { today as toDay } from "user-activity";
import * as util from "../resources/utils";
import { battery } from "power";

const d1 = [];
const d2 = [];
const d3 = [];
const d4 = [];
const d5 = [];
const d6 = [];

const st1 = [];
const st2 = [];
const st3 = [];
const st4 = [];
const st5 = [];
const st6 = [];

const day1 = [];
const day2 = [];

const date1 = [];
const date2 = [];

const segment = [];

for (let i = 0; i < 7; i++) {
  d1[i] = document.getElementById(`d1_${i}`);
  d2[i] = document.getElementById(`d2_${i}`);
  d3[i] = document.getElementById(`d3_${i}`);
  d4[i] = document.getElementById(`d4_${i}`);
  d5[i] = document.getElementById(`d5_${i}`);
  d6[i] = document.getElementById(`d6_${i}`);

  st1[i] = document.getElementById(`s1_${i}`);
  st2[i] = document.getElementById(`s2_${i}`);
  st3[i] = document.getElementById(`s3_${i}`);
  st4[i] = document.getElementById(`s4_${i}`);
  st5[i] = document.getElementById(`s5_${i}`);
  st6[i] = document.getElementById(`s6_${i}`);

  date1[i] = document.getElementById(`date1_${i}`);
  date2[i] = document.getElementById(`date2_${i}`);
}

for (let i = 0; i < 11; i++) {
  day1[i] = document.getElementById(`day1_${i}`);
  day2[i] = document.getElementById(`day2_${i}`);
}

for (let i = 1; i < 6; i++) {
  segment[i] = document.getElementById(`segment_${i}`);
}

const backlight = document.getElementById("backlight");

const type12 = document.getElementById("type12");
const type24 = document.getElementById("type24");

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

function updateClock() {
  let pcd = (preferences.clockDisplay === "12h") ? 12 : 24;
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let steps = toDay.adjusted.steps;
  let date = util.zeroPad(today.getDate());
  let day = today.getDay();

  backlight.style.visibility = hours >= 18 || hours < 6 ? "visible" : "hidden";

  type12.style.visibility = pcd == 12 && hours >= 12 ? "visible" : "hidden";
  type24.style.visibility = pcd == 24 ? "visible" : "hidden";
  if (pcd === 12) {
    hours = hours % 12 || 12;
  }

  let h = util.zeroPad(hours);
  let hours_array = [h.toString()[0], h.toString()[1]];
  for (let i = 0; i < 7; i++) {
    d1[i].style.visibility = numbers[hours_array[0]][i] == 0 ? "hidden" : hours_array[0] > 0 ? "visible" : "hidden";
    d2[i].style.visibility = numbers[hours_array[1]][i] == 0 ? "hidden" : "visible";
  }

  let m = util.zeroPad(minutes);
  let minutes_array = [m.toString()[0], m.toString()[1]];
  for (let i = 0; i < 7; i++) {
    d3[i].style.visibility = numbers[minutes_array[0]][i] == 0 ? "hidden" : "visible";
    d4[i].style.visibility = numbers[minutes_array[1]][i] == 0 ? "hidden" : "visible";
  }

  let s = util.zeroPad(seconds);
  let seconds_array = [s.toString()[0], s.toString()[1]];
  for (let i = 0; i < 7; i++) {
    d5[i].style.visibility = numbers[seconds_array[0]][i] == 0 ? "hidden" : "visible";
    d6[i].style.visibility = numbers[seconds_array[1]][i] == 0 ? "hidden" : "visible";
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

  for (let i = 1; i < 6; i++) {
    segment[i].style.visibility = "hidden";
  }

  if(battery.chargeLevel >= 0) {
    segment[1].style.visibility = "visible";
  }
  if(battery.chargeLevel >= 20) {
    segment[2].style.visibility = "visible";
  }
  if(battery.chargeLevel >= 40) {
    segment[3].style.visibility = "visible";
  }
  if(battery.chargeLevel >= 60) {
    segment[4].style.visibility = "visible";
  }
  if(battery.chargeLevel >= 80) {
    segment[5].style.visibility = "visible";
  }
}

// update the clock every tick event
clock.addEventListener("tick", updateClock);