var $indicator = $('.indicator button');
var $lightbox = $('#lightbox');
var $block = $('#block');

function lightbox_open(num) {
    console.log("lightbox_open. " + num);
    $lightbox.addClass('active');
    $block.addClass('active');
	change_img(num);
	$indicator.eq(num-1).focus();
}

function lightbox_close() {
	$lightbox.removeAttr('class');
	$block.removeAttr('class');
}

function change_img(val) {
    console.log("change_img. " + val);
	var $imgs = $('figure > img');
	
	for (var i = 0; i < $imgs.length; i++) {
		$imgs.eq(i).removeAttr('class');
	}
	$imgs.eq(val-1).attr('class', 'active');
}

$('img.thumb').click(function () {
    console.log("img.thumb click");
    var img_num = $(this).index();
    lightbox_open(img_num);
});

$('.btn-close').click(function () {
    lightbox_close();
});

$indicator.click(function () {
    var img_num = $(this).index();
    change_img(img_num);
});