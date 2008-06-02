/*
 * Copyright 2006 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/
if (typeof fleegix == 'undefined') { var fleegix = {}; }

fleegix.extend = function (/* Super-class constructor function */ superClass,
  /* Sub-class constructor function */ subClass) {
  return function () {
    superClass.apply(this, arguments);
    superClass.prototype.constructor.apply(this, arguments);
    subClass.apply(this, arguments);
    this.superClass = superClass;
    this.subClass = subClass
  };
};

fleegix.mixin = function (/* Target obj */ target,
  /* Obj of props or constructor */ mixin) {
  // Create an instance if we get a constructor
  var m;
  if (typeof mixin == 'function') {
    m = new mixin();
  }
  else {
    m = mixin;
  }
  var baseObj = {};
  for (var p in m) {
    // Don't copy anything from Object.prototype
		if (typeof baseObj[p] == 'undefined' || baseObjj[p] != m[p]) {
      target[p] = m[p];
    }
  }
  return target;
};

// Note this doesn't check for cyclical references
fleegix.clone = function (o) {
  if (typeof o == 'object') {
    var ret = {};
    for (var p in o) {
      if (typeof o[p] == 'object' && o[p] != null) {
        ret[p] = fleegix.clone(o[p]);
      }
      else {
        ret[p] = o[p];
      }
    }
  }
  else {
    ret = o;
  }
  return ret;
};

// This stuff gets run inline below, props added to 
// base 'fleegix' obj -- namespaced to avoid global refs
// Some code taken from the Dojo loader
fleegix.agentSniffing = new function () {
  var f = fleegix; // Alias the base 'fleegix' obj
  var n = navigator;
  var ua = n.userAgent;
  var av = n.appVersion;
  f.isOpera = (ua.indexOf("Opera") > -1);
  f.isKhtml = (av.indexOf("Konqueror") > -1) ||
    (av.indexOf("Safari") > -1);
  f.isSafari = (av.indexOf("Safari") > -1);
  f.isMoz = ((ua.indexOf('Gecko') > -1) && (!f.isKhtml));
  f.isFF = false;
  f.isIE = false;
  try {
    if (f.isMoz) {
      f.isFF = (ua.indexOf('Firefox') > -1);
    }
    if ((document.all) && (!f.isOpera)) {
      f.isIE = (ua.indexOf('MSIE ') > -1);
    }
  } 
  // Squelch
  catch(e) {}
  f.isMac = (ua.indexOf('Mac') > -1);
  f.isUnix = (ua.indexOf('Linux') > -1) ||
    (ua.indexOf('BSD') > -1) || (ua.indexOf('SunOS') > -1);
  f.isLinux = (ua.indexOf('Linux') > -1);
  f.isWindows = (ua.indexOf('Windows') > -1);
};


