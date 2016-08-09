var MASlidingView;

MASlidingView = Ti.Android ? function(args) {
    var Draggable = require("ti.draggable");
    args.minLeft = args.minLeft || 0;
    args.maxLeft = args.maxLeft || .8 * Ti.Platform.displayCaps.platformWidth;
    args.axis = args.axis || "x";
    var self = new Draggable.createView(args);
    return self;
} : function(args) {
    return Ti.UI.createView(args);
};

module.exports = MASlidingView;