var url = 'https://api.openweathermap.org/data/2.5/weather?q=Seoul,kr&APPID=e4b94150e27b4a33b5e5c2b05467a22f'

$('#weather_info .load_img').show();

$.getJSON(url, function (data) {
	var sys = data.sys;  // 국가명, 일출/일몰
	var city = data.name;  // 도시명
	var weather = data.weather;  // 날씨 객체
	var main = data.main;  // 온도 기압 관련 객체
	
	var wmain = weather[0].main;  // 구름 상태(Cloudiness)
	var w_id = weather[0].id;
	var icon = weather[0].icon;
	var country = sys.country;
	var temp = main.temp;
	var temp_min = main.temp_min;
	var temp_max = main.temp_max;
	
	var icon_url = 'https://openweathermap.org/img/w/' + icon;
	
	$('#weather_info > .city').html(city + "/" + country);
	$('#weather_info .icon').html("<img src='" + icon_url + ".png'>");
	$('#weather_info .w_id').html(wmain);
	$('#weather_info .temp_min').html(parseInt(temp_min-273.15) + '&deg;' + ' min');
	$('#weather_info .temp_max').html(parseInt(temp_max-273.15) + '&deg;' + ' max');
	$('#weather_info .temp').html(parseInt(temp-273.15) + '&deg;');
	
	$('#weather_info .load_img').hide();
}).fail(function () {
	$('#weather_info .load_img').hide();
	alert("loading error");
});