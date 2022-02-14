function wish(num) {//num=抽卡次数
	var selectCard=document.getElementsByClassName('select');
	var id=selectCard[0].id;
	var sort;
	
	var UP5=new Array;
	var UP4=new Array;
	for(var d in data){//判断卡池类型
		if(data[d].版本号+data[d].名称==id){
			sort=data[d].类型;
			UP5=strToArray(data[d].五星UP);
			UP4=strToArray(data[d].四星UP);
			break;
		}
	}
	//常驻5星物品
	var role5=new Array;
	var weapons5=new Array;
	for(var i in 祈愿物品.五星物品){
		if(祈愿物品.五星物品[i].常驻角色!=undefined){
			role5.push(祈愿物品.五星物品[i].常驻角色.replace('；',''));
		}
		if(祈愿物品.五星物品[i].常驻武器!=undefined){
			weapons5.push(祈愿物品.五星物品[i].常驻武器.replace('；',''));
		}
	}
	//4星物品
	var role4=new Array;
	var weapons4=new Array;
	for(var i in 祈愿物品.四星物品){
		if(i>=27&&i<=50){
			role4.push(祈愿物品.四星物品[i].角色.replace('；',''));
		}
		if(i>=0&&i<=26){
			weapons4.push(祈愿物品.四星物品[i].武器.replace('；',''));
		}
	}
	var str3=new Array;
	for(var i in 祈愿物品.三星物品){
		str3.push(祈愿物品.三星物品[i].武器.replace('；',''));
	}
	var endResults=new Array;//存储当前抽取的所有结果
	for(var i=0;i<num;i++){//根据num次数去抽取结果
		var name=randomTh(sort,str3,UP4,UP5,role4,role5,weapons4,weapons5);//单次抽取结果
		endResults.push(name);
        writeLocalStorage(name);//写入历史记录
	}
	var n;
	for(var i in endResults){
		if(endResults[i].indexOf('5')!=-1){
			n=5;
			break;
		}else if(endResults[i].indexOf('4')!=-1){
			n=4;
			break;
		}else{
			n=3;
		}
	}
	videoPS(n);
	showResults(endResults);
}
function randomTh(sort,str3,UP4,UP5,role4,role5,weapons4,weapons5){//随机选择物品
	var name;
	var str5=new Array;
	var str4=new Array;
	if(sort=='常驻'){
		str5=role5.concat(weapons5);
		str4=role4.concat(weapons4);
		UP5=str5;
		UP4=str4;
	}else if(sort=='武器'){
		str5=weapons5.concat(UP5);
		str4=weapons4;
	}else{
		str5=role5.concat(UP5);
		str4=role4;
	}
	
	var isE=isEnsure();//保底判断
	if(isE==15){
		name=UP5[Math.round(Math.random()*(UP5.length-1))]+'U5';
	}else if(isE==5){
		var n=Math.round(Math.random());//0-1
		if(n==0){
			name=str5[Math.round(Math.random()*(str5.length-1))];
		}else{
			name=UP5[Math.round(Math.random()*(UP5.length-1))];
		}
		for(var i in UP5){
			if(UP5[i].indexOf(name)!=-1){
				name+='U5';
				break;
			}else{
				name+='5';
				break;
			}
		}
	}else if(isE==14){
		name=UP4[Math.round(Math.random()*(UP4.length-1))]+'U4';
	}else if(isE==4){
		var num=Math.round(Math.random()*(1000-1)+1);
		if(num<=6){
			var n=Math.round(Math.random());//0-1
			if(n==0){
				name=str5[Math.round(Math.random()*(str5.length-1))];
			}else{
				name=UP5[Math.round(Math.random()*(UP5.length-1))];
			}
			for(var i in UP5){
				if(UP5[i].indexOf(name)!=-1){
					name+='U5';
					break;
				}else{
					name+='5';
					break;
				}
			}
			return name;
		}
		var n=Math.round(Math.random());//0-1
		if(n==0){
			name=str4[Math.round(Math.random()*(str4.length-1))];
			for(var i in UP4){
				if(UP4[i].indexOf(name)!=-1){
					name+='U4';
					break;
				}else{
					name+='4';
					break;
				}
			}
		}else{
			name=UP4[Math.round(Math.random()*(UP4.length-1))]+'U4';
		}
	}else{
		var starN=star(sort);
		if(starN==5){
			var isU5=isUP5();
			if(isU5==1){
				name=UP5[Math.round(Math.random()*(UP5.length-1))];
			}else{
				name=str5[Math.round(Math.random()*(str5.length-1))];
			}
			for(var i in UP5){
				if(UP5[i].indexOf(name)!=-1){
					name+='U5';
					break;
				}else{
					name+='5';
					break;
				}
			}
		}else if(starN==4){
			name=str4[Math.round(Math.random()*(str4.length-1))];
			for(var i in UP5){
				if(UP4[i].indexOf(name)!=-1){
					name+='U4';
					break;
				}else{
					name+='4';
					break;
				}
			}
		}else{
			name=str3[Math.round(Math.random()*(str3.length-1))]+'3';
		}
	}
	return name;
}
function isUP5(){
	var historys=readLocalStorage();
	for(var i=historys.length-1;i>=0;i--){
		//在180内 是五星  但不是UP，就是保底
		if(i<180&&historys[i].indexOf('5')!=-1){
			if(historys[i].indexOf('U')==-1){//不是UP
				return 1;
			}
			return 0;
		}
		if(i==180){break;}
	}
	return 0;
}
function isEnsure(){//保底
	var historys=readLocalStorage();
	//  10次4星  20次4星   90次5星  180次5星
	var small4=1,great4=1,small5=1,great5=1;
	if(historys.length<9){small4=0;}
	if(historys.length<19){great4=0;}
	if(historys.length<89){small5=0;}
	if(historys.length<179){great5=0;}
	for(var i=historys.length-1,n=0;i>=0;i--,n++){//倒序读取历史记录
		if(historys[i].indexOf('4')!=-1&&n<9){
			small4=0;
		}
		if(historys[i].indexOf('U4')!=-1&&n<19){
			great4=0;
		}
		if(historys[i].indexOf('5')!=-1&&n<89){
			small5=0;
		}
		if(historys[i].indexOf('U5')!=-1&&n<179){
			great5=0; 
		}
		if(n==180){break;}
	}
	if(great5==1){
		return 15;
	}else if(small5==1){
		return 5;
	}else if(great4==1){
		return 14;
	}else if(small4==1){
		return 4;
	}
	return 0;
}
function writeLocalStorage(name){//存储历史记录到本地
	if(!window.localStorage){
		alert("浏览器不支持当前历史记录存储方式（localstorage），可以更换高版本浏览器试试！");
		return;
	}else{
		var storage=window.localStorage;
		storage['历史记录']+=name+',';
	}
}
function readLocalStorage(){//读取本地所有的历史记录
	var historys=new Array;
	if(!window.localStorage){
		alert("浏览器不支持当前历史记录存储方式（localstorage），可以更换高版本浏览器试试！");
		return;
	}else{
		var storage=window.localStorage;
		if(storage['历史记录']==undefined){
			storage['历史记录']='';
		}
		var str=storage['历史记录'];
		var name='';//存储临时的名字
		for(var i=0;i<str.length;i++){
			if(str[i]!=','){
				name+=str[i];
			}else{
				historys.push(name);
				name='';
			}
		}
	}
	return historys;
}
function jsonToAry(j){
	var ary=new Array;
	for(var i=0;i<j.length;i++){
		for(var v in j[i]){
			ary.push(j[i][v].replace('；',''));
		}
	}
	return ary;
}
function strToArray(str){
	var ary=new Array;
	var name='';//存储临时的名字
	for(var i=0;i<str.length;i++){
		if(str[i]!='；'){
			name+=str[i];
		}else{
			ary.push(name);
			name='';
		}
	}
	return ary;
}

