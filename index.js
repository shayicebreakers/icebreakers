function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var questionsCachedArr = JSON.parse(localStorage.getItem('questions'));
var randomQuestion = '';

// if cached
if(questionsCachedArr) {
	randomQuestion = questionsCachedArr[getRandomInt(questionsCachedArr.length)][0];
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

	randomQuestion = questionsCachedArr[getRandomInt(questionsCachedArr.length)][0];
}


document.querySelector(".question").innerHTML = randomQuestion;

