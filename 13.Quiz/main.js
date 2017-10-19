function Question(text, choice, answer) {
	this.text = text;
	this.choice = choice;
	this.answer = answer;
}

function Quiz(questions) {
	this.score = 0;
	this.questions = questions;
	this.questionIndex = 0;
}

Quiz.prototype.correctAnswer = function (answer) {
	return answer == this.questions[this.questionIndex].answer;
}

var questions = [
		new Question('다음 중 최초의 상용 웹 브라우저는?', ['모자이크', '인터넷익스플로러', '구글 크롬', '넷스케이프 네비게이터'], '넷스케이프 네비게이터'),
		new Question('웹 문서에서 스타일을 작성하는 언어는?', ['HTML', 'jQuery', 'CSS', 'XML'], 'CSS'),
		new Question('명령어 기반의 인터페이스를 의미하는 용어는?', ['GUI', 'CLI', 'HUD', 'SI'], 'CLI'),
		new Question('CSS 속성 중 글자의 굵기를 변경하는 속성은?', ['font-size', 'font-style', 'font-weight', 'font-variant'], 'font-weight')
	];
	
var quiz = new Quiz(questions);

function update_quiz() {
	var question = document.getElementById('question');
	var idx = quiz.questionIndex + 1;
	var choice = document.querySelectorAll('.btn');
	
	question.innerHTML = '문제' + idx + ') ' + quiz.questions[quiz.questionIndex].text;
	
	for (var i = 0; i < 4; i++) {
		choice[i].innerHTML = quiz.questions[quiz.questionIndex].choice[i];
	}
	
	progress();
}

function progress() {
	var progress = document.getElementById('progress');
	progress.innerHTML = '문제 ' + (quiz.questionIndex+1) + ' / ' + quiz.questions.length;
}

function result() {
	var quiz_div = document.getElementById('quiz');
	var per = parseInt((quiz.score*100) / quiz.questions.length);
	
	var txt = '<h1>결과</h1>' +
			  '<h2 id="score"> 당신의 점수: ' + quiz.score + '/' + 
			  quiz.questions.length + '<br><br>' + per + '점</h2>';
	quiz_div.innerHTML = txt;
	
	if(per < 60){
		txt += '<h2 style="color:red">좀더 분발하세요</h2>';
		quiz_div.innerHTML = txt;
	} else if(per >= 60 && per < 80){
		txt += '<h2 style="color:red">무난한 점수네요</h2>';
		quiz_div.innerHTML = txt;
	} else if(per >= 80){
		txt += '<h2 style="color:red">훌륭합니다</h2>'
		quiz_div.innerHTML = txt;
	}
}


var btn = document.querySelectorAll('.btn');

function checkAnswer(i){
	btn[i].addEventListener('click', function(){
		var answer = btn[i].innerText;

		if(quiz.correctAnswer(answer)){
			alert('정답입니다!');
			quiz.score++;
		} else{ alert('틀렸습니다!'); }

		if(quiz.questionIndex < quiz.questions.length-1){
			quiz.questionIndex++;
			update_quiz();
		} else { 
			result(); 
		}
	});	
}

// 4개의 버튼 이벤트리스너 지정
for(var i = 0; i < btn.length; i++){
	checkAnswer(i);
}

update_quiz();