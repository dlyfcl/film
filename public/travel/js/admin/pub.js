$(function() {

});

$(document).on('click', '.pageli', function() {
	$('.pageli').removeClass('active');
	$(this).addClass('active');
	var page = $(this).data('pagenum');
	var data = {
		'page': page
	}
	var url;
	if ($(this).hasClass('chanpin-pageli')) {
		url = '/admin/pageChanPinInfo';
	}
	if ($(this).hasClass('wcldingdan-pageli')) {
		url = '/admin/pageDingDanInfo';
		data.state = '0';
	}
	if ($(this).hasClass('ycldingdan-pageli')) {
		url = '/admin/pageDingDanInfo';
		data.state = '1';
	}
	getPageInfo(url, data);
});

// 请求某一页的信息
function getPageInfo(url, data) {
	ajaxPost(url, data, function(result) {
		if (result.success) {
			$('.info-tbody').html('');
      $('.info-tbody').append(result.view);
		}
	});
}
