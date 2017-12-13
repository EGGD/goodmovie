/*
MySQL Backup
Source Server Version: 5.6.21
Source Database: goodmoive
Date: 2017/12/13 16:22:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `ID` int(11) NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `UserComment` text,
  `movieId` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_Comment_ID` (`movieId`),
  CONSTRAINT `fk_Comment_ID` FOREIGN KEY (`movieId`) REFERENCES `movie` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `download`
-- ----------------------------
DROP TABLE IF EXISTS `download`;
CREATE TABLE `download` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `sourceName` char(255) DEFAULT NULL COMMENT '来源名称如（飘花）',
  `downloadUrl1` char(255) DEFAULT NULL COMMENT '下载地址1',
  `downloadUrl2` char(255) DEFAULT NULL COMMENT '下载地址2',
  `downloadUrl3` char(255) DEFAULT NULL COMMENT '下载地址3',
  `movieId` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_Download_ID` (`movieId`),
  CONSTRAINT `fk_Download_ID` FOREIGN KEY (`movieId`) REFERENCES `movie` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `image`
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ImageUrl` varchar(255) NOT NULL,
  `movieId` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `movieId` (`movieId`) USING BTREE,
  CONSTRAINT `fk_Image_ID` FOREIGN KEY (`movieId`) REFERENCES `movie` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `movie`
-- ----------------------------
DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` char(255) DEFAULT NULL,
  `Decsription` text,
  `Date_Time` datetime DEFAULT NULL,
  `Create_Time` datetime DEFAULT NULL COMMENT '创建时间',
  `Create_User` int(11) DEFAULT NULL COMMENT '创建人',
  `Is_Delete` tinyint(1) DEFAULT NULL COMMENT '1:删除',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records 
-- ----------------------------
INSERT INTO `download` VALUES ('1','飘花电影网','\r\nftp://h:h@piaohua668.com:12311/圣诞王子HD高清中字[飘花www.piaohua.com].mp4','\r\nmagnet:?xt=urn:btih:XPCVJ6LLB474RGO3YI2IBRXWXYKUAZB6','','1');
INSERT INTO `image` VALUES ('1','http://img.piaowu99.com/0701pic/allimg/17/4_12131334041530.jpg','1');
INSERT INTO `movie` VALUES ('1','圣诞王子HD1280','When a reporter goes undercover as a nanny to get the inside scoop on a playboy prince, she gets tangled in some royal intrigue and ends up finding love - but will she be able to keep up her lie?','2017-12-12 15:15:01','2017-12-13 15:15:06','1','0');
