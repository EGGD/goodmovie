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
                connection.query(HeanSeen.getHeanSeen(), [param.is_Delete], function (err, result) {
                    if (result) {
                        callback(err, result);
                    } else {
                        res.send(err);
                    };
                })
            },function (movieData, callback) {//第三个请求
                connection.query(HeanSeen.getHeanSeenTotal(), [param.is_Delete], function (err, result) {
                    if (result) {
                        callback(err, movieData, result[0].Total);//请求结果返回到下一个请求
                    };
                })
            }, function (movieData,total, callback) { //第二个请求
                if (movieData.length == 0) {
                    responseJSON(res, {
                        data: '暂无数据',
                    });
                    connection.release();
                } else {
                    for (let i = 0; i < movieData.length; i++) {
                        connection.query(HeanSeen.getHeanSeenImage(), [movieData[i].ID], function (err, result) {
                            if (result) {
                                movieData[i].Image_Url = result;
                                if (i == movieData.length - 1) callback(err, movieData,total, result);//请求结果返回到下一个请求
                            };
                        })
                    }
                }
            }, function (movieData,total, imageData, callback) {//第三个请求
                for (let i = 0; i < movieData.length; i++) {
                    connection.query(HeanSeen.getHeanSeenDownload(), [movieData[i].ID], function (err, result) {
                        if (result) {
                            movieData[i].Download = result;
                            if (i == movieData.length - 1) callback(err, movieData,total, imageData, result);//请求结果返回到下一个请求
                        };
                    })
                }
            }
        ], function (err, movieData,total, imageData, downloadData) {//获取前三个请求的结果
            let ondata={
                data:movieData,
                total:total
            }
            responseJSON(res, ondata);
            connection.release();
        })
    })
});

//导出
module.exports = router;