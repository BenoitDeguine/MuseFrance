var Admob = require('ti.admob');

var win = $.actu;
var isIos = (osname === 'iphone' || osname === 'ipad');
var newValue = 0;
var isNotTheEndOfArticle = true;
var res = '';

var today = new Date();
today.setHours(0, 0, 0, 0);

var yesterday = new Date();
yesterday.setHours(0, 0, 0, 0);
yesterday.setDate(yesterday.getDate() - 1);

/*tracker.trackScreen({
	screenName : "Accueil"
});
*/
// end ads
$.actu.open({
	transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});

$.table_actu.separatorColor = 'transparent';
$.table_actu.setHeaderTitle = 'Hello';

Alloy.Globals.loading.show('Chargement des news...', false);
showLoading = true;

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
$.actu.add(ad);
ad.hide();

ad.addEventListener('didReceiveAd', function() {
	showAd == true;
	ad.show();
	$.table_actu.bottom = 50;
});
ad.addEventListener('didFailToReceiveAd', function() {
	showAd == false;
	$.table_actu.bottom = 0;
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

function loadNews(offset, number, type) {
	type = typeof type !== 'undefined' ? type : 'new';

	var xhr = Ti.Network.createHTTPClient({
		timeout : 5000
	});
	var myData = {};
	var blogPost = {
		offset : offset,
		number : number,
		os : mobile_info.name,
		mobile : mobile_info.ip
	};
	
	if (isNotTheEndOfArticle) {
		xhr.ontimeout = function() {
			console.error("The request for " + URL_APPLI + "actu/get" + " timed out.");
		};
		xhr.onload = function() {
			var jsonResult = JSON.parse(this.responseText);

			var actu = jsonResult.actu;
			var adsID = jsonResult.ads;

			if (adsID != "") {
				Ti.App.Properties.setString('adsense', adsID);
			}

			if (jsonResult.status === true) {
				var rowData = [];
				for (i in actu) {
					var title_news = actu[i].title;
					if (title_news.length > (NB_CARACT + 3)) {
						var myString = actu[i].title;
						var fullTitle = myString.substring(0, NB_CARACT - 3) + '...';
					} else {
						var fullTitle = title_news;
					}

					if (actu[i].nbre !== 0) {
						var avatar = actu[i].img.link + actu[i].img.size + "." + actu[i].img.extension;
						var date = actu[i].post_date;

						var row = Titanium.UI.createTableViewRow({
							top : 5,
							backgroundColor : BACKGROUND_TABLEVIEW,
							selectedBackgroundColor : 'transparent'
						});

						var post_view = Titanium.UI.createView({
							height : 150,
							layout : 'vertical',
							backgroundColor : BACKGOUND_VIEW,
							borderRadius : 3,
							right : 5,
							left : 5,
							height : 76,
							shadow : {
								shadowRadius : 3,
								shadowOpacity : 1,
								shadowOffset : {
									x : 20,
									y : 20
								},
								shadowColor : BACKGROUND_VIEW_SHADOW
							}
						});

						var av_image = Titanium.UI.createImageView({
							top : 3,
							bottom : 3,
							borderRadius : 2,
							left : 3,
							right : 3,
							height : 70,
							width : 93,
							image : avatar
						});
						post_view.add(av_image);

						var news_lbl = Titanium.UI.createLabel({
							text : fullTitle,
							left : 103,
							top : -75,
							color : "#999",
							bottom : 2,
							right : 5,
							height : 50,
							font : {
								fontFamily : FONT,
								fontSize : 13
							}
						});
						post_view.add(news_lbl);

						var viewDate = Titanium.UI.createView({
							width : 'auto',
							height : 15,
							left : 100,
							top : 0
						});
						post_view.add(viewDate);

						var img_date = Titanium.UI.createImageView({
							left : 3,
							height : 12,
							width : 12,
							image : 'images/clock.png'
						});
						viewDate.add(img_date);

						var date_lbl = Titanium.UI.createLabel({
							left : 18,
							text : beautifulDate(date, today, yesterday),
							textAlign : 'left',
							color : "#6A819E",
							font : {
								fontSize : 12,
								fontStyle : "italic"
							}
						});
						viewDate.add(date_lbl);
						/*
						 var viewLikeComment = Titanium.UI.createView({
						 width : 'auto',
						 height : 15,
						 top : 5,
						 left : 100
						 });
						 var viewLike = Titanium.UI.createView({
						 width : '50%',
						 height : 15,
						 left : 0
						 });
						 var img_likes = Titanium.UI.createImageView({
						 left : 0,
						 height : 12,
						 width : 12,
						 image : 'images/heart.png'
						 });
						 var lbl_likes = Titanium.UI.createLabel({
						 left : 18,
						 text : actu[i].countLikes,
						 textAlign : 'left',
						 color : "#6A819E",
						 font : {
						 fontSize : 12,
						 fontStyle : "italic"
						 }
						 });
						 viewLike.add(img_likes);
						 viewLike.add(lbl_likes);
						 //viewLikeComment.add(viewLike);

						 var viewComment = Titanium.UI.createView({
						 width : '50%',
						 height : 15,
						 right : 0
						 });
						 var img_comment = Titanium.UI.createImageView({
						 left : 0,
						 height : 12,
						 width : 12,
						 image : 'images/comment.png'
						 });
						 var lbl_comment = Titanium.UI.createLabel({
						 left : 18,
						 text : actu[i].countComment,
						 textAlign : 'left',
						 color : "#6A819E",
						 font : {
						 fontSize : 12,
						 fontStyle : "italic"
						 }
						 });
						 viewComment.add(img_comment);
						 viewComment.add(lbl_comment);
						 //viewLikeComment.add(viewComment);
						 post_view.add(viewLikeComment);*/

						row.add(post_view);
						row.className = "item" + i;
						row.id = actu[i].id;
						rowData[i] = row;
					}
				}

				if (type === 'update') {
					$.table_actu.appendRow(rowData);
				} else {
					$.table_actu.setData(rowData);
					newValue = 0;
				}

				if (jsonResult.nbre > 0) {
					isNotTheEndOfArticle = true;
				} else {
					isNotTheEndOfArticle = false;
				}
				if (showLoading) {
					Alloy.Globals.loading.hide();
					showLoading = false;
				}
				return jsonResult.status;

			} else {
				return false;
			}

		};
		xhr.open("POST", URL_APPLI + "actu/get", true);
		xhr.send(blogPost);
	}

}

loadNews(0, 15);

var control = Ti.UI.createRefreshControl({
	tintColor : 'white'
});

$.table_actu.setRefreshControl(control);

control.addEventListener('refreshstart', function(e) {
	newValue = 0;
	res = loadNews(newValue, 15);
	control.endRefreshing();
});
var updating = false;

function beginUpdate() {
	updating = true;
	setTimeout(endUpdate, 2000);
}

function endUpdate() {
	updating = false;
	loadNews(newValue, 15, 'update');
}

var lastDistance = 0;
$.table_actu.addEventListener('scroll', function(e) {
	var offset = e.contentOffset.y;
	var height = e.size.height;
	var total = offset + height;
	var theEnd = e.contentSize.height;
	var distance = theEnd - total;

	if (distance < lastDistance) {
		var nearEnd = theEnd * .90;

		if (!updating && (total >= nearEnd)) {
			if (!showLoading && isNotTheEndOfArticle) {
				Alloy.Globals.loading.show('Chargement...', false);
				showLoading = true;
			}
			beginUpdate();
			newValue = newValue + 15;
		}
	}
	lastDistance = distance;
});

$.table_actu.addEventListener('click', function(e) {
	var newWindow = Alloy.createController('news', e.rowData.id);
	newWindow.getView().open({
		animated : true
	});

});

$.btnInfo.addEventListener('click', function(e) {
	var newWindow = Alloy.createController('info');
	newWindow.getView().open();
});

