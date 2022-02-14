function startHtml(){
	//随机图标
	var iconUrlArray=new Array("fire","grass","ice","rock","thunder","water","wind");
	var x=Math.floor((Math.random()*7)+1);
	var iconUrl='img/Icon/'+iconUrlArray[x-1]+'.webp';
	var link=document.createElement('link');
	link.href=iconUrl;
	link.rel='shortcut icon';
	document.head.appendChild(link);
	document.getElementById('editionDiv').style.backgroundImage='url("'+iconUrl+'")';
	loadEdition();
	changeEdition();
	for(var i=0;i<data.length;i++){
		if(data[i].版本号==editionList.value&&data[i].类型=='角色'){
			editionDiv_p.innerHTML=data[i].名称;
			changeCard(data[i].版本号+data[i].名称);
			break;
		}
	}
}
function closeWin(){
	open(location, '_self').close();
}
function loadEdition(){
	var editionArray=new Array;
	for(var i=0;i<data.length;i++){
		if(i!=data.length-1){
			if(i==0){
				editionArray.push(data[i].版本号);
			}else{
				if(data[i].版本号!=data[i-1].版本号){
					editionArray.push(data[i].版本号);
				}
			}
		}
	}
	for(var i=0;i<editionArray.length;i++){
		document.getElementById('editionList').options.add(new Option(editionArray[i]));
	}
}
function changeEdition(){
	var editionList=document.getElementById('editionList');
	var editionDiv_p=document.getElementById('editionDiv_p');
	var headList=document.getElementById('headList');
	//删除 li 控件  BUG:for循环，删不干净
	var hL=headList.children.length;
	while(hL>0){
		headList.children[hL-1].remove();
		hL--;
	}
	
	for(var i=0;i<data.length;i++){
		if(data[i].版本号==editionList.value){
			var li=document.createElement('li');
			li.id=data[i].版本号+data[i].名称;
			li.setAttribute('onclick','changeCard(id)');
			headList.appendChild(li);
		}
	}
	var permanentli=document.createElement('li');
	permanentli.id='奔行世间';
	permanentli.className='select';
	//给 li 控件添加点击事件
	permanentli.setAttribute('onclick','changeCard(id)');
	headList.appendChild(permanentli);
	
	if(headList.children.length>3){
		document.getElementById('headList').style.width='250px';
	}else{
		document.getElementById('headList').style.width='200px';
	}
	
	for(var i=0;i<data.length;i++){
		if(data[i].版本号==editionList.value&&data[i].类型=='角色'){
			editionDiv_p.innerHTML=data[i].名称;
			changeCard(data[i].版本号+data[i].名称);
			break;
		}
	}
}
function changeCard(id){
	var headList=document.getElementById('headList');
	for(var i=0;i<headList.children.length;i++){
		headList.children[i].className='';
		headList.children[i].style.backgroundImage='url(./img/未选中.png)';
		headList.children[i].style.width='49px';
		headList.children[i].style.height='19px';
		headList.children[i].style.margin=' 0 6px';
		headList.children[i].style.transform='translate(-17px,0)';
	}

	var selectLi=document.getElementById(id);
	selectLi.className='select';
	
	var li=document.getElementsByClassName('select');
	li[0].style.backgroundImage='url(./img/选中.png)';
	li[0].style.width='58px';
	li[0].style.height='23px';
	li[0].style.margin='0 3px';
	li[0].style.transform='translate(-17px,-1px)';
	var imgUrl='./img/card/'+li[0].id+'.jpg';
	var card=document.getElementById('card');
	card.style.backgroundImage='url('+imgUrl+')';
}
function LRBtn(d){
	var headList=document.getElementById('headList');
	var n;
	for(var i=0;i<headList.children.length;i++){
		if(headList.children[i].className=='select'){
			n=i;
			headList.children[i].className='';
		}
	}
	var index=n+d;
	if(index>headList.children.length-1){
		index=0;
	}else if(index<0){
		index=headList.children.length-1;
	}
	headList.children[index].className='select';
	changeCard(headList.children[index].id);
}
function historys(){
	document.getElementById('historysDiv').style.display='block';
	var historysTable=document.getElementById('historysTable');
	var hL=historysTable.children.length;
	while(hL>0){
		historysTable.children[hL-1].remove();
		hL--;
	}
	var historysAry=readLocalStorage();
	for(var i=historysAry.length-1;i>=0;i--){
		if(historysAry[i].indexOf('5')!=-1){
			var tr=document.createElement('tr');
			tr.innerHTML='<td>'+(i+1)+'</td><td style="color: gold;">'+historysAry[i].replace('5','').replace('U','')+'</td>';
			historysTable.appendChild(tr);
		}
		if(historysAry[i].indexOf('4')!=-1){
			var tr=document.createElement('tr');
			tr.innerHTML='<td>'+(i+1)+'</td><td style="color:#ff69f8;">'+historysAry[i].replace('4','').replace('U','')+'</td>';
			historysTable.appendChild(tr);
		}
		if(historysAry[i].indexOf('3')!=-1){
			var tr=document.createElement('tr');
			tr.innerHTML='<td>'+(i+1)+'</td><td style="color:#3ebcff;">'+historysAry[i].replace('3','')+'</td>';
			historysTable.appendChild(tr);
		}
	}
}
function showHistorys(){
	document.getElementById('historysDiv').style.display='block';
}
function historysBack(){
	document.getElementById('historysDiv').style.display='none';
}
function clearHistorys(){
	var isClear=confirm('真的要删除吗？');
	if(isClear){
		var storage=window.localStorage;
		storage['历史记录']='';
	}
	location.reload();
}
function closeSmallCard(){
	var results=document.getElementById('results');
	results.style.display='none';
	var smallCardList=document.getElementById('smallCardList');
	var hL=smallCardList.children.length;
	while(hL>0){
		smallCardList.children[hL-1].remove();
		hL--;
	}
}
function showResults(endResults){
	var results=document.getElementById('results');
	results.style.display='block';
	var ary5=new Array;
	var ary4=new Array;
	var ary3=new Array;
	for(var i in endResults){
		if(endResults[i].indexOf('5')!=-1||endResults[i].indexOf('U5')!=-1){
			ary5.push(endResults[i]);
		}else if(endResults[i].indexOf('4')!=-1||endResults[i].indexOf('U4')!=-1){
			ary4.push(endResults[i]);
		}else{
			ary3.push(endResults[i]);
		}
	}
	// alert(ary5+ary4+ary3);
	var smallCardList=document.getElementById('smallCardList');
	
	for(var i in ary5){
		var li=document.createElement('li');
		li.style.backgroundImage='url(./img/smallCard5.png)';
		li.innerHTML='<img src="img/items/'+ary5[i].replace('U','')+'.png">';
		smallCardList.appendChild(li);
	}
	for(var i in ary4){
		var li=document.createElement('li');
		li.style.backgroundImage='url(./img/smallCard4.png)';
		li.innerHTML='<img src="img/items/'+ary4[i].replace('U','')+'.png">';
		smallCardList.appendChild(li);
	}
	for(var i in ary3){
		var li=document.createElement('li');
		li.style.backgroundImage='url(./img/smallCard3.png)';
		li.innerHTML='<img src="img/items/'+ary3[i]+'.png">';
		smallCardList.appendChild(li);
	}
}
