function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.mattmcfarland.fontawesome/" + s : s.substring(0, index) + "/com.mattmcfarland.fontawesome/" + s.substring(index + 1);
    return path;
}

module.exports = [];