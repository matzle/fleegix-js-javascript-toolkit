/*
 * Copyright 2009 Matthew Eernisse (mde@fleegix.org)
 * and Open Source Applications Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/
if (typeof fleegix == 'undefined') { var fleegix = {}; }
if (typeof fleegix.date == 'undefined') { fleegix.date = {}; }
fleegix.date.util = {};

fleegix.date.util.weekdayLong = ['Sunday', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday', 'Saturday'];
fleegix.date.util.weekdayShort = ['Sun', 'Mon', 'Tue', 'Wed',
  'Thu', 'Fri', 'Sat'];
fleegix.date.util.monthLong = ['January', 'February', 'March',
  'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December'];
fleegix.date.util.monthShort = ['Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
fleegix.date.util.meridian = {
  'AM': 'AM',
  'PM': 'PM'
}

fleegix.date.util.supportedFormats = {
  // abbreviated weekday name according to the current locale
  'a': function (dt) { return fleegix.date.util.weekdayShort[dt.getDay()]; },
  // full weekday name according to the current locale
  'A': function (dt) { return fleegix.date.util.weekdayLong[dt.getDay()]; },
  // abbreviated month name according to the current locale
  'b': function (dt) { return fleegix.date.util.monthShort[dt.getMonth()]; },
  'h': function (dt) { return fleegix.date.util.strftime(dt, '%b'); },
  // full month name according to the current locale
  'B': function (dt) { return fleegix.date.util.monthLong[dt.getMonth()]; },
  // preferred date and time representation for the current locale
  'c': function (dt) { return fleegix.date.util.strftime(dt, '%a %b %d %T %Y'); },
  // century number (the year divided by 100 and truncated
  // to an integer, range 00 to 99)
  'C': function (dt) { return fleegix.date.util.calcCentury(dt.getFullYear());; },
  // day of the month as a decimal number (range 01 to 31)
  'd': function (dt) { return fleegix.date.util.leftPad(dt.getDate(), 2, '0'); },
  // same as %m/%d/%y
  'D': function (dt) { return fleegix.date.util.strftime(dt, '%m/%d/%y') },
  // day of the month as a decimal number, a single digit is
  // preceded by a space (range ' 1' to '31')
  'e': function (dt) { return fleegix.date.util.leftPad(dt.getDate(), 2, ' '); },
  // month as a decimal number, a single digit is
  // preceded by a space (range ' 1' to '12')
  'f': function () { return fleegix.date.util.strftimeNotImplemented('f'); },
  // same as %Y-%m-%d
  'F': function (dt) { return fleegix.date.util.strftime(dt, '%Y-%m-%d');  },
  // like %G, but without the century.
  'g': function () { return fleegix.date.util.strftimeNotImplemented('g'); },
  // The 4-digit year corresponding to the ISO week number
  // (see %V).  This has the same format and value as %Y,
  // except that if the ISO week number belongs to the
  // previous or next year, that year is used instead.
  'G': function () { return fleegix.date.util.strftimeNotImplemented('G'); },
  // hour as a decimal number using a 24-hour clock (range
  // 00 to 23)
  'H': function (dt) { return fleegix.date.util.leftPad(dt.getHours(), 2, '0'); },
  // hour as a decimal number using a 12-hour clock (range
  // 01 to 12)
  'I': function (dt) { return fleegix.date.util.leftPad(
    fleegix.date.util.hrMil2Std(dt.getHours()), 2, '0'); },
  // day of the year as a decimal number (range 001 to 366)
  'j': function (dt) { return fleegix.date.util.leftPad(
    fleegix.date.util.calcDays(dt), 3, '0'); },
  // Hour as a decimal number using a 24-hour clock (range
  // 0 to 23 (space-padded))
  'k': function (dt) { return fleegix.date.util.leftPad(dt.getHours(), 2, ' '); },
  // Hour as a decimal number using a 12-hour clock (range
  // 1 to 12 (space-padded))
  'l': function (dt) { return fleegix.date.util.leftPad(
    fleegix.date.util.hrMil2Std(dt.getHours()), 2, ' '); },
  // month as a decimal number (range 01 to 12)
  'm': function (dt) { return fleegix.date.util.leftPad((dt.getMonth()+1), 2, '0'); },
  // minute as a decimal number
  'M': function (dt) { return fleegix.date.util.leftPad(dt.getMinutes(), 2, '0'); },
  // Linebreak
  'n': function () { return '\n'; },
  // either `am' or `pm' according to the given time value,
  // or the corresponding strings for the current locale
  'p': function (dt) { return fleegix.date.util.getMeridian(dt.getHours()); },
  // time in a.m. and p.m. notation
  'r': function (dt) { return fleegix.date.util.strftime(dt, '%I:%M:%S %p'); },
  // time in 24 hour notation
  'R': function (dt) { return fleegix.date.util.strftime(dt, '%H:%M'); },
  // second as a decimal number
  'S': function (dt) { return fleegix.date.util.leftPad(dt.getSeconds(), 2, '0'); },
  // Tab char
  't': function () { return '\t'; },
  // current time, equal to %H:%M:%S
  'T': function (dt) { return fleegix.date.util.strftime(dt, '%H:%M:%S'); },
  // weekday as a decimal number [1,7], with 1 representing
  // Monday
  'u': function (dt) { return fleegix.date.util.convertOneBase(dt.getDay()); },
  // week number of the current year as a decimal number,
  // starting with the first Sunday as the first day of the
  // first week
  'U': function () { return fleegix.date.util.strftimeNotImplemented('U'); },
  // week number of the year (Monday as the first day of the
  // week) as a decimal number [01,53]. If the week containing
  // 1 January has four or more days in the new year, then it
  // is considered week 1. Otherwise, it is the last week of
  // the previous year, and the next week is week 1.
  'V': function () { return fleegix.date.util.strftimeNotImplemented('V'); },
  // week number of the current year as a decimal number,
  // starting with the first Monday as the first day of the
  // first week
  'W': function () { return fleegix.date.util.strftimeNotImplemented('W'); },
  // day of the week as a decimal, Sunday being 0
  'w': function (dt) { return dt.getDay(); },
  // preferred date representation for the current locale
  // without the time
  'x': function (dt) { return fleegix.date.util.strftime(dt, '%D'); },
  // preferred time representation for the current locale
  // without the date
  'X': function (dt) { return fleegix.date.util.strftime(dt, '%T'); },
  // year as a decimal number without a century (range 00 to
  // 99)
  'y': function (dt) { return fleegix.date.util.getTwoDigitYear(dt.getFullYear()); },
  // year as a decimal number including the century
  'Y': function (dt) { return fleegix.date.util.leftPad(dt.getFullYear(), 4, '0'); },
  // time zone or name or abbreviation
  'z': function () { return fleegix.date.util.strftimeNotImplemented('z'); },
  'Z': function () { return fleegix.date.util.strftimeNotImplemented('Z'); },
  // Literal percent char
  '%': function (dt) { return '%'; }
};

fleegix.date.util.getSupportedFormats = function () {
  var str = '';
  for (var i in fleegix.date.util.supportedFormats) { str += i; }
  return str;
}

fleegix.date.util.supportedFormatsPat = new RegExp('%[' +
  fleegix.date.util.getSupportedFormats() + ']{1}', 'g');

fleegix.date.util.strftime = function (dt, format) {
  var d = null;
  var pats = [];
  var dts = [];
  var str = format;

  // If no dt, use current date
  d = dt ? dt : new Date();
  // Allow either Date obj or UTC stamp
  d = typeof dt == 'number' ? new Date(dt) : dt;

  // Grab all instances of expected formats into array
  while (pats = fleegix.date.util.supportedFormatsPat.exec(format)) {
    dts.push(pats[0]);
  }

  // Process any hits
  for (var i = 0; i < dts.length; i++) {
    key = dts[i].replace(/%/, '');
    str = str.replace('%' + key,
      fleegix.date.util.supportedFormats[key](d));
  }
  return str;

};

fleegix.date.util.strftimeNotImplemented = function (s) {
  throw('fleegix.date.util.strftime format "' + s + '" not implemented.');
};

fleegix.date.util.leftPad = function (instr, len, spacer) {
  var str = instr.toString();
  // spacer char optional, default to space
  var sp = spacer ? spacer : ' ';
  while (str.length < len) {
    str = sp + str;
  }
  return str;
};

/**
 * Calculate the century to which a particular year belongs
 * @param y Integer year number
 * @return Integer century number
 */
