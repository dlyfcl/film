var db = require('./dboperation');

module.exports = {
  // 验证管理员
  selectAdmin: function(account, callback) {
    var sql = "select * from admin where account = ?;";
    db.exec(sql, account, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取所有产品页码
  getAllChanPinPage: function(callback) {
    var sql = "select ceil(count(id)/10) as page from chanpin;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 产品管理页面显示所有产品
  selectAllChanPin: function(page, callback) {
    var sql = "select chanpin.*, fenlei.name as fenleiname from chanpin left join fenlei on chanpin.fenlei = fenlei.id order by id desc limit " + page + ", 10;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 添加产品基本信息
  addChanPinInfo: function(place, introduce, fenlei, price, adminid, callback) {
    var sql = "insert into chanpin(place, introduce, fenlei, price, adminid) values(?,?,?,?,?);";
    db.exec(sql, [place, introduce, fenlei, price, adminid], function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 添加图片路径
  addChanPinImg: function(chanpinid, url, callback) {
    var sql = "insert into chanpinimg(chanpinid, url) values(?,?);";
    db.exec(sql, [chanpinid, url], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 更改hasImg字段
  updateChanPinHasImg: function(chanpinid, callback) {
    var sql = "update chanpin set hasimg = 1 where id = ?;";
    db.exec(sql, chanpinid, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取某个产品的信息
  getThisChanPinInfo: function(id, callback) {
    var sql = "select * from chanpin where id = ?;";
    db.exec(sql, id, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },

  delchanping:function(chanpinid,callback){

    console.log(chanpinid);
    var sql="DELETE FROM chanpin WHERE id = ?";
    var sqls='DELETE FROM chanpinimg WHERE chanpinid = ?';
    db.exec(sql,chanpinid, function(err, rows) {

      if (err) {
        callback(err);
      }
      // callback(err, rows);
    });
    db.exec(sqls,chanpinid, function(err, rows) {

      if (err) {
        callback(err);
      }
      // callback(err, rows);
    });
  },
  // 修改产品信息
  updateChanPinInfo: function(place, introduce, fenlei, price, adminid, chanpinid, callback) {
    var sql = "update chanpin set place = ?, introduce = ?, fenlei = ?, price = ?, adminid = ? where id = ?;";
    db.exec(sql, [place, introduce, fenlei, price, adminid, chanpinid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取某个产品的所有图片
  getThisChanPinImg: function(chanpinid, callback) {
    var sql = "select * from chanpinimg where chanpinid = ?;";
    db.exec(sql, chanpinid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 为产品添加行程
  addXingCheng: function(chanpinid, time, callback) {
    var sql = "insert into xingcheng(chanpinid, renshu, ydrenshu, time) values(?,220,0,?);";
    db.exec(sql, [chanpinid, time], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取某个产品的行程
  getThisXingCheng: function(chanpinid, callback) {
    var sql = "select * from xingcheng where chanpinid = ?;";
    db.exec(sql, chanpinid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取所有分类
  getAllFenLei: function(callback) {
    var sql = "select * from fenlei;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 添加分类
  addFenLei: function(name, callback) {
    var sql = "insert into fenlei(name) values(?);";
    db.exec(sql, name, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 修改分类名称
  xgFenLei: function(name, id, callback) {
    var sql = "update fenlei set name = ? where id = ?;";
    db.exec(sql, [name, id], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取已处理或未处理订单页码
  getAllDingDanPage: function(state, callback) {
    var sql = "select ceil(count(id)/10) as page from dingdan where state = ?;";
    db.exec(sql, state, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取已处理或未处理订单
  selectAllDingDan: function(state, page, callback) {
    var sql = "select dingdan.*, chanpin.place, xingcheng.time as filmtime from (dingdan left join chanpin on dingdan.chanpinid = chanpin.id) left join xingcheng on xingcheng.id = dingdan.xingchengid where state = ? order by id desc limit " + page + ", 10;";
    db.exec(sql, state, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取订单用户信息
  getThisDingDanUserInfo: function(userid, callback) {
    var sql = "select * from user where id = ?;";
    db.exec(sql, userid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 处理订单
  handleDingDan: function(id, callback) {
    var sql = "update dingdan set state = 1 where id = ?;";
    db.exec(sql, id, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  addXiaoLiang: function (id, num, callback) {
    var sql = "update xingcheng set ydrenshu = ydrenshu + ?, renshu = renshu - ? where id = ?;";
    db.exec(sql, [num, num, id], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 显示所有用户
  selectAllUser: function(callback) {
    var sql = "select * from user order by id desc;";
    db.exec(sql, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 显示所有管理员
  selectAllAdmin: function(callback) {
    var sql = "select * from admin;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 添加管理员
  addAdmin: function(account, password, name, quanxian, callback) {
    var sql = "insert into admin(account, password, name, quanxian) values(?,?,?,?);";
    db.exec(sql, [account, password, name, quanxian], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 添加新闻
  addNews: function (title, content, callback) {
    var sql = "insert into news(title, content, time) values(?,?,now());";
    db.exec(sql, [title, content], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取新闻
  getNews: function (callback) {
    var sql = "select * from news;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
}
