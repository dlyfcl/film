var express = require('express');
var router = express.Router();

var usermodel = require('../models/usermodel');

// 用户首页面
router.get('/', function (req, res, next) {
  usermodel.getNewChanPin(function (err, chanpinList) {
    if (err) {
      return next(err);
    }
    usermodel.getAllFenLei(function (err, fenleiList) {
      if (err) {
        return next(err);
      }
      usermodel.getFourNews(function (err, newsList) {
        if (err) {
          return next(err);
        }
        for (var i = 0; i < newsList.length; i++) {
          var sqltime = newsList[i].time;
          var parsetime = new Date(sqltime);
          newsList[i].time = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
        }
        res.render('user/index/index', {
          title: '电影购票系统首页',
          chanpinList: chanpinList,
          fenleiList: fenleiList,
          newsList: newsList
        });
      });
    });
  });
});

// 注册登录
router.get('/reglogin', function (req, res, next) {
  usermodel.getAllFenLei(function (err, fenleiList) {
    if (err) {
      return next(err);
    }
    res.render('user/index/reglogin', {
      title: '用户注册',
      fenleiList: fenleiList
    });
  });
});

// 登录页面
router.get('/login', function (req, res, next) {
  res.render('user/index/login', {
    title: '用户登录'
  });
});

// 用户注册
router.post('/userreg', function (req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  var name = req.body.name;
  var phone = req.body.phone;
  usermodel.selectUser(account, function (err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (rows.length > 0) {
      res.json({
        'error': '用户名存在'
      });
      return next(err);
    }
    usermodel.userReg([account, password, name, phone], function (err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': '注册成功'
      });
    });
  });
});

// 用户登录
router.post('/userlogin', function (req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  usermodel.selectUser(account, function (err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (rows.length == 0) {
      res.json({
        'error': '用户不存在'
      });
      return next(err);
    }
    if (rows[0].password != password) {
      res.json({
        'error': '密码错误'
      });
      return next(err);
    }
    req.session.name = rows[0].name;
    req.session.uid = rows[0].id;
    req.session.usertype = 'user';
    res.json({
      'success': '登录成功'
    });
  });
});

// 按电影名查询电影
router.post('/searchlist', function (req, res, next) {
  var place = req.body.place;
  usermodel.getChanPinByplace(place, function (err, chanpinList) {
    if (err) {
      return next(err);
    }
    usermodel.getAllFenLei(function (err, fenleiList) {
      if (err) {
        return next(err);
      }
      if (place.length == 0) {
        place = '不限'
      }
      res.render('user/chanpin/list', {
        title: '电影列表',
        smalltip: '查询：' + place,
        fenleiList: fenleiList,
        chanpinList: chanpinList
      });
    });
  });
});

// 所有电影
router.get('/allchanpin', function (req, res, next) {
  usermodel.getAllChanPin(function (err, chanpinList) {
    if (err) {
      return next(err);
    }
    console.log(chanpinList);
    usermodel.getAllFenLei(function (err, fenleiList) {
      if (err) {
        return next(err);
      }
      res.render('user/chanpin/list', {
        title: '电影列表',
        smalltip: '所有电影',
        fenleiList: fenleiList,
        chanpinList: chanpinList
      });
    });
  });
});

// 所有电影
router.get('/myshoucang', function (req, res, next) {
  var uid =req.session.uid;
  usermodel.getshoucang(uid,function (err, chanpinList) {
    if (err) {
      return next(err);
    }

    usermodel.getAllFenLei(function (err, fenleiList) {
      if (err) {
        return next(err);
      }
      res.render('user/chanpin/lists', {
        title: '电影列表',
        smalltip: '我的收藏',
        fenleiList: fenleiList,
        chanpinList: chanpinList
      });
    });
  });
});



// 按电影分类查询
router.get('/fllist/:id', function (req, res, next) {
  var fenlei = req.params.id;
  usermodel.getChanPinByFenLei(fenlei, function (err, chanpinList) {
    if (err) {
      return next(err);
    }
    usermodel.getAllFenLei(function (err, fenleiList) {
      if (err) {
        return next(err);
      }
      for (var i = 0; i < fenleiList.length; i++) {
        if (fenlei == fenleiList[i].id) {
          fenlei = fenleiList[i].name;
        }
      }
      res.render('user/chanpin/list', {
        title: '电影列表',
        smalltip: '分类查询：' + fenlei,
        fenleiList: fenleiList,
        chanpinList: chanpinList
      });
    });
  });
});

