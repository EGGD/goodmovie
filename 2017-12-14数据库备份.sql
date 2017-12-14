/*
MySQL Backup
Source Server Version: 5.6.21
Source Database: goodmoive
Date: 2017/12/14 17:31:57
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
  `Source_Name` char(255) DEFAULT NULL COMMENT '来源名称如（飘花）',
  `Sownload_Url` char(255) DEFAULT NULL COMMENT '下载地址1',
  `Movie_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_Download_ID` (`Movie_Id`),
  CONSTRAINT `fk_Download_ID` FOREIGN KEY (`Movie_Id`) REFERENCES `movie` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

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
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records 
-- ----------------------------
INSERT INTO `download` VALUES ('1','飘花电影网','\r\nftp://h:h@piaohua668.com:12311/圣诞王子HD高清中字[飘花www.piaohua.com].mp4','1'), ('2','飘花电影网','xt=urn:btih:XPCVJ6LLB474RGO3YI2IBRXWXYKUAZB6','1');
INSERT INTO `image` VALUES ('1','http://img.piaowu99.com/0701pic/allimg/17/4_12131334041530.jpg','1'), ('2','http://www.baidu.com','1');
INSERT INTO `movie` VALUES ('1','圣诞王子HD1280','A Christmas Prince','爱情','亚历克斯·扎姆 Alex Zamm','When a reporter goes undercover as a nanny to get the inside scoop on a playboy prince, she gets tangled in some royal intrigue and ends up finding love - but will she be able to keep up her lie?','2017-12-12 15:15:01','2017-12-13 15:15:06','1','2');
