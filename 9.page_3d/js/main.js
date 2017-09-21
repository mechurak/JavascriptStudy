var wrapper = document.querySelector('.wrapper');
var page = document.querySelectorAll('.page');
var indicator = document.getElementById('indicator');
var indicator_li = indicator.querySelectorAll('li');

var yDeg = 0;
var indicator_num = 1;
var indicator_length = page.length;
var w = page[0].offsetWidth;
var page_angle = 0;

function init_page() {
	w = page[0].offsetWidth;
	console.log("w: " + w);
	
	for (var i = 0; i < page.length; i++) {
		page[i].style.transform = 'rotateY(' + page_angle + 'deg) translateZ(' + (w/2) + 'px)';
		page_angle += 90;
	}
	
	wrapper.style.transform = 'translateZ(' + (-w/2) + 'px) rotateY(' + yDeg + 'deg)';
}

function init_indicator() {
	for (var i = 0; i < indicator_length; i++) {
		indicator.innerHTML += '<li>' + (i+1) + '</li>';
	}
	
	indicator_li = indicator.querySelectorAll('li');
	change_page(indicator_num);
}

function change_page(inum) {
	console.log("change_page. " + inum);
	indicator_li[inum-1].setAttribute('class', 'active');
	yDeg = -90 * (inum - 1);
	wrapper.style.transform = 'translateZ(' + (-w/2) + 'px) rotateY(' + yDeg + 'deg)';
	
	for (var i = 0; i < indicator_length; i++) {
		indicator_li[i].removeAttribute('class');
	}
	indicator_li[inum -1].setAttribute('class', 'active');
}


init_page();
init_indicator();

for (var i = 0; i < indicator_li.length; i++) {
	indicator_li[i].addEventListener('click', function () {
		indicator_num = parseInt(this.innerText);
		change_page(indicator_num);
	});
}

window.onresize = function () {
	init_page();
}