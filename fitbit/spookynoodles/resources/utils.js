// add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// return a random image depending on the hour
const images = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
  ["21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40"]
]

// we pass the hour in case we decide to do something exciting based on the hour
export function getImage(h) {
  if (h < 12) {
    return images[0][Math.floor(Math.random() * images[0].length)];
  } else {
    return images[1][Math.floor(Math.random() * images[1].length)];
  }
}

// change the step count based on the number of steps
export function getStepColor(s) {
  if(s < 7000) {
      return "white";
  }
  /* yellow */
  if(s >= 7000 && s < 10000) {
    return "#FAF732";
  }
  /* green */
  if(s >= 10000 && s < 15000) {
    return "#57FA32";
  }
  /* red */
  if(s >= 15000 && s < 20000) {
    return "#FA3232";
  }
  /* purple */
  if(s >= 20000) {
    return "#FC03E8";
  }
}

// get the appropriate suffix for the date
export function getSuffix(d) {
  switch(d) {
    case 11:
    case 12:
    case 13:
      return "th";
      break;
    default:
      if (d % 10 == 1) {
        return "st";
      }
      if (d % 10 == 2) {
        return "nd";
      }
      if (d % 10 == 3) {
        return "rd";
      }
      break;
  }
  return "th";
}

// do we need to offset by an hour for GMT?
export function getOffset(d) {
  var yr = d.getFullYear();
  var mn = d.getMonth() + 1;
  var dy = d.getDate();
  var hr = d.getHours();

  var offset = 0;

  if(yr == 2023) {
    /*
      UK end: Sunday, 29 October
      CA end: Sunday, 5 November
    */

    /* test
    if((mn == 7 && (dy >= 20 && dy <= 31)) || (mn == 8 && dy < 5)) {
      offset = 1;
    }
    */

    if((mn == 10 && (dy >= 29 && dy <= 31)) || (mn == 11 && dy < 5)) {
      offset = 1;
    }
  }

  if(yr == 2024) {
    /*
      CA start: Sunday, 10 March
      UK start: Sunday, 31 March
    */
    if(mn == 3 && (dy >= 10 && dy < 31)) {
      offset = 1;
    }
  
    /*
      UK end: Sunday, 27 October
      CA end: Sunday, 3 November
    */
    if((mn == 10 && (dy >= 27 && dy <= 31)) || (mn == 11 && dy < 3)) {
      offset = 1;
    }
  }

  if(yr == 2025) {
    /*
    CA start: Sunday, 9 March
    UK start: Sunday, 30 March
    */
    if(mn == 3 && (dy >= 9 && dy < 30)) {
      offset = 1;
    }

    /*
    UK end: Sunday, 26 October
    CA end: Sun, 2 Nov 2025
    */
    if(yr == 2025) {
      if((mn == 10 && (dy >= 26 && dy <= 31)) || (mn == 11 && dy < 2)) {
        offset = 1;
      }
    }
  }

  return offset;
}

export function getTimeColor(d) {
  var open = "#44FF44";
  var closed = "white";

  const holidays = {
      '09042023': 'c',
      '11232023': 'c',
      '11242023': 'ec',
      '12252023': 'c',

      '01012024': 'c',
      '01152024': 'c',
      '02192024': 'c',
      '03292024': 'c',
      '05272024': 'c',
      '06192024': 'c',
      '07032024': 'ec',
      '07042024': 'c',
      '09022024': 'c',
      '11282024': 'c',
      '11292024': 'ec',
      '12242024': 'ec',
      '12252024': 'c',

      '01012025': 'c',
      '01202025': 'c',
      '02172025': 'c',
      '04182025': 'c',
      '05262025': 'c',
      '06192025': 'c',
      '07032025': 'ec',
      '07042025': 'c',
      '09012025': 'c',
      '11272025': 'c',
      '11282025': 'ec',
      '12242025': 'ec',
      '12252025': 'c'
  };

  var t = zeroPad(d.getHours().toString()) + zeroPad(d.getMinutes().toString());
  var dow = d.getDay();
  var mn = zeroPad((d.getMonth() + 1).toString());
  var dy = zeroPad(d.getDate().toString());
  var yr = zeroPad(d.getFullYear().toString());

  var key = mn + dy + yr;

  if (dow == 0 || dow == 6) {
      return closed;
  }

  switch(holidays[key]) {
      case 'c':
          // closed
          return closed;
          break;
      case 'ec':
          // early close
          if (t > 630 && t < 1000) {
              return open;
          } else {
              return closed;
          }
          break;
      default:
          // open today!
          // 0930 to 1600
          if (t > 630 && t < 1300) {
              return open;
          } else {
              return closed;
          }
  }
}