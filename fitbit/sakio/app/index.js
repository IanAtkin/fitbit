import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { today as toDay } from "user-activity";
import * as util from "../resources/utils";

const d1 = [];
const d2 = [];
const d3 = [];
const d4 = [];
const d5 = [];
const d6 = [];

for (let i = 0; i < 7; i++) {
  d1[i] = document.getElementById(`d1_${i}`);
  d2[i] = document.getElementById(`d2_${i}`);
  d3[i] = document.getElementById(`d3_${i}`);
  d4[i] = document.getElementById(`d4_${i}`);
  d5[i] = document.getElementById(`d5_${i}`);
  d6[i] = document.getElementById(`d6_${i}`);
}

const type12 = document.getElementById("type12");
const type24 = document.getElementById("type24");

const numbers = [
  [1, 1, 1, 0, 1, 1, 1],
  [0, 0, 1, 0, 0, 1, 0],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1],
  [0, 1, 1, 1, 0, 1, 0],
  [1, 1, 0, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1],
  [1, 0, 1, 0, 0 ,1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 0]
]

// ?
/*
let n = 9
for (let i = 0; i < 7; i++) {
  d1[i].style.visibility = numbers[n][i] == 0 ? "hidden" : "visible";
}
*/

// 3
/*
for (let i = 0; i < 7; i++) {
  d1[i].style.visibility = three[i] == 0 ? "hidden" : "visible";
}

// 5
for (let i = 0; i < 7; i++) {
  d1[i].style.visibility = five[i] == 0 ? "hidden" : "visible";
}
*/

// Tick every second
clock.granularity = "seconds";

function updateClock() {
  let pcd = (preferences.clockDisplay === "12h") ? 12 : 24;
  let today = new Date();
  let hours = today.getHours() % pcd;
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let steps = toDay.adjusted.steps;

  type12.style.visibility = pcd == 12 ? "visible" : "hidden";
  type24.style.visibility = pcd == 24 ? "visible" : "hidden";

  let h = util.zeroPad(hours);
  let h1 = h.toString()[0];
  let h2 = h.toString()[1];
  for (let i = 0; i < 7; i++) {
    d1[i].style.visibility = numbers[h1][i] == 0 ? "hidden" : h1 > 0 ? "visible" : "hidden";
    d2[i].style.visibility = numbers[h2][i] == 0 ? "hidden" : "visible";
  }

  let m = util.zeroPad(minutes);
  let m1 = m.toString()[0];
  let m2 = m.toString()[1];
  for (let i = 0; i < 7; i++) {
    d3[i].style.visibility = numbers[m1][i] == 0 ? "hidden" : "visible";
    d4[i].style.visibility = numbers[m2][i] == 0 ? "hidden" : "visible";
  }

  let s = util.zeroPad(seconds);
  let s1 = s.toString()[0];
  let s2 = s.toString()[1];
  for (let i = 0; i < 7; i++) {
    d5[i].style.visibility = numbers[s1][i] == 0 ? "hidden" : "visible";
    d6[i].style.visibility = numbers[s2][i] == 0 ? "hidden" : "visible";
  }
}

// Update the clock every tick event
clock.addEventListener("tick", updateClock);