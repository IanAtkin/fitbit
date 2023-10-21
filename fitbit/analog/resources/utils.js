// add zero in front of numbers < 10
export function zeroPad(i, d = 2) {
    let padding = "00000";
    i = i.toString();
    i = `${padding.slice(0, d - i.length)}${i}`;
    return i;
  }