function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.caffeinalab.titanium.sharer/" + s : s.substring(0, index) + "/com.caffeinalab.titanium.sharer/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.001,
    key: "sharer_Win",
    style: {
        navBarHidden: true,
        backgroundColor: "#C000"
    }
}, {
    isClass: true,
    priority: 10000.0011,
    key: "sharer_Title",
    style: {
        top: 40,
        textid: "Share",
        textAlign: "center",
        color: "#fff",
        font: {
            fontSize: 20
        }
    }
}, {
    isClass: true,
    priority: 10000.0012,
    key: "sharer_Hr",
    style: {
        top: 80,
        height: 1,
        left: 30,
        right: 30,
        backgroundColor: "#9FFF"
    }
}, {
    isClass: true,
    priority: 10000.0013,
    key: "sharer_Cont",
    style: {
        top: 80,
        bottom: 100,
        scrollable: true,
        backgroundColor: "transparent",
        separatorColor: "transparent"
    }
}, {
    isClass: true,
    priority: 10000.0014,
    key: "sharer_Close",
    style: {
        color: "#fff",
        backgroundColor: "transparent",
        bottom: 30,
        image: WPATH("/images/close.png"),
        font: {
            fontSize: 30
        }
    }
} ];