var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbmovieConfig = require('../db/DBmovieConfig');
var AddMovie = require('../db/AddMovie');
var pool = mysql.createPool(dbmovieConfig.mysql);
var async = require('async');
// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200', msg: '操作失败1'
        });
    } else {
        res.json({ code: '200', msg: ret });
    }
};

router.post('/', function (req, res, next) {
    var param = req.body;
    pool.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) { //第一个请求           
                connection.query(AddMovie.selectMovie(), [
                    param.Name
                ], function (err, result) {
                    if (result) {
                        callback(err, result);
                    } else {
                        res.send(err);
                    };
                })
            }, function (selsect, callback) { //第一个请求           
                if (selsect.length != 0) {
                    responseJSON(res, {
                        data: '数据已存在',
                        item: selsect
                    });
                    connection.release();
                } else {
                    connection.query(AddMovie.postAddMovie(), [
                        param.Name, param.Name_Title, param.Category, param.Director, param.Decsription,
                        param.Date_Time, param.Create_Time, param.Create_User, param.Is_Delete, param.sys_user_ID
                    ], function (err, result) {
                        if (result) {
                            callback(err, result);
                        } else {
                            res.send(err);
                        };
                    })
                }
            }, function (AddMoive, callback) { //第二个请求
                let onimglist = ""
                if (param.Image_Url) {
                    onimglist = param.Image_Url.split("|");
                    for (let i = 0; i < onimglist.length; i++) {
                        if (onimglist[i] != "") {
                            connection.query(AddMovie.postAddMovieImage(), [AddMoive.insertId, onimglist[i]], function (err, result) {
                                if (result) {
                                    if (i == onimglist.length - 1) callback(err, AddMoive, result);//请求结果返回到下一个请求
                                } else {
                                    res.send(err);
                                };
                            })
                        }
                    }
                } else {
                    responseJSON(res, param.Image_Url);
                    connection.release();
                }


            }, function (AddMoive, imageData, callback) {//第三个请求
                let ondwnlist;
                if (param.Sownload_Url) {
                    ondwnlist = param.Sownload_Url.split("|");
                    for (let i = 0; i < ondwnlist.length; i++) {
                        if (ondwnlist[i] != "") {
                            connection.query(AddMovie.postAddMovieDownload(), [AddMoive.insertId, ondwnlist[i]], function (err, result) {
                                if (result) {
                                    if (i == ondwnlist.length - 1) callback(err, AddMoive, imageData, result);//请求结果返回到下一个请求
                                } else {
                                    res.send(err);
                                };
                            })
                        }
                    }
                } else {
                    responseJSON(res, param.Sownload_Url);
                    connection.release();
                }

            }
        ], function (err, AddMoive, imageData, downloadData) {//获取前三个请求的结果
            responseJSON(res, AddMoive);
            connection.release();
        })
    })
});

//导出
module.exports = router;