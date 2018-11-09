function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function removeQuotes(str) {
	return str.replace(/["]+/g, '');
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

// if cached
if(questionsCachedArr) {
	randomInt = getRandomInt(questionsCachedArr.length);
	randomQuestion = removeQuotes(questionsCachedArr[randomInt][0]);
}
//if not cached then retrieve
else {
	var request = new XMLHttpRequest();  
	request.open("GET", 'data.csv', false);   
	request.send(null);  

	var csvData = new Array();
	var jsonObject = request.responseText.split(/\r?\n|\r/);
	for (var i = 0; i < jsonObject.length; i++) {
	  csvData.push(jsonObject[i].split(','));
	}

	localStorage.setItem('questions', JSON.stringify(csvData));
	questionsCachedArr = JSON.parse(localStorage.getItem('questions'));

	randomInt = getRandomInt(questionsCachedArr.length);
	randomQuestion = removeQuotes(questionsCachedArr[randomInt][0]);
}

document.querySelector("button").addEventListener("click", function(event) {
	localStorage.setItem('questions', null);
	window.location.reload();
});

document.querySelector(".question").innerHTML = randomQuestion;
document.querySelector(".questionNumber").innerHTML = "#" + randomInt;

document.querySelector(".smiley i").classList.add(smileyArr[getRandomInt(smileyArr.length)]);

