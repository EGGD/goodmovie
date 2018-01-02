var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbmovieConfig = require('../db/DBmovieConfig');
var AddMovie = require('../db/AddMovie');
var pool = mysql.createPool(dbmovieConfig.mysql);
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
    debugger
    var param = req.query || req.params;
    // pool.getConnection(function (err, connection) {
    //   responseJSON(res, "movieData");
    //   connection.release();
    // })
    console.log(req.body);
    res.send(req.body);
});

//导出
module.exports = router;