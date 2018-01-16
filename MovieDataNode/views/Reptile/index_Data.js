var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var fs = require("fs");
var mkdirp = require('mkdirp');
var url = 'http://www.piaohua.com';
// var url = 'http://localhost:8050/';
// var url = 'http://localhost:8050/index2.html';
function replaceSpace(str) {
  return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '')
}

//获取需要的字段
function getTextDiv(value) {
  let textDivlist = {
    Name: "",
    Name_Title: "",
    Category: "",
    Director: "",
    Decsription: "",
    Date_Time: "",
  };
  value = value.split("◎");
  for (let i = 0; i < value.length; i++) {
    if (value[i].indexOf("译　　名") != -1) textDivlist.Name_Title = replaceSpace(value[i].replace(/译　　名/, ""));
    if (value[i].indexOf("片　　名") != -1) textDivlist.Name = replaceSpace(value[i].replace(/片　　名/, ""));
    if (value[i].indexOf("类　　别") != -1) textDivlist.Category = replaceSpace(value[i].replace(/类　　别/, ""));
    if (value[i].indexOf("导　　演") != -1) textDivlist.Director = replaceSpace(value[i].replace(/导　　演/, ""));
    if (value[i].indexOf("上映日期") != -1) textDivlist.Date_Time = replaceSpace(value[i].replace(/上映日期/, ""));
    if (value[i].indexOf("简　　介") != -1) textDivlist.Decsription = replaceSpace(value[i].replace(/简　　介/, ""));
  }
  return textDivlist;
}
//本地存储目录
var dir = './imgs';
//下载图片
var download = function (url, dir, filename) {
  request.head(url, function (err, res, body) {
    request(url).pipe(fs.createWriteStream(dir + "/" + filename));
  });
};

//根据返回的href来访问详情界面
function getMovieDetail(list, res) {
  var movieDetailData = [];
  let getlistlength = 0;
  for (let z = 0; z < list.length; z++) {
    request(list[z].list_href, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //初始化页面可以用$来访问
        let $ = cheerio.load(body);
        let textDivlist = {};
        let detailImglist = [];
        let download_Url = [];
        //获取到详情的文本
        let textDiv = $("#showinfo div").text();
        textDivlist = getTextDiv(textDiv, textDivlist);
        //获取到所有的图片 带alt的大图
        let detailImg = $("#showinfo img[alt]");
        for (let i = 0; i < detailImg.length; i++) {
          detailImglist.push(detailImg[i].attribs.src);
          //保存图片
          //download(detailImg[i].attribs.src, dir, Math.floor(Math.random()*100000) + detailImg[i].attribs.src.substr(-4, 4));
        }
        //下载地址
        let downloadlist = $("table td a");
        for (let i = 0; i < downloadlist.length; i++) {
          download_Url.push(replaceSpace(downloadlist[i].attribs.href));
        }
        movieDetailData.push({
          textDiv: textDivlist,
          detailImg: detailImglist,
          download_Url: download_Url,
          list_href: list[z].list_href,
        })
        //因为是获取列表中的详情 所以需要所有的详情都访问过之后才能加载返回
        getlistlength++;
        if (getlistlength === list.length) {
          console.log(getlistlength)
          res.json({
            code: '200',
            data: movieDetailData,
          });
        }
      }
    })
  }
}

//获取到页面的列表数据
router.get('/', function (req, res, next) {
  request(url, function (error, response, body) {

    var movieListData = [];
    if (!error && response.statusCode == 200) {
      //获取列表数据
      var $ = cheerio.load(body); //当前的$符相当于拿到了所有的body里面的选择器
      var navText = $("#iml1 ul:first-of-type");
      navText.find('li').each((i, item) => {
        var lithis = item;
        // var list_href = item.children[0].attribs.href;
        //拿取到列表的所有的连接href
        var list_href = url + item.children[0].attribs.href;
        // var list_name = replaceHtmlTag(item.children[0].children[0].attribs.alt);
        movieListData.push({
          list_href: list_href,
          // list_name: list_name,
        })
      })
      //获取个体详情
      getMovieDetail(movieListData, res);
    }
  })
});
module.exports = router;