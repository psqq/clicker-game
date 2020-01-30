// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/ui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.input = exports.tmpOutput = exports.output = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function scrollToBottom(el) {
  el.scrollTop = el.scrollHeight;
}

function clearSelection() {
  if (document.selection && document.selection.empty) {
    document.selection.empty();
  } else if (window.getSelection) {
    var sel = window.getSelection();
    sel.removeAllRanges();
  }
}

var GameOutput =
/*#__PURE__*/
function () {
  function GameOutput(elSel) {
    _classCallCheck(this, GameOutput);

    this.elSel = elSel;
    /** @type {HTMLDivElement} */

    this.el = document.querySelector(elSel);
    this.sep = "";
  }

  _createClass(GameOutput, [{
    key: "clear",
    value: function clear() {
      this.el.innerHTML = '';
    }
  }, {
    key: "printEl",
    value: function printEl(el) {
      this.el.appendChild(el);
      scrollToBottom(this.el);
    }
  }, {
    key: "printTag",
    value: function printTag(tag) {
      var tagEl = document.createElement(tag);

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      tagEl.innerHTML = args.join(this.sep);
      this.printEl(tagEl);
    }
  }]);

  return GameOutput;
}();

var GameInput =
/*#__PURE__*/
function () {
  function GameInput(elSel) {
    _classCallCheck(this, GameInput);

    this.elSel = elSel;
    /** @type {HTMLDivElement} */

    this.el = document.querySelector(elSel);
  }

  _createClass(GameInput, [{
    key: "clear",
    value: function clear() {
      this.el.innerHTML = '';
    }
  }, {
    key: "addEl",
    value: function addEl(el) {
      this.el.appendChild(el);
    }
  }, {
    key: "addButton",
    value: function addButton(name, callback) {
      var btnEl = document.createElement('span');
      btnEl.classList.add('text-button');
      btnEl.classList.add('no-selection');
      btnEl.innerText = name;

      btnEl.onclick = function (e) {
        callback(e);
      };

      this.addEl(btnEl);
    }
  }]);

  return GameInput;
}();

var output = new GameOutput('.output');
exports.output = output;
var tmpOutput = new GameOutput('.tmp-output');
exports.tmpOutput = tmpOutput;
var input = new GameInput('.input');
exports.input = input;
},{}],"../src/tools.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doWith = doWith;
exports.make = make;

/**
 * @param {T} obj
 * @param {(obj: T) => any} cb
 * @returns {T}
 * @template T
 */
function doWith(obj, cb) {
  cb(obj);
  return obj;
}
/**
 * @param {new (...arg: any) => T} Class
 * @param {(obj: T) => any} cb
 * @template T
 */


function make(Class, cb) {
  var obj = new Class();
  return doWith(obj, cb);
}
},{}],"../src/world.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlayerLocation = getPlayerLocation;
exports.getNearLocations = getNearLocations;
exports.getLocationName = getLocationName;
exports.movePlayerTo = movePlayerTo;

var _tools = require("./tools");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Location = function Location() {
  _classCallCheck(this, Location);

  this.name = "location";
  /** @type {Set<Location>} */

  this.nearLocations = new Set();
};

var Entity = function Entity() {
  _classCallCheck(this, Entity);

  /** @type {Location} */
  this.location = null;
};
/**
 * @param {Location} loc1 
 * @param {Location} loc2 
 */


function addWay(loc1, loc2) {
  loc1.nearLocations.add(loc2);
  loc2.nearLocations.add(loc1);
}

var homeLocation = (0, _tools.make)(Location, function (loc) {
  loc.name = "Дом";
});
var streetLocation = (0, _tools.make)(Location, function (loc) {
  loc.name = "Улица";
});
addWay(homeLocation, streetLocation);
var player = (0, _tools.make)(Entity, function (e) {
  e.location = homeLocation;
});

function getPlayerLocation() {
  return player.location;
}
/**
 * @param {Location} loc
 */


function getNearLocations(loc) {
  return _toConsumableArray(loc.nearLocations);
}
/**
 * @param {Location} loc
 */


function getLocationName(loc) {
  return loc.name;
}
/**
 * @param {Location} loc
 */


function movePlayerTo(loc) {
  player.location = loc;
}
},{"./tools":"../src/tools.js"}],"../src/main.js":[function(require,module,exports) {
"use strict";

var ui = _interopRequireWildcard(require("./ui"));

var w = _interopRequireWildcard(require("./world"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

ui.output.printTag('p', 'Добро пожаловать в игру!');

function nearLocationsButtons() {
  ui.input.clear();
  ui.tmpOutput.clear();
  ui.tmpOutput.printTag('p', "\u041A\u0443\u0434\u0430?");
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var loc = _step.value;
      ui.input.addButton(w.getLocationName(loc), function () {
        w.movePlayerTo(loc);
        var locName = w.getLocationName(loc);
        ui.output.printTag('p', "\u0412\u044B \u043F\u0435\u0440\u0435\u0448\u043B\u0438 \u0432 \u043B\u043E\u043A\u0430\u0446\u0438\u044E: ".concat(locName));
        mainButtons();
      });
    };

    for (var _iterator = w.getNearLocations(w.getPlayerLocation())[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function mainButtons() {
  ui.input.clear();
  ui.tmpOutput.clear();
  ui.input.addButton('Где я?', function () {
    var loc = w.getPlayerLocation();
    var locName = w.getLocationName(loc);
    ui.output.printTag('p', "\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u043B\u043E\u043A\u0430\u0446\u0438\u044F: ".concat(locName));
  });
  ui.input.addButton('Идти', function () {
    nearLocationsButtons();
  });
}

mainButtons();
},{"./ui":"../src/ui.js","./world":"../src/world.js"}],"../../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "5001" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/main.js"], null)
//# sourceMappingURL=main.da4909e4.js.map