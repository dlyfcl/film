$(function() {

});

// 用户注册
$(document).on('click', '.btn-reg', function() {
  var account = $('input[name="reg-account"]').val();
  var password = $('input[name="reg-password"]').val();
	var repassword = $('input[name="reg-repassword"]').val();
	var name = $('input[name="reg-name"]').val();
	var phone = $('input[name="reg-phone"]').val();
  var data = {
    'account': account,
		'password': password,
		'name': name,
    'phone': phone
  }
  if (account.length == 0 || password.length == 0 || (password != repassword) || name.length == 0 || phone.length == 0) {
    showTips('warning', 'Warning!', '请检查填写信息！');
  }else if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(account))){
    showTips('warning', 'Warning!', '账号必须是手机号码！');
  } else {
    ajaxPost('/userreg', data, function(result) {
      if (result.success) {
        showTips('success', 'Success!', result.success + '，请登录！');
        setTimeout(function() {
          location.href = '/reglogin';
        }, 2000);
      }
    });
  }
});

// 用户登录
$(document).on('click', '.btn-login', function() {
  var account = $('input[name="account"]').val();
  var password = $('input[name="password"]').val();
  var data = {
    'account': account,
		'password': password
  }
  if (account.length == 0 || password.length == 0) {
    showTips('warning', 'Warning!', '请检查填写信息！');
  } else {
    ajaxPost('/userlogin', data, function(result) {
      if (result.success) {
        showTips('success', 'Success!', result.success);
        setTimeout(function() {
          location.href = '/';
        }, 2000);
      }
    });
  }
});

// 加入购物车
$(document).on('click', '.btn-addToShopCart', function() {
  var chanpinid = $(this).data('chanpinid');
  var xingchengid = $('select[name="xingchengid"]').val();
  var num = $('input[name="num"]').val();
  var data = {
    'chanpinid': chanpinid,
    'xingchengid': xingchengid,
    'num': num
  }
  ajaxPost('/addToShopCart', data, function(result) {
    if (result.success) {
      showTips('success', 'Success!', result.success);
    }
  });
});

// $(document).on('click', '.btn-addDingDan', function() {
//   var chanpinid = $(this).data('chanpinid');
//   var xingchengid = $('select[name="xingchengid"]').val();
// 	var ddrenshu = $('input[name="ddrenshu"]').val();
// 	var allprice = ($('.item-price').data('price') * ddrenshu).toFixed(2);
//   var data = {
//     'chanpinid': chanpinid,
//     'xingchengid': xingchengid,
//     'ddrenshu': ddrenshu,
//     'allprice': allprice
//   }
//   if (ddrenshu.length == 0) {
//     showTips('warning', 'Warning!', '请填写订单的人数！');
//   } else {
//     showBtnTips('success', '确定下单吗？', '订单总价格为' + allprice + '元', '取消', '确定', function() {
//       ajaxPost('/addDingDan', data, function(result) {
//         if (result.success) {
//           showTips('success', 'Success!', result.success);
//           location.reload();
//         }
//       });
//     });
//   }
// });

// 已处理订单
$(document).on('click', '.btn-ycldingdan', function() {
  $('.btn-order').removeClass('btn-info');
  $(this).addClass('btn-info');
  $('.yclList').show();
  $('.wclList').hide();
});

// 未处理订单
$(document).on('click', '.btn-wcldingdan', function() {
  $('.btn-order').removeClass('btn-info');
  $(this).addClass('btn-info');
  $('.yclList').hide();
  $('.wclList').show();
});

// 修改密码
$(document).on('click', '.userUpdatePassword', function() {
  layer.open({
    type: 1,
    title: '修改密码',
    area: ['800px'],
    skin: 'layui-layer-lan',
    content: '<div class="panel-body">\
    <div class="form col-md-12"><form class="form-horizontal tasi-form">\
    <div class="form-group"><label class="control-label col-lg-2">原密码</label>\
    <div class="col-lg-10"><input type="password" name="oldpassword" class="form-control"></div></div>\
    <div class="form-group"><label class="control-label col-lg-2">新密码</label>\
    <div class="col-lg-10"><input type="password" name="password" class="form-control"></div></div></div></div>',
    btn: ['修改'],
    shadeClose: true,
    yes: function(index, layero) {
      var oldpassword = $('input[name="oldpassword"]').val();
      var password = $('input[name="password"]').val();
      var data = {
        'oldpassword': oldpassword,
        'password': password
      }
      if (oldpassword.length == 0 || password.length == 0) {
        showTips('warning', 'Warning!', '请检查填写信息！');
      } else {
        ajaxPost('/updatePassword', data, function(result) {
          if (result.success) {
            showTips('success', 'Success!', result.success);
          }
        });
      }
      layer.close(index);
    }
  });
});

$(document).on('click', '.qtyminus', function() {
  checkItem($(this));
  calPrice();
});

$(document).on('click', '.qtyplus', function() {
  checkItem($(this));
  calPrice();
});

$(document).on('click', '.cart-check', function() {
  calPrice();
});

