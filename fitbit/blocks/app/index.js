import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { today as toDay } from "user-activity";
import * as util from "../resources/utils";

const h = [];
const m = [];
const s = [];
const sk = [];

util.setup(h, m, s, sk, document);
util.reset(h, m, s);
util.resetSteps(sk);

// Tick every second
clock.granularity = "seconds";

function updateClock() {
  let pcd = (preferences.clockDisplay === "12h") ? 12 : 24;
  let today = new Date();
  let hours = today.getHours() % pcd;
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  if (seconds == 0) {
    util.reset(h, m, s);
  }

  if (hours == 0 && minutes == 0 && seconds == 0) {
    util.resetSteps(sk);
  }

  for (let i = 1; i <= hours; i++) {
    h[i].style.visibility = "visible";
  }

  for (let i = 1; i <= minutes; i++) {
    m[i].style.visibility = "visible";
  }

  for (let i = 1; i <= seconds; i++) {
    s[i].style.visibility = "visible";
  }

  let steps = (toDay.adjusted.steps < 30001) ? parseInt(toDay.adjusted.steps / 1000) : 30;
  for (let i = 1; i <= steps; i++) {
    sk[i].style.visibility = "visible";
  }
}

// Update the clock every tick event
clock.addEventListener("tick", updateClock);