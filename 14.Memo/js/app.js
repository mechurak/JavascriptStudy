$(function () {
	// 메모장
	var sticky_html = 
		'<div class="sticky">' +
			'<nav class="top_nav">' +
				'<a href="#" class="add"><i class="fa fa-plus"></i></a>' +
				'<a href="#" class="save"><i class="fa fa-floppy-o"></i></a>' +
				'<div class="right">' +
					'<a href="#" class="get"><i class="fa fa-list"></i></a>' +
					'<a href="#" class="del"><i class="fa fa-times"></i></a>' +
				'</div>' +
			'</nav>' +
			'<textarea name="txt" class="txt"></textarea>' +
			'<nav class="side_nav"><ol></ol></nav>' +
		'</div>';

	var Sticky = {
		add : function () {
			var win_width = $('#sticky_wrap').width() - 250;
			var win_height = $('#sticky_wrap').height() - 300;
			var x = Math.random() * win_width;
			var y = Math.random() * win_height;
			
			$('#sticky_wrap').append(sticky_html);
			var $new_sticky = $('.sticky').last();
			
			$new_sticky.css({
				left: parseInt(x) + 'px',
				top: y
			});
			$('.sticky').css('zIndex', '0');
			$new_sticky.css('zIndex', '99'); // 새 메모장을 상위 레이어로
		},
		save : function (current_memo) {
			var idx = localStorage.length;
			var txt = current_memo.val();
			
			if (txt !== '') {
				var key = prompt('저장할 파일명?', '');
				localStorage.setItem(key, txt);
			}
		},
		get : function list_storage(current_memo) {
			var key;
			var l = localStorage.length;
			var del_icon = '<i class="fa fa-trash"></i>'; // 삭제 아이콘
			
			current_memo.find('ol').empty();  // 목록 초기화
			current_memo.toggleClass('active');  // 목록 열기
			
			for (var i = 0; i < l; i++) {
				key = localStorage.key(i);
				current_memo.find('ol').append('<li>' + key + del_icon + '</li>');
			}
			
			current_memo.find('li').click(function () {
				var title = $(this).text();
				var txt = localStorage.getItem(title);
				current_memo.toggleClass('active');  // 목록창 닫기
				current_memo.prev('.txt').val(txt);
			});
			
			current_memo.find('li > i').click(function () {
				var key = $(this).parent().text();
				var ok = confirm('해당 메모를 삭제할까요?');
				if (ok) {
					localStorage.removeItem(key);
				}
			});
		}
	}

	$('#sticky_wrap').on('click', '.add', function () {
		Sticky.add();
	});
	$('#sticky_wrap').on('click', '.save', function () {
		var current_memo = $(this).parent().siblings('.txt');
		Sticky.save(current_memo);
	});
	$('#sticky_wrap').on('click', '.get', function () {
		var current_memo = $(this).parents('.top_nav').siblings('.side_nav');
		Sticky.get(current_memo);
	});
	$('#sticky_wrap').on('click', '.del', function () {
		$(this).parents('.sticky').remove();
	})
	
	
	$('#sticky_wrap').on('mouseover', '.top_nav', function () {
		$(this).parent().draggable();
	})
	
	$('#sticky_wrap').on('touchstart mousedown', '.sticky', function () {
		$('.sticky').css('zIndex', '0');
		$(this).css('zIndex', '99');
	})
	
	$('#sticky_wrap').on('touchmouse', '.top_nav', function (e) {
		var $sticky = $(this).parent();
		var event = e.originalEvent;  // jQeury 에서 기존 자바스크립트 이벤트를 받을 때 필요
		var touchObj = event.changedTouched[0];
		
		var x = parseInt(touchObj.clientX);
		var y = parseInt(touchObj.clientY);
		var ex = x - 125;
		var ey = y - 16;
		
		$sticky.css('left', ex + 'px');
		$sticky.css('top', ey + 'px');
	})

		
	$('#sticky_wrap').append(sticky_html);
});
