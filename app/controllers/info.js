var win = Titanium.UI.createWindow({
	title : "info"
});
var scrollView = Titanium.UI.createScrollView({
	contentWidth : Ti.UI.FILL,
	contentHeight : Ti.UI.SIZE,
	top : 0,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : true
});
var view = Ti.UI.createView({
	backgroundColor : "#336699",
	borderRadius : 10,
	width : 300,
	height : 2e3,
	top : 10
});
scrollView.add(view);
var button = Titanium.UI.createButton({
	title : "Scroll to Top",
	height : 40,
	width : 200,
	bottom : 10
});
view.add(button);
button.addEventListener("click", function() {
	scrollView.scrollTo(0, 0);
});
var button2 = Titanium.UI.createButton({
	title : "Add to Scroll View",
	height : 40,
	width : 200,
	top : 20
});
scrollView.add(button2);
button2.addEventListener("click", function() {
	var view = Ti.UI.createView({
		backgroundColor : "red",
		borderRadius : 10,
		width : 300,
		height : 300,
		top : 2020
	});
	scrollView.add(view);
});
win.add(scrollView);

var $ = this;
var exports = {};
$.__views.__alloyId4 = Ti.UI.createWindow({
	backgroundColor : "#262626",
	barImage : "images/background_title.png",
	id : "__alloyId4"
});
$.__views.btnQuit = Ti.UI.createLabel({
	tintColor : "white",
	color : "#FFF",
	id : "btnQuit",
	text : "Info"
});
$.__views.__alloyId4.titleControl = $.__views.btnQuit;
$.__views.btnQuit = Ti.UI.createLabel({
	tintColor : "white",
	color : "#FFF",
	id : "btnQuit",
	text : "Fermer"
});
$.__views.__alloyId4.rightNavButton = $.__views.btnQuit;
$.__views.__alloyId7 = Ti.UI.createScrollView({
	backgroundColor : "#262626",
	layout : "vertical",
	showVerticalScrollIndicator : "true",
	id : "__alloyId7"
});
$.__views.__alloyId4.add($.__views.__alloyId7);
$.__views.title = Ti.UI.createLabel({
	tintColor : "#FFF",
	width : "90%",
	color : "#FFF",
	textAlign : "center",
	top : 10,
	text : "Bienvenue sur notre application !",
	id : "title"
});
$.title.text = "Bienvenue sur notre application !";

$.__views.__alloyId7.add($.__views.title);
$.__views.description = Ti.UI.createLabel({
	tintColor : "#FFF",
	width : "90%",
	color : "#FFF",
	top : 30,
	text : "Cette application a été créée par des fans de Muse pour des fans de Muse. L'application fan-club Muse France n'est en aucun cas l'application officielle du groupe Muse. Pour aller sur le site de Muse, rendez-vous sur l'adresse suivante : http://Muse.mu",
	id : "description"
});
$.description.text = "Cette application a été créée par des fans de Muse pour des fans de Muse. L'application fan-club Muse France n'est en aucun cas l'application officielle du groupe Muse. \n\nVous pouvez nous rejoindre en cliquant sur les boutons ci-dessous :";
 $.__views.__alloyId7.add($.__views.description);
$.description.top = 30;
$.__views.btnFacebook = Ti.UI.createButton({
	top : 10,
	color : "#FFF",
	width : "90%",
	backgroundColor : "#4463a3",
	borderColor : "#4463a3",
	borderRadius : 7,
	id : "btnFacebook",
	icon : "fa-facebook-square",
	height : "45",
	title : "Sur Facebook"
});
$.__views.__alloyId7.add($.__views.btnFacebook);
$.__views.btnTwitter = Ti.UI.createButton({
	top : 10,
	color : "#FFF",
	width : "90%",
	backgroundColor : "#449ecd",
	borderColor : "#449ecd",
	borderRadius : 7,
	id : "btnTwitter",
	icon : "fa-twitter-square",
	height : "45",
	title : "Sur Twitter"
});
$.__views.__alloyId7.add($.__views.btnTwitter);
$.__views.btnContactUS = Ti.UI.createButton({
	top : 10,
	color : "#FFF",
	width : "90%",
	backgroundColor : "#67b45f",
	borderColor : "#67b45f",
	borderRadius : 7,
	id : "btnContactUS",
	icon : "fa-envelope-o",
	height : "45",
	title : "Contactez-nous"
});
$.__views.__alloyId7.add($.__views.btnContactUS);
$.__views.btnOurWebsite = Ti.UI.createButton({
	top : 10,
	color : "#FFF",
	width : "90%",
	backgroundColor : "#656a6d",
	borderColor : "#656a6d",
	borderRadius : 7,
	id : "btnOurWebsite",
	icon : "fa-globe",
	height : "45",
	title : "Notre Site"
});
$.__views.__alloyId7.add($.__views.btnOurWebsite);
$.__views.fa = Alloy.createWidget("com.mattmcfarland.fontawesome", "widget", {
	id : "fa",
	__parentSymbol : $.__views.__alloyId4
});
$.__views.fa.setParent($.__views.__alloyId4);
$.__views.info = Ti.UI.iOS.createNavigationWindow({
	window : $.__views.__alloyId4,
	id : "info"
});
$.__views.info && $.addTopLevelView($.__views.info);

$.btnFacebook.addEventListener("click", function() {
	var url = "fb://profile/126172270739";
	var bigURL = "http://www.facebook.com/musefrance";
	isIOS && Titanium.Platform.canOpenURL(url) ? Ti.Platform.openURL(url) : isIOS ? Titanium.Platform.openURL(bigURL) : !isIOS && Ti.Platform.openURL(url) ? Ti.Platform.openURL(url) : Titanium.Platform.openURL(bigURL);
});
$.btnTwitter.addEventListener("click", function() {
	var url = "twitter://user?screen_name=MuseActuFrance";
	var bigURL = "http://www.Twitter.com/MuseActuFrance";
	isIOS && Titanium.Platform.canOpenURL(url) ? Ti.Platform.openURL(url) : isIOS ? Titanium.Platform.openURL(bigURL) : !isIOS && Ti.Platform.openURL(url) ? Ti.Platform.openURL(url) : Titanium.Platform.openURL(bigURL);
});
$.btnContactUS.addEventListener("click", function() {
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Application Muse France";
	emailDialog.toRecipients = ["contact@muse-france.fr"];
	emailDialog.open();
});
$.btnOurWebsite.addEventListener("click", function() {
	Ti.Platform.openURL("http://Muse-France.fr");
});
$.btnQuit.addEventListener("click", function() {
	$.info.close();
});
