// var inp = document.forms['cal'];
// var input = inp.getElementsByTagName('input');
// var cls_btn = document.getElementsByClassName('cls_btn')[0];
// var result_btn = document.getElementsByClassName('result_btn')[0];
var $inp = $('form[name=cal]');
var $input = $inp.find('input');
var $cls_btn = $('.cls_btn');
var $result_btn = $('.result_btn');
var $result = $inp.find('input[name=result]');

function clr() {
	// inp['result'].value = 0;
	$result.val(0);  // val() 메서드는 입력 요소의 value 값을 읽거나 지정. jQuery는 모든 것을 함수 값으로 전달함
}

function calc(value) {
	console.log("calc. " + value)
	// if(inp['result'].value == 0) {
	// 	inp['result'].value = '';
	// }
	if ($result.val() == 0) {
		$result.val('');
	}
	
	// inp['result'].value += value;
	var val = $result.val() + value;
	$result.val(val);
}

function my_result() {
	// var result = document.forms['cal']['result'];
	// var calc = eval(result.value);  // eval()함수: 입력된 문자열을 명령어로 처리
	var calc = eval($result.val());
	
	// inp['result'].value = calc;
	$result.val(calc);
}


// for (var i = 0; i < input.length; i++) {
// 	if (input[i].value != '=' && input[i].value != 'clear') {
// 		input[i].onclick = function () {
// 			calc(this.value);
// 		}
// 	}
// }
$('input').click(function () {  // jQuery를 사용하면 선택자 지정과 이벤트 핸들러 처리가 편해짐
	var $input_value = $(this).val();  // $(this) : 현재 input 객체
	
	if($input_value != '=' && $input_value != 'clear') {
		calc($input_value);
	}
});


// cls_btn.onclick = function() {
// 	clr();
// }
$('.cls_btn').click(function() {
	clr();
});


// result_btn.onclick = function() {
// 	try {
// 		my_result();
// 	}
// 	catch(err) {
// 		var result = inp['result'];
// 		result.value = '입력 오류';
// 	}
// }
$('.result_btn').click(function () {
	try {
		my_result();
	}
	catch(err) {
		$result.val('입력 오류');
	}
})