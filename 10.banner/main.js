var banner = document.getElementById('banner');
var img = document.getElementsByTagName('img');
var toggle = document.getElementById('toggle');
var sound_btn = document.getElementById('sound_btn');

// 속정 값 읽는 것은 인라인 스타일 속성만 가능하다.
// 태그 밖에서 작성된 CSS 속성은 전역 객체(window)의 getComputedStyle() 을 사용해야 한다.
var banner_height = getComputedStyle(banner).height;
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
	for (var i = 0; i < img.length; i++) {
		set_balloon(i);
		img[i].style.left = "-9999px";
		img[i].style.top = "-9999px";
	}
}

function animate_balloon() {
	for (var i = 0; i < img.length; i++) {
		img[i].style.left = cast[i].x + "px";
		img[i].style.top = cast[i].y + "px";
		img[i].style.transform = "rotate(" + cast[i].angle + "deg)";
		
		if (cast[i].y < parseInt(banner_height)) {
			cast[i].y += 1 + cast[i].speed;
			cast[i].angle += cast[i].speed;
		} else {
			set_balloon(i);
		}
	}
}

function bgm_init() {
	var bgm = new Audio();
	bgm.src = "images/bgm.mp3";
	bgm.loop = true;
	document.body.appendChild(bgm);
}



ball_init();
setInterval(function () {
	animate_balloon();
}, 1000/30);
bgm_init();



sound_btn.onclick = function (event) {
	var attr = sound_btn.getAttribute('class');
	var bgm = document.getElementsByTagName('audio');
	console.log("sound_btn. " + attr);
	
	if (attr == 'active') {
		sound_btn.removeAttribute('class');
		sound_btn.setAttribute('src', 'images/sound_off.png');
		bgm[0].pause();
	} else {
		sound_btn.setAttribute('class', 'active');
		sound_btn.setAttribute('src', 'images/sound_on.png');
		bgm[0].play();
	}
	event.stopPropagation();
	console.log("sound_btn. end");
}

toggle.onclick = function () {
	var attr = banner.getAttribute('class');
	
	if (attr == 'active') {
		banner.removeAttribute('class');
		toggle.innerHTML = '배너 열기';
		return false;
	} else {
		banner.setAttribute('class', 'active');
		toggle.innerHTML = '배너 닫기';
		return false;
	}
}

banner.onclick = function () {
	window.open('https://mechurak.github.io/', '_blank');
}