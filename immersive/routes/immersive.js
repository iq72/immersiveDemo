var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
var Videos = AV.Object.extend('Videos');

// 获取Videos信息
router.get('/', function(req, res, next) {
  var query = new AV.Query(Videos);
  query.descending('createdAt');
  query.find({
    success: function(results) {
      console.log("Results: \n" + results[3]);
      // var jvs=[];
      // results.forEach(function(result){
      //     // console.log("TYPE OF Result : "+ typeof(result.get('result')));
      //     var jsonString = JSON.stringify(result);
      //     jvs.push(jsonString);
      //     // console.log("JSONsting: \n"+jsonString);
      // });
      res.render('immersive', {
        videos: results,
      //  jvideos: jvs
      });
    },
    error: function(err) {
      if (err.code === 101) {
        // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
        // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
        res.render('immersive', {
          todos: []
        });
      } else {
        next(err);
      }
    }
  });
});



module.exports = router;
