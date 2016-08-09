function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundImage: "Default.png",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId3 = Ti.UI.createView({
        left: 5,
        right: 5,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId3"
    });
    $.__views.index.add($.__views.__alloyId3);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    console.log("ID");
    console.log(Ti.App.Properties.getString("user_id"));
    console.log("ID");
    if (null == Ti.App.Properties.getString("user_id") || "<null>" == Ti.App.Properties.getString("user_id")) {
        console.log(URL_APPLI + "user/get");
        var a = Ti.UI.createAnimation({
            duration: 2e3,
            opacity: 1
        });
        setInterval(function() {
            $.index.open();
            parentView.animate(a);
        }, 1e3);
        var parentView = Titanium.UI.createView({
            borderRadius: 7,
            backgroundColor: "#262626",
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            layout: "vertical",
            left: 15,
            right: 15,
            opacity: 0
        });
        $.index.add(parentView);
        var labelTitle = Ti.UI.createLabel({
            text: "Bienvenue à toi, ô grand fan de Muse !".toUpperCase(),
            autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_ALL,
            color: "#999",
            textAlign: "center",
            top: 15
        });
        parentView.add(labelTitle);
        var aLabel = Ti.UI.createLabel({
            text: "Après quelques mois de développement, notre application est désormais disponible sur ton téléphone ! Grâce à elle, tu pourras être au courant de toute l'actualité du groupe ! \n\nUn grand merci à toi d'avoir téléchargé l'application, n'hésites pas à nous soutenir sur les différents réseaux sociaux, nous contacter par email et pourquoi pas nous mettre une note sur l'Apple Store ! :)",
            color: "#999",
            textAlign: "left",
            left: 10,
            right: 10,
            top: 20
        });
        parentView.add(aLabel);
        var next = Titanium.UI.createView({
            borderRadius: 7,
            backgroundColor: "#333333",
            width: "auto",
            height: Ti.UI.SIZE,
            layout: "vertical",
            left: 15,
            height: 50,
            right: 15,
            bottom: 15,
            top: 15
        });
        var myLabel = Ti.UI.createLabel({
            text: "Suivant",
            color: "#999",
            textAlign: "center",
            height: Ti.UI.FILL
        });
        next.add(myLabel);
        parentView.add(next);
        var param = {
            number: Ti.Utils.sha1(Titanium.Platform.id),
            plateforme: "iPhone OS",
            pseudo: Titanium.Platform.username
        };
        console.log(param);
        var xhr = Ti.Network.createHTTPClient({
            timeout: 5e3
        });
        xhr.ontimeout = function() {};
        xhr.onload = function() {
            var jsonResult = JSON.parse(this.responseText);
            console.log(JSON.stringify(jsonResult));
            mobile_info.id = jsonResult.id;
        };
        xhr.open("POST", URL_APPLI + "user/get", true);
        xhr.send(param);
        console.log("POST");
        next.addEventListener("click", function() {
            Ti.App.Properties.setString("user_id", mobile_info.id);
            Alloy.createController("actu").getView().open();
        });
    } else {
        mobile_info.id = Ti.App.Properties.getString("user_id");
        Alloy.createController("actu").getView().open();
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;