// 查看电影详情
router.get('/detail/:id', function (req, res, next) {
  var chanpinid = req.params.id;
  var nowdatetime = Date.parse(new Date()) / 1000;
  usermodel.getThisChanPinInfo(chanpinid, function (err, chanpinInfo) {
    if (err) {
      return next(err);
    }
    usermodel.getThisChanPinXingCheng(nowdatetime, chanpinid, function (err, xingchengList) {
      if (err) {
        return next(err);
      }
      usermodel.getThisChanPinImg(chanpinid, function (err, imgList) {
        if (err) {
          return next(err);
        }
        usermodel.getAllFenLei(function (err, fenleiList) {
          if (err) {
            return next(err);
          }
          usermodel.getPingLun(chanpinid, function (err, pinglunList) {
            if (err) {
              return next(err);
            }
            for (var i = 0; i < pinglunList.length; i++) {
              var sqltime = pinglunList[i].time;
              var parsetime = new Date(sqltime);
              pinglunList[i].time = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
            }
            for (var i = 0; i < xingchengList.length; i++) {
              var sqltime = xingchengList[i].time * 1000;
              var parsetime = new Date(sqltime);
              xingchengList[i].time = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
            }
            res.render('user/chanpin/detail', {
              title: '电影详情',
              chanpinInfo: chanpinInfo[0],
              xingchengList: xingchengList,
              imgList: imgList,
              fenleiList: fenleiList,
              pinglunList: pinglunList
            });
          });
        });
      });
    });
  });
});

// 获取当前场次座位
router.post('/getZw', function (req, res, next) {
  var xingchengid = req.body.xingchengid;
  usermodel.getYdZw(xingchengid, function (err, ydZwList) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.render('user/chanpin/_ZuoWei', {
      ydZwList: ydZwList
    }, function (err, html) {
      res.json({
        'success': true,
        'view': html
      });
    });
  });
});

// 购票
router.post('/gouPiao', function (req, res, next) {
  var chanpinid = req.body.chanpinid;
  var xingchengid = req.body.xingchengid;
  var zwid = req.body.zwid;
  var userid = req.session.uid;
  var ddrenshu = req.body.ddrenshu;
  var allprice = req.body.allprice;
  usermodel.gouPiao(chanpinid, xingchengid, zwid, userid, ddrenshu, allprice, function (err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    usermodel.updateXcNum(xingchengid, ddrenshu, function (err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': '购票成功，总价格为' + allprice
      });
    });
  });
});

// 添加评论
router.post('/addPingLun', function (req, res, next) {
  var content = req.body.content;
  var chanpinid = req.body.chanpinid;
  var userid = req.session.uid;
  usermodel.addPingLun(content, chanpinid, userid, function (err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '评论成功'
    });
  });
});

// 加入购物车
router.post('/addToShopCart', function (req, res, next) {
  var chanpinid = req.body.chanpinid;
  var xingchengid = req.body.xingchengid;
  var num = req.body.num;
  var userid = req.session.uid;
  usermodel.canAddToShopCart(xingchengid, userid, function (err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (rows.length > 0) {
      res.json({
        'error': '该商品已经在购物车了，请勿重复添加'
      });
      return next(err);
    }
    usermodel.addToShopCart(chanpinid, xingchengid, num, userid, function (err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': '加入购物车成功'
      });
    });
  });
});

// 下单
// router.post('/addDingDan', function(req, res, next) {
//   var chanpinid = req.body.chanpinid;
//   var xingchengid = req.body.xingchengid;
//   var userid = req.session.uid;
//   var ddrenshu = req.body.ddrenshu;
//   var allprice = req.body.allprice;
//   usermodel.addDingDan(chanpinid, xingchengid, userid, ddrenshu, allprice, function(err) {
//     if (err) {
//       res.json({
//         'error': err
//       });
//       return next(err);
//     }
//     usermodel.updateYdRenShu(ddrenshu, xingchengid, function(err) {
//       if (err) {
//         res.json({
//           'error': err
//         });
//         return next(err);
//       }
//       res.json({
//         'success': '下单成功'
//       });
//     });
//   });
// });

