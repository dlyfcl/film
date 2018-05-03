var db = require('./dboperation');
var sqls = require('./sqls');

module.exports = {
  // 验证用户
  selectUser: function(parameter, callback) {
    db.implement(sqls.sqlSelectUser, parameter, callback);
  },
  // 用户注册
  userReg: function(parameter, callback) {
    db.implement(sqls.sqlUserReg, parameter, callback);
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
  // 获取最新的6个产品
  getNewChanPin: function(callback) {
    var sql = "select chanpin.*, chanpinimg.url from chanpin right join chanpinimg on chanpin.id = chanpinimg.chanpinid group by chanpin.id order by chanpin.id desc limit 0, 7;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取所有产品
  getAllChanPin: function(callback) {
    var sql = "select chanpin.*, chanpinimg.url from chanpin right join chanpinimg on chanpin.id = chanpinimg.chanpinid group by chanpin.id;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
//添加收藏
  addshoucang:function(chanpinid,uid,callback) {
    var sql="insert into shoucang (uid,chanpinid) values (?,?);";
      db.exec(sql,[uid,chanpinid], function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },

  //我的收藏

  getshoucang:function(uid,callback) {
    var sql ="select chanpin.*, chanpinimg.url from chanpin right join chanpinimg on chanpin.id = chanpinimg.chanpinid  where chanpin.id IN (SELECT chanpinid FROM shoucang where uid = ?) group by chanpin.id;";
     db.exec(sql,uid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 按产品名称查询产品
  getChanPinByplace: function(place, callback) {
    var sql = "select chanpin.*, chanpinimg.url from chanpin right join chanpinimg on chanpin.id = chanpinimg.chanpinid where place like '%" + place + "%' group by chanpin.id;"
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 根据分类查询产品
  getChanPinByFenLei: function(fenleiid, callback) {
    var sql = "select chanpin.*, chanpinimg.url from chanpin right join chanpinimg on chanpin.id = chanpinimg.chanpinid where fenlei = ? group by chanpin.id;";
    db.exec(sql, fenleiid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取某个产品的基本信息
  getThisChanPinInfo: function(id, callback) {
    var sql = "select chanpin.*, fenlei.name as fenleiname from chanpin left join fenlei on chanpin.fenlei = fenlei.id where chanpin.id = ?;";
    db.exec(sql, id, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取某个产品的行程
  getThisChanPinXingCheng: function(nowdatetime, chanpinid, callback) {
    var sql = "select * from xingcheng where chanpinid = ? and time > ?;";
    db.exec(sql, [chanpinid, nowdatetime], function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取某个产品的图片
  getThisChanPinImg: function(chanpinid, callback) {
    var sql = "select * from chanpinimg where chanpinid = ?;";
    db.exec(sql, chanpinid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // addDingDan: function(chanpinid, xingchengid, userid, ddrenshu, allprice, callback) {
  //   var sql = "insert into dingdan(chanpinid, xingchengid, userid, ddrenshu, allprice, time, state) values(?,?,?,?,?,now(),0);";
  //   db.exec(sql, [chanpinid, xingchengid, userid, ddrenshu, allprice], function(err) {
  //     if (err) {
  //       callback(err);
  //     }
  //     callback(err);
  //   });
  // },
  // 下单后增加改行程剩余一定人数
  updateYdRenShu: function(ddrenshu, xingchengid, callback) {
    var sql = "update xingcheng set ydrenshu = ydrenshu + ? where id = ?;";
    db.exec(sql, [ddrenshu, xingchengid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 查看自己的订单
  selectMyDingDan: function(userid, callback) {
    var sql = "select dingdan.*, xingcheng.time as filmtime, chanpin.place from (dingdan left join xingcheng on dingdan.xingchengid = xingcheng.id) left join chanpin on dingdan.chanpinid = chanpin.id where dingdan.userid = ?;";
    db.exec(sql, userid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取原密码
  getOldPassword: function(id, callback) {
    var sql = "select * from user where id = ?;";
    db.exec(sql, id, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  // 修改密码
  updatePassword: function(password, id, callback) {
    var sql = "update user set password = ? where id = ?;";
    db.exec(sql, [password, id], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 加入购物车
  canAddToShopCart: function(xingchengid, userid, callback) {
    var sql = "select * from shopcart where xingchengid = ? and userid = ?;";
    db.exec(sql, [xingchengid, userid], function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  addToShopCart: function(chanpinid, xingchengid, num, userid, callback) {
    var sql = "insert into shopcart(chanpinid, xingchengid, num, userid) values(?,?,?,?);";
    db.exec(sql, [chanpinid, xingchengid, num, userid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 购物车
  getUserShopCart: function(userid, callback) {
    var sql = "select size, color, shopcart.id as cartid, shopcart.chanpinid, shopcart.xingchengid, chanpin.place, chanpin.price, shopcart.num from (shopcart left join chanpin on shopcart.chanpinid = chanpin.id) left join xingcheng on shopcart.xingchengid = xingcheng.id where shopcart.userid = ?;";
    db.exec(sql, userid, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  // 下单
  addDingdan: function(chanpinid, xingchengid, userid, ddrenshu, allprice, dizhiid, callback) {
    var sql = "insert into dingdan(chanpinid, xingchengid, userid, ddrenshu, allprice, dizhiid, time) values(?,?,?,?,?,?,now());";
    db.exec(sql, [chanpinid, xingchengid, userid, ddrenshu, allprice, dizhiid], function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		});
  },
  // 添加收货地址
  addDiZhi: function(address, userid, callback) {
    var sql = "insert into dizhi(address, userid) values(?,?);";
    db.exec(sql, [address, userid], function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		});
  },
  // 获取收货地址
  getDiZhi: function(userid, callback) {
    var sql = "select * from dizhi where userid = ?;";
    db.exec(sql, userid, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  // 获取我的订单
  getMyDingDan: function (userid, state, callback) {
    var sql = "select dingdan.id, dingdan.chanpinid, ddrenshu as num, allprice, time, place, size, color, state from ((dingdan left join chanpin on dingdan.chanpinid = chanpin.id) left join xingcheng on dingdan.xingchengid = xingcheng.id) left join dizhi on dingdan.dizhiid = dizhi.id where dingdan.userid = ? and dingdan.state = ?;";
    db.exec(sql, [userid, state], function (err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  getMyDingDanImg: function (userid, callback) {
    var sql = "select dingdan.chanpinid, chanpinimg.url from dingdan left join chanpinimg on dingdan.chanpinid = chanpinimg.chanpinid where dingdan.userid = ? group by chanpinimg.chanpinid;";
    db.exec(sql, userid, function (err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取最新发布的新闻
  getFourNews: function (callback) {
    var sql = "select * from news order by id desc limit 4;";
    db.exec(sql, '', function (err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 发表评论
  addPingLun: function (content, chanpinid, userid, callback) {
    var sql = "insert into pinglun(content, chanpinid, userid, time) values(?,?,?,now());";
    db.exec(sql, [content, chanpinid, userid], function (err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取评论
  getPingLun: function (chanpinid, callback) {
    var sql = "select user.name, pinglun.* from pinglun left join user on pinglun.userid = user.id where chanpinid = ?;";
    db.exec(sql, chanpinid, function (err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取已定座位
  getYdZw: function (xingchengid, callback) {
    var sql = "select * from dingdan where xingchengid = ?;";
    db.exec(sql, xingchengid, function (err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 购票
  gouPiao: function (chanpinid, xingchengid, zwid, userid, ddrenshu, allprice, callback) {
    var sql = "insert into dingdan(chanpinid, xingchengid, zwid, userid, ddrenshu, allprice, time, state) values(?,?,?,?,?,?,now(),1);";
    db.exec(sql, [chanpinid, xingchengid, zwid, userid, ddrenshu, allprice], function (err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  updateXcNum: function (xingchengid, ddrenshu, callback) {
    var sql = "update xingcheng set renshu = renshu - ?, ydrenshu = ydrenshu + ? where id = ?;";
    db.exec(sql, [ddrenshu, ddrenshu, xingchengid], function (err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  closeshou:function(chanpinid,uid,callback){
    var sql="DELETE FROM shoucang WHERE chanpinid = ? and uid = ?";
     db.exec(sql, [chanpinid,uid], function (err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
}
