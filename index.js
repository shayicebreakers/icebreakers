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
	  csvData.push(jsonObject[i].split('\t'));
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

function writeData(question, int, smiley) {
	document.querySelector(".question").innerHTML = question;
	document.querySelector(".questionNumber").innerHTML = "#" + (int+1);
	document.querySelector(".smiley i").className="";
	document.querySelector(".smiley i").classList.add("far", smiley);
}

var smileyArr = [
	'fa-smile-beam',
	'fa-smile',
	'fa-grin-squint-tears',
	'fa-grin-wink'
];

var questionsCachedArr = JSON.parse(localStorage.getItem('questions'));
var randomQuestion = '';
var randomQuestionSmiley = '';
var randomInt;
var questionsOrderArr = [];
var questionsOrderIndex = 0;

//if you finish the test then turn this value on so that the alert does not popup
var passedGameOnce = false;

if(!questionsCachedArr || resetDaily()) {
	var data = getData('data.tsv');

	//set local storage values
	localStorage.setItem('timestamp', new Date().getTime());
	localStorage.setItem('questions', JSON.stringify(data));
	questionsCachedArr = JSON.parse(localStorage.getItem('questions'));
}

for(var i = 0; i < questionsCachedArr.length; i++) {
	questionsOrderArr[i] = i;
}
	
//shuffle the array;
questionsOrderArr = shuffle(questionsOrderArr);

randomInt = questionsOrderArr[questionsOrderIndex];
randomQuestion = removeQuotes(questionsCachedArr[randomInt][0]);
randomQuestionSmiley = questionsCachedArr[randomInt][1];
writeData(randomQuestion, randomInt, randomQuestionSmiley);

if(document.querySelector("button.next")) {
	document.querySelector("button.next").addEventListener("click", function(event) {
		questionsOrderIndex++;

		if(questionsOrderIndex === questionsOrderArr.length) {
			
			if(!passedGameOnce) {
				alert("Awesome! Now you know more than when you started! Hit the reset button to replay.");
				passedGameOnce = true;
			}

			document.querySelector("button.next").classList.add("display-none");
			document.querySelector("button.reset").classList.remove("display-none");
		}
		else {
			randomInt = questionsOrderArr[questionsOrderIndex];
			randomQuestion = removeQuotes(questionsCachedArr[randomInt][0]);
			randomQuestionSmiley = questionsCachedArr[randomInt][1];
			writeData(randomQuestion, randomInt, randomQuestionSmiley);
		}
	});
}

if(document.querySelector("button.reset")) {
	document.querySelector("button.reset").addEventListener("click", function(event) {

		document.querySelector("button.reset").classList.add("display-none");
		document.querySelector("button.next").classList.remove("display-none");

		questionsOrderArr = shuffle(questionsOrderArr);
		questionsOrderIndex = 0;

		randomInt = questionsOrderArr[questionsOrderIndex];
		randomQuestion = removeQuotes(questionsCachedArr[randomInt][0]);
		randomQuestionSmiley = questionsCachedArr[randomInt][1];
		writeData(randomQuestion, randomInt, randomQuestionSmiley);
	});
}

