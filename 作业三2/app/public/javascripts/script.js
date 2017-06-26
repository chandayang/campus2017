/*
* @Author: Administrator
* @Date:   2017-04-17 11:30:32
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-26 20:05:45
*/
window.onload=function(){
    //定义原生ajax函数
    function createXHR(){
        if(typeof XMLHttpRequest!="undefined"){
            return new XMLHttpRequest();
        }else if(typeof ActiveXObject!="undefined"){
            if(typeof arguments.callee.activeXString!="string"){
                var versions=[
                    "MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"
                ],
                i,len;
                for ( i = 0,len=versions.length; i < len; i++) {
                    try{
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString=versions[i];
                        break;
                    }catch(ex){

                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }else{
            throw new Error("no XHR Object available");
        }

    }
    var ajax=function(met,url,head,mes,callback){
        var xhr=createXHR();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==1){
                //console.log("writing");
            }
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    callback(xhr.responseText);
                
                }else{
                    console.log(xhr.responseText);
                    console.log("request was unsuccessful:"+xhr.status);
                }
            }
        }
        xhr.open(met,url,true);
        if(head){
            xhr.setRequestHeader("Content-Type",head);
        }
        xhr.send(mes);
    }


    //定义渲染函数
    function render(data){
        console.log(typeof data);
        var content = document.getElementById('con_body');
        var temp="";
        data.map(function(item){
          //  创建一个li元素，并把每一项插入li元素的span里面
            if(item['state']==false){
                item['state']="兑换失败";
            } else{
                item['state']="兑换成功";
            }
            temp += "<li><span class='time'>"+item["date"]+"</span>"
                        +"<span class='name'>"+item["name"]+"</span>"
                        +"<span class='number'>"+item["number"]+"</span>"
                        +"<span class='E_card'>"+item["E"]+"</span>"
                        +"<span class='state'>"+item["state"]+"</span>"
                        +"<span class='info'>"+item["info"]+"</span>"
                        +"<span class='ex_info'><div id='exInfo'>兑换信息</div></span></li>";
                        // +"<span class='confirm'>"+item["confirm"]+"</span>
                        
        });
        content.innerHTML=temp;
    }

//分页插件
    var page = new Paging();
    page.init({         
    target: $('#pageTool'), pagesize: 10, count: 100, callback: function (pagecount, size, count) {
            console.log(arguments)
            console.log('当前第 ' + pagecount + '页,每页 ' + size + '条,总页数：' + count + '页');
            //动态设置总条数 https://github.com/tianxiangbing/paging
            page.render({ count: 89, current: pagecount });
        }
    });
    //jquery插件的写法
    $('#pageToolbar').Paging({ pagesize: 10, count: 85, toolbar: true, hash: true });




    //初始化
    var state = {
        all:"all"
    };
    ajax('post','','application/json',JSON.stringify(state),function(res){
        render(JSON.parse(res));
    });
	var state_btn = document.getElementById('state_btn');
	var tabs = state_btn.getElementsByTagName('li');
	for(var i=0;i<tabs.length;i++){
		tabs[i].onclick = function(){
			if(this.className!=="active"){
				for(var j=0;j<tabs.length;j++){
					tabs[j].removeAttribute('class','active');
				}
				this.setAttribute("class",this.getAttribute("class")+" "+"active");
				//定义响应变量 
				var state1 = {
					all:"all"					
				};
                var state2 = {
                    suc:"success"
                };
                var state3 = {
                    fail:"fail"
                };
				
				if(this.id=='all'){
					ajax('post','','application/json',JSON.stringify(state1),function(res){
						//把response数据展示出来，应该写一个函数将其展示出来，将response作为一个变量
                        render(JSON.parse(res));
					})
				}
				if(this.id=='success'){
					ajax('post','','application/json',JSON.stringify(state2),function(res){
						//把response数据展示出来，应该写一个函数将其展示出来，将response作为一个变量
                        render(JSON.parse(res));
					})
					
				}
				
				if(this.id=='fail'){
					ajax('post','','application/json',JSON.stringify(state3),function(res){
						//把response数据展示出来，应该写一个函数将其展示出来，将response作为一个变量
                        render(JSON.parse(res));
					})
				}
				
			}
			
		}
	}
    
}



