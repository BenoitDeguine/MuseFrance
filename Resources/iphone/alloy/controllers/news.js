function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function nl2br(str, is_xhtml) {
        var breakTag = is_xhtml || "undefined" == typeof is_xhtml ? "<br />" : "<br>";
        return (str + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1" + breakTag + "$2");
    }
    function share(myObject) {
        xhr.onload = function() {
            console.log(JSON.parse(this.responseText));
        };
        xhr.open("POST", URL_APPLI + "appli/share/index");
        xhr.send(myObject);
    }
    function getNews() {
        type = "undefined" != typeof type ? type : "new";
        xhr = Ti.Network.createHTTPClient();
        var blogPost = {
            id: idNews,
            os: mobile_info.os,
            mobile: mobile_info.ip
        };
        xhr.onload = function() {
            var infoNews = JSON.parse(this.responseText);
            if (true == infoNews.image["retina"]) var img = infoNews.image["url"] + "@2x." + infoNews.image["extension"]; else var img = infoNews.image["url"] + "." + infoNews.image["extension"];
            console.log(img);
            infoNews.content = infoNews.content.replace(/<a /gi, "<a onClick=\"Ti.App.fireEvent( 'webViewClick', { URL: this.href } ); return false;\" ");
            infoNews.content = infoNews.content.replace('src="//', 'src="http://');
            infoNews.content = infoNews.content.replace('src="//platform.twitter.com/widgets.js', 'src="http://platform.twitter.com/widgets.js');
            console.log(infoNews.content);
            var html = '<!DOCTYPE html><html lang="fr"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><style>html, body {height:100%;max-width:100%;}iframe {max-width:100%} .contenu img{width:100%;height:auto;max-width:100%;}a:link{color:#6A819E;text-decoration:none;}a:visited{color:#6A819E;text-decoration:none;}a:hover{color:#6A819E;text-decoration:none;}a:active{color:#6A819E;text-decoration:none;}</style></head><body>';
            html = html + '<h1 style="font-size : 18px;color:#FFF;text-align:center;">' + infoNews.title + '</h1><div style="width:100%;margin-bottom:15px;line-height:15px">';
            html = html + '<img style="display:block;margin-left:auto;margin-right:auto;" src="' + img + '"  width="90%" /></div>';
            html = html + '<div class="contenu" style="color:#FFF; font-size:15px">' + nl2br(infoNews.content, void 0) + "</div></body></html>";
            $.contenu.html = html;
            Titanium.UI.createImageView({
                left: 0,
                height: 12,
                width: 12,
                image: "images/comment.png"
            });
            $.imageShare.addEventListener("click", function() {
                var timoduleshare = require("ma.car.ti.module.share");
                timoduleshare.share({
                    text: infoNews.title + "\n" + infoNews.link,
                    facebook: infoNews.title + "\n" + infoNews.link,
                    twitter: infoNews.title + "\n" + infoNews.link,
                    callback: function(res) {
                        if ("SUCCESS" === res.state) {
                            share({
                                type: res.platform,
                                id: infoNews.id,
                                username: mobile_info.username,
                                ip: mobile_info.ip,
                                version: mobile_info.version
                            });
                            alert("Merci d'avoir partagé notre article !");
                        }
                    }
                });
            });
        };
        xhr.open("POST", URL_APPLI + "actu/getNews", true);
        xhr.send(blogPost);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "news";
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
    $.__views.__alloyId9 = Ti.UI.createWindow({
        backgroundColor: "#262626",
        barImage: "images/background_title.png",
        tintColor: "white",
        id: "__alloyId9"
    });
    $.__views.__alloyId10 = Ti.UI.createLabel({
        color: "#FFF",
        text: "News",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.titleControl = $.__views.__alloyId10;
    $.__views.menuButton = Ti.UI.createLabel({
        tintColor: "#FFF",
        id: "menuButton",
        text: "< Retour",
        color: "#FFF"
    });
    $.__views.__alloyId9.leftNavButton = $.__views.menuButton;
    $.__views.imageShare = Ti.UI.createImageView({
        image: "images/share.png",
        id: "imageShare",
        width: 30,
        height: 30
    });
    $.__views.__alloyId9.rightNavButton = $.__views.imageShare;
    $.__views.__alloyId13 = Ti.UI.createScrollView({
        backgroundColor: "#262626",
        layout: "vertical",
        showVerticalScrollIndicator: true,
        contentWidth: "100%",
        showHorizontalScrollIndicator: false,
        id: "__alloyId13"
    });
    $.__views.__alloyId9.add($.__views.__alloyId13);
    $.__views.contenu = Ti.UI.createWebView({
        id: "contenu",
        height: "100%",
        html: "",
        disableBounce: false,
        backgroundColor: "transparent"
    });
    $.__views.__alloyId13.add($.__views.contenu);
    $.__views.news = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.__alloyId9,
        id: "news"
    });
    $.__views.news && $.addTopLevelView($.__views.news);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Admob = require("ti.admob");
    var args = arguments[0] || {};
    var idNews = args;
    var xhr = Ti.Network.createHTTPClient();
    var win1 = {};
    $.menuButton.addEventListener("click", function() {
        $.news.close();
    });
    getNews(idNews);
    var webview = Titanium.UI.createWebView({
        backgroundColor: "black"
    });
    var win3 = Titanium.UI.createWindow({
        backgroundColor: "blue",
        translucent: true,
        navGroup: true,
        tintColor: "white",
        statusBarStyle: Ti.UI.iPhone.StatusBar.LIGHT_CONTENT,
        barImage: "images/background_title.png"
    });
    console.log("adds");
    var ad = Admob.createView({
        bottom: 0,
        left: 0,
        width: 320,
        height: 50,
        adBackgroundColor: "pink",
        adUnitId: "ca-app-pub-4366233206286319/8369007641",
        testDevices: [ "bacfcf6f44551061b437b4b7e63e85e4" ]
    });
    win3.add(ad);
    ad.hide();
    console.log("fin adds");
    Ti.App.addEventListener("webViewClick", function(e) {
        win1 = Titanium.UI.iOS.createNavigationWindow({
            window: $.news
        });
        webview.setUrl(e.URL);
        win3.add(webview);
        $.news.openWindow(win3, {
            animated: true
        });
    });
    webview.addEventListener("load", function() {
        win3.title = webview.evalJS("document.title");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;