fleegix.date.util.calcCentury = function (y) {
  var ret = parseInt(y/100);
  ret = ret.toString();
  return fleegix.date.util.leftPad(ret);
};

/**
 * Calculate the day number in the year a particular date is on
 * @param dt JavaScript date object
 * @return Integer day number in the year for the given date
 */
fleegix.date.util.calcDays = function(dt) {
  var first = new Date(dt.getFullYear(), 0, 1);
  var diff = 0;
  var ret = 0;
  first = first.getTime();
  diff = (dt.getTime() - first);
  ret = parseInt(((((diff/1000)/60)/60)/24))+1;
  return ret;
};

/**
 * Adjust from 0-6 base week to 1-7 base week
 * @param d integer for day of week
 * @return Integer day number for 1-7 base week
 */
fleegix.date.util.convertOneBase = function (d) {
  return d == 0 ? 7 : d;
};

fleegix.date.util.getTwoDigitYear = function () {
  // Add a millenium to take care of years before the year 1000,
  // (e.g, the year 7) since we're only taking the last two digits
  var millenYear = yr + 1000;
  var str = millenYear.toString();
  str = str.substr(2); // Get the last two digits
  return str
};

/**
 * Return 'AM' or 'PM' based on hour in 24-hour format
 * @param h Integer for hour in 24-hour format
 * @return String of either 'AM' or 'PM' based on hour number
 */
