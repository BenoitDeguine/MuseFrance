function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.caffeinalab.titanium.sharer/" + s : s.substring(0, index) + "/com.caffeinalab.titanium.sharer/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0009,
    key: "sharer_Button",
    style: {
        backgroundColor: "transparent",
        width: Ti.UI.FILL,
        height: 42,
        borderRadius: 2,
        left: 30,
        right: 30,
        top: 10,
        font: {
            fontSize: 16
        }
    }
} ];