var Admob = require('ti.admob');

var args = arguments[0] || {};
var idNews = args;
var xhr = Ti.Network.createHTTPClient();
var win1 = {};

function nl2br(str, is_xhtml) {
	var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>';
	return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function share(myObject) {
	xhr.onload = function(e) {
	};
	xhr.open('POST', URL_APPLI + "appli/share/index");
	xhr.send(myObject);
}

$.menuButton.addEventListener('click', function() {
	$.news.close();
});

function getNews(id) {
	type = typeof type !== 'undefined' ? type : 'new';

	xhr = Ti.Network.createHTTPClient();
	var myData = {};
	var blogPost = {
		id : idNews,
		os : mobile_info.os,
		mobile : mobile_info.ip
	};

	xhr.onload = function() {
		var infoNews = JSON.parse(this.responseText);
		// tracker analytics
		/*tracker.trackScreen({
			screenName : infoNews.title
		});*/

		//$.imageLike.text = infoNews.countLikes;
		//$.imageNews.image = infoNews.image;
		//$.imageNews.width = "90%";
		//$.titleNews.text = infoNews.title;
		//$.titleNews.tintColor = "white";
		if (infoNews.image['retina'] == true) {
			var img = infoNews.image['url'] + "@2x." + infoNews.image['extension'];
		} else {
			var img = infoNews.image['url'] + "." + infoNews.image['extension'];
		}


		infoNews.content = infoNews.content.replace(/<a /gi, '<a onClick="Ti.App.fireEvent( \'webViewClick\', { URL: this.href } ); return false;" ');
		infoNews.content = infoNews.content.replace('src="//', 'src="http://');
		infoNews.content = infoNews.content.replace('src="//platform.twitter.com/widgets.js', 'src="http://platform.twitter.com/widgets.js');

		var html = '<!DOCTYPE html><html lang="fr"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><style>html, body {height:100%;max-width:100%;}iframe {max-width:100%} .contenu img{width:100%;height:auto;max-width:100%;}a:link{color:#6A819E;text-decoration:none;}a:visited{color:#6A819E;text-decoration:none;}a:hover{color:#6A819E;text-decoration:none;}a:active{color:#6A819E;text-decoration:none;}</style></head><body>';
		html = html + '<h1 style="font-size : 18px;color:#FFF;text-align:center;">' + infoNews.title + '</h1><div style="width:100%;margin-bottom:15px;line-height:15px">';
		html = html + '<img style="display:block;margin-left:auto;margin-right:auto;" src="' + img + '"  width="90%" /></div>';
		html = html + '<div class="contenu" style="color:#FFF; font-size:15px">' + nl2br(infoNews.content, undefined) + "</div></body></html>";
		$.contenu.html = html;

		var comment_img = Titanium.UI.createImageView({
			left : 0,
			height : 12,
			width : 12,
			image : 'images/comment.png'
		});
		/*
		var comment_lbl = Titanium.UI.createLabel({
		text : infoNews.countComment,
		textAlign : 'left',
		color : "#6A819E",
		left : 10,
		font : {
		fontSize : 12,
		fontStyle : "italic"
		}
		});
		var comment_view = Titanium.UI.createView({
		width : 'auto',
		});
		comment_view.add(comment_img);
		comment_view.add(comment_lbl);
		var cancel = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.CANCEL
		});

		flexSpace = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});

		var toolbar = Titanium.UI.iOS.createToolbar({
		items : [comment_view, cancel],
		bottom : 0,
		borderTop : true,
		borderBottom : false,
		backgroundImage : "images/background_title.png"

		});
		*/
		//$.news.add(toolbar);

		$.imageShare.addEventListener('click', function() {
			var timoduleshare = require('ma.car.ti.module.share');
			timoduleshare.share({
				text : infoNews.title + '\n' + infoNews.link,
				facebook : infoNews.title + '\n' + infoNews.link,
				twitter : infoNews.title + '\n' + infoNews.link,

				callback : function(res) {
					if (res.state === "SUCCESS") {
						share({
							type : res.platform,
							id : infoNews.id,
							username : mobile_info.username,
							ip : mobile_info.ip,
							version : mobile_info.version
						});

						alert('Merci d\'avoir partagé notre article !');
					}
				}
			});
		});

	};
	xhr.open("POST", URL_APPLI + "actu/getNews", true);
	xhr.send(blogPost);
}

getNews(idNews);

var webview = Titanium.UI.createWebView({
	backgroundColor : "black"
});

var win3 = Titanium.UI.createWindow({
	backgroundColor : 'blue',
	translucent : true,
	navGroup : true,
	tintColor : "white",
	statusBarStyle : Ti.UI.iPhone.StatusBar.LIGHT_CONTENT,
	barImage : "images/background_title.png"
	//extendEdges : [Ti.UI.EXTEND_EDGE_TOP],
});

// begin ads
var ad = Admob.createView({
	bottom : 0,
	left : 0,
	width : 320,
	height : 50,
	adBackgroundColor : 'pink',
	adUnitId : "ca-app-pub-4366233206286319/8369007641",
	testDevices : ["bacfcf6f44551061b437b4b7e63e85e4"]
});
var showAd = false;
win3.add(ad);
ad.hide();


ad.addEventListener('didReceiveAd', function() {
	showAd == true;
	ad.show();
	win3.bottom = 50;
});
ad.addEventListener('didFailToReceiveAd', function() {
	showAd == false;
	win3.bottom = 0;
});
ad.addEventListener('willPresentScreen', function() {
	alert('Presenting screen!');
});
ad.addEventListener('willDismissScreen', function() {
	alert('Dismissing screen!');
});
ad.addEventListener('didDismissScreen', function() {
	alert('Dismissed screen!');
});
ad.addEventListener('willLeaveApplication', function() {
	alert('Leaving the app!');
});


// Lorsque l'on clique sur un lien dans la webview on ouvre un navigateur
Ti.App.addEventListener('webViewClick', function(e) {
	win1 = Titanium.UI.iOS.createNavigationWindow({
		window : $.news
	});
	webview.setUrl(e.URL);
	win3.add(webview);

	$.news.openWindow(win3, {
		animated : true
	});
});

webview.addEventListener("load", function(e) {
	win3.title = webview.evalJS("document.title");
});
