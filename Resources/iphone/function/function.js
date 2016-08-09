function beautifulDate(MMDD, today, yesterday) {
    var arr = MMDD.split(/[- :T]/), MMDD = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], 0);
    MMDD = MMDD.toString("MMMM");
    MMDD = new Date(MMDD);
    var months = [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ];
    var strDate = "";
    MMDD.getDate();
    var hours = MMDD.getHours();
    var minutes = MMDD.getMinutes();
    MMDD.setHours(0, 0, 0, 0);
    minutes >= 0 && 10 > minutes && (minutes = "0" + minutes);
    strDate = today.getTime() === MMDD.getTime() ? "Aujourd'hui à " + hours + "h" + minutes : yesterday.getTime() === MMDD.getTime() ? "Hier à " + hours + "h" + minutes : MMDD.getDate() + " " + months[MMDD.getMonth()] + " " + MMDD.getFullYear() + " à " + hours + "h" + minutes;
    return strDate;
}