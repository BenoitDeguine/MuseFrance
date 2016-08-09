var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.include("function/function.js");

Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

var Admob = require("ti.admob");

var isIOS = false;

isIOS = true;

var URL_APPLI = "http://api.muse-france.fr/";

var mobile_info = {
    username: Titanium.Platform.username,
    os: "iPhone OS",
    ip: Titanium.Platform.address,
    version: Titanium.Platform.version
};

var NB_CARACT = 75;

var NB_CARACT = 150;

var BACKGOUND_VIEW = "#333333";

var BACKGROUND_VIEW_SHADOW = "#999";

var BACKGROUND_TABLEVIEW = "#202020";

var FONT = "ManilaSansBld";

void 0 == Ti.App.Properties.getString("ganalytics") && Ti.App.Properties.setString("ganalytics", "UA-XXXXX-X");

void 0 == Ti.App.Properties.getString("admob") && Ti.App.Properties.setString("admob", "ca-app-pub-XXXXX");

var idPub = Ti.App.Properties.getString("admob");

Alloy.createController("index");