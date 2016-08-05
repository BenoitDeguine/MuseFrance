Ti.include('function/function.js');
Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

var Admob = require('ti.admob');
//var GA = require("analytics.google");

var isIOS = false;
if (Titanium.Platform.name == 'iPhone OS') {
	isIOS = true;
};

var URL_APPLI = "http://api.muse-france.fr/";
var mobile_info = {
	username : Titanium.Platform.username,
	os : Titanium.Platform.name,
	ip : Titanium.Platform.address,
	version : Titanium.Platform.version
};
//var MOBILE_name =

var NB_CARACT = 75;
var NB_CARACT = 150;

// Design
var BACKGOUND_VIEW = "#333333";
var BACKGROUND_VIEW_SHADOW = "#999";
var BACKGROUND_TABLEVIEW = "#202020";
var FONT = 'ManilaSansBld';

if (Ti.App.Properties.getString('ganalytics') == undefined) {
	Ti.App.Properties.setString('ganalytics', 'UA-XXXXX-X');
}
/*GA.trackUncaughtExceptions = true;
var tracker = GA.getTracker(Ti.App.Properties.getString('ganalytics'));
//GA.dryRun = true;
GA.dispatchInterval = 1;
// seconds
*/
// On met une valeur par défaut de l'id pour la pub
if (Ti.App.Properties.getString('admob') == undefined) {
	Ti.App.Properties.setString('admob', 'ca-app-pub-XXXXX');
}
var idPub = Ti.App.Properties.getString('admob');
