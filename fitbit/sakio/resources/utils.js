// add zero in front of numbers < 10
export function zeroPad(i, d = 2) {
  i = i.toString();
  while (i.length < d) i = "0" + i;
  return i;
}

// ooh!

export function reset(h, m, s) {
    for (let i = 1; i < 24; i++) {
      h[i].style.visibility = "hidden";
    }
  
    for (let i = 1; i < 60; i++) {
      m[i].style.visibility = "hidden";
    }
  
    for (let i = 1; i < 60; i++) {
      s[i].style.visibility = "hidden";
    }
  }
  
  export function resetSteps(sk) {
    for (let i = 1; i <= 30; i++) {
      sk[i].style.visibility = "hidden";
    }
  }
  
  export function setup(h, m, s, sk, document) {  
    for (let i = 1; i < 24; i++) {
      h[i] = document.getElementById(`h${i}`);
    }
  
    for (let i = 1; i < 60; i++) {
      m[i] = document.getElementById(`m${i}`);
    }
  
    for (let i = 1; i < 60; i++) {
      s[i] = document.getElementById(`s${i}`);
    }
  
    for (let i = 1; i <= 30; i++) {
      sk[i] = document.getElementById(`s${i}k`);
    }
  }