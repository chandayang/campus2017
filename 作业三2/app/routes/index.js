var express = require('express');
var fs=require('fs');
var handler = require('../models/data.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/',function(req,res){
  console.log(req.body);
  if(req.body.all=="all"){
  	res.send(JSON.stringify(handler("all")));
  }else if(req.body.suc=="success"){
  	res.send(stringify(handler("success")));
  }else if(req.body.fail=="fail"){
  	res.send(JSON.stringify(handler("fail")));
  }
})




//将数组转换成字符串对象的函数
var depth=0;
function stringify(node ) {	
  var indent = '  '.repeat(depth);
  if (Array.isArray(node)) {
    return `[\n` +
      node.map(item => `${indent}  ${stringify(item, depth + 1)}`).join(',\n') +
      `\n${indent}]`;
  }
  if (
    typeof node === 'object' &&
      node !== null &&
      !(node instanceof Date)
  ) {
    return `{\n` +
      Object.keys(node).map((key) => {
        var  value = node[key];
        return `${indent}  "${key}": ${stringify(value, depth + 1)}`;
      }).join(',\n') +
      `\n${indent}}`;
  }
  return JSON.stringify(node, null, 2);
}
module.exports = router;
