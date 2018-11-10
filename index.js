function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function removeQuotes(str) {
	return str.replace(/["]+/g, '');
}

var SECONDS_IN_DAY = 60*60*24;

function resetDaily() {
	let expiryTime = parseInt(localStorage.getItem('timestamp'));

	return new Date().getTime() >= expiryTime + SECONDS_IN_DAY;
}

function getData(url) {
	var request = new XMLHttpRequest();  
	request.open("GET", url, false);   
	request.send(null);  

	var csvData = new Array();
	var jsonObject = request.responseText.split(/\r?\n|\r/);
	for (var i = 0; i < jsonObject.length; i++) {
	  csvData.push(jsonObject[i]);
	}

	return csvData;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

var smileyArr = [
	'fa-smile-beam',
	'fa-smile',
	'fa-grin-squint-tears',
	'fa-grin-wink'
];

var questionsCachedArr = JSON.parse(localStorage.getItem('questions'));
var randomQuestion = '';
var randomInt;

if(!questionsCachedArr || resetDaily()) {
	
	var data = getData('data.csv');

	//set local storage values
	localStorage.setItem('timestamp', new Date().getTime());
	localStorage.setItem('questions', JSON.stringify(data));
	questionsCachedArr = JSON.parse(localStorage.getItem('questions'));
}

randomInt = getRandomInt(questionsCachedArr.length);

while(randomInt == parseInt(localStorage.getItem('randomInt'))) {
	randomInt = getRandomInt(questionsCachedArr.length);
}

localStorage.setItem('randomInt', randomInt);
randomQuestion = removeQuotes(questionsCachedArr[randomInt]);

document.querySelector(".question").innerHTML = randomQuestion;
document.querySelector(".questionNumber").innerHTML = "#" + (randomInt+1);
document.querySelector(".smiley i").classList.add(smileyArr[getRandomInt(smileyArr.length)]);


// if(document.querySelector("button")) {
// 	document.querySelector("button").addEventListener("click", function(event) {
// 		localStorage.setItem('questions', null);
// 		window.location.reload();
// 	});
// }

