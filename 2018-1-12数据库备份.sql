/*
MySQL Backup
Source Server Version: 5.6.21
Source Database: goodmoive
Date: 2018/1/12 13:12:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `ID` int(11) NOT NULL,
  `User_Id` int(11) DEFAULT NULL,
  `User_Comment` text,
  `Movie_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_Comment_ID` (`Movie_Id`),
  CONSTRAINT `fk_Comment_ID` FOREIGN KEY (`Movie_Id`) REFERENCES `movie` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `download`
-- ----------------------------
DROP TABLE IF EXISTS `download`;
CREATE TABLE `download` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Sownload_Url` char(255) DEFAULT NULL COMMENT '下载地址1',
  `Movie_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_Download_ID` (`Movie_Id`),
  CONSTRAINT `fk_Download_ID` FOREIGN KEY (`Movie_Id`) REFERENCES `movie` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `image`
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Image_Url` varchar(255) NOT NULL,
  `Movie_Id` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `movieId` (`Movie_Id`) USING BTREE,
  CONSTRAINT `fk_Image_ID` FOREIGN KEY (`Movie_Id`) REFERENCES `movie` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `movie`
-- ----------------------------
DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` char(255) DEFAULT NULL,
  `Name_Title` char(255) DEFAULT NULL COMMENT '英文名',
  `Category` char(255) DEFAULT NULL COMMENT '类别',
  `Director` char(255) DEFAULT NULL COMMENT '导演',
  `Decsription` text,
  `Date_Time` datetime DEFAULT NULL,
  `Create_Time` datetime DEFAULT NULL COMMENT '创建时间',
  `Create_User` int(11) DEFAULT NULL COMMENT '创建人',
  `Is_Delete` tinyint(1) DEFAULT NULL COMMENT '0:删除,1:未看,2:已看',
  `sys_user_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_user_ID` (`sys_user_ID`),
  CONSTRAINT `fk_user_ID` FOREIGN KEY (`sys_user_ID`) REFERENCES `sys_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `permissions` varchar(255) DEFAULT NULL COMMENT '权限1:管理2:vip3:普通',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records 
-- ----------------------------
INSERT INTO `download` VALUES ('1','ftp://h:h@piaohua668.com:12311/圣诞王子HD高清中字[飘花www.piaohua.com].mp4','1'), ('2','xt=urn:btih:XPCVJ6LLB474RGO3YI2IBRXWXYKUAZB6','1'), ('13',' ftp://h:h@piaohua668.com:12311/圣诞王子HD高清中字[飘花www.piaohua.com].mp4','21'), ('14',' ftp://h:h@piaohua668.com:12311/疯狂特警队BD法语中字[飘花www.piaohua.com].mp4','21'), ('21','ftp://h:h@piaohua668.com:12311/寂静中的惊奇BD中英双字[飘花www.piaohua.com].mp4','42');
INSERT INTO `image` VALUES ('1','http://www.btbtt.co/upload/attach/004/169/cb35fc4f7c903ce62f2f4f615740f425.jpg','1'), ('2','http://www.baidu.com','1'), ('15','http://www.btbtt.co/upload/attach/004/169/cb35fc4f7c903ce62f2f4f615740f425.jpg','21'), ('16','http://img.piaowu99.com/0701pic/allimg/18/4_010215255b218.jpg','21'), ('23','http://www.btbtt.co/upload/attach/004/216/ba78378b8b0134f220bbee527737e6a6.jpg\n','42');
INSERT INTO `movie` VALUES ('1','圣诞王子HD1280','A Christmas Prince','爱情','亚历克斯·扎姆 Alex Zamm','When a reporter goes undercover as a nanny to get the inside scoop on a playboy prince, she gets tangled in some royal intrigue and ends up finding love - but will she be able to keep up her lie?','2017-12-12 15:15:01','2017-12-13 15:15:06','1','2','1'), ('21','电影名称','英文名','类别','导演','简介1','2018-01-02 15:15:15','2018-01-02 15:15:15','1','1','1'), ('42','时间','time','movie','大爷','简介','2017-12-12 15:15:01','2017-12-12 15:15:01','1','1','1');
INSERT INTO `sys_user` VALUES ('1','admin','admin',NULL,'1');
