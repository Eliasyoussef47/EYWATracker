/*
CLASSES:
._2zCDG > ._1wjpf = contact name
.O90ur = online satus
#main > header > div._1i0-u > div._3Kxus = contactOptionMenu
#side > div._3CPl4 = search bar
#pane-side = contacts menu
*/
var contactName;
var onlineStatusIndicator;
var d;
var onlineSet = 0;
var offlineSet = 1;
var inUse = 0;
var contactOptionMenu = document.querySelector("#main > header > div._1i0-u > div._3Kxus");
var getOnlineStatusInterval;
var logArray = [];
function getFullDate(nmr) {
	if (nmr < 10) {
		return "0" + nmr;
	} else {
		return nmr;
	}
}
function startLogging() {
	if (document.querySelector("._2zCDG > ._1wjpf") != null && inUse == 0) {
		contactName = document.querySelector("._2zCDG > ._1wjpf").innerText;
		if (localStorage['onlinLog_' + contactName] != null) {
			setUpUI();
			getOnlineStatusInterval = setInterval(getOnlineStatus, 1000);
			inUse = 1;
		} else {
			setUpUI();
			localStorage['onlinLog_' + contactName] = "";
			getOnlineStatusInterval = setInterval(getOnlineStatus, 1000);
			inUse = 1;
		}
	}
}

function setUpUI() {
	if (document.getElementById("logOnlineStatusEyeIndicator") == null) {
		contactOptionMenu.innerHTML = '<div id="logOnlineStatusEyeIndicator" class="rAUz7"><div role="button" title="Log Online Status"><svg aria-hidden="true" data-prefix="far" data-icon="eye" class="svg-inline--fa fa-eye fa-w-18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24" height="24"><path fill="#8a9093" d="M569.354 231.631C512.97 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-102.556 0-192.091-54.701-240-136 44.157-74.933 123.677-127.27 216.162-135.007C273.958 131.078 280 144.83 280 160c0 30.928-25.072 56-56 56s-56-25.072-56-56l.001-.042C157.794 179.043 152 200.844 152 224c0 75.111 60.889 136 136 136s136-60.889 136-136c0-31.031-10.4-59.629-27.895-82.515C451.704 164.638 498.009 205.106 528 256c-47.908 81.299-137.444 136-240 136z"></path></svg></div></div>' + contactOptionMenu.innerHTML;
		side.innerHTML = "";
		side.style.backgroundColor = "#eeeeee";
	}
}

function getOnlineStatus() {
	if (document.querySelector(".O90ur") != null) {
		onlineStatusIndicator = document.querySelector(".O90ur").innerText;
		if (onlineStatusIndicator == "online") {
			if (onlineSet == 0) {
				d = new Date();
				localStorage['onlinLog_' + contactName] += d.getFullYear() + "-" + getFullDate((d.getMonth() + 1)) + "-" + getFullDate(d.getDate()) + " " + getFullDate(d.getHours()) + ":" + getFullDate(d.getMinutes()) + ":" + getFullDate(d.getSeconds()) + ",";
				onlineSet = 1;
				offlineSet = 0;
			}
		} else if(onlineStatusIndicator != "typing…") {
			if (offlineSet == 0) {
				d = new Date();
				localStorage['onlinLog_' + contactName] += d.getFullYear() + "-" + getFullDate((d.getMonth() + 1)) + "-" + getFullDate(d.getDate()) + " " + getFullDate(d.getHours()) + ":" + getFullDate(d.getMinutes()) + ":" + getFullDate(d.getSeconds()) + "\r\n";
				offlineSet = 1;
				onlineSet = 0;
			}
			
		}
	}
}

function stopGetOnlineStatus() {
	if (getOnlineStatusInterval != null) {
		clearInterval(getOnlineStatusInterval);
		if (onlineSet == 1 && offlineSet == 0) {
			localStorage['onlinLog_' + contactName] += d.getFullYear() + "-" + getFullDate((d.getMonth() + 1)) + "-" + getFullDate(d.getDate()) + " " + getFullDate(d.getHours()) + ":" + getFullDate(d.getMinutes()) + ":" + getFullDate(d.getSeconds()) + "\r\n";
		}
	}
}

function stringToCsv(str) {
	var CsvString = "data:application/csv," + encodeURIComponent(str);
	var download = document.createElement("A");
	download.setAttribute("href", CsvString );
	d = new Date();
	download.setAttribute("download", 'onlinLog_' + document.querySelector("._2zCDG > ._1wjpf").innerText + " " + d.getFullYear() + "-" + getFullDate((d.getMonth() + 1)) + "-" + getFullDate(d.getDate()) + ".csv");
	download.click();
}

function logToArray(str) {
	var arrRows = str.split("\r\n");
	for (var i = 0; i < (arrRows.length - 1); i++) {//rows
	logArray[i] = [];
		for (var x = 0; x < arrRows[i].split(",").length; x++) {//coloums
			logArray[i].push(arrRows[i].split(",")[x]);
		}
	}	
}

startLogging();

////calculate localstorage size
var _lsTotal = 0,
    _xLen, _x;
for (_x in localStorage) {
    if (_x != "length") {
        _xLen = ((localStorage[_x].length + _x.length) * 2);
        _lsTotal += parseInt(_xLen);
        console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB");
    }
};
console.log("Total = " + (parseInt(_lsTotal) / 1024).toFixed(2) + " KB");



