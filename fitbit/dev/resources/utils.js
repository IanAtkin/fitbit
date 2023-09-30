// add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function updateHourArc(h, el, p) {
  if(h != 0) {
    if (p.clockDisplay === "12h") {
      el.startAngle = (h * 30) - 1;
      el.sweepAngle = 2;
    } else {
      el.startAngle = (h * 15) - 1;
      el.sweepAngle = 3;
    }
  }
}

export function updateMinuteArc(m, el) {
  if(m != 0) {
    el.startAngle = (m * 6) - 1;
    el.sweepAngle = 2;
  }
}

export function updateSecondArc(s, el) {
  el.startAngle = (s * 6) - 1;
  el.sweepAngle = 1;
}

export function updateStepArc(s, s10k, s20k, s30k) {
  //console.log(s);
  if(s <= 30000) {
    if(s <= 10000) {
      s10k.sweepAngle = s * .036;
    } else {
      s10k.sweepAngle = 360;
    }
  }

  if(s > 10000) {
    if(s <= 20000) {
      s20k.sweepAngle = (s - 10000) * .036;
    }
    if(s >= 20000) {
      s20k.sweepAngle = 360;
    }
  }

  if(s > 20000) {
    if(s <= 30000) {
      s30k.sweepAngle = (s - 20000) * .036;
    }
    if(s >= 30000) {
      s30k.sweepAngle = 360;
    }
  }

}