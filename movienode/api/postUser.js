var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbmovieConfig = require('../db/DBmovieConfig');
var PostUser = require('../db/PostUser');
var pool = mysql.createPool(dbmovieConfig.mysql);
// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200', msg: '操作失败1'
        });
    } else {
        res.json({ code: '200', msg: ret[0] });
    }
};
router.post('/', function (req, res, next) {
    var param = req.body;
    pool.getConnection(function (err, connection) {
        connection.query(PostUser.login(), [param.Name, param.Password], function (err, result) {
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