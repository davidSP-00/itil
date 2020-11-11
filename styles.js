(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ 5:
/*!******************************!*\
  !*** multi ./src/styles.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\David-PC\Desktop\ITIL\src\styles.css */"OmL/");


/***/ }),

/***/ "JPst":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "LboF":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "OmL/":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "LboF");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--12-1!../node_modules/postcss-loader/src??embedded!./styles.css */ "W9N5");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "W9N5":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--12-1!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "JPst");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/* You can add global styles to this file, and also import other style files */\nhtml,\nbody {\n    margin: 0;\n    font-size: 100%;\n    background: rgb(44, 44, 44);\n\tfont-family: 'Poppins', sans-serif;\n}\nhtml {\n  scroll-behavior: smooth;\n}\nth{\n\tcolor:white;\n}\nbody a {\n    text-decoration: none;\n    transition: 0.5s all;\n    -webkit-transition: 0.5s all;\n    -moz-transition: 0.5s all;\n    -o-transition: 0.5s all;\n    -ms-transition: 0.5s all;\n\tfont-family: 'Poppins', sans-serif;\n}\nbody img {\n    max-width: 100%;\n}\na:hover {\n    text-decoration: none;\n}\nh1{\n\tcolor: white;}\nh2,\nh3,\nh4,\nh5,\nh6 {\n    margin: 0;\n\tcolor: #323648;\n}\nli {\n    list-style-type: none;\n}\np {\n    margin: 0;\n    font-size: 15px;\n    line-height: 30px;\n    letter-spacing: 1px;\n    color: #707579;\n}\nul {\n    margin: 0;\n    padding: 0;\n}\n/*-- header --*/\nheader {\n    position: absolute;\n    z-index: 9;\n    width: 100%;\n}\n.toggle,\n[id^=drop] {\n\tdisplay: none;\n}\n/* Giving a background-color to the nav container. */\nnav { \n\tmargin:0;\n\tpadding: 0;\n}\n#logo a {\n\tfloat: left;\n    font-size: .8em;\n    display: initial;\n    margin: 0;\n    letter-spacing: 0px;\n    color: #fff;\n    font-weight: 600;\n    padding: 3px 0;\n    border: none;\n}\n#logo a span.fa {\n    color: #00BCD4;\n}\n/* Since we'll have the \"ul li\" \"float:left\"\n * we need to add a clear after the container. */\nnav:after {\n\tcontent:\"\";\n\tdisplay:table;\n\tclear:both;\n}\n/* Removing padding, margin and \"list-style\" from the \"ul\",\n * and adding \"position:reltive\" */\nnav ul {\n\tfloat: right;\n\tpadding:0;\n\tmargin:0;\n\tlist-style: none;\n\tposition: relative;\n\t}\n/* Positioning the navigation items inline */\nnav ul li {\n\tmargin: 0px;\n\tdisplay:inline-block;\n\tfloat: left;\n\t}\n/* Styling the links */\nnav a {\n    color: #ddd;\n    text-transform: capitalize;\n    letter-spacing: 1px;\n    padding-left: 0;\n    padding-right: 0;\n\tpadding: 10px 0;\n    font-size: 15px;\n}\nnav ul li ul li:hover { background: #f8f9fa; }\n/* Background color change on Hover */\nnav a:hover { \n\tcolor: #ddd;\n}\nnav .inner-dropdown a:hover {\n    color: #333;\n}\n.menu li.active  a{ \n\tcolor: #fff;\n}\n/* Hide Dropdowns by Default\n * and giving it a position of absolute */\nnav ul ul {\n\tdisplay: none;\n\tposition: absolute; \n\t/* has to be the same number as the \"line-height\" of \"nav a\" */\n\ttop: 30px; \n    background: #fff;\n    padding: 10px;\n}\n/* Display Dropdowns on Hover */\nnav ul li:hover > ul {\n\tdisplay:inherit;\n}\n/* Fisrt Tier Dropdown */\nnav ul ul li {\n\twidth:170px;\n\tfloat:none;\n\tdisplay:list-item;\n\tposition: relative;\n}\nnav ul ul li a {\n    color: #333 !important;\n    padding: 5px 10px;\n    display: block;\n}\n/* Second, Third and more Tiers\t\n * We move the 2nd and 3rd etc tier dropdowns to the left\n * by the amount of the width of the first tier.\n*/\nnav ul ul ul li {\n\tposition: relative;\n\ttop:-60px;\n\t/* has to be the same number as the \"width\" of \"nav ul ul li\" */ \n\tleft:170px; \n}\n/* Change ' +' in order to change the Dropdown symbol */\nli > a:only-child:after { content: ''; }\n/* Media Queries\n--------------------------------------------- */\n@media all and (max-width : 736px) {\n\n\t#logo {\n\t\tdisplay: block;\n\t\tpadding: 0;\n\t\twidth: 100%;\n\t\ttext-align: center;\n\t\tfloat: none;\n\t}\n\n\t.login-icon a {\n\t\tpadding: 11px 15px;\n\t}\n\tnav {\n\t\tmargin: 0;\n\t}\n\tnav a {\n\t\tcolor: #333;\n\t}\n\n\t/* Hide the navigation menu by default */\n\t/* Also hide the  */\n\t.toggle + a,\n\t.menu {\n\t\tdisplay: none;\n\t}\n\n\t/* Stylinf the toggle lable */\n\t.toggle {\n\t\tdisplay: block;\n\t\tpadding: 7px 15px;\n\t\tfont-size: 17px;\n\t\ttext-decoration: none;\n\t\tborder: none;\n\t\tfloat: right;\n\t\tbackground-color: #00BCD4;\n\t\tcolor: #fff;\n\t\tborder-radius: 0px;\n\t}\n\t.menu .toggle {\n\t\tfloat: none;\n\t\ttext-align: center;\n\t\tmargin: auto;\n\t\twidth: auto;\n\t\tpadding: 5px;\n\t\tfont-weight: normal;\n\t\tfont-size: 15px;\n\t\tletter-spacing: 1px;\n\t\tbackground: none;\n\t\tcolor: #333;\n\t}\n\n\t.toggle:hover {\n\t\tcolor:#333;\n\t\tbackground-color: #fff;\n\t}\n\n\t/* Display Dropdown when clicked on Parent Lable */\n\t[id^=drop]:checked + ul {\n\t\tdisplay: block;\n\t\tbackground: #fff;\n\t\tpadding: 15px 0;\n\t\twidth:100%;\n\t\ttext-align: center;\n\t}\n\n\t/* Change menu item's width to 100% */\n\tnav ul li {\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t\tpadding: 7px 0;\n\t\t}\n\tnav a{\n\t\tpadding: 5px 0;\n\t}\n\tnav a:hover {\n\t\tcolor: #333;\n\t\tborder-bottom: 2px solid #333;\n\t}\n\tnav ul ul .toggle,\n\tnav ul ul a {\n\t\tpadding: 0 40px;\n\t}\n\n\tnav ul ul ul a {\n\t\tpadding: 0 80px;\n\t}\n\n\tnav a:hover,\n \tnav ul ul ul a {\n\t\tbackground-color: transparent;\n\t}\n  \n\tnav ul li ul li .toggle,\n\tnav ul ul a,\n\tnav ul ul ul a{\n\t\tpadding:14px 20px;\t\n\t\tcolor:#FFF;\n\t\tfont-size:17px; \n\t}\n  \n  \n\tnav ul li ul li .toggle,\n\tnav ul ul a {\n\t\tbackground-color: #fff; \n\t}\n\tnav ul ul li a {\n\t\tfont-size: 15px;\n\t\tdisplay: inline-block;\n\t\tborder-bottom: 2px solid transparent;\n\t}\n\tul.inner-ul{\n\t\tpadding: 0!important;\n\t}\n\t/* Hide Dropdowns by Default */\n\tnav ul ul {\n\t\tfloat: none;\n\t\tposition:static;\n\t\tcolor: #ffffff;\n\t\t/* has to be the same number as the \"line-height\" of \"nav a\" */\n\t}\n\t\t\n\t/* Hide menus on hover */\n\tnav ul ul li:hover > ul,\n\tnav ul li:hover > ul {\n\t\tdisplay: none;\n\t}\n\t\t\n\t/* Fisrt Tier Dropdown */\n\tnav ul ul li {\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t\tpadding: 0;\n\t}\n\n\tnav ul ul ul li {\n\t\tposition: static;\n\t\t/* has to be the same number as the \"width\" of \"nav ul ul li\" */ \n\n\t}\n\n}\n@media all and (max-width : 330px) {\n\n\tnav ul li {\n\t\tdisplay:block;\n\t\twidth: 94%;\n\t}\n\n}\n.form1{\n\tcolor: white;\n}\n/*-- banner --*/\n.banner {\n      background-size: cover;\n\t  background-image:url(https://png.pngtree.com/thumb_back/fw800/background/20190223/ourmid/pngtree-ppt-technology-color-line-background-backgroundppt-templatetechnological-senselinecolor-image_67507.jpg);\n      min-height: 100vh;\n      display: grid;\n      align-items: center;\n      padding: 2rem 0;\n}\n.slider-info {\n    position: relative;\n    text-align: center;\n    width: 70%;\n    margin: auto;\n}\n.agileinfo-logo h2 {\n    color: #fff;\n    font-size: 3.5em;\n    text-transform: uppercase;\n    font-weight: 600;\n    letter-spacing: 2px;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.37);\n}\n.banner-text a {\n    color: #fff;\n    background: #00BCD4;\n    padding: 13px 35px;\n    display: inline-block;\n    letter-spacing: 1px;\n    margin-top: 1.5em;\n    border-radius: 4px;\n}\n.banner-text {\n    padding-top: 15vw ;\n}\n.banner ul.social li {\n    display: inline-block;\n    margin: 8px;\n}\n.banner  ul.social li  a{\n    font-size: 16px;\n    color: #eee;\n    line-height: 26px;\n    letter-spacing: 1px;\n    list-style-type: none;\n}\n/*-- //banner --*/\n/*-- Responsive design --*/\n@media(max-width:1440px) {\n\t.choose {\n\t\twidth: 78%;\n\t}\n\t.main_grid_contact {\n\t\twidth: 76%;\n\t\tleft: 12%;\n\t}\n}\n@media(max-width:1336px) {\n\t.choose {\n\t\twidth: 85%;\n\t}\n\t.main_grid_contact {\n\t\twidth: 80%;\n\t\tleft: 10%;\n\t}\n}\n@media(max-width:1280px) {\n\t.choose {\n\t\twidth: 90%;\n\t}\n\t.main_grid_contact {\n\t\twidth: 86%;\n\t\tleft: 7%;\n\t}\n}\n@media(max-width:1080px) {\n\t.top-grid span.fa {\n\t\tfont-size: 40px;\n\t}\n\t.top-grid {\n\t\tpadding-right: 0;\n\t}\n\t.top-grid.pl-0 {\n\t\tpadding-right: 0px;\n\t}\n\t.choose-icon {\n\t\tpadding: 1.5em 0.7em;\n\t}\n\t.choose-grid h3 {\n\t\tfont-size: 16px;\n\t\tletter-spacing: 1px;\n\t}\n\t.choose {\n\t\tbottom: -27%;\n\t}\n\t.agileinfo-logo h2 {\n\t\tfont-size: 3em;\n\t}\n\t.about h3 {\n\t\tfont-size: 22px;\n\t}\n\th4.heading {\n\t\tfont-size: 27px;\n\t}\n\t.stats-right {\n\t\tpadding: 2em 0;\n\t}\n\t.blog-grid-info .card h5.card-title {\n\t\tfont-size: 18px;\n\t}\n\t.stats-inner-grid h4 {\n\t\tfont-size: 45px;\n\t}\n\t.our-team-img img {\n\t\twidth: 80px;\n\t}\n\t.our-team-img {\n\t\twidth: 100px;\n\t}\n\t.main_grid_contact {\n\t\twidth: 90%;\n\t\tleft: 5%;\n\t}\n\t.w3ls-contact {\n\t\tpadding: 3em 2em;\n\t}\n}\n@media(max-width:1024px) {\n\t.choose {\n\t\twidth: 95%;\n\t}\n\t.banner {\n\t\theight: 50vw;\n\t}\n\t.error-section h2 {\n\t\tfont-size: 90px;\n\t}\n\t.error-section h2 span {\n\t\tfont-size: 45px;\n\t}\n}\n@media(max-width:991px) {\n\t.slider-info {\n\t\twidth: 75%;\n\t}\n\t.banner-text {\n\t\tpadding-top: 18vw;\n\t}\n\t.agileinfo-logo h2 {\n\t\tfont-size: 2.7em;\n\t}\n\tp {\n\t\tfont-size: 14px;\n\t}\n\t.stats-right {\n\t\tpadding: 2em 1em 0;\n\t}\n\t#logo a {\n\t\tfont-size: .7em;\n\t}\n\t.manager-img img.img1 {\n\t\twidth: 20%;\n\t}\n\t.footer_w3layouts_section_1its h3, .footer_w3layouts_section_1its h2 {\n\t\tfont-size: 20px;\n\t\tletter-spacing: 1px;\n\t}\n\th4.heading {\n\t\tfont-size: 25px;\n\t}\n\t.choose-icon {\n\t\tpadding: 2em 1em;\n\t\tmargin-bottom: 5px;\n\t\twidth: 32.7%;\n\t}\n\t.choose {\n\t\tbottom: -60%;\n\t}\n\t.banner {\n\t\tmargin-bottom: 19em;\n\t}\n\t.main-clients {\n\t\twidth: 90%;\n\t\tmargin: 0 auto;\n\t}\n\t.csslider>.navigation {\n\t\tbottom: -10%;\n\t}\n\th2.heading, h3.heading {\n\t\tfont-size: 40px;\n\t}\n}\n@media(max-width:900px) {\n\t.banner {\n\t\theight: 54vw;\n\t}\n\t.banner-text {\n\t\tpadding-top: 20vw;\n\t}\n\t.w3ls-contact h3,.form h3 {\n\t\tfont-size: 22px;\n\t}\n}\n@media(max-width:800px) {\n\t.choose-icon {\n\t\twidth: 32.6%;\n\t}\n\t.banner {\n\t\theight: 60vw;\n\t}\n\t.banner-text {\n\t\tpadding-top: 25vw;\n\t}\n\t.agileinfo-logo h2 {\n\t\tfont-size: 2.4em;\n\t}\n\t.choose {\n\t\tbottom: -65%;\n\t}\n\t.inner-banner {\n\t\tmin-height: 25vw;\n\t}\n\t.feedback-top h4 {\n\t\tfont-size: 20px;\n\t}\n\t.error-section h2 {\n\t\tfont-size: 80px;\n\t}\n\t.error-section h2 span {\n\t\tfont-size: 40px;\n\t}\n\t.main_grid_contact {\n\t\tflex-direction: column;\n\t\tposition: static;\n\t\twidth: 100%;\n\t}\n\t.map iframe {\n\t\theight: 300px;\n\t}\n\t.map {\n\t\tmargin-bottom: 0em;\n\t}\n\t.w3ls-contact address {\n\t\tmargin-bottom: 0rem;\n\t\tmargin-top: 1rem;\n\t}\n}\n@media(max-width:736px) {\n\t.slider-info {\n\t\twidth: 100%;\n\t}\n\t.banner {\n\t\theight: 64vw;\n\t}\n\t.blog-sec a {\n\t\tpadding: 12px 30px;\n\t\tfont-size: 14px;\n\t}\n\t.footer-top-grid h3 {\n\t\tfont-size: 25px;\n\t}\n\th4.heading {\n\t\tfont-size: 24px;\n\t}\n\t.stats-inner-grid h4 {\n\t\tfont-size: 40px;\n\t}\n\t.menu li.active a {\n\t\tcolor: #333;\n\t}\n\tul.inner-dropdown {\n\t\tpadding: 5px !important;\n\t}\n\t.manager-img img.img1 {\n\t\twidth: 25%;\n\t}\n\t.client-info {\n\t\twidth: 70%;\n\t}\n\t.main-clients {\n\t\twidth: 100%;\n\t}\n\th2.heading, h3.heading {\n\t\tfont-size: 35px;\n\t}\n\t.error-section h2 {\n\t\tfont-size: 70px;\n\t}\n\t.error-section h2 span {\n\t\tfont-size: 40px;\n\t}\n\t.error-section a {\n\t\tpadding: 12px 25px;\n\t\tfont-size: 15px;\n\t}\n}\n@media(max-width:668px) {\n\t.choose-icon {\n\t\twidth: 48.5%;\n\t}\n\t.choose {\n\t\tbottom: -65%;\n\t\tposition: static !important;\n\t\twidth: 100%;\n\t\tmargin-top: 6em;\n\t}\t\n\t.form {\n\t\tpadding: 3em 2em;\n\t}\n}\n@media(max-width:600px) {\n\t.agileinfo-logo h2 {\n\t\tfont-size: 2em;\n\t}\n\t.banner-text {\n\t\tpadding-top: 28vw;\n\t}\n\t.banner-text a {\n\t\tpadding: 11px 30px;\n\t\tfont-size: 15px;\n\t}\n\t#logo a {\n\t\tfont-size: .65em;\n\t}\n\t.inner-banner {\n\t\tmin-height: 30vw;\n\t}\n}\n@media(max-width:568px) {\n\t.top_header {\n\t\tpadding-right: 2em;\n\t}\n\t.top-grid span.fa {\n\t\tfont-size: 35px;\n\t}\n\t.gal {\n\t\twidth: 70%;\n\t\tmargin: 0 auto;\n\t}\n}\n@media(max-width:480px) {\n\t.top_header {\n\t\tpadding-right: 1em;\n\t}\n\t.banner {\n\t\theight: 76vw;\n\t}\n\t.banner-text {\n\t\tpadding-top: 35vw;\n\t}\n\th4.heading {\n\t\tfont-size: 20px;\n\t\tline-height: 35px;\n\t}\n\t.shipping-right {\n\t\tpadding: 3em 3em;\n\t}\n\t.manager-img img.img1 {\n\t\twidth: 30%;\n\t}\n\th3.team_name {\n\t\tfont-size: 18px;\n\t}\n\tspan.team_role {\n\t\tfont-size: 14px;\n\t}\n\t.gal {\n\t\twidth: 80%;\n\t}\n\t.error-section h2 {\n\t\tfont-size: 60px;\n\t}\n\t.error-section h2 span {\n\t\tfont-size: 35px;\n\t}\n\t.input-group input[type=\"text\"], .input-group input[type=\"email\"] {\n\t\twidth: 100%;\n\t\tfont-size: 13px;\n\t\tmargin: 10px 0 5px;\n\t}\n\t.input-group input.margin2 {\n\t\tmargin-right: 0%;\n\t}\n\t.input-group1 button.btn {\n\t\twidth: 35%;\n\t}\n\t.map iframe {\n\t\theight: 250px;\n\t}\n\t.w3ls-contact p {\n\t\tfont-size: 14px;\n\t}\n}\n@media(max-width:415px) {\n\t.shipping-right {\n\t\tpadding: 2em 2em;\n\t}\n\t.stats-inner-grid h4 {\n\t\tfont-size: 28px;\n\t}\n\t.banner {\n\t\tmargin-bottom: 46em;\n\t}\n\t.agileinfo-logo h2 {\n\t\tfont-size: 1.7em;\n\t}\n\t.banner-text {\n\t\tpadding-top: 40vw;\n\t}\n\t.banner {\n\t\theight: 84vw;\n\t}\n\t.choose {\n\t\tmargin-top: 5em;\n\t}\n\t.choose-icon {\n\t\tpadding: 2em 0em;\n\t}\n\t.choose-icon span.fa {\n\t\tfont-size: 30px;\n\t}\n\t.our-services-text h4 {\n\t\tfont-size: 17px;\n\t\tmargin-bottom: 13px;\n\t\tmargin-top: 10px;\n\t}\n\t.banner {\n\t\tmargin-bottom: 36em;\n\t}\n\t.our-services-icon span.fa {\n\t\tfont-size: 40px;\n\t}\n\t.manager-img img.img1 {\n\t\twidth: 35%;\n\t}\n\t.inner-banner {\n\t\tmin-height: 35vw;\n\t}\n\t.client-info {\n\t\twidth: 80%;\n\t}\n\t.feedback-top h4 {\n\t\tfont-size: 18px;\n\t\tline-height: 20px;\n\t}\n\th2.heading, h3.heading {\n\t\tfont-size: 30px;\n\t}\n\t.gal {\n\t\twidth: 90%;\n\t}\n\t.popup {\n\t\tmargin: 8em 1em;\n\t\tpadding: 2em 1em;\n\t}\n\t.error-section h2 span {\n\t\tfont-size: 30px;\n\t\tdisplay: block;\n\t\tmargin-bottom: 15px;\n\t}\n\t.error-section h2 {\n\t\tfont-size: 55px;\n\t}\n\t.w3ls-contact h3, .form h3 {\n\t\tfont-size: 20px;\n\t}\n}\n@media(max-width:384px) {\n\t.top-grid span.fa {\n\t\tfont-size: 20px;\n\t\tmargin-top: 5px;\n\t}\n\t.top_header p {\n\t\tfont-size: 13px;\n\t}\n\t#logo a {\n\t\tfont-size: .6em;\n\t}\n\t.agileinfo-logo h2 {\n\t\tfont-size: 1.5em;\n\t}\n\t.banner-text {\n\t\tpadding-top: 44vw;\n\t}\n\t.banner {\n\t\theight: 88vw;\n\t}\n\t.choose-icon {\n\t\tpadding: 2em 1em;\n\t\twidth: 100%;\n\t}\n\t.choose {\n\t\twidth: 80%;\n\t}\n\t.stats-inner-grid h4 {\n\t\tfont-size: 28px;\n\t\tfloat: none;\n\t}\n\t.stats-inner-grid p {\n\t\tfloat: none;\n\t\tmargin-left: 0px;\n\t}\n\t.footer-top-grid h3 {\n\t\tfont-size: 20px;\n\t}\n\t.footer_w3layouts_section_1its h3, .footer_w3layouts_section_1its h2 {\n\t\tfont-size: 18px;\n\t\tletter-spacing: 1px;\n\t}\n\t.manager-img img.img1 {\n\t\twidth: 45%;\n\t}\n\t.banner-text a {\n\t\tpadding: 10px 25px;\n\t\tfont-size: 13px;\n\t}\n\t.our-services-text {\n\t\tpadding: 26px 24px;\n\t}\n\t.toggle {\n\t\tpadding: 7px 15px;\n\t\tfont-size: 15px;\n\t}\n\t.our-services-icon {\n\t\twidth: 60px;\n\t\ttop: -5px;\n\t\tpadding-top: 5px;\n\t}\n\t.our-services-icon span.fa {\n\t\tfont-size: 30px;\n\t}\n\t.inner-banner {\n\t\tmin-height: 43vw;\n\t}\n\tul.team-social li a span.fa {\n\t\tfont-size: 13px;\n\t}\n}\n@media(max-width:990px) {\n\t\n}\n#tabla {\n color: white;\n}\n/*-- //Responsive design --*/\n", "",{"version":3,"sources":["webpack://src/styles.css"],"names":[],"mappings":"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wB;CACxB;EACC,cAAc;EACd,WAAW;EACX,UAAU;CACX;;CAEA;EACC,gBAAgB;EAChB,+DAA+D;;CAEhE;;AAED;AAEA;;CAEC;EACC,aAAa;EACb,UAAU;CACX;;AAED;AAGA;CACC,YAAY;AACb;AAEA,eAAe;AAEf;MACM,sBAAsB;GACzB,yMAAyM;MACtM,iBAAiB;MACjB,aAAa;MACb,mBAAmB;MACnB,eAAe;AACrB;AACA;IACI,kBAAkB;IAClB,kBAAkB;IAClB,UAAU;IACV,YAAY;AAChB;AACA;IACI,WAAW;IACX,gBAAgB;IAChB,yBAAyB;IACzB,gBAAgB;IAChB,mBAAmB;IACnB,0CAA0C;AAC9C;AACA;IACI,WAAW;IACX,mBAAmB;IACnB,kBAAkB;IAClB,qBAAqB;IACrB,mBAAmB;IACnB,iBAAiB;IACjB,kBAAkB;AACtB;AAEA;IACI,kBAAkB;AACtB;AACA;IACI,qBAAqB;IACrB,WAAW;AACf;AACA;IACI,eAAe;IACf,WAAW;IACX,iBAAiB;IACjB,mBAAmB;IACnB,qBAAqB;AACzB;AACA,iBAAiB;AAMjB,0BAA0B;AAE1B;CACC;EACC,UAAU;CACX;CACA;EACC,UAAU;EACV,SAAS;CACV;AACD;AACA;CACC;EACC,UAAU;CACX;CACA;EACC,UAAU;EACV,SAAS;CACV;AACD;AACA;CACC;EACC,UAAU;CACX;CACA;EACC,UAAU;EACV,QAAQ;CACT;AACD;AACA;CACC;EACC,eAAe;CAChB;CACA;EACC,gBAAgB;CACjB;CACA;EACC,kBAAkB;CACnB;CACA;EACC,oBAAoB;CACrB;CACA;EACC,eAAe;EACf,mBAAmB;CACpB;CACA;EACC,YAAY;CACb;CACA;EACC,cAAc;CACf;CACA;EACC,eAAe;CAChB;CACA;EACC,eAAe;CAChB;CACA;EACC,cAAc;CACf;CACA;EACC,eAAe;CAChB;CACA;EACC,eAAe;CAChB;CACA;EACC,WAAW;CACZ;CACA;EACC,YAAY;CACb;CACA;EACC,UAAU;EACV,QAAQ;CACT;CACA;EACC,gBAAgB;CACjB;AACD;AACA;CACC;EACC,UAAU;CACX;CACA;EACC,YAAY;CACb;CACA;EACC,eAAe;CAChB;CACA;EACC,eAAe;CAChB;AACD;AACA;CACC;EACC,UAAU;CACX;CACA;EACC,iBAAiB;CAClB;CACA;EACC,gBAAgB;CACjB;CACA;EACC,eAAe;CAChB;CACA;EACC,kBAAkB;CACnB;CACA;EACC,eAAe;CAChB;CACA;EACC,UAAU;CACX;CACA;EACC,eAAe;EACf,mBAAmB;CACpB;CACA;EACC,eAAe;CAChB;CACA;EACC,gBAAgB;EAChB,kBAAkB;EAClB,YAAY;CACb;CACA;EACC,YAAY;CACb;CACA;EACC,mBAAmB;CACpB;CACA;EACC,UAAU;EACV,cAAc;CACf;CACA;EACC,YAAY;CACb;CACA;EACC,eAAe;CAChB;AACD;AACA;CACC;EACC,YAAY;CACb;CACA;EACC,iBAAiB;CAClB;CACA;EACC,eAAe;CAChB;AACD;AACA;CACC;EACC,YAAY;CACb;CACA;EACC,YAAY;CACb;CACA;EACC,iBAAiB;CAClB;CACA;EACC,gBAAgB;CACjB;CACA;EACC,YAAY;CACb;CACA;EACC,gBAAgB;CACjB;CACA;EACC,eAAe;CAChB;CACA;EACC,eAAe;CAChB;CACA;EACC,eAAe;CAChB;CACA;EACC,sBAAsB;EACtB,gBAAgB;EAChB,WAAW;CACZ;CACA;EACC,aAAa;CACd;CACA;EACC,kBAAkB;CACnB;CACA;EACC,mBAAmB;EACnB,gBAAgB;CACjB;AACD;AACA;CACC;EACC,WAAW;CACZ;CACA;EACC,YAAY;CACb;CACA;EACC,kBAAkB;EAClB,eAAe;CAChB;CACA;EACC,eAAe;CAChB;CACA;EACC,eAAe;CAChB;CACA;EACC,eAAe;CAChB;CACA;EACC,WAAW;CACZ;CACA;EACC,uBAAuB;CACxB;CACA;EACC,UAAU;CACX;CACA;EACC,UAAU;CACX;CACA;EACC,WAAW;CACZ;CACA;EACC,eAAe;CAChB;CACA;EACC,eAAe;CAChB;CACA;EACC,eAAe;CAChB;CACA;EACC,kBAAkB;EAClB,eAAe;CAChB;AACD;AACA;CACC;EACC,YAAY;CACb;CACA;EACC,YAAY;EACZ,2BAA2B;EAC3B,WAAW;EACX,eAAe;CAChB;CACA;EACC,gBAAgB;CACjB;AACD;AACA;CACC;EACC,cAAc;CACf;CACA;EACC,iBAAiB;CAClB;CACA;EACC,kBAAkB;EAClB,eAAe;CAChB;CACA;EACC,gBAAgB;CACjB;CACA;EACC,gBAAgB;CACjB;AACD;AACA;CACC;EACC,kBAAkB;CACnB;CACA;EACC,eAAe;CAChB;CACA;EACC,UAAU;EACV,cAAc;CACf;AACD;AACA;CACC;EACC,kBAAkB;CACnB;CACA;EACC,YAAY;CACb;CACA;EACC,iBAAiB;CAClB;CACA;EACC,eAAe;EACf,iBAAiB;CAClB;CACA;EACC,gBAAgB;CACjB;CACA;EACC,UAAU;CACX;CACA;EACC,eAAe;CAChB;CACA;EACC,eAAe;CAChB;CACA;EACC,UAAU;CACX;CACA;EACC,eAAe;CAChB;CACA;EACC,eAAe;CAChB;CACA;EACC,WAAW;EACX,eAAe;EACf,kBAAkB;CACnB;CACA;EACC,gBAAgB;CACjB;CACA;EACC,UAAU;CACX;CACA;EACC,aAAa;CACd;CACA;EACC,eAAe;CAChB;AACD;AACA;CACC;EACC,gBAAgB;CACjB;CACA;EACC,eAAe;CAChB;CACA;EACC,mBAAmB;CACpB;CACA;EACC,gBAAgB;CACjB;CACA;EACC,iBAAiB;CAClB;CACA;EACC,YAAY;CACb;CACA;EACC,eAAe;CAChB;CACA;EACC,gBAAgB;CACjB;CACA;EACC,eAAe;CAChB;CACA;EACC,eAAe;EACf,mBAAmB;EACnB,gBAAgB;CACjB;CACA;EACC,mBAAmB;CACpB;CACA;EACC,eAAe;CAChB;CACA;EACC,UAAU;CACX;CACA;EACC,gBAAgB;CACjB;CACA;EACC,UAAU;CACX;CACA;EACC,eAAe;EACf,iBAAiB;CAClB;CACA;EACC,eAAe;CAChB;CACA;EACC,UAAU;CACX;CACA;EACC,eAAe;EACf,gBAAgB;CACjB;CACA;EACC,eAAe;EACf,cAAc;EACd,mBAAmB;CACpB;CACA;EACC,eAAe;CAChB;CACA;EACC,eAAe;CAChB;AACD;AACA;CACC;EACC,eAAe;EACf,eAAe;CAChB;CACA;EACC,eAAe;CAChB;CACA;EACC,eAAe;CAChB;CACA;EACC,gBAAgB;CACjB;CACA;EACC,iBAAiB;CAClB;CACA;EACC,YAAY;CACb;CACA;EACC,gBAAgB;EAChB,WAAW;CACZ;CACA;EACC,UAAU;CACX;CACA;EACC,eAAe;EACf,WAAW;CACZ;CACA;EACC,WAAW;EACX,gBAAgB;CACjB;CACA;EACC,eAAe;CAChB;CACA;EACC,eAAe;EACf,mBAAmB;CACpB;CACA;EACC,UAAU;CACX;CACA;EACC,kBAAkB;EAClB,eAAe;CAChB;CACA;EACC,kBAAkB;CACnB;CACA;EACC,iBAAiB;EACjB,eAAe;CAChB;CACA;EACC,WAAW;EACX,SAAS;EACT,gBAAgB;CACjB;CACA;EACC,eAAe;CAChB;CACA;EACC,gBAAgB;CACjB;CACA;EACC,eAAe;CAChB;AACD;AACA;;AAEA;AAEA;CACC,YAAY;AACb;AAEA,4BAA4B","sourcesContent":["/* You can add global styles to this file, and also import other style files */\nhtml,\nbody {\n    margin: 0;\n    font-size: 100%;\n    background: rgb(44, 44, 44);\n\tfont-family: 'Poppins', sans-serif;\n}\n\nhtml {\n  scroll-behavior: smooth;\n}\nth{\n\tcolor:white;\n}\nbody a {\n    text-decoration: none;\n    transition: 0.5s all;\n    -webkit-transition: 0.5s all;\n    -moz-transition: 0.5s all;\n    -o-transition: 0.5s all;\n    -ms-transition: 0.5s all;\n\tfont-family: 'Poppins', sans-serif;\n}\n\nbody img {\n    max-width: 100%;\n}\n\na:hover {\n    text-decoration: none;\n}\n\n\nh1{\n\tcolor: white;}\nh2,\nh3,\nh4,\nh5,\nh6 {\n    margin: 0;\n\tcolor: #323648;\n}\nli {\n    list-style-type: none;\n}\np {\n    margin: 0;\n    font-size: 15px;\n    line-height: 30px;\n    letter-spacing: 1px;\n    color: #707579;\n}\n\nul {\n    margin: 0;\n    padding: 0;\n}\n\n\n/*-- header --*/\n\nheader {\n    position: absolute;\n    z-index: 9;\n    width: 100%;\n}\n\n.toggle,\n[id^=drop] {\n\tdisplay: none;\n}\n\n/* Giving a background-color to the nav container. */\nnav { \n\tmargin:0;\n\tpadding: 0;\n}\n\n\n#logo a {\n\tfloat: left;\n    font-size: .8em;\n    display: initial;\n    margin: 0;\n    letter-spacing: 0px;\n    color: #fff;\n    font-weight: 600;\n    padding: 3px 0;\n    border: none;\n}\n#logo a span.fa {\n    color: #00BCD4;\n}\n\n\n/* Since we'll have the \"ul li\" \"float:left\"\n * we need to add a clear after the container. */\n\nnav:after {\n\tcontent:\"\";\n\tdisplay:table;\n\tclear:both;\n}\n\n/* Removing padding, margin and \"list-style\" from the \"ul\",\n * and adding \"position:reltive\" */\nnav ul {\n\tfloat: right;\n\tpadding:0;\n\tmargin:0;\n\tlist-style: none;\n\tposition: relative;\n\t}\n\t\n/* Positioning the navigation items inline */\nnav ul li {\n\tmargin: 0px;\n\tdisplay:inline-block;\n\tfloat: left;\n\t}\n\n/* Styling the links */\nnav a {\n    color: #ddd;\n    text-transform: capitalize;\n    letter-spacing: 1px;\n    padding-left: 0;\n    padding-right: 0;\n\tpadding: 10px 0;\n    font-size: 15px;\n}\n\n\nnav ul li ul li:hover { background: #f8f9fa; }\n\n/* Background color change on Hover */\nnav a:hover { \n\tcolor: #ddd;\n}\nnav .inner-dropdown a:hover {\n    color: #333;\n}\n.menu li.active  a{ \n\tcolor: #fff;\n}\n\n/* Hide Dropdowns by Default\n * and giving it a position of absolute */\nnav ul ul {\n\tdisplay: none;\n\tposition: absolute; \n\t/* has to be the same number as the \"line-height\" of \"nav a\" */\n\ttop: 30px; \n    background: #fff;\n    padding: 10px;\n}\n\t\n/* Display Dropdowns on Hover */\nnav ul li:hover > ul {\n\tdisplay:inherit;\n}\n\t\n/* Fisrt Tier Dropdown */\nnav ul ul li {\n\twidth:170px;\n\tfloat:none;\n\tdisplay:list-item;\n\tposition: relative;\n}\nnav ul ul li a {\n    color: #333 !important;\n    padding: 5px 10px;\n    display: block;\n}\n\n/* Second, Third and more Tiers\t\n * We move the 2nd and 3rd etc tier dropdowns to the left\n * by the amount of the width of the first tier.\n*/\nnav ul ul ul li {\n\tposition: relative;\n\ttop:-60px;\n\t/* has to be the same number as the \"width\" of \"nav ul ul li\" */ \n\tleft:170px; \n}\n\n/* Change ' +' in order to change the Dropdown symbol */\nli > a:only-child:after { content: ''; }\n\n\n/* Media Queries\n--------------------------------------------- */\n\n@media all and (max-width : 736px) {\n\n\t#logo {\n\t\tdisplay: block;\n\t\tpadding: 0;\n\t\twidth: 100%;\n\t\ttext-align: center;\n\t\tfloat: none;\n\t}\n\n\t.login-icon a {\n\t\tpadding: 11px 15px;\n\t}\n\tnav {\n\t\tmargin: 0;\n\t}\n\tnav a {\n\t\tcolor: #333;\n\t}\n\n\t/* Hide the navigation menu by default */\n\t/* Also hide the  */\n\t.toggle + a,\n\t.menu {\n\t\tdisplay: none;\n\t}\n\n\t/* Stylinf the toggle lable */\n\t.toggle {\n\t\tdisplay: block;\n\t\tpadding: 7px 15px;\n\t\tfont-size: 17px;\n\t\ttext-decoration: none;\n\t\tborder: none;\n\t\tfloat: right;\n\t\tbackground-color: #00BCD4;\n\t\tcolor: #fff;\n\t\tborder-radius: 0px;\n\t}\n\t.menu .toggle {\n\t\tfloat: none;\n\t\ttext-align: center;\n\t\tmargin: auto;\n\t\twidth: auto;\n\t\tpadding: 5px;\n\t\tfont-weight: normal;\n\t\tfont-size: 15px;\n\t\tletter-spacing: 1px;\n\t\tbackground: none;\n\t\tcolor: #333;\n\t}\n\n\t.toggle:hover {\n\t\tcolor:#333;\n\t\tbackground-color: #fff;\n\t}\n\n\t/* Display Dropdown when clicked on Parent Lable */\n\t[id^=drop]:checked + ul {\n\t\tdisplay: block;\n\t\tbackground: #fff;\n\t\tpadding: 15px 0;\n\t\twidth:100%;\n\t\ttext-align: center;\n\t}\n\n\t/* Change menu item's width to 100% */\n\tnav ul li {\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t\tpadding: 7px 0;\n\t\t}\n\tnav a{\n\t\tpadding: 5px 0;\n\t}\n\tnav a:hover {\n\t\tcolor: #333;\n\t\tborder-bottom: 2px solid #333;\n\t}\n\tnav ul ul .toggle,\n\tnav ul ul a {\n\t\tpadding: 0 40px;\n\t}\n\n\tnav ul ul ul a {\n\t\tpadding: 0 80px;\n\t}\n\n\tnav a:hover,\n \tnav ul ul ul a {\n\t\tbackground-color: transparent;\n\t}\n  \n\tnav ul li ul li .toggle,\n\tnav ul ul a,\n\tnav ul ul ul a{\n\t\tpadding:14px 20px;\t\n\t\tcolor:#FFF;\n\t\tfont-size:17px; \n\t}\n  \n  \n\tnav ul li ul li .toggle,\n\tnav ul ul a {\n\t\tbackground-color: #fff; \n\t}\n\tnav ul ul li a {\n\t\tfont-size: 15px;\n\t\tdisplay: inline-block;\n\t\tborder-bottom: 2px solid transparent;\n\t}\n\tul.inner-ul{\n\t\tpadding: 0!important;\n\t}\n\t/* Hide Dropdowns by Default */\n\tnav ul ul {\n\t\tfloat: none;\n\t\tposition:static;\n\t\tcolor: #ffffff;\n\t\t/* has to be the same number as the \"line-height\" of \"nav a\" */\n\t}\n\t\t\n\t/* Hide menus on hover */\n\tnav ul ul li:hover > ul,\n\tnav ul li:hover > ul {\n\t\tdisplay: none;\n\t}\n\t\t\n\t/* Fisrt Tier Dropdown */\n\tnav ul ul li {\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t\tpadding: 0;\n\t}\n\n\tnav ul ul ul li {\n\t\tposition: static;\n\t\t/* has to be the same number as the \"width\" of \"nav ul ul li\" */ \n\n\t}\n\n}\n\n@media all and (max-width : 330px) {\n\n\tnav ul li {\n\t\tdisplay:block;\n\t\twidth: 94%;\n\t}\n\n}\n\n\n.form1{\n\tcolor: white;\n}\n\n/*-- banner --*/\n\n.banner {\n      background-size: cover;\n\t  background-image:url(https://png.pngtree.com/thumb_back/fw800/background/20190223/ourmid/pngtree-ppt-technology-color-line-background-backgroundppt-templatetechnological-senselinecolor-image_67507.jpg);\n      min-height: 100vh;\n      display: grid;\n      align-items: center;\n      padding: 2rem 0;\n}\n.slider-info {\n    position: relative;\n    text-align: center;\n    width: 70%;\n    margin: auto;\n}\n.agileinfo-logo h2 {\n    color: #fff;\n    font-size: 3.5em;\n    text-transform: uppercase;\n    font-weight: 600;\n    letter-spacing: 2px;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.37);\n}\n.banner-text a {\n    color: #fff;\n    background: #00BCD4;\n    padding: 13px 35px;\n    display: inline-block;\n    letter-spacing: 1px;\n    margin-top: 1.5em;\n    border-radius: 4px;\n}\n\n.banner-text {\n    padding-top: 15vw ;\n}\n.banner ul.social li {\n    display: inline-block;\n    margin: 8px;\n}\n.banner  ul.social li  a{\n    font-size: 16px;\n    color: #eee;\n    line-height: 26px;\n    letter-spacing: 1px;\n    list-style-type: none;\n}\n/*-- //banner --*/\n\n\n\n\n\n/*-- Responsive design --*/\n\n@media(max-width:1440px) {\n\t.choose {\n\t\twidth: 78%;\n\t}\n\t.main_grid_contact {\n\t\twidth: 76%;\n\t\tleft: 12%;\n\t}\n}\n@media(max-width:1336px) {\n\t.choose {\n\t\twidth: 85%;\n\t}\n\t.main_grid_contact {\n\t\twidth: 80%;\n\t\tleft: 10%;\n\t}\n}\n@media(max-width:1280px) {\n\t.choose {\n\t\twidth: 90%;\n\t}\n\t.main_grid_contact {\n\t\twidth: 86%;\n\t\tleft: 7%;\n\t}\n}\n@media(max-width:1080px) {\n\t.top-grid span.fa {\n\t\tfont-size: 40px;\n\t}\n\t.top-grid {\n\t\tpadding-right: 0;\n\t}\n\t.top-grid.pl-0 {\n\t\tpadding-right: 0px;\n\t}\n\t.choose-icon {\n\t\tpadding: 1.5em 0.7em;\n\t}\n\t.choose-grid h3 {\n\t\tfont-size: 16px;\n\t\tletter-spacing: 1px;\n\t}\n\t.choose {\n\t\tbottom: -27%;\n\t}\n\t.agileinfo-logo h2 {\n\t\tfont-size: 3em;\n\t}\n\t.about h3 {\n\t\tfont-size: 22px;\n\t}\n\th4.heading {\n\t\tfont-size: 27px;\n\t}\n\t.stats-right {\n\t\tpadding: 2em 0;\n\t}\n\t.blog-grid-info .card h5.card-title {\n\t\tfont-size: 18px;\n\t}\n\t.stats-inner-grid h4 {\n\t\tfont-size: 45px;\n\t}\n\t.our-team-img img {\n\t\twidth: 80px;\n\t}\n\t.our-team-img {\n\t\twidth: 100px;\n\t}\n\t.main_grid_contact {\n\t\twidth: 90%;\n\t\tleft: 5%;\n\t}\n\t.w3ls-contact {\n\t\tpadding: 3em 2em;\n\t}\n}\n@media(max-width:1024px) {\n\t.choose {\n\t\twidth: 95%;\n\t}\n\t.banner {\n\t\theight: 50vw;\n\t}\n\t.error-section h2 {\n\t\tfont-size: 90px;\n\t}\n\t.error-section h2 span {\n\t\tfont-size: 45px;\n\t}\n}\n@media(max-width:991px) {\n\t.slider-info {\n\t\twidth: 75%;\n\t}\n\t.banner-text {\n\t\tpadding-top: 18vw;\n\t}\n\t.agileinfo-logo h2 {\n\t\tfont-size: 2.7em;\n\t}\n\tp {\n\t\tfont-size: 14px;\n\t}\n\t.stats-right {\n\t\tpadding: 2em 1em 0;\n\t}\n\t#logo a {\n\t\tfont-size: .7em;\n\t}\n\t.manager-img img.img1 {\n\t\twidth: 20%;\n\t}\n\t.footer_w3layouts_section_1its h3, .footer_w3layouts_section_1its h2 {\n\t\tfont-size: 20px;\n\t\tletter-spacing: 1px;\n\t}\n\th4.heading {\n\t\tfont-size: 25px;\n\t}\n\t.choose-icon {\n\t\tpadding: 2em 1em;\n\t\tmargin-bottom: 5px;\n\t\twidth: 32.7%;\n\t}\n\t.choose {\n\t\tbottom: -60%;\n\t}\n\t.banner {\n\t\tmargin-bottom: 19em;\n\t}\n\t.main-clients {\n\t\twidth: 90%;\n\t\tmargin: 0 auto;\n\t}\n\t.csslider>.navigation {\n\t\tbottom: -10%;\n\t}\n\th2.heading, h3.heading {\n\t\tfont-size: 40px;\n\t}\n}\n@media(max-width:900px) {\n\t.banner {\n\t\theight: 54vw;\n\t}\n\t.banner-text {\n\t\tpadding-top: 20vw;\n\t}\n\t.w3ls-contact h3,.form h3 {\n\t\tfont-size: 22px;\n\t}\n}\n@media(max-width:800px) {\n\t.choose-icon {\n\t\twidth: 32.6%;\n\t}\n\t.banner {\n\t\theight: 60vw;\n\t}\n\t.banner-text {\n\t\tpadding-top: 25vw;\n\t}\n\t.agileinfo-logo h2 {\n\t\tfont-size: 2.4em;\n\t}\n\t.choose {\n\t\tbottom: -65%;\n\t}\n\t.inner-banner {\n\t\tmin-height: 25vw;\n\t}\n\t.feedback-top h4 {\n\t\tfont-size: 20px;\n\t}\n\t.error-section h2 {\n\t\tfont-size: 80px;\n\t}\n\t.error-section h2 span {\n\t\tfont-size: 40px;\n\t}\n\t.main_grid_contact {\n\t\tflex-direction: column;\n\t\tposition: static;\n\t\twidth: 100%;\n\t}\n\t.map iframe {\n\t\theight: 300px;\n\t}\n\t.map {\n\t\tmargin-bottom: 0em;\n\t}\n\t.w3ls-contact address {\n\t\tmargin-bottom: 0rem;\n\t\tmargin-top: 1rem;\n\t}\n}\n@media(max-width:736px) {\n\t.slider-info {\n\t\twidth: 100%;\n\t}\n\t.banner {\n\t\theight: 64vw;\n\t}\n\t.blog-sec a {\n\t\tpadding: 12px 30px;\n\t\tfont-size: 14px;\n\t}\n\t.footer-top-grid h3 {\n\t\tfont-size: 25px;\n\t}\n\th4.heading {\n\t\tfont-size: 24px;\n\t}\n\t.stats-inner-grid h4 {\n\t\tfont-size: 40px;\n\t}\n\t.menu li.active a {\n\t\tcolor: #333;\n\t}\n\tul.inner-dropdown {\n\t\tpadding: 5px !important;\n\t}\n\t.manager-img img.img1 {\n\t\twidth: 25%;\n\t}\n\t.client-info {\n\t\twidth: 70%;\n\t}\n\t.main-clients {\n\t\twidth: 100%;\n\t}\n\th2.heading, h3.heading {\n\t\tfont-size: 35px;\n\t}\n\t.error-section h2 {\n\t\tfont-size: 70px;\n\t}\n\t.error-section h2 span {\n\t\tfont-size: 40px;\n\t}\n\t.error-section a {\n\t\tpadding: 12px 25px;\n\t\tfont-size: 15px;\n\t}\n}\n@media(max-width:668px) {\n\t.choose-icon {\n\t\twidth: 48.5%;\n\t}\n\t.choose {\n\t\tbottom: -65%;\n\t\tposition: static !important;\n\t\twidth: 100%;\n\t\tmargin-top: 6em;\n\t}\t\n\t.form {\n\t\tpadding: 3em 2em;\n\t}\n}\n@media(max-width:600px) {\n\t.agileinfo-logo h2 {\n\t\tfont-size: 2em;\n\t}\n\t.banner-text {\n\t\tpadding-top: 28vw;\n\t}\n\t.banner-text a {\n\t\tpadding: 11px 30px;\n\t\tfont-size: 15px;\n\t}\n\t#logo a {\n\t\tfont-size: .65em;\n\t}\n\t.inner-banner {\n\t\tmin-height: 30vw;\n\t}\n}\t\n@media(max-width:568px) {\n\t.top_header {\n\t\tpadding-right: 2em;\n\t}\n\t.top-grid span.fa {\n\t\tfont-size: 35px;\n\t}\n\t.gal {\n\t\twidth: 70%;\n\t\tmargin: 0 auto;\n\t}\n}\n@media(max-width:480px) {\n\t.top_header {\n\t\tpadding-right: 1em;\n\t}\n\t.banner {\n\t\theight: 76vw;\n\t}\n\t.banner-text {\n\t\tpadding-top: 35vw;\n\t}\n\th4.heading {\n\t\tfont-size: 20px;\n\t\tline-height: 35px;\n\t}\n\t.shipping-right {\n\t\tpadding: 3em 3em;\n\t}\n\t.manager-img img.img1 {\n\t\twidth: 30%;\n\t}\n\th3.team_name {\n\t\tfont-size: 18px;\n\t}\n\tspan.team_role {\n\t\tfont-size: 14px;\n\t}\n\t.gal {\n\t\twidth: 80%;\n\t}\n\t.error-section h2 {\n\t\tfont-size: 60px;\n\t}\n\t.error-section h2 span {\n\t\tfont-size: 35px;\n\t}\n\t.input-group input[type=\"text\"], .input-group input[type=\"email\"] {\n\t\twidth: 100%;\n\t\tfont-size: 13px;\n\t\tmargin: 10px 0 5px;\n\t}\n\t.input-group input.margin2 {\n\t\tmargin-right: 0%;\n\t}\n\t.input-group1 button.btn {\n\t\twidth: 35%;\n\t}\n\t.map iframe {\n\t\theight: 250px;\n\t}\n\t.w3ls-contact p {\n\t\tfont-size: 14px;\n\t}\n}\n@media(max-width:415px) {\n\t.shipping-right {\n\t\tpadding: 2em 2em;\n\t}\n\t.stats-inner-grid h4 {\n\t\tfont-size: 28px;\n\t}\n\t.banner {\n\t\tmargin-bottom: 46em;\n\t}\n\t.agileinfo-logo h2 {\n\t\tfont-size: 1.7em;\n\t}\n\t.banner-text {\n\t\tpadding-top: 40vw;\n\t}\n\t.banner {\n\t\theight: 84vw;\n\t}\n\t.choose {\n\t\tmargin-top: 5em;\n\t}\n\t.choose-icon {\n\t\tpadding: 2em 0em;\n\t}\n\t.choose-icon span.fa {\n\t\tfont-size: 30px;\n\t}\n\t.our-services-text h4 {\n\t\tfont-size: 17px;\n\t\tmargin-bottom: 13px;\n\t\tmargin-top: 10px;\n\t}\n\t.banner {\n\t\tmargin-bottom: 36em;\n\t}\n\t.our-services-icon span.fa {\n\t\tfont-size: 40px;\n\t}\n\t.manager-img img.img1 {\n\t\twidth: 35%;\n\t}\n\t.inner-banner {\n\t\tmin-height: 35vw;\n\t}\n\t.client-info {\n\t\twidth: 80%;\n\t}\n\t.feedback-top h4 {\n\t\tfont-size: 18px;\n\t\tline-height: 20px;\n\t}\n\th2.heading, h3.heading {\n\t\tfont-size: 30px;\n\t}\n\t.gal {\n\t\twidth: 90%;\n\t}\n\t.popup {\n\t\tmargin: 8em 1em;\n\t\tpadding: 2em 1em;\n\t}\n\t.error-section h2 span {\n\t\tfont-size: 30px;\n\t\tdisplay: block;\n\t\tmargin-bottom: 15px;\n\t}\n\t.error-section h2 {\n\t\tfont-size: 55px;\n\t}\n\t.w3ls-contact h3, .form h3 {\n\t\tfont-size: 20px;\n\t}\n}\n@media(max-width:384px) {\n\t.top-grid span.fa {\n\t\tfont-size: 20px;\n\t\tmargin-top: 5px;\n\t}\n\t.top_header p {\n\t\tfont-size: 13px;\n\t}\n\t#logo a {\n\t\tfont-size: .6em;\n\t}\n\t.agileinfo-logo h2 {\n\t\tfont-size: 1.5em;\n\t}\n\t.banner-text {\n\t\tpadding-top: 44vw;\n\t}\n\t.banner {\n\t\theight: 88vw;\n\t}\n\t.choose-icon {\n\t\tpadding: 2em 1em;\n\t\twidth: 100%;\n\t}\n\t.choose {\n\t\twidth: 80%;\n\t}\n\t.stats-inner-grid h4 {\n\t\tfont-size: 28px;\n\t\tfloat: none;\n\t}\n\t.stats-inner-grid p {\n\t\tfloat: none;\n\t\tmargin-left: 0px;\n\t}\n\t.footer-top-grid h3 {\n\t\tfont-size: 20px;\n\t}\n\t.footer_w3layouts_section_1its h3, .footer_w3layouts_section_1its h2 {\n\t\tfont-size: 18px;\n\t\tletter-spacing: 1px;\n\t}\n\t.manager-img img.img1 {\n\t\twidth: 45%;\n\t}\n\t.banner-text a {\n\t\tpadding: 10px 25px;\n\t\tfont-size: 13px;\n\t}\n\t.our-services-text {\n\t\tpadding: 26px 24px;\n\t}\n\t.toggle {\n\t\tpadding: 7px 15px;\n\t\tfont-size: 15px;\n\t}\n\t.our-services-icon {\n\t\twidth: 60px;\n\t\ttop: -5px;\n\t\tpadding-top: 5px;\n\t}\n\t.our-services-icon span.fa {\n\t\tfont-size: 30px;\n\t}\n\t.inner-banner {\n\t\tmin-height: 43vw;\n\t}\n\tul.team-social li a span.fa {\n\t\tfont-size: 13px;\n\t}\n}\n@media(max-width:990px) {\n\t\n}\n\n#tabla {\n color: white;\n}\n\n/*-- //Responsive design --*/\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ })

},[[5,"runtime"]]]);
//# sourceMappingURL=styles.js.map