function videoPS(n,endResults){
	var video=document.getElementById('video');
	var videoDiv=document.getElementById('videoDiv');
	video.setAttribute('src','video/'+n+'star.mp4');
	video.play();
	videoDiv.style.display='block';
	var outVideo=document.getElementById('outVideo');
	outVideo.style.display='block';
	var bg=document.getElementById('bg');
	bg.style.display='none';
	setTimeout(function(){
		videoDiv.style.display='none';
		bg.style.display='block';
		outVideo.style.display='none';
	},8000);
}
function outV(){
	var video=document.getElementById('video');
	var videoDiv=document.getElementById('videoDiv');
	video.pause();
	videoDiv.style.display='none';
	document.getElementById('outVideo').style.display='none';
	document.getElementById('bg').style.display='block';
}

//***************************************
function star(sort){//随机抽取几星
	//var num=Math.round(Math.random()*(y-x)+x);	//2.550% 基础4星武器
	var num;
	if(sort!='武器'){//角色与常驻
		num=Math.round(Math.random()*(1000-1)+1);
		if(num<=6){
		//if(num<=600){
			return 5;
		}else if(num<=57){
			return 4;
		}
	}else{
		num=Math.round(Math.random()*(1000-1)+1);
		if(num<=7){
		//if(num<=600){
			return 5;
		}else if(num<=67){
			return 4;
		}
	}
	return 3;
}
//***************************************
