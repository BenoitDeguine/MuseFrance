function beautifulDate(MMDD, today, yesterday) {
	var arr = MMDD.split(/[- :T]/), // example var date = "2012-11-14T06:57:36+0000";
	MMDD = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], 00);
	MMDD = MMDD.toString("MMMM");
	MMDD = new Date(MMDD);

	var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
	var strDate = "";
	var day = MMDD.getDate();
	var hours = MMDD.getHours();
	var minutes = MMDD.getMinutes();
	MMDD.setHours(0, 0, 0, 0);

if ( minutes >= 0 && minutes < 10) {
	minutes = "0"+minutes;
}

	if (today.getTime() === MMDD.getTime()) {
		strDate = "Aujourd'hui à " + hours + 'h' +  minutes;
	} else if (yesterday.getTime() === MMDD.getTime()) {
		strDate = "Hier à " + hours + 'h' +  minutes;
	} else {
		strDate = MMDD.getDate() + " " + months[MMDD.getMonth()] + " " + MMDD.getFullYear() + " à " + hours + 'h' +  minutes;
	}

	return strDate;
}
