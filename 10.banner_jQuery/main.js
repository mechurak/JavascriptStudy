var $banner = $('#banner');
var $img = $banner.find('img');
var $toggle = $('#toggle');
var $sound_btn = $('#sound_btn');

// 속정 값 읽는 것은 인라인 스타일 속성만 가능하다.
// 태그 밖에서 작성된 CSS 속성은 전역 객체(window)의 getComputedStyle() 을 사용해야 한다.
var $banner_height = $banner.css('height');
var cast = [];

function set_balloon(num) {
	var x = Math.floor(Math.random() * (500 - 10) + 10);  // 10에서 500 사이의 값
	var y = Math.floor(Math.random() * (400 - 120) + 120);
	var size = Math.floor(Math.random() * (200 - 100) + 100);
	var angle = Math.floor(Math.random() * (360 - 0) + 0);
	var speed = Math.random() * (2 - 0) + 0;
	
	cast[num] = {
		x: x,
		y: -y,
		size: size,
		angle: angle,
		speed: speed
	};
}

function ball_init() {
	$img.each(function (i) {  // 함수의 매개변수 i는 배열 인덱스 번호
		set_balloon(i);
		$img.eq(i)
			.css('left', '-9999px')
			.css('top', '-9999px');
	});
}

function animate_balloon() {
	$img.each(function (i) {
		$img.eq(i)
			.css('left', cast[i].x + 'px')
			.css('top', cast[i].y + 'px')
			.css('transform', 'rotate(' + cast[i].angle + 'deg)');
			
		if (cast[i].y < parseInt($banner_height)) {
			cast[i].y += 1 + cast[i].speed;
			cast[i].angle += cast[i].speed;
		} else {
			set_balloon(i);
		}
	});
}

function bgm_init() {
	var bgm = new Audio();
	bgm.src = "images/bgm.mp3";
	bgm.loop = true;
	$('body').append(bgm);
}



ball_init();
setInterval(function () {
	animate_balloon();
}, 1000/30);  // 1000ms / 30fps
bgm_init();



$sound_btn.click(function (event) {
	var attr = $(this).attr('class');
	var bgm = $('audio');
	console.log("sound_btn. " + attr);
	
	if (attr == 'active') {
		$(this).removeAttr('class');
		$(this).attr('src', 'images/sound_off.png');
		bgm[0].pause();
	} else {
		$(this).attr('class', 'active');
		$(this).attr('src', 'images/sound_on.png');
		bgm[0].play();
	}

	// 이벤트 버블링 차단
	// 사운드 버튼이 배너 영역 안에 있어서, 차단해 주지 않을 경우, 배너에도 클릭 이벤트가 전달됨
	event.stopPropagation();
	console.log("sound_btn. end");
});

$toggle.click(function () {
	var attr = $banner.attr('class');
	
	if (attr == 'active') {
		$banner.removeAttr('class');
		$(this).html('배너 열기');
		return false;  // 버튼 객체가 <a> 요소라 클릭 시 문서가 이동하는 기본이벤트가 발생하는데, 이를 방지
	} else {
		$banner.attr('class', 'active');
		$toggle.html('배너 닫기');
		return false;
	}
});

$banner.click(function () {
	window.open('https://mechurak.github.io/', '_blank');
});