// 获取自己的订单
// router.get('/myorder', function(req, res, next) {
//   var userid = req.session.uid;
//   usermodel.selectMyDingDan(userid, '1', function(err, ycldingdanList) {
//     if (err) {
//       return next(err);
//     }
//     usermodel.selectMyDingDan(userid, '0', function(err, wcldingdanList) {
//       if (err) {
//         return next(err);
//       }
//       for (var i = 0; i < ycldingdanList.length; i++) {
//         var sqltime = ycldingdanList[i].time;
//         var parsetime = new Date(sqltime);
//         ycldingdanList[i].time = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
//       }
//       for (var i = 0; i < wcldingdanList.length; i++) {
//         var sqltime = wcldingdanList[i].time;
//         var parsetime = new Date(sqltime);
//         wcldingdanList[i].time = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
//       }
//       res.render('user/order/myorder', {
//         title: '我的订单',
//         ycldingdanList: ycldingdanList,
//         wcldingdanList: wcldingdanList
//       });
//     });
//   });
// });

// 修改密码
router.post('/updatePassword', function (req, res, next) {
  var hash = crypto.createHash('md5');
  var hash1 = crypto.createHash('md5');
  var userid = req.session.uid;
  var reqpassword = req.body.password;
  var reqoldPassword = req.body.oldpassword;
  hash.update(reqpassword);
  hash1.update(reqoldPassword);
  var password = hash.digest('hex');
  var oldpassword = hash1.digest('hex');
  usermodel.getOldPassword(userid, function (err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (oldpassword != rows[0].password) {
      res.json({
        'error': '请输入正确的原密码!'
      });
      return next(err);
    }
    usermodel.updatePassword(password, userid, function (err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': '修改密码成功'
      });
    });
  });
});

// 购物车
router.get('/shopcart', function (req, res, next) {
  var userid = req.session.uid;
  usermodel.getAllFenLei(function (err, fenleiList) {
    if (err) {
      return next(err);
    }
    usermodel.getUserShopCart(userid, function (err, cartList) {
      if (err) {
        return next(err);
      }
      usermodel.getDiZhi(userid, function (err, dizhiList) {
        if (err) {
          return next(err);
        }
        res.render('user/chanpin/shopcart', {
          title: '购物车',
          fenleiList: fenleiList,
          cartList: cartList,
          dizhiList: dizhiList
        });
      });
    });
  });
});

// 添加收货地址
router.post('/addDiZhi', function (req, res, next) {
  var address = req.body.address;
  var userid = req.session.uid;
  usermodel.addDiZhi(address, userid, function (err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '添加收货地址成功'
    });
  });
});

//添加收藏
router.post('/addshoucang', function (req, res, next) {
  var chanpinid = req.body.chanpinid;
  var uid = req.session.uid;
  usermodel.addshoucang(chanpinid, uid, function (err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '添加收藏成功'
    });
  });
});



// 下单
router.post('/addDingdan', function (req, res, next) {
  for (var i in req.body) {
    var chanpinid = req.body[i].chanpinid;
    var xingchengid = req.body[i].xingchengid;
    var userid = req.session.uid;
    var ddrenshu = req.body[i].itemnum;
    var allprice = req.body[i].itemprice;
    var dizhiid = req.body[i].dizhiid;
    usermodel.addDingdan(chanpinid, xingchengid, userid, ddrenshu, allprice, dizhiid, function (err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
    });
  }
  res.json({
    'success': '下单成功'
  });
});

// 我的订单
router.get('/mydingdan', function (req, res, next) {
  var userid = req.session.uid;
  usermodel.getAllFenLei(function (err, fenleiList) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    usermodel.selectMyDingDan(userid, function (err, dingdanList) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      usermodel.getMyDingDanImg(userid, function (err, dingdanimgList) {
        if (err) {
          res.json({
            'error': err
          });
          return next(err);
        }
        for (var i = 0; i < dingdanList.length; i++) {
          var sqltime = dingdanList[i].filmtime * 1000;
          var parsetime = new Date(sqltime);
          dingdanList[i].filmtime = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
        }
        for (var i = 0; i < dingdanList.length; i++) {
          var sqltime = dingdanList[i].time;
          var parsetime = new Date(sqltime);
          dingdanList[i].time = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
        }
        res.render('user/chanpin/dingdan', {
          title: '我的订单',
          fenleiList: fenleiList,
          dingdanList: dingdanList,
          dingdanimgList: dingdanimgList
        });
      });
    });
  });
});

// 退出登录
router.get('/logout', function (req, res) {
  req.session.name = '';
  req.session.uid = '';
  req.session.usertype = '';
  res.redirect('/');
});

router.get('/closeshou/:id', function (req, res) {
  var chanpinid=req.params.id;
  var uid=req.session.uid;

  usermodel.closeshou(chanpinid, uid, function (err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
    });
  

  res.redirect('/myshoucang');
});

module.exports = router;