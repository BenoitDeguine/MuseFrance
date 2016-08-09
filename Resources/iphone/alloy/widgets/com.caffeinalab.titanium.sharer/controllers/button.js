function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.caffeinalab.titanium.sharer/" + s : s.substring(0, index) + "/com.caffeinalab.titanium.sharer/" + s.substring(index + 1);
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
    new (require("alloy/widget"))("com.caffeinalab.titanium.sharer");
    this.__widgetId = "com.caffeinalab.titanium.sharer";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "button";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.sharer_Button = Ti.UI.createButton({
        backgroundColor: "transparent",
        width: Ti.UI.FILL,
        height: 42,
        borderRadius: 2,
        left: 30,
        right: 30,
        top: 10,
        font: {
            fontSize: 16
        },
        id: "sharer_Button"
    });
    $.__views.sharer_Button && $.addTopLevelView($.__views.sharer_Button);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.sharer_Button.applyProperties(args);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;