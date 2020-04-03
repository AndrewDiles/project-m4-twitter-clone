import React from 'react';

export const COLORS = {
  // Bright purple:
  primary: 'hsl(258deg, 100%, 50%)',
  highlighted: 'hsla(258, 100%, 50%, 0.25)'
  // Add more colors as needed!
};

const formatMonth = function(monthNum) {
  let month = '';
  switch (monthNum){
    case 1:
      month = 'Jan';
    break;
    case 2:
      month = 'Feb';
    break;
    case 3:
      month = 'Mar';
    break;
    case 4:
      month = 'Apr';
    break;
    case 5:
      month = 'May';
    break;
    case 6:
      month = 'Jun';
    break;
    case 7:
      month = 'Jul';
    break;
    case 8:
      month = 'Aug';
    break;
    case 9:
      month = 'Sep';
    break;
    case 10:
      month = 'Oct';
    break;
    case 11:
      month = 'Nov';
    break;
    case 12:
      month = 'Dec';
    break;
  };
  return month;
}
const daySuffix = function(day) {
  let suffix = '';
  if (day[1] === '1') suffix = 'st';
  else if (day[1] === '2') suffix = 'nd';
  else if (day[1] === '3') suffix = 'rd';
  else suffix = 'th';
  return suffix;
}
export const formatDateLong = function(datestring) {
  let hour = parseInt(datestring.slice(11,13));
  let ampm = '';
  hour > 11 ? ampm = 'PM' : ampm = 'AM';
  if (hour > 12) hour -= 12;
  let mins = datestring.slice(14,16);
  let day = datestring.slice(8,10);
  let year = datestring.slice(0,4);
  let monthNum = parseInt(datestring.slice(5,7));
  let month = formatMonth(monthNum);
  
  let result = `${hour}:${mins} ${ampm} · ${month} ${day} ${year}`;
  return result;
};
export const formatDateMedium = function(datestring) {
  let monthNum = parseInt(datestring.slice(5,7));
  let month = formatMonth(monthNum);
  let day = datestring.slice(8,10);
  let suffix = daySuffix(day);
  let result = `${month} ${day}${suffix}`;
  return result;
}