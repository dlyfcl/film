$(function() {

});

// 管理员登录
$(document).on('click', '.btn-adminlogin', function() {
  var account = $('input[name="account"]').val();
  var password = $('input[name="password"]').val();
  var data = {
    'account': account,
    'password': password
  }
  if (account.length == 0 || password.length == 0) {
    showTips('warning', 'Warning!', '请检查填写信息！');
  } else {
    ajaxPost('/admin/login', data, function(result) {
      if (result.success) {
        showTips('success', '\n', result.success + '，两秒钟之后跳转到首页！');
        setTimeout(function() {
          location.href = '/admin/chanpin';
        }, 2000);
      }
    });
  }
});