// 购物车功能culating
function calPrice() {
  var allprice = 0;
  $('.cart-check').each(function() {
		if ($(this).prop('checked') == true) {
			allprice += parseFloat($(this).data('price')*$(this).data('num'));
		}
		$('.allprice').text('￥' + allprice.toFixed(2));
	});
}

function checkItem(oThis) {
  oThis.parents('tr').find('.cart-check').data('num', oThis.parents('tr').find('input[name="quantity"]').val());
  oThis.parents('tr').find('.item-allprice').text((oThis.parents('tr').find('.cart-check').data('price')*oThis.parents('tr').find('.cart-check').data('num')).toFixed(2));
}

// 购物车下单
$(document).on('click', '.btn-addDingdan', function() {
  var data = {};
  var index = 0;
  $('.cart-check').each(function() {
    if ($(this).prop('checked') == true) {
      var chanpinid = $(this).data('chanpinid');
      var xingchengid = $(this).data('xingchengid');
      var itemnum = $(this).data('num');
      var itemprice = ($(this).data('price')*$(this).data('num')).toFixed(2);
      var dizhiid = $('.shouhuodizhi.active').data('dizhiid');
      data[index] = {
        'chanpinid': chanpinid,
        'xingchengid': xingchengid,
        'itemnum': itemnum,
        'itemprice': itemprice,
        'dizhiid': dizhiid
      }
      index++;
    }
  });
  if ($('.shouhuodizhi.active').length == 0) {
    showTips('warning', 'Warning!', '请选择收货地址');
  } else if (index == 0) {
    showTips('warning', 'Warning!', '请选择下单商品');
  } else {
    ajaxPost('/addDingdan', data, function(result) {
      if (result.success) {
        showTips('success', 'Success!', result.success);
      }
    });
  }
});

$(document).on('click', '.shouhuodizhi', function() {
  $('.shouhuodizhi').removeClass('active');
  $(this).addClass('active');
});

$(document).on('click', '.btn-addDiZhiView', function() {
  layer.open({
    type: 1,
    title: '添加收货地址',
    area: ['600px'],
    skin: 'layui-layer-lan',
    content: '<input class="search-field" type="text" name="address" placeholder="收货地址" style="width: 95%;">',
    btn: ['添加'],
    shadeClose: true,
    yes: function(index, layero) {
      var address = $('input[name="address"]').val();
      var data = {
        'address': address
      }
      layer.close(index);
      if (address.length == 0) {
        showTips('warning', 'Warning!', '请填写收货地址！');
      } else {
        ajaxPost('/addDiZhi', data, function(result) {
          if (result.success) {
            showTips('success', 'Success!', result.success);
            setTimeout(function() {
              location.reload();
            }, 1000);
          }
        });
      }
    }
  });
});

// 发表评论
$(document).on('click', '.btn-addpinglun', function() {
  var content = $('textarea[name="pinglun-content"]').val();
  var chanpinid = $(this).data('chanpinid');
  var data = {
    'content': content,
    'chanpinid': chanpinid
  }
  ajaxPost('/addPingLun', data, function(result) {
    if (result.success) {
      showTips('success', 'Success!', result.success);
      setTimeout(function() {
        location.reload();
      }, 1000);
    }
  });
});

// 获取当前场次座位
$(document).on('click', '.btn-getZuoWei', function () {
  var xingchengid = $('select[name="xingchengid"]').val();
  var data = {
    'xingchengid': xingchengid
  }
  ajaxPost('/getZw', data, function (result) {
    if (result.success) {
      layer.open({
        type: 1,
        title: '选择座位',
        area: ['750px'],
        skin: 'layui-layer-lan',
        content: result.view,
        btn: ['选择完成'],
        shadeClose: true,
        yes: function(index, layero) {
          var chanpinid = $('.item-price').data('chanpinid');
          var zwid = [];
          $('.canSel.active').each(function () {
            zwid.push($(this).data('zwid'));
          });
          var ddrenshu = zwid.length;
          zwid = zwid.join(',');
          var allprice = ddrenshu * $('.item-price').data('price');
          var gpdata = {
            'chanpinid': chanpinid,
            'xingchengid': xingchengid,
            'zwid': zwid,
            'ddrenshu': ddrenshu,
            'allprice': allprice
          }
          layer.close(index);
          ajaxPost('/gouPiao', gpdata, function (result) {
            if (result.success) {
              showTips('success', 'Success!', result.success);
              setTimeout(function () {
                location.reload();
              }, 2000);
            }
          });
        }
      });
    }
  });
});

$(document).on('click', '.film-item.canSel', function () {
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
  } else {
    $(this).addClass('active');
  }
});

// 收藏
$(document).on('click', '.btn-shoucang', function() {

  var chanpinid = $(this).attr('data-id');
  console.log(chanpinid);

  var data = {
    'chanpinid': chanpinid
  }
  ajaxPost('/addshoucang', data, function(result) {
    // if (result.success) {
    //   layer.photos({
    //     photos: result.photojson
    //   });
    // }
    alert('收藏成功');
  });
});