// add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// return a random image depending on the hour
const images = [
  ["violator", "_+", "shadow_of_fear"],
  ["construction_time_again", "an_orchestrated_rise_to_fall"],
  ["classics", "empires_ep", "hunting_high_and_low"],
  ["richard_d_james_album", "big_black_delta", "exai", "shapes"],
  ["black_celebration", "violator", "uforb", "uf_off", "the_dream", "gnayse", "volume_beta"],
  ["violator", "uforb", "uf_off", "the_dream", "computer_controlled", "ex_machina", "patashnik"]
]

export function getImage(h) {
  // sunrise
  if(h == 5) {
    return images[0][Math.floor(Math.random() * images[0].length)];
  }
  
  // day
  if(h >= 6 && h <= 16) {
    return images[1][Math.floor(Math.random() * images[1].length)];
  }
  
  // sunwet
  if(h == 17) {
    return images[2][Math.floor(Math.random() * images[2].length)];
  }
  
  // dusk
  if(h >= 18 && h <= 19) {
    return images[3][Math.floor(Math.random() * images[3].length)];
  }
  
  // night
  if(h >= 20 && h <= 22) {
    return images[4][Math.floor(Math.random() * images[4].length)];
  }
  
  // stars
  if(h >= 23 || (h >= 0 && h <= 4)) {
    return images[5][Math.floor(Math.random() * images[5].length)];
  }

  return "bg";
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
  if(s >= 15000) {
    return "#FA3232";
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

// do we need to offset by an hour for PDT
export function calcOffset(d) {
  /*
    Probably the worst hack ever created by a human being. I can't speak for aliens or animals.
    This totally bodges the difference between UK DST and California DST.
  */
  var offset = 0;
  /*
    2022
    UK end: Sunday, 30 October
    CA end: Sunday, 6 November
  */
  
  if(d.getFullYear() == 2022) {
    if(d.getMonth() == 9) { // October
      if(d.getDate() >= 30 && d.getDate() <= 31) {
        if(d.getDate() == 30 && d.getHours() < 2) {
          offset = 0;
        } else {
          offset = 1;
        }
      }
    }
    if(d.getMonth() == 10) { // November
      if(d.getDate() >= 1 && d.getDate() <= 6) {
        if(d.getDate() == 6 && d.getHours() >= 10) {
          offset = 0;
        } else {
          offset = 1;
        }
      }
    }
  }

  /*
    2023
    CA start: Sunday, 12 March
    UK start: Sunday, 26 March
  */
  if(d.getFullYear() == 2023) {
    if(d.getMonth() == 2) {
      if(d.getDate() >= 12 && d.getDate() <= 26) {
        if(d.getDate() == 12 && d.getHours() < 2 || d.getDate == 26 && d.getHours >= 10) {
          offset = 0;
        } else {
          offset = 1;
        }
      }
    }
  }
    
  /*
    UK end: Sunday, 29 October
    CA end: Sunday, 5 November
  */
  if(d.getFullYear() == 2023) {
    if(d.getMonth() == 9) {
      if(d.getDate() >= 29 && d.getDate() <= 31) {
        if(d.getDate() == 29 && d.getHours() < 2) {
          offset = 0;
        } else {
          offset = 1;
        }
      }
    }
    if(d.getMonth() == 10) {
      if(d.getDate() >= 1 && d.getDate() <= 5) {
        if(d.getDate() == 5 && d.getHours() >= 10) {
          offset = 0;
        } else {
          offset = 1;
        }
      }
    }
  }
  
  /*
    2024
    CA start: Sunday, 10 March
    UK start: Sunday, 31 March
  */
  if(d.getFullYear() == 2024) {
    if(d.getMonth() == 2) {
      if(d.getDate() >= 10 && d.getDate() <= 31) {
        if(d.getDate() == 10 && d.getHours() < 2 || d.getDate == 31 && d.getHours >= 10) {
          offset = 0;
        } else {
          offset = 1;
        }
      }
    }
  }
  
  /*
    UK end: Sunday, 27 October
    CA end: Sunday, 3 November
  */
  if(d.getFullYear() == 2024) {
    if(d.getMonth() == 9) {
      if(d.getDate() >= 27 && d.getDate() <= 31) {
        if(d.getDate() == 27 && d.getHours() < 2) {
          offset = 0;
        } else {
          offset = 1;
        }
      }
    }
    if(d.getMonth() == 10) {
      if(d.getDate() >= 1 && d.getDate() <= 3) {
        if(d.getDate() == 1 && d.getHours() >= 10) {
          offset = 0;
        } else {
          offset = 1;
        }
      }
    }
  }

  return offset;
}

export function getCaTimeColor(d) {
  
  var open = "#22ff22";
  var closed = "#dddddd";
  
  var t = zeroPad(d.getHours()) + "" + zeroPad(d.getMinutes());
  //console.log("time: " + t);
  
  // test
  /*
  if (d.getMonth() == 10 && d.getDate() == 14 && t > 1430 && t < 2200) {
    return color;
  }
  */
  
  if (d.getDay() == 0 || d.getDay() == 6) {
    return closed;
  }
  
  if (d.getFullYear() == 2022) {
    if (d.getMonth() == 10 && d.getDate() == 24) {
      return closed;
    }
    
    if (d.getMonth() == 10 && d.getDate() == 25) {
      if (t > 1430 && t < 1700) {
        return open;
      } else {
        return closed;
      }
    }

    if (d.getMonth() == 11 && d.getDate() == 26) {
      return closed;
    }
  }
  
  if (d.getFullYear() == 2023) {
    if (d.getMonth() == 0 && d.getDate() == 2) {
      return closed;
    }
    
    if (d.getMonth() == 0 && d.getDate() == 16) {
      return closed;
    }
    
    if (d.getMonth() == 1 && d.getDate() == 20) {
      return closed;
    }
    
    if (d.getMonth() == 3 && d.getDate() == 7) {
      return closed;
    }
    
    if (d.getMonth() == 4 && d.getDate() == 29) {
      return closed;
    }

    if (d.getMonth() == 5 && d.getDate() == 19) {
      return closed;
    }

    if (d.getMonth() == 6 && d.getDate() == 3) {
      if (t >= 1430 && t <= 1700) {
        return open;
      } else {
        return closed;
      }
    }

    if (d.getMonth() == 6 && d.getDate() == 4) {
      return closed;
    }

    if (d.getMonth() == 8 && d.getDate() == 4) {
      return closed;
    }

    if (d.getMonth() == 10 && d.getDate() == 23) {
      return closed;
    }

    if (d.getMonth() == 10 && d.getDate() == 24) {
      if (t >= 1430 && t <= 1700) {
        return open;
      } else {
        return closed;
      }
    }

    if (d.getMonth() == 11 && d.getDate() == 25) {
      return closed;
    }
  }

  if (d.getFullYear() == 2024) {
    if (d.getMonth() == 0 && d.getDate() == 1) {
      return closed;
    }
    
    if (d.getMonth() == 0 && d.getDate() == 15) {
      return closed;
    }
    
    if (d.getMonth() == 1 && d.getDate() == 19) {
      return closed;
    }
    
    if (d.getMonth() == 2 && d.getDate() == 29) {
      return closed;
    }
    
    if (d.getMonth() == 4 && d.getDate() == 27) {
      return closed;
    }
    
    if (d.getMonth() == 5 && d.getDate() == 19) {
      return closed;
    }
    
    if (d.getMonth() == 6 && d.getDate() == 3) {
      if (t >= 1430 && t <= 1700) {
        return open;
      } else {
        return closed;
      }
    }
    
    if (d.getMonth() == 6 && d.getDate() == 4) {
      return closed;
    }
    
    if (d.getMonth() == 8 && d.getDate() == 2) {
      return closed;
    }
    
    if (d.getMonth() == 10 && d.getDate() == 28) {
      return closed;
    }
    
    if (d.getMonth() == 10 && d.getDate() == 29) {
      if (t > 1430 && t < 1700) {
        return open;
      } else {
        return closed;
      }
    }
    
    if (d.getMonth() == 11 && d.getDate() == 24) {
      if (t > 1430 && t < 1700) {
        return open;
      } else {
        return closed;
      }
    }
      
    if (d.getMonth() == 11 && d.getDate() == 25) {
      return closed;
    }
  }
  
  if (t >= 1430 && t <= 2100 ) {
    return open;
  } else {
    return closed; 
  }
}