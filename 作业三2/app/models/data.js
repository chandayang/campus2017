/*
* @Author: Administrator
* @Date:   2017-04-18 19:13:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-08 10:58:23
*/
var data = require("../public/data.json");
//定义处理数据的模块

function handler(state){
	var handledDate = [];
	if (state == 'success'){
		data.map(function(item){
			if(item['state']==true){
				handledDate.push(item);
      		}
		})
	}
	if (state == 'fail'){
		data.map(function(item){
			if(item['state']==false){
				handledDate.push(item);
      		}
		})
	}
	if (state == 'all'){
		data.map(function(item){
			handledDate.push(item);
		})
	}
	return handledDate;
}
module.exports=handler;


