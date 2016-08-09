function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.mattmcfarland.fontawesome/" + s : s.substring(0, index) + "/com.mattmcfarland.fontawesome/" + s.substring(index + 1);
    return path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function applyIcons() {
        function updateIcons(children) {
            children && children.forEach(function(tag) {
                counter++;
                debugMode && Ti.API.debug("[" + counter + "] (" + tag["id"] + ")  Checking for icon attribute");
                if (tag["icon"]) {
                    var iconChar = icons.charMap[tag["icon"]];
                    debugMode && Ti.API.debug("[" + counter + "] (" + tag["id"] + ')  icon attribute found. value is "' + tag["icon"] + '"');
                    if ("fa-" === tag["icon"].substring(0, 3)) {
                        debugMode && Ti.API.debug("[" + counter + "] (" + tag["id"] + ")  fa- prefix found");
                        addIcon(tag, iconChar);
                    }
                }
                updateIcons(tag.views || tag.children);
            });
        }
        updateIcons([ __parentSymbol ]);
    }
    function removeIcon(tag) {
        tag.icon && (tag.icon = "");
        tag.text && (tag.text = removeChars(tag.text));
        tag.title && (tag.text = removeChars(tag.title));
    }
    function removeChars(string) {
        return string.replace(/[^\w\s]/gi, "");
    }
    function addIcon(tag, iconChar) {
        var aText = iconChar;
        var aTitle = iconChar;
        var fSize = icons.defaultSize;
        tag["text"] && (aText += " " + tag["text"]);
        tag["title"] && (aTitle += " " + tag["title"]);
        debugMode && Ti.API.debug("[" + counter + '] aText = "' + aText + '"');
        debugMode && Ti.API.debug("[" + counter + '] aTitle = "' + aTitle + '"');
        tag["font"] && tag["font"]["fontSize"] && (fSize = tag["font"]["fontSize"]);
        var props = {
            font: {
                fontFamily: icons.fontFamily,
                fontSize: fSize
            },
            text: aText,
            title: aTitle
        };
        tag.applyProperties(props);
        if (debugMode) {
            Ti.API.debug(tag.getFont()["fontFamily"]);
            for (var p in tag) Ti.API.debug("[" + counter + "] (" + tag["id"] + ") {" + p + '} value is "' + tag[p] + '"');
        }
    }
    function createIcon(el, iconName) {
        el.icon = iconName;
        var iconSyl = icons.charMap[el["icon"]];
        addIcon(el, iconSyl);
    }
    function destroyIcon(el) {
        removeIcon(el);
    }
    function changeIcon(el, iconName) {
        removeIcon(el);
        createIcon(el, iconName);
    }
    new (require("alloy/widget"))("com.mattmcfarland.fontawesome");
    this.__widgetId = "com.mattmcfarland.fontawesome";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.debugMode;
    exports.icons;
    exports.iconPrefix;
    exports.instaParse;
    exports.add = function(el, icon) {
        createIcon(el, icon);
    };
    exports.remove = function(el) {
        destroyIcon(el);
    };
    exports.change = function(el, icon) {
        changeIcon(el, icon);
    };
    exports.refresh = function() {
        applyIcons();
    };
    var args = arguments[0] || {};
    var iconPrefix;
    var debugMode;
    var icons;
    var instaParse;
    var counter = 0;
    icons = "undefined" == typeof args.icons ? exports.icons : args.icons;
    debugMode = "undefined" == typeof args.debugMode ? exports.debugMode : args.debugMode;
    iconPrefix = "undefined" == typeof args.iconPrefix ? exports.iconPrefix : args.iconPrefix;
    instaParse = "undefined" == typeof args.instaParse ? exports.instaParse : args.instaParse;
    "undefined" == typeof icons && (icons = require(WPATH("icons")));
    "undefined" == typeof iconPrefix && (iconPrefix = icons.prefix);
    "undefined" == typeof iconPrefix && (iconPrefix = "fa-");
    "undefined" == typeof debugMode && (debugMode = false);
    "undefined" == typeof instaParse && (instaParse = true);
    debugMode && Ti.API.debug("Font Awesome widget.js is active");
    instaParse && applyIcons();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;