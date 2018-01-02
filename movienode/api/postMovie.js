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
        res.json(ret);
    }
};

router.post('/',function (req, res, next) {
    var param =  req.body;
    pool.getConnection(function (err, connection) {
        async.waterfall([
            function (callback) { //第一个请求           
                connection.query(AddMovie.postAddMovie(param), function (err, result) {               
                    if (result) {
                        callback(err, result);
                    }else{
                        res.send(err);
                    };
                })
            },function (AddMoive, callback) { //第二个请求
                debugger
                connection.query(AddMovie.postAddMovieImage(AddMoive.insertId,param.Image_Url), function (err, result) {
                    if (result) {
                        callback(err, AddMoive, result);//请求结果返回到下一个请求
                    }else{
                        res.send(err);
                    };
                })
            },function (AddMoive, imageData, callback) {//第三个请求
                connection.query(AddMovie.postAddMovieDownload(AddMoive.insertId,param.Sownload_Url), function (err, result) {
                    if (result) {
                        callback(err, AddMoive, imageData, result);//请求结果返回到下一个请求
                    };
                })
            }
        ], function (err, AddMoive, imageData, downloadData) {//获取前三个请求的结果
            AddMoive.Image_Url = imageData;
            AddMoive.Download = downloadData;
            responseJSON(res, AddMoive);
            connection.release();
        })
    })
    // console.log(req.body);
    // res.send(req.body);
});

//导出
module.exports = router;