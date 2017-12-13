var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var ColorSql = require('../db/ColorSql');
var pool = mysql.createPool(dbConfig.mysql);


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
router.get('/', function (req, res, next) {
    var param = req.query || req.params;
    pool.getConnection(function(err,connection){
        connection.query(ColorSql.queryAll,function(err,result){
            if(result){
                data={
                    code:3000,
                    msg:'查询成功1',
                    length:result.length,
                    list:result
                };
            };
            responseJSON(res,data);
            connection.release();
        });
    });
    // res.render('order', { title: text });
    //当数据请求为200的时候返回下面的数据  格式为json的格式
    // res.status(200).jsonp(req.query);
});
//导出
module.exports = router;