fleegix.date.util.getMeridian = function (h) {
  return h > 11 ? fleegix.date.util.meridian.PM :
    fleegix.date.util.meridian.AM;
};

/**
 * Convert a 24-hour formatted hour to 12-hour format
 * @param hour Integer hour number
 * @return String for hour in 12-hour format -- may be string length of one
 */
fleegix.date.util.hrMil2Std = function (hour) {
  var h = typeof hour == 'number' ? hour : parseInt(hour);
  var str = h > 12 ? h - 12 : h;
  str = str == 0 ? 12 : str;
  return str;
};

/**
 * Convert a 12-hour formatted hour with meridian flag to 24-hour format
 * @param hour Integer hour number
 * @param pm Boolean flag, if PM hour then set to true
 * @return String for hour in 24-hour format
 */
fleegix.date.util.hrStd2Mil = function  (hour, pm) {
  var h = typeof hour == 'number' ? hour : parseInt(hour);
  var str = '';
  // PM
  if (pm) {
    str = h < 12 ? (h+12) : h;
  }
  // AM
  else {
    str = h == 12 ? 0 : h;
  }
  return str;
};

// Constants for use in fleegix.date.util.add
fleegix.date.util.dateParts = {
  YEAR: 0, MONTH: 1, DAY: 2, HOUR: 3, MINUTE: 4, SECOND: 5,
    MILLISECOND: 6, QUARTER: 7, WEEK: 8, WEEKDAY: 9
};

/**
 * Add to a Date in intervals of different size, from
 * milliseconds to years
 * @param dt -- Date (or timestamp Number), date to increment
 * @param interv -- Number, a constant representing the interval,
 *    e.g. YEAR, MONTH, DAY.  See fleegix.date.util.dateParts
 * @param incr -- Number, how much to add to the date
 * @return Integer day number for 1-7 base week
 */
fleegix.date.util.add = function (dt, interv, incr) {
  if (typeof dt == 'number') { dt = new Date(dt); }
  function fixOvershoot(){
    if (sum.getDate() < dt.getDate()){
      sum.setDate(0);
    }
  }
  var sum = new Date(dt);
  with (fleegix.date.util.dateParts) {
    switch(interv){
      case YEAR:
        sum.setFullYear(dt.getFullYear()+incr);
        // Keep increment/decrement from 2/29 out of March
        fixOvershoot();
        break;
      case QUARTER:
        // Naive quarter is just three months
        incr*=3;
        // fallthrough...
      case MONTH:
        sum.setMonth(dt.getMonth()+incr);
        // Reset to last day of month if you overshoot
        fixOvershoot();
        break;
      case WEEK:
        incr*=7;
        // fallthrough...
      case DAY:
        sum.setDate(dt.getDate() + incr);
        break;
      case WEEKDAY:
        //FIXME: assumes Saturday/Sunday weekend, but even this is not fixed.
        // There are CLDR entries to localize this.
        var dat = dt.getDate();
        var weeks = 0;
        var days = 0;
        var strt = 0;
        var trgt = 0;
        var adj = 0;
        // Divide the increment time span into weekspans plus leftover days
        // e.g., 8 days is one 5-day weekspan / and two leftover days
        // Can't have zero leftover days, so numbers divisible by 5 get
        // a days value of 5, and the remaining days make up the number of weeks
        var mod = incr % 5;
        if (mod == 0) {
          days = (incr > 0) ? 5 : -5;
          weeks = (incr > 0) ? ((incr-5)/5) : ((incr+5)/5);
        }
        else {
          days = mod;
          weeks = parseInt(incr/5);
        }
        // Get weekday value for orig date param
        strt = dt.getDay();
        // Orig date is Sat / positive incrementer
        // Jump over Sun
        if (strt == 6 && incr > 0) {
          adj = 1;
        }
        // Orig date is Sun / negative incrementer
        // Jump back over Sat
        else if (strt == 0 && incr < 0) {
          adj = -1;
        }
        // Get weekday val for the new date
        trgt = strt + days;
        // New date is on Sat or Sun
        if (trgt == 0 || trgt == 6) {
          adj = (incr > 0) ? 2 : -2;
        }
        // Increment by number of weeks plus leftover days plus
        // weekend adjustments
        sum.setDate(dat + (7*weeks) + days + adj);
        break;
      case HOUR:
        sum.setHours(sum.getHours()+incr);
        break;
      case MINUTE:
        sum.setMinutes(sum.getMinutes()+incr);
        break;
      case SECOND:
        sum.setSeconds(sum.getSeconds()+incr);
        break;
      case MILLISECOND:
        sum.setMilliseconds(sum.getMilliseconds()+incr);
        break;
      default:
        // Do nothing
        break;
    }
  }
  return sum; // Date
};

