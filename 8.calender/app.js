function calender(new_year, new_month) {
	var caption_year = document.querySelector('.year');
	var caption_month = document.querySelector('.month');
	var start_day = document.querySelectorAll('tr td');
	
	// 해당 월의 총 일수 구하기
	// 9월(index 8)의 경우 30일(index 29)까지 있으므로, Date객체는 10월 3일(index 2)을 가리킴
	var d_length = 32 - new Date(new_year, new_month-1, 32).getDate();
	
	var d = new Date(new_year, new_month-1, 1);
	var year = d.getFullYear();
	var month = d.getMonth();
	var date = d.getDate();
	var day = d.getDay();
	
	for (var i = 0; i < start_day.length; i++) {
		start_day[i].innerHTML = '&nbsp;';
	}
	
	for (var i = day; i < day + d_length; i++) {
		start_day[i].innerHTML = date;
		date++;
	}
	
	caption_year.innerHTML = year;
	caption_month.innerHTML = month + 1;
}

(function() {
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	year = new Date().getFullYear();
	month = new Date().getMonth() + 1;
	
	calender(year, month);
	
	prev.onclick = function () {
		calender(year, --month);
	};
	
	next.onclick = function () {
		calender(year, ++month);
	}
})();