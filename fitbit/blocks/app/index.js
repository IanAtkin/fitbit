import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
//import * as util from "../resources/utils";

// Tick every second
clock.granularity = "seconds";

function ... {

}

function updateClock() {
  let pcd = (preferences.clockDisplay === "12h") ? 12 : 24;
  let today = new Date();
  let hours = today.getHours() % pcd;
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  ...
}

// Update the clock every tick event
clock.addEventListener("tick", updateClock);