var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbmovieConfig = require('../db/DBmovieConfig');
var PostSetMovie = require('../db/PostSetMovie');
var pool = mysql.createPool(dbmovieConfig.mysql);
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
      // responseJSON(res, param);
      // connection.release();
        var paramIs_Delete=param.Is_Delete===1?2:1;
        connection.query(PostSetMovie.setMovie(),[paramIs_Delete,param.Decsription], function (err, result) {
            if (result) {
                responseJSON(res, result);
            } else {
                responseJSON(res, err);
            };
            connection.release();
        })
    })
});

//导出
module.exports = router;