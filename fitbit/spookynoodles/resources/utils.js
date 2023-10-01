// add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function updateHourArc(h, el, pcd) {
  if (pcd === "12h") {
    if(h == 12) {
      h = 0;
    }
    el.sweepAngle = h * 24.545454545454545;
  } else {
    el.sweepAngle = h * 11.739130434782609;
  }
}

export function updateMinuteArc(m, el) {
  if(m != 0) {
    el.sweepAngle = m * 4.576271186440678;
  }
}

export function updateSecondArc(s, el) {
  el.sweepAngle = s * 4.576271186440678;
}

export function updateStepArc(s, s10k, s20k, s30k, s40k) {
  if (s == 0) {
    s10k.sweepAngle = 0;
    s20k.sweepAngle = 0;
    s30k.sweepAngle = 0;
    s40k.sweepAngle = 0;
  }

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

  if(s > 30000) {
    if(s <= 40000) {
      s40k.sweepAngle = (s - 30000) * .036;
    }
    if(s >= 40000) {
      s40k.sweepAngle = 360;
    }
  }
}