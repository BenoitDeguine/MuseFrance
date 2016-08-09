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
    function setDriversRowUI(driversNamesArray) {
        $.sharer_Cont.data = _.map(driversNamesArray, function(name) {
            if (null == drivers[name]) throw new Error(WNAME + ": No share system found with name " + name);
            var $row = Ti.UI.createTableViewRow({
                driver: name,
                selectedBackgroundColor: "transparent"
            });
            $row.add(Widget.createController("button", drivers[name].args).getView());
            return $row;
        });
    }
    var Widget = new (require("alloy/widget"))("com.caffeinalab.titanium.sharer");
    this.__widgetId = "com.caffeinalab.titanium.sharer";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.sharer_Win = Ti.UI.createWindow({
        navBarHidden: true,
        backgroundColor: "#C000",
        id: "sharer_Win"
    });
    $.__views.sharer_Win && $.addTopLevelView($.__views.sharer_Win);
    $.__views.sharer_Title = Ti.UI.createLabel({
        top: 40,
        textid: "Share",
        textAlign: "center",
        color: "#fff",
        font: {
            fontSize: 20
        },
        id: "sharer_Title"
    });
    $.__views.sharer_Win.add($.__views.sharer_Title);
    $.__views.sharer_Hr = Ti.UI.createView({
        top: 80,
        height: 1,
        left: 30,
        right: 30,
        backgroundColor: "#9FFF",
        id: "sharer_Hr"
    });
    $.__views.sharer_Win.add($.__views.sharer_Hr);
    $.__views.sharer_Cont = Ti.UI.createTableView({
        top: 80,
        bottom: 100,
        scrollable: true,
        backgroundColor: "transparent",
        separatorColor: "transparent",
        id: "sharer_Cont"
    });
    $.__views.sharer_Win.add($.__views.sharer_Cont);
    $.__views.sharer_Close = Ti.UI.createButton({
        color: "#fff",
        backgroundColor: "transparent",
        bottom: 30,
        image: WPATH("/images/close.png"),
        font: {
            fontSize: 30
        },
        id: "sharer_Close"
    });
    $.__views.sharer_Win.add($.__views.sharer_Close);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var WNAME = "com.caffeinalab.titanium.sharer";
    null == Ti.Trimethyl && Ti.API.warn(WNAME + ": This widget require Trimethyl to be installed (https://github.com/CaffeinaLab/Trimethyl)");
    var shareObj = null;
    var drivers = {
        facebook: {
            callback: function(e) {
                require("T/sharer").facebook(e.shareObj);
            },
            args: {
                title: "  Facebook",
                image: WPATH("images/facebook.png"),
                backgroundColor: "#3b5998",
                borderWidth: .5,
                borderColor: "#2B406E"
            }
        },
        twitter: {
            callback: function(e) {
                require("T/sharer").twitter(e.shareObj);
            },
            args: {
                title: "  Twitter",
                image: WPATH("images/twitter.png"),
                backgroundColor: "#55acee",
                borderWidth: .5,
                borderColor: "#147AC8"
            }
        },
        googleplus: {
            callback: function(e) {
                require("T/sharer").googleplus(e.shareObj);
            },
            args: {
                title: "  Google+",
                image: WPATH("images/googleplus.png"),
                backgroundColor: "#dd4b39",
                borderWidth: .5,
                borderColor: "#AE2E1E"
            }
        },
        whatsapp: {
            callback: function(e) {
                require("T/sharer").whatsapp(e.shareObj);
            },
            args: {
                title: " Whatsapp",
                image: WPATH("images/whatsapp.png"),
                borderColor: "#fff"
            }
        },
        email: {
            callback: function(e) {
                require("T/sharer").email(e.shareObj);
            },
            args: {
                title: " Email",
                image: WPATH("images/email.png"),
                borderColor: "#fff"
            }
        },
        message: {
            callback: function(e) {
                require("T/sharer").message(e.shareObj);
            },
            args: {
                title: " " + L("Message"),
                image: WPATH("images/message.png"),
                borderColor: "#fff"
            }
        },
        copytoclipboard: {
            callback: function(e) {
                Ti.UI.Clipboard.setText(e.shareObj.url);
                e.source.title = " " + L("link_copied", "Link copied!");
            },
            args: {
                title: " " + L("copy_link", "Copy link"),
                image: WPATH("images/copytoclipboard.png"),
                borderColor: "#fff"
            }
        }
    };
    exports.setDriver = function(name, def) {
        drivers[name] = def;
    };
    exports.extendDriverArgs = function(name, newArgs) {
        _.extend(drivers[name].args, newArgs);
    };
    $.sharer_Cont.addEventListener("click", function(e) {
        if (null == e.rowData.driver) return;
        drivers[e.rowData.driver].callback({
            shareObj: shareObj,
            source: e.source
        });
    });
    $.sharer_Close.addEventListener("click", function() {
        exports.hide();
    });
    exports.show = function(so, where) {
        if (null == so) throw new Error("Please set a sharing object");
        setDriversRowUI(where || [ "facebook", "twitter", "googleplus", "whatsapp", "email", "message", "copytoclipboard" ]);
        shareObj = so;
        $.sharer_Win.opacity = 0;
        $.sharer_Win.open();
        $.sharer_Win.animate({
            opacity: 1
        });
    };
    exports.hide = function() {
        $.sharer_Win.close();
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;