function calender(new_year, new_month) {
	// 변수명 앞의 $은 jQuery 선택자를 지정한 변수라는 의미
	var $caption_year = $('.year');
	var $caption_month = $('.month');
	var $start_day = $('tr td');
	
	// 해당 월의 총 일수 구하기
	// 9월(index 8)의 경우 30일(index 29)까지 있으므로, Date객체는 10월 3일(index 2)을 가리킴
	var d_length = 32 - new Date(new_year, new_month-1, 32).getDate();
	
	var d = new Date(new_year, new_month-1, 1);
	var year = d.getFullYear();
	var month = d.getMonth();
	var date = d.getDate();
	var day = d.getDay();

    // for문 대신 jQuery 반복문인 each() 메서드 사용
	$start_day.each(function (i) {
		$(this).html('&nbsp;');
	});
	
	for (var i = day; i < day + d_length; i++) {
		$start_day.eq(i).html(date);
		date++;
	}
	
	$caption_year.html(year);
	$caption_month.html(month + 1);
}

(function() {
	var $prev = $('#prev');
	var $next = $('#next');
	year = new Date().getFullYear();
	month = new Date().getMonth() + 1;
	
	calender(year, month);
	
	$prev.click(function () {
		calender(year, --month);
	});
	
	$next.click(function () {
		calender(year, ++month);
	});
})();