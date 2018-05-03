/*
Navicat MySQL Data Transfer

Source Server         : 本地库
Source Server Version : 100119
Source Host           : 127.0.0.1:3306
Source Database       : film

Target Server Type    : MYSQL
Target Server Version : 100119
File Encoding         : 65001

Date: 2018-04-19 17:19:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `account` varchar(50) CHARACTER SET utf8 NOT NULL,
  `password` varchar(50) CHARACTER SET utf8 NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `quanxian` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', '202cb962ac59075b964b07152d234b70', '超级管理员', '1');
INSERT INTO `admin` VALUES ('5', 'admin2', '123', '普通管理员2', '0');

-- ----------------------------
-- Table structure for chanpin
-- ----------------------------
DROP TABLE IF EXISTS `chanpin`;
CREATE TABLE `chanpin` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `place` varchar(50) CHARACTER SET utf8 NOT NULL,
  `introduce` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `fenlei` int(10) NOT NULL,
  `price` varchar(50) CHARACTER SET utf8 NOT NULL,
  `hasimg` int(10) NOT NULL,
  `adminid` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of chanpin
-- ----------------------------
INSERT INTO `chanpin` VALUES ('3', '奥特曼', '奥特曼奥特曼奥特曼奥特曼奥特曼奥特曼', '1', '12', '1', '1');

-- ----------------------------
-- Table structure for chanpinimg
-- ----------------------------
DROP TABLE IF EXISTS `chanpinimg`;
CREATE TABLE `chanpinimg` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `chanpinid` int(10) NOT NULL,
  `url` varchar(1000) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of chanpinimg
-- ----------------------------
INSERT INTO `chanpinimg` VALUES ('3', '3', '/uploads/3/3-0-8694a4c27d1ed21b17afadc7a96eddc451da3fa9.jpg');

-- ----------------------------
-- Table structure for dingdan
-- ----------------------------
DROP TABLE IF EXISTS `dingdan`;
CREATE TABLE `dingdan` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `chanpinid` int(10) NOT NULL,
  `xingchengid` int(10) NOT NULL,
  `zwid` varchar(100) CHARACTER SET utf8 NOT NULL,
  `userid` int(10) NOT NULL,
  `ddrenshu` int(10) NOT NULL,
  `allprice` varchar(50) CHARACTER SET utf8 NOT NULL,
  `time` datetime NOT NULL,
  `state` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dingdan
-- ----------------------------

-- ----------------------------
-- Table structure for dizhi
-- ----------------------------
DROP TABLE IF EXISTS `dizhi`;
CREATE TABLE `dizhi` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `address` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `userid` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dizhi
-- ----------------------------

-- ----------------------------
-- Table structure for fenlei
-- ----------------------------
DROP TABLE IF EXISTS `fenlei`;
CREATE TABLE `fenlei` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of fenlei
-- ----------------------------
INSERT INTO `fenlei` VALUES ('1', '测试分类1');
INSERT INTO `fenlei` VALUES ('2', '测试分类2');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(10000) CHARACTER SET utf8 NOT NULL,
  `content` varchar(10000) CHARACTER SET utf8 NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('1', '测试新闻', '测试新闻内容测试新闻内容测试新闻内容测试新闻内容测试新闻内容测试新闻内容测试新闻内容', '2018-04-04 16:45:12');

-- ----------------------------
-- Table structure for pinglun
-- ----------------------------
DROP TABLE IF EXISTS `pinglun`;
CREATE TABLE `pinglun` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `chanpinid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pinglun
-- ----------------------------
INSERT INTO `pinglun` VALUES ('1', '电影不错哦', '1', '1', '2018-04-04 16:38:19');
INSERT INTO `pinglun` VALUES ('2', '测试评论1', '1', '2', '2018-04-04 16:44:26');

-- ----------------------------
-- Table structure for shopcart
-- ----------------------------
DROP TABLE IF EXISTS `shopcart`;
CREATE TABLE `shopcart` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `chanpinid` int(10) NOT NULL,
  `xingchengid` int(10) NOT NULL,
  `num` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of shopcart
-- ----------------------------

-- ----------------------------
-- Table structure for shoucang
-- ----------------------------
DROP TABLE IF EXISTS `shoucang`;
CREATE TABLE `shoucang` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `chanpinid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of shoucang
-- ----------------------------
INSERT INTO `shoucang` VALUES ('1', '1', '3');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `account` varchar(100) CHARACTER SET utf8 NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'mht', '123', '马化腾', '17855831222');
INSERT INTO `user` VALUES ('2', 'lqd', '123', '刘强东', '17855831222');
INSERT INTO `user` VALUES ('3', '13819255896', '123456', 'qsdas', 'dsad');
INSERT INTO `user` VALUES ('4', '17855834153', '123', 'qwe', 'qwe');

-- ----------------------------
-- Table structure for xingcheng
-- ----------------------------
DROP TABLE IF EXISTS `xingcheng`;
CREATE TABLE `xingcheng` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `chanpinid` int(10) NOT NULL,
  `renshu` int(10) NOT NULL,
  `ydrenshu` int(10) NOT NULL,
  `time` varchar(20) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of xingcheng
-- ----------------------------
