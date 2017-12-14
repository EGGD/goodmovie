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
    pool.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) { //第一个请求           
                connection.query(HeanSeen.getHeanSeen(param.is_Delete), function (err, result) {
                    if (result) {
                        callback(err, result);
                    };
                })
            }, function (movieData, callback) { //第二个请求
                connection.query(HeanSeen.getHeanSeenImage(movieData[0].ID), function (err, result) {
                    if (result) {
                        callback(err, movieData, result);//请求结果返回到下一个请求
                    };
                })
            }, function (movieData, imageData, callback) {//第三个请求
                connection.query(HeanSeen.getHeanSeenDownload(movieData[0].ID), function (err, result) {
                    if (result) {
                        callback(err, movieData, imageData, result);//请求结果返回到下一个请求
                    };
                })
            }
        ], function (err, movieData, imageData, downloadData) {//获取前三个请求的结果
            movieData[0].Image_Url = imageData;
            movieData[0].Download = downloadData;
            responseJSON(res, movieData);
            connection.release();
        })
    })
});

//导出
module.exports = router;