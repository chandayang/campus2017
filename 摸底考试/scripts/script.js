/*
* @Author: Administrator
* @Date:   2017-05-11 09:09:18
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-13 10:03:19
*/
$(function(){
	//提交按钮状态转换
	var radios = $("input[type='radio']");
	for(var i=0;i<radios.length;i++){
		//循环绑定事件
		(function(){      
		   var p = i     
		   radios[i].onclick = function() {      
		     	$('#mask').css("display","none");    
		   }  
		 })(); 
	}

//提交之后弹出模态框
	$("#submit").on("click",function(){
	    $("#diaWrap").css('display','block');
    	$("#dialog").css('display','block');
    	ModalHelper.afterOpen();
    });

    $("#close").on("click",function(){
    	$("#diaWrap").css('display','none');
    	$("#dialog").css('display','none');
    	ModalHelper.beforeClose();
    	
    });


//阻止遮罩层下面的内容滚动
	var ModalHelper = (function(bodyCls) {
	  var scrollTop;
	  return {
	    afterOpen: function() {
	      scrollTop = document.scrollingElement.scrollTop;
	      document.body.classList.add(bodyCls);
	      document.body.style.top = -scrollTop + 'px';
	    },
	    beforeClose: function() {
	      document.body.classList.remove(bodyCls);
	      // scrollTop lost after set position:fixed, restore it back.
	      document.scrollingElement.scrollTop = scrollTop;
	    }
	  };
	})('modal_open');
})


  		