/**
 * Get the difference in a specific unit of time (e.g., number
 * of months, weeks, days, etc.) between two dates.
 * @param date1 -- Date (or timestamp Number)
 * @param date2 -- Date (or timestamp Number)
 * @param interv -- Number, a constant representing the interval,
 *    e.g. YEAR, MONTH, DAY.  See fleegix.date.util.dateParts
 * @return Integer, number of (interv) units apart that
 *    the two dates are
 */
fleegix.date.util.diff = function (date1, date2, interv) {
//  date1
//    Date object or Number equivalent
//
//  date2
//    Date object or Number equivalent
//
//  interval
//    A constant representing the interval, e.g. YEAR, MONTH, DAY.  See fleegix.date.util.dateParts.

  // Accept timestamp input
  if (typeof date1 == 'number') { date1 = new Date(date1); }
  if (typeof date2 == 'number') { date2 = new Date(date2); }
  var yeaDiff = date2.getFullYear() - date1.getFullYear();
  var monDiff = (date2.getMonth() - date1.getMonth()) + (yeaDiff * 12);
  var msDiff = date2.getTime() - date1.getTime(); // Millisecs
  var secDiff = msDiff/1000;
  var minDiff = secDiff/60;
  var houDiff = minDiff/60;
  var dayDiff = houDiff/24;
  var weeDiff = dayDiff/7;
  var delta = 0; // Integer return value

  with (fleegix.date.util.dateParts) {
    switch (interv) {
      case YEAR:
        delta = yeaDiff;
        break;
      case QUARTER:
        var m1 = date1.getMonth();
        var m2 = date2.getMonth();
        // Figure out which quarter the months are in
        var q1 = Math.floor(m1/3) + 1;
        var q2 = Math.floor(m2/3) + 1;
        // Add quarters for any year difference between the dates
        q2 += (yeaDiff * 4);
        delta = q2 - q1;
        break;
      case MONTH:
        delta = monDiff;
        break;
      case WEEK:
        // Truncate instead of rounding
        // Don't use Math.floor -- value may be negative
        delta = parseInt(weeDiff);
        break;
      case DAY:
        delta = dayDiff;
        break;
      case WEEKDAY:
        var days = Math.round(dayDiff);
        var weeks = parseInt(days/7);
        var mod = days % 7;

        // Even number of weeks
        if(mod == 0){
          days = weeks*5;
        }else{
          // Weeks plus spare change (< 7 days)
          var adj = 0;
          var aDay = date1.getDay();
          var bDay = date2.getDay();

          weeks = parseInt(days/7);
          mod = days % 7;
          // Mark the date advanced by the number of
          // round weeks (may be zero)
          var dtMark = new Date(date1);
          dtMark.setDate(dtMark.getDate()+(weeks*7));
          var dayMark = dtMark.getDay();

          // Spare change days -- 6 or less
          if(dayDiff > 0){
            switch(true){
              // Range starts on Sat
              case aDay == 6:
                adj = -1;
                break;
              // Range starts on Sun
              case aDay == 0:
                adj = 0;
                break;
              // Range ends on Sat
              case bDay == 6:
                adj = -1;
                break;
              // Range ends on Sun
              case bDay == 0:
                adj = -2;
                break;
              // Range contains weekend
              case (dayMark + mod) > 5:
                adj = -2;
                break;
              default:
                // Do nothing
                break;
            }
          }else if(dayDiff < 0){
            switch (true) {
              // Range starts on Sat
              case aDay == 6:
                adj = 0;
                break;
              // Range starts on Sun
              case aDay == 0:
                adj = 1;
                break;
              // Range ends on Sat
              case bDay == 6:
                adj = 2;
                break;
              // Range ends on Sun
              case bDay == 0:
                adj = 1;
                break;
              // Range contains weekend
              case (dayMark + mod) < 0:
                adj = 2;
                break;
              default:
                // Do nothing
                break;
            }
          }
          days += adj;
          days -= (weeks*2);
        }
        delta = days;

        break;
      case HOUR:
        delta = houDiff;
        break;
      case MINUTE:
        delta = minDiff;
        break;
      case SECOND:
        delta = secDiff;
        break;
      case MILLISECOND:
        delta = msDiff;
        break;
      default:
        // Do nothing
        break;
    }
  }
  // Round for fractional values and DST leaps
  return Math.round(delta); // Number (integer)
};


