var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbmovieConfig = require('../db/DBmovieConfig');
var HeanSeen = require('../db/HeanSeen');
var pool = mysql.createPool(dbmovieConfig.mysql);
var async = require('async');
// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200', msg: '操作失败1'
        });
    } else {
        res.json(ret);
    }
};


/* GET home page. */
//请求 http://localhost:3001/getHeanSeen?is_Delete=2
router.get('/', function (req, res, next) {
    var param = req.query || req.params;
    var imglist = [], downloadlist = [];
    pool.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) { //第一个请求           
                connection.query(HeanSeen.getHeanSeen(param.is_Delete), function (err, result) {
                    if (result) {
                        callback(err, result);
                    };
                })
            }, function (movieData, callback) { //第二个请求
                for (let i = 0; i < movieData.length; i++) {
                    connection.query(HeanSeen.getHeanSeenImage(movieData[i].ID), function (err, result) {
                        if (result) {
                            movieData[i].Image_Url=result;
                            if(i==movieData.length-1)callback(err, movieData, result);//请求结果返回到下一个请求
                        };
                    })
                }
            }, function (movieData, imageData, callback) {//第三个请求
                for (let i = 0; i < movieData.length; i++) {
                    connection.query(HeanSeen.getHeanSeenDownload(movieData[i].ID), function (err, result) {
                        if (result) {
                            movieData[i].Download=result;
                            if(i==movieData.length-1)callback(err, movieData, imageData, result);//请求结果返回到下一个请求
                        };
                    })
                }
            }
        ], function (err, movieData, imageData, downloadData) {//获取前三个请求的结果
            responseJSON(res, movieData);
            connection.release();
        })
    })
});

//导出
module.exports = router;