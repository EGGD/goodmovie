var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var text = encodeURIComponent(req.query.text);
  var someUrl = 'https://www.bing.com/translator/api/Translate/TranslateArray?from=-&to=zh-CHS'
  var data = {
    id: 174070465,
    text: text
  };
  request.post({ url: someUrl, formData: data }, (err, res, body) => {
    if (err) console.log(err)
    console.log(body)
  })

  res.render('order', { title: text });
});
//导出
module.exports = router;