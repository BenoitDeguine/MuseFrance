function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadNews(offset, number, type) {
        type = "undefined" != typeof type ? type : "new";
        var xhr = Ti.Network.createHTTPClient({
            timeout: 5e3
        });
        var blogPost = {
            offset: offset,
            number: number,
            os: mobile_info.name,
            mobile: mobile_info.ip
        };
        console.log(blogPost);
        if (isNotTheEndOfArticle) {
            xhr.ontimeout = function() {
                console.error("The request for " + URL_APPLI + "actu/get timed out.");
            };
            xhr.onload = function() {
                var jsonResult = JSON.parse(this.responseText);
                console.log(JSON.stringify(jsonResult));
                console.log(JSON.stringify(Admob));
                var actu = jsonResult.actu;
                var adsID = jsonResult.ads;
                "" != adsID && Ti.App.Properties.setString("adsense", adsID);
                if (true === jsonResult.status) {
                    var rowData = [];
                    for (i in actu) {
                        var title_news = actu[i].title;
                        if (title_news.length > NB_CARACT + 3) {
                            var myString = actu[i].title;
                            var fullTitle = myString.substring(0, NB_CARACT - 3) + "...";
                        } else var fullTitle = title_news;
                        if (0 !== actu[i].nbre) {
                            var avatar = actu[i].img.link + actu[i].img.size + "." + actu[i].img.extension;
                            var date = actu[i].post_date;
                            var row = Titanium.UI.createTableViewRow({
                                top: 5,
                                backgroundColor: BACKGROUND_TABLEVIEW,
                                selectedBackgroundColor: "transparent"
                            });
                            var post_view = Titanium.UI.createView({
                                height: 150,
                                layout: "vertical",
                                backgroundColor: BACKGOUND_VIEW,
                                borderRadius: 3,
                                right: 5,
                                left: 5,
                                height: 76,
                                shadow: {
                                    shadowRadius: 3,
                                    shadowOpacity: 1,
                                    shadowOffset: {
                                        x: 20,
                                        y: 20
                                    },
                                    shadowColor: BACKGROUND_VIEW_SHADOW
                                }
                            });
                            var av_image = Titanium.UI.createImageView({
                                top: 3,
                                bottom: 3,
                                borderRadius: 2,
                                left: 3,
                                right: 3,
                                height: 70,
                                width: 93,
                                image: avatar
                            });
                            post_view.add(av_image);
                            var news_lbl = Titanium.UI.createLabel({
                                text: fullTitle,
                                left: 103,
                                top: -75,
                                color: "#999",
                                bottom: 2,
                                right: 5,
                                height: 50,
                                font: {
                                    fontFamily: FONT,
                                    fontSize: 13
                                }
                            });
                            post_view.add(news_lbl);
                            var viewDate = Titanium.UI.createView({
                                width: "auto",
                                height: 15,
                                left: 100,
                                top: 0
                            });
                            post_view.add(viewDate);
                            var img_date = Titanium.UI.createImageView({
                                left: 3,
                                height: 12,
                                width: 12,
                                image: "images/clock.png"
                            });
                            viewDate.add(img_date);
                            var date_lbl = Titanium.UI.createLabel({
                                left: 18,
                                text: beautifulDate(date, today, yesterday),
                                textAlign: "left",
                                color: "#6A819E",
                                font: {
                                    fontSize: 12,
                                    fontStyle: "italic"
                                }
                            });
                            viewDate.add(date_lbl);
                            row.add(post_view);
                            row.className = "item" + i;
                            row.id = actu[i].id;
                            rowData[i] = row;
                        }
                    }
                    if ("update" === type) $.table_actu.appendRow(rowData); else {
                        $.table_actu.setData(rowData);
                        newValue = 0;
                    }
                    isNotTheEndOfArticle = jsonResult.nbre > 0 ? true : false;
                    if (showLoading) {
                        Alloy.Globals.loading.hide();
                        showLoading = false;
                    }
                    return jsonResult.status;
                }
                return false;
            };
            xhr.open("POST", URL_APPLI + "actu/get", true);
            xhr.send(blogPost);
            console.log("POST");
        }
    }
    function beginUpdate() {
        updating = true;
        setTimeout(endUpdate, 2e3);
    }
    function endUpdate() {
        updating = false;
        loadNews(newValue, 15, "update");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "actu";
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
    $.__views.__alloyId0 = Ti.UI.createWindow({
        backgroundColor: "#262626",
        barImage: "images/background_title.png",
        id: "__alloyId0"
    });
    $.__views.__alloyId2 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#FFF",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Actualité",
        id: "__alloyId2"
    });
    $.__views.__alloyId0.titleControl = $.__views.__alloyId2;
    $.__views.btnInfo = Ti.UI.createImageView({
        data: "",
        id: "btnInfo",
        image: "images/info.png",
        width: 25,
        height: 25
    });
    $.__views.__alloyId0.rightNavButton = $.__views.btnInfo;
    $.__views.table_actu = Ti.UI.createTableView({
        backgroundColor: "#333333",
        zIndex: 999,
        id: "table_actu",
        separatorColor: "transparent"
    });
    $.__views.__alloyId0.add($.__views.table_actu);
    $.__views.actu = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.__alloyId0,
        id: "actu"
    });
    $.__views.actu && $.addTopLevelView($.__views.actu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Admob = require("ti.admob");
    $.actu;
    var newValue = 0;
    var isNotTheEndOfArticle = true;
    var res = "";
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);
    $.actu.open({
        transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
    });
    $.table_actu.separatorColor = "transparent";
    $.table_actu.setHeaderTitle = "Hello";
    Alloy.Globals.loading.show("Chargement des news...", false);
    showLoading = true;
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
    $.actu.add(ad);
    ad.hide();
    console.log("fin adds");
    loadNews(0, 15);
    var control = Ti.UI.createRefreshControl({
        tintColor: "white"
    });
    $.table_actu.setRefreshControl(control);
    control.addEventListener("refreshstart", function() {
        newValue = 0;
        res = loadNews(newValue, 15);
        control.endRefreshing();
    });
    var updating = false;
    var lastDistance = 0;
    $.table_actu.addEventListener("scroll", function(e) {
        var offset = e.contentOffset.y;
        var height = e.size.height;
        var total = offset + height;
        var theEnd = e.contentSize.height;
        var distance = theEnd - total;
        if (lastDistance > distance) {
            var nearEnd = .9 * theEnd;
            if (!updating && total >= nearEnd) {
                if (!showLoading && isNotTheEndOfArticle) {
                    Alloy.Globals.loading.show("Chargement...", false);
                    showLoading = true;
                }
                beginUpdate();
                newValue += 15;
            }
        }
        lastDistance = distance;
    });
    $.table_actu.addEventListener("click", function(e) {
        var newWindow = Alloy.createController("news", e.rowData.id);
        newWindow.getView().open({
            animated: true
        });
    });
    $.btnInfo.addEventListener("click", function() {
        var newWindow = Alloy.createController("info");
        newWindow.getView().open();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;