var MASlidingMenu = function(args) {
    var self = Ti.UI.createWindow({
        exitOnClose: false
    });
    var view, ledge, threshold, left = args.left, views = [], events = {}, draggable = args.draggable || true, half = {
        width: void 0,
        height: void 0
    }, duration = {
        slide: 200,
        swipe: 150,
        bounce: 100,
        change_out: 120,
        change_in: 300
    }, shadow = {
        shadowRadius: 2,
        shadowOpacity: .6,
        shadowOffset: {
            x: 4,
            y: 0
        },
        shadowColor: "black"
    }, current = "view", sliding = {
        center: 0,
        offset: 0
    };
    var twoD = Ti.UI.create2DMatrix();
    self.addEventListener("postlayout", function() {
        half = {
            width: self.rect.width / 2,
            height: self.rect.height / 2
        };
    });
    var open = function() {
        if (void 0 === left || -1 === left.toString().indexOf("TableView")) throw "'left' property must be a Titanium Table view proxy... was:" + left.toString();
        self.add(left);
        for (var i = 0; i < left.data.length; i++) for (var j = 0; j < left.data[i].rowCount; j++) {
            var row = left.data[i].rows[j];
            if (void 0 !== row.navView) {
                var View;
                if (-1 !== row.navView.toString().indexOf("Window")) throw "ViewSlider can only accept UI Views as the table row view property for now";
                View = row.navView;
                View.width = Ti.Platform.displayCaps.platformWidth;
                View.height = Ti.UI.FILL;
                views.push(View);
                view || (view = views[views.length - 1]);
                self.add(View);
                views.length > 1 && (View.visible = false);
            } else views.push(false);
        }
        ledge = .8 * view.width, threshold = .2 * view.width, half = {
            width: view.width / 2,
            height: view.size.height / 2
        };
        left.zIndex = 1;
        view.zIndex = 2;
        draggable && addEvents();
        left.addEventListener("click", function(e) {
            var newView;
            if (views[e.index]) {
                newView = views[e.index];
                changeView(newView);
                fireEvent("switch", {
                    view: newView,
                    index: views.indexOf(newView),
                    menuRow: e.rowData
                });
            } else {
                newView = view;
                fireEvent("buttonclick", {
                    index: e.index,
                    rowData: e.rowData,
                    source: e.source
                });
                changeView(view);
            }
        });
        addEventListener("open", function() {
            slideView("left");
        });
        addEventListener("close", function() {
            slideView("view");
        });
        addEventListener("toggle", function() {
            slideView("view" === current ? "left" : "view");
        });
        self.open();
    };
    var addEventListener = function(name, callback) {
        "array" != typeof events[name] && (events[name] = []);
        events[name].push(callback);
    };
    var fireEvent = function(name, args) {
        args.event = name;
        for (var callback in events[name]) events[name][callback](args);
    };
    var onCurrentChanged = function() {
        shadow.shadowOffset.x = -4;
        left.zIndex = -1;
    };
    var slideView = function(position) {
        var delta_xs;
        delta_xs = {
            left: ledge,
            view: 0
        };
        view.animate(Ti.Android ? {
            left: delta_xs[position],
            duration: duration.slide
        } : {
            center: {
                x: delta_xs[position] + half.width,
                y: half.height
            },
            duration: duration.slide
        });
        current = position;
        onCurrentChanged();
    };
    var viewTouchstart = function(e) {
        Ti.API.info("touchstart: " + JSON.stringify(e));
        Ti.API.info("starting");
        sliding.offset = e.x - half.width;
        sliding.center = view.rect.x + half.width;
    };
    var viewTouchmove = function(e) {
        Ti.API.info("touchmove: " + JSON.stringify(e));
        var delta_x;
        delta_x = e.x - sliding.offset + view.rect.x;
        delta_x -= half.width;
        touchStarted = false;
        delta_x > 30 && (touchStarted = true);
        if (touchStarted) {
            fireEvent("sliding", {
                distance: delta_x
            });
            if (delta_x > 0 && !left) return;
            if (Math.abs(delta_x) > ledge) return;
            if (delta_x > 0 && "left" !== current) {
                current = "left";
                onCurrentChanged();
            } else if (0 === delta_x && "view" !== current) {
                current = "view";
                onCurrentChanged();
            }
            view.animate({
                transform: twoD.translate(delta_x, 0),
                duration: 0
            });
        }
    };
    var viewTouchend = function(e) {
        Ti.API.info("touchend: " + JSON.stringify(e));
        var delta_x;
        delta_x = e.x - sliding.offset + view.rect.x;
        delta_x -= half.width;
        if (delta_x > 0 && !left) return;
        if (Math.abs(delta_x) > ledge) return;
        if (sliding.center - half.width === 0 && delta_x > threshold) {
            Ti.API.info("1");
            if (delta_x > 0) {
                delta_x = ledge;
                current = "left";
            } else {
                delta_x = 0;
                current = "view";
            }
            view.animate({
                transform: twoD.translate(260, 0),
                duration: duration.bounce
            });
        } else {
            delta_x = sliding.center - half.width;
            0 === delta_x ? current = "view" : delta_x > 0 && (current = "left");
            view.animate({
                transform: twoD.translate(0, 0),
                duration: duration.swipe
            });
        }
        onCurrentChanged();
    };
    var viewAndroidend = function(e) {
        Ti.API.info("androidend: " + JSON.stringify(e));
        if (e.left === e.minLeft || e.left === e.maxLeft) {
            current = e.left === e.maxLeft ? "left" : "view";
            return;
        }
        if (e.left >= threshold) {
            current = "left";
            view.animate({
                left: e.source.maxLeft,
                duration: duration.swipe
            });
        } else {
            current = "view";
            view.animate({
                left: 0,
                duration: duration.swipe
            });
        }
        onCurrentChanged();
    };
    var addEvents = function() {
        if ("[object TiUIiPhoneNavigationGroup]" === view.toString()) {
            view.window.addEventListener("touchstart", viewTouchstart);
            view.window.addEventListener("touchmove", viewTouchmove);
            view.window.addEventListener("touchend", viewTouchend);
            view.window.addEventListener("touchcancel", viewTouchend);
        } else if (Ti.Android) view.addEventListener("end", viewAndroidend); else {
            view.addEventListener("touchstart", viewTouchstart);
            view.addEventListener("touchmove", viewTouchmove);
            view.addEventListener("touchend", viewTouchend);
            view.addEventListener("touchcancel", viewTouchend);
        }
    };
    var removeEvents = function() {
        if ("[object TiUIiPhoneNavigationGroup]" === view.toString()) {
            view.window.removeEventListener("touchstart", viewTouchstart);
            view.window.removeEventListener("touchmove", viewTouchmove);
            view.window.removeEventListener("touchend", viewTouchend);
        } else if (Ti.Android) view.removeEventListener("end", viewAndroidend); else {
            view.removeEventListener("touchstart", viewTouchstart);
            view.removeEventListener("touchmove", viewTouchmove);
            view.removeEventListener("touchend", viewTouchend);
        }
    };
    var changeView = function(newView) {
        if (Ti.Android) if (view !== newView) {
            newView.hide();
            newView.left = Ti.Platform.displayCaps.platformWidth;
            newView.width = Ti.Platform.displayCaps.platformWidth;
            newView.height = Ti.UI.FILL;
            view.animate({
                left: Ti.Platform.displayCaps.platformWidth,
                duration: duration.change_out
            }, function() {
                draggable && removeEvents();
                view.hide();
                view = newView;
                current = "view";
                view.show();
                draggable && addEvents();
                view.animate({
                    left: 0,
                    duration: duration.change_in
                });
            });
        } else slideView("view"); else if (view !== newView) {
            newView.center = {
                x: half.width,
                y: half.height
            };
            newView.hide();
            newView.animate({
                transform: twoD.translate(Ti.Platform.displayCaps.platformWidth, 0),
                duration: .1
            });
            newView.width = Ti.Platform.displayCaps.platformWidth;
            newView.height = Ti.UI.FILL;
            view.animate({
                transform: twoD.translate(view.rect.x + (Ti.Platform.displayCaps.platformWidth - view.rect.x), 0),
                duration: duration.change_out
            }, function() {
                draggable && removeEvents();
                view.hide();
                view = newView;
                current = "view";
                view.show();
                draggable && addEvents();
                view.animate({
                    transform: twoD.translate(0, 0),
                    duration: duration.change_in
                });
            });
        } else slideView("view");
    };
    this.draggable = draggable;
    this.slideView = slideView;
    this.addEventListener = addEventListener;
    this.fireEvent = fireEvent;
    this.open = open;
    this.destroy = function() {
        self.close();
    };
    this.activeView = function() {
        return view;
    };
};

module.exports = MASlidingMenu;