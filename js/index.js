function Operation(){
	this.content = document.getElementById('content');
	this.show = document.querySelector('.show');
	this.project = document.querySelector('.project');
	this.projectLi = this.project.getElementsByTagName('li');
	this.prev = document.querySelector('.prev');
	this.next = document.querySelector('.next');
	this.detail = document.querySelector('.detail');
	this.mask = document.getElementById('mask');
}
Operation.prototype.mouseFn = function (){
	var arr = Array.from(this.projectLi);
	arr.forEach(function (item,index){
		item.addEventListener('mouseover',function (){
			this.style.transform = 'scale(1.2,1.2)';
		})
		item.addEventListener('mouseout',function (){
			this.style.transform = '';
		})	
	})
}
Operation.prototype.tabFn = function (){
	var that = this;
	var count = 0;
	this.next.onmousedown = this.prev.onmousedown = function (){
		return false;
	}
	this.next.onclick = function (){
		if( that.project.bMoving ){
			return;
		}
		count++;
		if( count > 4 ){
			count = 4;
		}
		tab(count);
	}
	this.prev.onclick = function (){
		if( that.project.bMoving ){
			return;
		}
		count--;
		if( count < 0 ){
			count = 0;
		}		
		tab(count);
	}
	function tab(count){
		move( {
			elem: that.project,
			tar: {
				'left': -330*count
			},
			lasting: 800,
			type: 'easeOut'
		} )		
	}
}
Operation.prototype.renderRect = function (){
	var that = this;
	var arr = Array.from(document.querySelectorAll('.project_bg'));
	var arrPic = [];
	for (var i = 0; i < arr.length; i++) {
		arrPic.push('image/index/'+i+'.jpg');
	}
	arr.forEach(function (item,index){
		var inner = '';
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 6; j++) {
				inner += '<div style="background-image: url('+arrPic[index]+'); background-position: '+(-50*j)+'px '+(-50*i)+'px"></div>';
			}
		}
		item.innerHTML = inner;
	})
}
Operation.prototype.crush = function (){
	var that = this;
	var arr = Array.from(document.querySelectorAll('.project_bg'));
	arr.forEach(function (item,index){
		item.addEventListener('click',function (){
			var aDiv = item.children;
			for (var i = 0; i < aDiv.length; i++) {
				aDiv[i].style.transition = Math.random() + 1 + 's';
				aDiv[i].style.transform = 'translateZ(' + parseInt(Math.random()*3000+200) + 'px) rotate3d(1,1,1,' + parseInt(Math.random()*720) + 'deg)';
				aDiv[i].style.opacity = '0';
			}
			that.tab(index);
		})
	})
}
Operation.prototype.tab = function (index){
	var that = this;
	this.mask.style.display = 'block';
	move({
		elem: this.content,
		tar: {
			'opacity': 0
		},
		lasting: 1000,
		endFn: function (){
			this.style.display = 'none';
			that.detail.style.zIndex = 10;
			that.detail.style.display = 'block';
			move({
				elem: that.detail,
				tar: {
					'opacity': 1
				},
				lasting: 1000,
				endFn: function (){
					if( index == 3 || index == 0 ){
						setTimeout(function (){
							that.mask.style.display = 'none';
						},4500)
					}
					else if( index == 7 ){
						setTimeout(function (){
							that.mask.style.display = 'none';
						},2000)						
					}
					else{
						that.mask.style.display = 'none';
					}
					switch( index ){
						case 0:
							proj.createGame(index);	
							break;
						case 1:
							proj.createCanlendar(index);
							break;
						case 2:
							proj.createSystem(index);
							break;
						case 3:
							proj.createPuzzle(index);
							break;
						case 4:
							proj.createForm(index);
							break;
						case 5:
							proj.createCSS3(index);
							break;
						case 6:
							proj.createCanvas(index);
							break;
					}
				}
			})
		}
	})
}

function Project(){

}
Project.prototype.renderBackBtn = function (index){
	var oBack = document.createElement('div');
	oBack.className = 'back';
	oBack.innerHTML = '<';
	oper.detail.appendChild(oBack);
	oBack.addEventListener('click',function (){
		oper.mask.style.display = 'block';
		if( oBack.nextElementSibling ){
			move({
				elem: oBack.nextElementSibling,
				tar: {
					'opacity': 0
				},
				lasting: 1000
			})				
		}
		move({
			elem: oper.detail,
			tar: {
				'opacity': 0
			},
			lasting: 2000,
			endFn: function (){
				this.style.display = 'none';
				this.style.zIndex = -10;
				oper.content.style.display = 'block';
				move({
					elem: oper.content,
					tar: {
						'opacity': 1
					},
					lasting: 1000,
					endFn: function (){
						var arr = Array.from(document.querySelectorAll('.project_bg'));
						var aDiv = Array.from(arr[index].children);
						aDiv.forEach(function (item){
							item.style.transform = '';
							item.style.opacity = 1;
						})
						setTimeout(function (){
							oper.mask.style.display = 'none';
							oper.detail.style.backgroundImage = '';
						},2500)
					}
				})
			}
		})
	})
}
Project.prototype.createGame = function (index){
	oper.detail.innerHTML = '';
	this.renderBackBtn(index);
	var oBack = oper.detail.children[0];
	var oGameUl = document.createElement('ul');
	oGameUl.className = 'game_ul';
	oper.detail.appendChild(oGameUl);
	var inner = '';
	for (var i = 0; i < 100; i++) {
		inner += '<li class="btn"></li>';
	}
	oGameUl.innerHTML = inner;
	var aLi = Array.from(oGameUl.getElementsByTagName('li'));
	var render = {
		animation: function (){
			var that = this;
			that.into(-1);
			oBack.addEventListener('click',function (){
				that.exit(100);
			})
		},
		into: function (num){
				var that = this;
				var timer1 = setInterval(function (){
					num++;
					aLi[num].style.opacity = '1';
					if( (num+1)%10 == 0 ){
						num+=10;
						aLi[num].style.opacity = '1';
						clearInterval(timer1);
						var timer2 = setInterval(function (){
							num--;
							aLi[num].style.opacity = '1';
							if( num%10 == 0 && num != 90){
								num+=10;
								aLi[num].style.opacity = '1';
								clearInterval(timer2);
								that.into(num);
							}
							else if( num == 90){
								clearInterval(timer1);
								clearInterval(timer2);
								timer1 = null;
								timer2 = null;
								return;								
							}
						},40)
					}
				},40)
		},
		exit: function (num){
			var that = this;
			var timer1 = setInterval(function (){
				num--;
				aLi[num].style.transform = 'scale(0,0)';
				if( num%10 == 0 ){
					num-=10;
					aLi[num].style.transform = 'scale(0,0)';
					clearInterval(timer1);
					var timer2 = setInterval(function (){
						num++;
						aLi[num].style.transform = 'scale(0,0)';
						if( (num+1)%10 == 0 && num != 9 ){
							num-=10;
							aLi[num].style.transform = 'scale(0,0)';
							clearInterval(timer2);
							that.exit(num);
						}
						else if( num == 9){
							clearInterval(timer1);
							clearInterval(timer2);
							timer1 = null;
							timer2 = null;
							return;								
						}
					},5)
				}
			},5)
		} 
	};
	var game = {
		createMap: function (){
			var that = this;
			var count = 0;
			aLi.forEach(function (item,index){
				item.bDig = false;
				item.info = 0;
				item.index = index;				
			});
			var aMine = [];
			aLi.forEach(function (item,index){
				item.onmousedown = function (ev){
					if( this.bDig ){
						return;
					}
					// item.onmousemove = function (){
					// 	return false;
					// }
					this.classList.remove('btn');
					var ev = ev || event;
					if( ev.button == 2 ){
						if( this.type == 'number' ){
							this.bDig = false;
						}
						that.mouseR(this);
					}
					else{
						count++;
						if( count == 1 ){//第一次点击
							aMine = init(index);
						}
						that.mouseL(this,aMine)					
					}
					return false;
				}
				item.onmouseup = function (){
					this.classList.add('btn');
					// if( count == 1 ){
						
					// }
					// that.mouseL(this,aMine);
					// if( that.isWin() ){
					// 	alert('Congratulation!');
					// }
				}				
			});		
			function init(_index){
				var arr = [];
				for (var i = 0; i < 100; i++) {
					arr.push(i);
				}
				arr.splice(_index,1);
				arr = arr.map(function (item,index){
					return index < 10 ? 'mine' : '';
				}).sort(function (a,b){
					return Math.random() - 0.5;
				});
				arr.splice(_index-1,0,'');
				arr = arr.map(function (item,index){
					aLi[index].type = item;
					return aLi[index];
				})
				var aMine = arr.filter(function (item){
					if( item.type ){
						return true;
					}
				});			
				var aMineRound = aMine.map(function (item){
					return that.arrRound(item.index);			
				});			
				/* 把地雷周围的格子标上数字 */
				for (var i = 0; i < aMine.length; i++) {
					var index = aMine[i].index;
					for (var j = 0; j < aMineRound[i].length; j++) {
						aLi[index + aMineRound[i][j]].info = aLi[index + aMineRound[i][j]].info + 1;
					}
				}
				/* 0的都是空白,大于0的都是number */
				arr.forEach(function (item){
					if( !item.type ){
						if( item.info == 0 ){
							item.type = 'blank';
						}
						else{
							item.type = 'number';
						}
					}
				});
				return aMine;								
			}
		},
		renderMine: function (aElem){
			aElem.forEach(function (item){
				item.style.backgroundImage = 'url(image/game/mine.png)';
			})
		},
		arrRound: function (index){
			if( index == 0 ){
				return [1,10,11];
			}
			if( index == 9 ){
				return [-1,9,10];
			}
			if( index == 90 ){
				return [-10,-9,1];
			}
			if( index == 99 ){
				return [-1,-11,-10];
			}
			if( index%10 == 0 ){
				return [-10,-9,1,11,10];			
			}
			if( (index+1)%10 == 0 ){
				return [-10,-11,-1,9,10];
			}
			if( index > 0 && index < 9 ){
				return [-1,9,10,11,1];				
			}
			if( index > 90 && index < 99 ){
				return [-1,-11,-10,-9,1];			
			}
			if( index > 10 && index < 89 ){
				return [-1,-11,-10,-9,1,11,10,9];			
			}												
		},
		mouseL: function (elem,_aMine){
			var that = this;
			setTimeout(function (){
				if( elem.type == 'mine' && !elem.bFlag ){
					that.renderMine(_aMine);
					setTimeout(function (){
						alert('You lose! You can turn Back and make another try!');
						render.exit(100);						
					},2000)
					return;
				}
				if( elem.type == 'number' ){
					elem.bDig = true;
					elem.innerHTML = elem.info;
					return;
				}
				if( elem.type == 'blank' ){
					elem.classList.add('dig');
					elem.bDig = 'true';
					var index = elem.index;	
					if( aLi[index-1] && !aLi[index-1].bDig && index%10 != 0 ){//向左查找
						that.mouseL(aLi[index-1],_aMine);
					}
					if( aLi[index+1] && !aLi[index+1].bDig && (index+1)%10 != 0 ){//向右查找
						that.mouseL(aLi[index+1],_aMine);
					} 	
					if( aLi[index-10] && !aLi[index-10].bDig ){//向上查找
						that.mouseL(aLi[index-10],_aMine);
					}
					if( aLi[index+10] && !aLi[index+10].bDig ){//向下查找
						that.mouseL(aLi[index+10],_aMine);
					}
					if( aLi[index-11] && !aLi[index-11].bDig && index%10 != 0 ){//向左上方查找		
						that.mouseL(aLi[index-11],_aMine);
					}
					if( aLi[index-9] && !aLi[index-9].bDig && (index+1)%10 != 0 ){//向右上方查找
						that.mouseL(aLi[index-9],_aMine);
					}
					if( aLi[index+9] && !aLi[index+9].bDig && index%10 != 0 ){//向左下方查找
						that.mouseL(aLi[index+9],_aMine);
					}
					if( aLi[index+11] && !aLi[index+11].bDig && (index+1)%10 != 0 ){//向右下方查找	
						that.mouseL(aLi[index+11],_aMine);
					}							
				}
			},50)
		},
		mouseR: function (elem){
			if( !elem.bDig ){
				elem.className = elem.bFlag ? '' : 'flag';
				elem.bFlag = !elem.bFlag;				
			}
		},
		isWin: function (){
			var aNumber = aLi.filter(function (item){
				if( item.type != 'mine' && item.info != '0' ){
					return true;
				}				
			});
			for (var i = 0; i < aNumber.length; i++) {
				if( !aNumber[i].bDig ){
					return false;
				}
			}
			return true;
		}
	}
	game.createMap();
	setTimeout(function (){
		render.animation();
	},500);
	oGameUl.oncontextmenu = function (){
		return false;
	}
}
Project.prototype.createCanlendar = function (index){
	oper.detail.innerHTML = '';
	this.renderBackBtn(index);
	//传入日历的操作区域
	var oCanlendarDiv = document.createElement('div');
	oCanlendarDiv.className = 'sample_canlendar';
	var oCanlendar = document.createElement('div');
	oCanlendar.className = 'canlendar';
	//日历部分
	!function (){
		oCanlendar.innerHTML = `
			<p></p>
			<div>
				<div id="lastM">∧</div>
				<div id="nextM">∨</div>
			</div>
			<ul>
				<li>Sun</li>
				<li>Mon</li>
				<li>Tue</li>
				<li>Wed</li>
				<li>Thu</li>
				<li>Fri</li>
				<li>Sat</li>
			</ul>
			<ul class="clear"></ul>
		`;
		var oUl = oCanlendar.children[3];
		var oP = oCanlendar.getElementsByTagName('p')[0];
		var arrPic = [];
		for (var i = 0; i < 12; i++) {
			arrPic.push('image/canlendar/'+i+'.jpg')
		}
		var inner = '';
		for (var i = 0; i < 42; i++) {
			inner += '<li></li>';
		}
		oUl.innerHTML = inner;
		var aLi = Array.from(oUl.getElementsByTagName('li'));
		var oLast = oCanlendar.children[1].children[0];
		var oNext = oCanlendar.children[1].children[1];
		var oDate = new Date();
		var iYear = oDate.getFullYear();
		var iMonth = oDate.getMonth();
		var iDay = oDate.getDay();
		var iDate = oDate.getDate();
		var iChanged = 0;
		shift(0);
		oLast.onclick = function (){
			shift(-1);
		}
		oNext.onclick = function (){
			shift(1);
		}
		oLast.onmousedown = oNext.onmousedown = function (){
			return false;
		}
		function shift(num){
			var oDate = new Date();//现在是2017年7月20日
			iChanged = iChanged + num;
			oDate.setMonth(oDate.getMonth()+iChanged);
			var iMonth = oDate.getMonth();//6 代表7月份		
			var iDay = oDate.getDay();
			var iDate = oDate.getDate();
			oDate.setDate(1);//现在是2017年7月1日
			var iFirstDay = oDate.getDay();
			oDate.setMonth(iMonth+1);//现在是2017年8月1日
			oDate.setDate(0);//现在是2017年7月31日
			var iMonthLength = oDate.getDate();
			oDate.setDate(0);//现在是2017年6月30日				
			for (var i = 0; i < iFirstDay; i++) {
				aLi[i].innerHTML = i + oDate.getDate() - iFirstDay + 1;
				aLi[i].style.color = 'gray';
			}
			for (var i = iFirstDay; i < iMonthLength+iFirstDay; i++) {
				aLi[i].innerHTML = i-(iFirstDay-1);
				aLi[i].style.color = 'white';
			}	
			oDate.setMonth(oDate.getMonth()+2);//现在是8月30日
			for (var i = iMonthLength+iFirstDay; i < 42; i++) {
				aLi[i].innerHTML = i - iMonthLength - iFirstDay + 1;
				aLi[i].style.color = 'gray';
			}
			var iYear = oDate.getFullYear();		
			oP.innerHTML = iYear + '.' + (iMonth+1) + '.' + iDate;
			oper.detail.style.backgroundImage = 'url('+arrPic[iMonth]+')';				
		}					
	}()
	var oClock = document.createElement('div');
	oClock.className = 'clock';
	//时钟部分
	!function (){
		oClock.innerHTML = '<div class="surface"><div class="sec_needle"></div><div class="min_needle"></div><div class="hour_needle"></div></div><div class="dot"></div>';
		var oSur = oClock.children[0];
		var oSec = oSur.children[0];
		var oMin = oSur.children[1];
		var oHour = oSur.children[2];
		var oDot = oClock.children[1];
		var inner = '';
		for (var i = 0; i < 60; i++) {
			if( i%5 == 0 ){
				inner += '<div style="transform: rotate('+i*6+'deg); height: 16px"></div>';
			}
			else{
				inner += '<div style="transform: rotate('+i*6+'deg)"></div>';
			}
		}
		oDot.innerHTML = inner;
		function timing(){
			var oTime = new Date();
			var iHour = oTime.getHours();
			var iMin = oTime.getMinutes();
			var iSec = oTime.getSeconds();	
			oSec.style.transform = 'rotate('+ iSec*6 +'deg)';
			oMin.style.transform = 'rotate('+ (iMin+iSec/60)*6 +'deg)';
			oHour.style.transform = 'rotate('+ (iHour+iMin/60)*30 +'deg)';
		}
		timing();
		setInterval(timing,1000);		
	}()
	var oDigital = document.createElement('div');
	oDigital.className = 'digital';
	//数码时钟部分
	!function (){
		oDigital.innerHTML = `
			<div class="surface2">
				<ul>
					<li><img src="image/digital/0.png" /><img src="image/digital/0.png" /></li>
					<li><img src="image/digital/0.png" /><img src="image/digital/0.png" /></li>
				</ul>
				<ul style="width: 37px">
					<li><img src="image/digital/colon.png" /></li>
				</ul>
				<ul>
					<li><img src="image/digital/0.png" /><img src="image/digital/0.png" /></li>
					<li><img src="image/digital/0.png" /><img src="image/digital/0.png" /></li>
				</ul>
				<ul style="width: 37px">
					<li><img src="image/digital/colon.png" /></li>
				</ul>		
				<ul>
					<li><img src="image/digital/0.png" /><img src="image/digital/0.png" /></li>
					<li><img src="image/digital/0.png" /><img src="image/digital/0.png" /></li>
				</ul>
			</div>	
		`;
		var aLi = oDigital.getElementsByTagName('li');
		function scroll(indexLi, num){
			var aImg = aLi[indexLi].getElementsByTagName('img');
			aImg[1].src = 'image/digital/'+num+'.png';
			move({
				elem: aLi[indexLi],
				tar: {
					'marginTop': -100
				},
				lasting: 500,
				endFn: function (){
					this.style.marginTop = '0';
					aImg[0].src = 'image/digital/'+num+'.png';
				}
			})
		}
		function checkDiffer(x,y){
			var aDiffer = [];
			for (var i = 0; i < x.length; i++) {
				if( x.charAt(i) != y.charAt(i) ){
					aDiffer.push([i,y.charAt(i)])
				}
			}
			return aDiffer;
		}
		function add0(num){
			return num < 10 ? '0' + num : '' + num;
		}
		function showTime(){
			var oTime = new Date();
			var iHour = oTime.getHours();
			var iMin = oTime.getMinutes();
			var iSec = oTime.getSeconds();
			var sCurrentTime = add0(iHour) + ':' + add0(iMin) + ':' + add0(iSec);
			for (var i = 0; i < sCurrentTime.length; i++) {
				if ( i == 2 || i == 5 ){
					continue;
				}
				else {
					aLi[i].getElementsByTagName('img')[0].src = 'image/digital/'+sCurrentTime.charAt(i)+'.png';
				}	
					
			}
			return sCurrentTime;
		}
		function timing(){
			var sOldTime = showTime();
			setInterval(function (){
				var sNewTime = showTime();
				var _aDiffer = checkDiffer(sOldTime, sNewTime);
				for (var i = 0; i < _aDiffer.length; i++) {
					scroll(_aDiffer[i][0], _aDiffer[i][1]);
				}
				sOldTime = sNewTime;
			}, 1000)
		}
		timing();				
	}()
	oCanlendarDiv.appendChild(oCanlendar);
	oCanlendarDiv.appendChild(oClock);
	oCanlendarDiv.appendChild(oDigital);
	oper.detail.appendChild(oCanlendarDiv);
	move({
		elem: oCanlendarDiv,
		tar: {
			'opacity': 1
		},
		lasting: 500
	})
}
Project.prototype.createSystem = function (index){
	oper.detail.innerHTML = '';
	this.renderBackBtn(index);
	var oBack = oper.detail.children[0];
	var oSystemDiv = document.createElement('div');
	oSystemDiv.className = 'sample_folder';
	oper.detail.appendChild(oSystemDiv);
	oSystemDiv.innerHTML = `
		<div class="tree">
			<ul style="display: block">
			</ul>
		</div>
		<div class="intro">
		</div>
		<div class="system">
		</div>
	`;
	var oTree = oSystemDiv.children[0];
	var oNav = oSystemDiv.children[1];
	var oSystem = oSystemDiv.children[2];
	setTimeout(function (){
		oTree.style.transform = 'translateX(0px)';
		oNav.style.transform = 'translateY(0px)';
		oSystem.style.transform = 'translateY(0px)';
	}, 1000);
	oBack.addEventListener('click',function (){
		oTree.style.transform = 'translateX(-300px)';
		oNav.style.transform = 'translateY(-75px)';
		oSystem.style.transform = 'translateY(475px)';		
	})
	var tool = {
		getSelfById: function (id){//传进去的是什么id,返回出来的就是自己
			for (var i = 0; i < aData.length; i++) {
				if( aData[i].id == id ){
					return aData[i];
				}
			}
		},
		getSonById: function (id){//传进去的是什么id,返回出来的就是他儿子们(数组)
			var res = [];
			for (var i = 0; i < aData.length; i++) {
				if( aData[i].pId == id ){
					res.push(aData[i]);
				}
			}
			return res;
		},
		getFatherById: function (id){//传进去的是什么id,返回出来的就是他的父级(对象)
			var pId = this.getSelfById(id).pId;
			for (var i = 0; i < aData.length; i++) {
				if( aData[i].id == pId ){
					return aData[i];
				}
			}
		},
		findIndexInData: function (obj){
			for (var i = 0; i < aData.length; i++) {
				if( obj.id == aData[i].id ){
					return i ;
				}
			}
			return -1;
		}		
	};
	var render = {
		tree: function (id,paddingL,bFirst){
			var _inner = '';
			var aSon = tool.getSonById(id);
			for (var i = 0; i < aSon.length; i++) {
				var aGrandSon = tool.getSonById(aSon[i].id);
				if( aGrandSon.length == 0 ){
					_inner += '<li style="padding-left:'+(paddingL+30)+'px"><p _id="'+aSon[i].id+'" ><span>'+aSon[i].name+'</span></p></li>'
				}
				else{
					var l = paddingL + 5;
					_inner += '<li style="padding-left:'+(paddingL+20)+'px"><p _id="'+aSon[i].id+'"><span class="tree_arrow">></span><span>'+aSon[i].name+'</span></p><ul>'+this.tree(aSon[i].id,l)+'</ul></li>';
				}
			}
			if( bFirst ){
				var inner = '<li style="padding-left: 20px"><p _id="50"><span class="tree_arrow">></span><span>My File</span></p><ul>'+ _inner +'</ul></li>';			
				return inner;				
			}
			if( !bFirst ){
				return _inner;
			}			
		},
		renderTree: function (id, paddingL,bFirst){
			var ulTree = oTree.children[0];
			ulTree.innerHTML = this.tree(id, paddingL, bFirst);
			control.showContentByTree();
			control.showTree();
		},
		renderSystem: function (id){
			var aSon = tool.getSonById(id);
			var inner = '';
			for (var i = 0; i < aSon.length; i++) {
				inner += '<div _id="'+aSon[i].id+'" class="system_content" style="background-image: url('+bgImage(aSon[i])+')"><p>'+aSon[i].name+'</p><input type="text"></div>';
			}
			oSystem.innerHTML = inner;
			function bgImage(obj){
				if( obj.type == 'folder' ){
					return 'image/system/folder.png';
				}
				if( obj.type == 'file' ){
					return 'image/system/file.png';
				}
			}
			var aContent = Array.from(oSystem.children);
			aContent.forEach(function (item){
				item.onmousedown = function (){
					return false;
				}
			})
			control.showContentByDblclick(aContent);
			control.selectItem(aContent);
		},
		renderTreePath: function (id){
			var treeP = Array.from(oTree.getElementsByTagName('p'));
			fn(id);
			function fn(id){
				treeP.forEach(function (item){
					if( item.getAttribute('_id') == id ){
						if( item.nextElementSibling ){
							if( item.children[0].nodeName == 'SPAN' ){
								item.children[0].innerHTML = '∨';
								item.children[0].bOn = true;										
							}
							if( item.parentNode.parentNode.previousElementSibling ){
								item.parentNode.parentNode.previousElementSibling.children[0].innerHTML = '∨';
								item.parentNode.parentNode.previousElementSibling.children[0].bOn = true;									
							}
							item.parentNode.parentNode.style.display = 'block';
							item.nextElementSibling.style.display = 'block';							
						}
						if( tool.getFatherById(id) ){
							fn(tool.getFatherById(item.getAttribute('_id')).id);
						}
					}
				})
			}
		},
		renderNav: function (id){
			var res = [tool.getSelfById(id).name];
			var aId = [tool.getSelfById(id).id];
			var that = this;
			fn(id);
			function fn(id){
				var oFather = tool.getFatherById(id);
				if( oFather ){
					res.unshift(oFather.name);
					aId.unshift(oFather.id);
					fn(oFather.id);
				}					
			}
			for (var i = 0; i < res.length; i++) {
				res[i] = '<span _id="'+ aId[i] +'">'+ res[i] +'</span>';
			}
			var inner = res.join(' <span>></span> ');
			oNav.innerHTML = inner;		
		}
	};
	var control = {
		start: aData.length,
		showTree: function (){
			var aSpan = Array.from(oSystemDiv.getElementsByTagName('span'))
			var aArrow = aSpan.filter(function (item){
				return !!item.className;
			});
			aArrow.forEach(function (item){
				item.onclick = function (ev){
					var ev = ev || event;
					ev.cancelBubble = true;
					var son = this.parentNode.nextElementSibling;
					item.innerHTML = item.bOn ? '>' : '∨';
					son.style.display = item.bOn ? 'none' : 'block';
					item.bOn = !item.bOn;
				};
			})
		},
		showContentByTree: function (){
			var that = this;
			var treeP = Array.from(oTree.getElementsByTagName('p'));
			treeP.forEach(function (item){
				item.onclick = function (){
					if( tool.getSelfById(this.getAttribute('_id')).type == 'file' ){
						return;
					}
					treeP.forEach(function (item){
						item.style.backgroundColor = '';
					})
					this.style.backgroundColor = 'rgba(0,0,0,.2)'
					var _id = this.getAttribute('_id');
					render.renderSystem(_id);
					render.renderNav(_id);
					that.showContentByNav();
				}
			})
		},
		showContentByDblclick: function (elem){
			var that = this;
			elem.forEach(function (item){
				item.ondblclick = function (){
					var _id = this.getAttribute('_id');
					var type = tool.getSelfById(_id).type;
					if( type == 'file' ){
						return;
					}					
					render.renderSystem(_id);
					render.renderNav(_id);
					that.showContentByNav();
					render.renderTreePath(_id);
				}
			})
		},
		showContentByNav: function (){
			var aSpan = Array.from(oNav.children);
			aSpan.forEach(function (item,index){
				if( index%2 != 0 ){
					return;
				}
				item.onclick = function (){
					var _id = this.getAttribute('_id');
					render.renderSystem(_id);
					if( !this.nextElementSibling ){
						return;
					}
					for (var i = index + 1; i < aSpan.length; i++) {
						oNav.removeChild(aSpan[i]);
					}	
				}
			})
		},
		contextMenu: function (){
			var that = this;
			oSystem.oncontextmenu = function (ev){
				cancelMenu();
				var ev = ev || event;
				var mouse = {};
				mouse.x = ev.clientX;
				mouse.y = ev.clientY;
				var oMenu = document.createElement('ul');
				oMenu.onclick = function (ev){
					var ev = ev || event;
					ev.cancelBubble = true;
				}
				oMenu.style.display = 'block';
				oMenu.style.left = mouse.x  - oSystem.getBoundingClientRect().left + 'px';
				oMenu.style.top = mouse.y - oSystem.getBoundingClientRect().top + 'px';
				var currId = oNav.lastElementChild.getAttribute('_id');
				var oNew = document.createElement('li');
				oNew.innerHTML = 'New Folder';
				oNew.onclick = function (){
					that.newFolder(currId);
					this.parentNode.style.display = 'none';
				}
				var oDel = document.createElement('li');
				oDel.innerHTML = 'Delete';
				oDel.onclick = function (){
					that.deleteItem(currId);
					this.parentNode.style.display = 'none';
				}
				var oBg = document.createElement('li');
				oBg.onclick = function (){
				}
				oBg.innerHTML = 'Wallpaper';
				oMenu.appendChild(oNew);
				oMenu.appendChild(oDel);
				oMenu.appendChild(oBg);
				oSystem.appendChild(oMenu);								
				return false;
			}
			oSystem.addEventListener('click',cancelMenu);
			function cancelMenu(){
				if( checkMenu() != -1 ){
					oSystem.removeChild(oSystem.children[checkMenu()]);
				}					
			}
			function checkMenu(){
				for (var i = 0; i < oSystem.children.length; i++) {
					if( oSystem.children[i].nodeName == 'UL' ){
						return i;
					}
				}
				return -1;
			}
			function getCurrIdByTree(){
				var treeP = Array.from(oTree.getElementsByTagName('p'));
				for (var i = 0; i < treeP.length; i++) {
					if( treeP[i].style.backgroundColor == 'rgba(0,0,0,.2)' ){
						return treeP[i].getAttribute('_id');
					}
				}
				return -1;
			}			
		},
		newFolder: function (_id){
			this.start++;
			console.log(this.start)
			aData.push({
				id: this.start,
				pId: _id,
				name: 'New Folder',
				type: 'folder'
			});
			render.renderSystem(_id);
			render.renderTree(50,10,true);
			render.renderTreePath(_id);
		},
		selectItem: function (elem){
			var arr = Array.from(elem);
			arr.forEach(function (item){
				item.onclick = function (ev){
					var ev = ev || event;
					ev.cancelBubble = true;
					if( ev.ctrlKey ){
						this.classList.toggle('system_select');
					}
					else{
						if( this.classList.contains('system_select') ){
							this.classList.remove('system_select');
						}
						else{
							arr.forEach(function (item){
								item.classList.remove('system_select');
							})							
							this.classList.add('system_select');
						}
					}
				}
			});
			oSystem.addEventListener('click',function (){
				arr.forEach(function (item){
					item.classList.remove('system_select');
				})
			})
		},
		deleteItem: function (id){
			var aDiv = Array.from(oSystem.children);
			aDiv = aDiv.filter(function (item){
				return !!item.classList.contains('system_select');
			})
			if( aDiv.length == 0 ){
				return;
			}
			var currId = oNav.lastElementChild.getAttribute('_id');
			aDiv.forEach(function (item){
				fn(item.getAttribute('_id'));
			})
			function fn(id){
				var oSelf = tool.getSelfById(id);
				var indexSelf = tool.findIndexInData(oSelf);
				aData.splice(indexSelf,1);			
				var aSon = tool.getSonById(id);
				if( aSon.length != 0 ){
					for (var i = 0; i < aSon.length; i++) {
						fn(aSon[i].id);
					}
				}
			}
			render.renderSystem(currId);
			render.renderTree(50,10,true);
			render.renderTreePath(currId);
		}
	};
	render.renderSystem(50)
	render.renderTree(50,10,true);
	render.renderNav(50)
	control.showTree();
	control.showContentByTree();
	control.contextMenu();
}
Project.prototype.createPuzzle = function (index){
	oper.detail.innerHTML = '';
	this.renderBackBtn(index);
	var oPuzzleUl = document.createElement('ul');
	oPuzzleUl.className = 'puzzle_ul';
	var oBack = oper.detail.children[0];
	var render = {
		aLi: oPuzzleUl.getElementsByTagName('li'),
		renderMap: function (){
			oper.detail.appendChild(oPuzzleUl);
			var inner = '';
			for (var i = 0; i < 5; i++) {
				for (var j = 0; j < 5; j++) {
					inner += '<li style="background-position: '+j*-100+'px '+i*-100+'px; left: '+j*100+'px; top: '+(i*100-700)+'px"></li>'
				}
			}
			oPuzzleUl.innerHTML = inner;
			var random = document.createElement('button');
			random.innerHTML = 'Random';
			var recover = document.createElement('button');
			recover.innerHTML = 'Recover';
			oPuzzleUl.appendChild(random);
			oPuzzleUl.appendChild(recover);
		},
		animation: function (){
			var that = this;
			var count1 = -1;
			var count2 = -1;
			setTimeout(function (){
				oPuzzleUl.style.transform = 'rotateY(3600deg)';
				oPuzzleUl.style.opacity = 1;
			},1000);			
			setTimeout(function (){
				fn(0,count1,20);
			},2000);
			function fn(dis,count,time){
				count++;
				if( count == 25 ){
					return;
				}
				setTimeout(function (){
					move({
						elem: that.aLi[count],
						tar: {
							'opacity': 1,
							'top': Math.floor(count/5)*100 + dis
						},
						lasting: 1000
					})
					fn(dis,count,time);
				},time);
			}
			setTimeout(function (){
				var aBtn = document.getElementsByTagName('button');
				for (var i = 0; i < aBtn.length; i++) {
					aBtn[i].style.opacity = 1;
				}
				oper.detail.style.backgroundImage = 'url(image/puzzle/bg.png)';
			},3500);
			oBack.addEventListener('click',function (){
				fn(-700,count2,10);
			})			
		}
	};
	render.renderMap();
	render.animation();
	var puzzle = {
		aBtn: document.getElementsByTagName('button'),
		drag: function (){
			var that = this;
			var aLi = Array.from(render.aLi);
			var arr = aLi.map(function (item,index){
				return index;
			});	
			var arr0 = aLi.map(function (item,index){
				return index;
			});	
			aLi.forEach(function (item,index){
				item.index = index;
				item.onmousedown = function (ev){
					var ev = ev || event;
					var _l = item.offsetLeft;
					var _t = item.offsetTop;
					var l = oPuzzleUl.offsetWidth - item.offsetWidth;
					var t = oPuzzleUl.offsetHeight - item.offsetHeight;
					var dis = {
						x: ev.clientX - this.offsetLeft,
						y: ev.clientY - this.offsetTop
					}
					aLi.forEach(function (item){
						item.style.zIndex = 0;
					})
					this.style.zIndex = 10;
					document.onmousemove = function (ev){
						var ev = ev || event;
						item.style.left = ev.clientX - dis.x + 'px';
						item.style.top = ev.clientY - dis.y + 'px';
						for (var i = 0; i < aLi.length; i++) {
							if( i != item.index && that.isCrash(item,aLi[i])){	
								aLi[i].className = 'crash';
							}
							else{
								aLi[i].className = '';
							}
						}
						if( item.offsetLeft < 0 ){
							item.style.left = '0';
						}
						if( item.offsetTop < 0 ){
							item.style.top = '0';
						}
						if( item.offsetLeft > l ){
							item.style.left = l + 'px';
						}
						if( item.offsetTop > t ){
							item.style.top = t + 'px';
						}
					}
					document.onmouseup = function (){
						document.onmousemove = null;
						for (var i = 0; i < aLi.length; i++) {
							if( aLi[i].className ){
								move({
									elem: item,
									tar: {
										'left': aLi[i].offsetLeft,
										'top': aLi[i].offsetTop										
									},
									lasting: 50
								});
								move({
									elem: aLi[i],
									tar: {
										'left': _l,
										'top': _t												
									},
									lasting: 100,
									endFn: function (){
										if( that.isSame(arr,arr0) ){
											alert('Congratulation!')
										}										
									}
								});
								that.exchange(item.index,i,arr);
								aLi[i].className = '';

								document.onmouseup = null;
								return;
							}
						}
						move({
							elem: item,
							tar: {
								'left': _l,
								'top': _t
							},
							lasting: 50
						});
						document.onmouseup = null;						
					}
					return false;
				}
			})
		},
		control: function (){	
			var aLi = Array.from(render.aLi);
			var arr = aLi.map(function (item,index){
				return {
					i: index,
					x: item.offsetLeft,
					y: item.offsetTop+700
				};
			});		
			this.aBtn[0].onclick = function (){
				orderLi(false);
			}
			this.aBtn[1].onclick = function (){
				orderLi(true);
			}
			function orderLi(bOrder){
				arr.sort(function (a,b){
					return bOrder ? a.i - b.i : Math.random() - 0.5;
				});
				arr.forEach(function (item,index){
					move({
						elem: aLi[index],
						tar: {
							'left': item.x,
							'top': item.y
						},
						lasting: 1000
					});
				});
			}
		},
		isCrash: function (elem,tar){
			var elemPos = elem.getBoundingClientRect();
			var tarPos = tar.getBoundingClientRect();
			var xMiddle = (tarPos.right + tarPos.left)/2;
			var yMiddle = (tarPos.top + tarPos.bottom)/2;
			if( elemPos.right>xMiddle && elemPos.right<=tarPos.right && elemPos.bottom>yMiddle && elemPos.bottom<=tarPos.bottom || 
			elemPos.left<xMiddle && elemPos.left>=tarPos.left && elemPos.bottom>yMiddle && elemPos.bottom<=tarPos.bottom || 
			elemPos.left<xMiddle && elemPos.left>=tarPos.left && elemPos.top<yMiddle && elemPos.top>=tarPos.top ||
			elemPos.right>xMiddle && elemPos.right<=tarPos.right && elemPos.top<yMiddle && elemPos.top>=tarPos.top ){
				return true;
			}
			return false;			
		},
		exchange: function (a,b,arr){
			var temp = arr[a];
			arr[a] = arr[b];
			arr[b] = temp;			
		},
		isSame: function (arr1,arr2){
			for (var i = 0; i < arr1.length; i++) {
				if( arr1[i] != arr2[i] ){
					return false;
				}
			}
			return true;
		}
	};
	puzzle.drag();
	puzzle.control();
}
Project.prototype.createForm = function (index){
	oper.detail.innerHTML = '';
	this.renderBackBtn(index);
	var oFormDiv = document.createElement('div');
	oFormDiv.className = 'form_div';
	oper.detail.appendChild(oFormDiv);
	oFormDiv.innerHTML = `
		<div class="bar">
			<div></div>
			<div></div>
			<div class="circle"></div>
			<div class="circle"></div>
			<div class="circle"></div>
		</div>
		<div class="form_mask">
			<div class="form_content">
				<div class="login_div">
					<input type="text" placeholder="E-mail">
					<input type="password" placeholder="Password">
					<input type="button" value="Sign in">
					<a href="javascript:;">Forget Password?</a>
					<a id="register" href="javascript:;">Register</a>
				</div>
				<div class="register">
					<form methods="post" name="register">
						<div><input type="text" placeholder="Real name" ><span></span></div>
						<p></p>	
						<div><input type="text" name="number" placeholder="Phone number"><span></span></div>
						<p></p>
						<div><input type="radio" id="male" value="male" name="sex" checked><label for="male">Male</male><input type="radio" id="female"  value="female" name="sex" ><label for="female">Female</label></div>
						<div><input type="text" placeholder="ID" ></div>
						<p></p>	
						<div><input type="text" placeholder="E-mail" ></div>
						<p></p>	
						<div><input type="password" placeholder="Password" ></div>
						<p></p>	
						<div><input type="password" placeholder="Verify Password" ></div>
						<p></p>	
					</form>
					<div class="intro">
						<p>Do not post Warez (direct downloads to wares sites or links to wares sites) Do not offer or request warez, and do not discuss efforts to cheat hard working software developers out of their livelihood! Such posts will be deleted and you will be banned for life!! You will be redirected to the forum rules after the registration, please read them!
You agree, through your use of this forum, that you will not post any material which is false, defamatory, inaccurate, abusive, vulgar, hateful, harassing, obscene, profane, sexually oriented, threatening, invasive of a person's privacy, adult material, or otherwise in violation of any International or United States Federal law. You also agree not to post any copyrighted material unless you own the copyright or you have written consent from the owner of the copyrighted material. Spam, flooding, advertisements, chain letters, pyramid schemes, and solicitations are also forbidden on this forum.
Note that it is impossible for the staff or the owners of this forum to confirm the validity of posts. Please remember that we do not actively monitor the posted messages, and as such, are not responsible for the content contained within. We do not warrant the accuracy, completeness, or usefulness of any information presented. The posted messages express the views of the author, and not necessarily the views of this forum, its staff, its subsidiaries, or this forum's owner. Anyone who feels that a posted message is objectionable is encouraged to notify an administrator or moderator of this forum immediately. The staff and the owner of this forum reserve the right to remove objectionable content, within a reasonable time frame, if they determine that removal is necessary. This is a manual process, however, please realize that they may not be able to remove or edit particular messages immediately. This policy applies to member profile information as well.
You remain solely responsible for the content of your posted messages. Furthermore, you agree to indemnify and hold harmless the owners of this forum, any related websites to this forum, its staff, and its subsidiaries. The owners of this forum also reserve the right to reveal your identity (or any other related information collected on this service) in the event of a formal complaint or legal action arising from any situation caused by your use of this forum.
You have the ability, as you register, to choose your username. We advise that you keep the name appropriate. With this user account you are about to register, you agree to never give your password out to another person except an administrator, for your protection and for validity reasons. You also agree to NEVER use another person's account for any reason.  We also HIGHLY recommend you use a complex and unique password for your account, to prevent account theft.
After you register and login to this forum, you will be able to fill out a detailed profile. It is your responsibility to present clean and accurate information. Any information the forum owner or staff determines to be inaccurate or vulgar in nature will be removed, with or without prior notice. Appropriate sanctions may be applicable.
Please note that with each post, your IP address is recorded, in the event that you need to be banned from this forum or your ISP contacted. This will only happen in the event of a major violation of this agreement.
Also note that the software places a cookie, a text file containing bits of information (such as your username and password), in your browser's cache. This is ONLY used to keep you logged in/out. The software does not collect or send any other form of information to your computer.</p>
					</div>
					<div class="confirm"><input type="radio" name="confirm" id="agree"><label for="agree">I agree</label><input type="radio" name="confirm" id="disagree" checked><label for="disagree">I disagree</label></div>
					<div class="submit"><input type="button" name="submit" value="Submit"></div> 					
				</div>	
			</div>	
		</div>
	`;
	var control = {
		oBar: oFormDiv.children[0],
		oBar_bar: oFormDiv.children[0].children[1],
		aBar_index: [oFormDiv.children[0].children[2],oFormDiv.children[0].children[3],oFormDiv.children[0].children[4]],
		oMap: oFormDiv.children[1],
		oForm: oFormDiv.children[1].children[0],
		oRegister: document.getElementById('register'),
		registerScroll: function (){
			var that = this;
			this.oRegister.onclick = function (){
				that.oBar.style.display = 'block';
				move({
					elem: that.oForm,
					tar: {
						'top': -400
					},
					lasting: 500
				});
				that.oBar.style.opacity = 1;
				move({
					elem: that.oBar_bar,
					tar: {
						'height': 75
					},
					lasting: 500
				});
			}
			this.aBar_index.forEach(function (item,index){
				item.onclick = function (){
					move({
						elem: that.oBar_bar,
						tar: {
							'height': 75+150*index
						},
						lasting: 500
					});
					move({
						elem: that.oForm,
						tar: {
							'top': -400-400*index
						},
						lasting: 500
					})
				}
			})
		},
		animation: function (){
			var that = this;
			this.oMap.style.opacity = 1;
			this.oMap.style.transform = 'rotateX(0deg)';
			var oBack = oper.detail.children[0];
			oBack.addEventListener('click',function (){
				that.oMap.style.opacity = 0;
				that.oMap.style.transform = 'rotateX(180deg)';				
			});
		}
	};
	control.registerScroll();
	setTimeout(function (){
		control.animation();
	},1000)
	var verify = {
		aInput: oFormDiv.getElementsByTagName('input'),
		init: function (){
			var that = this;
			var aInput = this.aInput;
			var oPContainer = control.oForm.children[1].children[1];
			var oP = oPContainer.children[0];
			var rate = {
				realName: false,
				phoneNum: false,
				id: false,
				mail: false,
				password: false,
				vPassword: false,
				confirm: false
			}
			verifyRegister();
			function verifyRegister(){
				var userAccount = aInput[0];
				var userPassword = aInput[1];
				var loginBtn = aInput[2];
				var realName = aInput[3];
				var phoneNum = aInput[4];
				var male = aInput[5];
				var female = aInput[6];
				var id = aInput[7];
				var mail = aInput[8];
				var password = aInput[9];
				var vPassword = aInput[10];
				var agree = aInput[11];
				var disagree = aInput[12];
				var submit = aInput[13];
				var confirmDiv = agree.parentNode;
				var storage = window.localStorage;
				var reg = {
					realName: /^[\u4e00-\u9fa5]{2,4}$/,
					phoneNum: /^1[3|4|5|8][0-9]\d{4,8}$/,
					id: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
					mail: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
					password: /^[a-zA-Z]\w{5,17}$/
				};
				function verify(reg,str,attr){
					var oP = this.parentNode.nextElementSibling;
					if( this.value == '' ){
						oP.innerHTML = "Please type your "+str+"!";
						oP.style.color = 'red';
						rate[attr] = false;
					}
					else if( reg.test(this.value) ){
						oP.innerHTML = "It's Ok!";
						oP.style.color = 'green';
						rate[attr] = true;
					}
					else{
						oP.innerHTML = "It's invalid!";
						oP.style.color = 'red';
						rate[attr] = false;
					}					
				}
				realName.onblur = function (){
					verify.call(this,reg.realName,'name','realName');
				}
				phoneNum.onblur = function (){
					verify.call(this,reg.phoneNum,'phone number','phoneNum');
				}
				id.onblur = function (){
					verify.call(this,reg.id,'id','id');
				}
				mail.onblur = function (){
					verify.call(this,reg.mail,'E-mail','mail');
				}
				password.onblur = function (){
					verify.call(this,reg.password,'password','password');
				}
				vPassword.onblur = function (){
					var oP = this.parentNode.nextElementSibling;
					if( this.value == password.value && this.value != '' ){
						oP.innerHTML = "It's Ok!";
						oP.style.color = 'green';
						rate.vPassword = true;						
					}
					else{
						oP.innerHTML = "It's invalid!";
						oP.style.color = 'red';
						rate.vPassword = false;						
					}
				}
				oPContainer.onscroll = function (){
					var maxT = oP.offsetHeight - this.offsetHeight;
					if( this.scrollTop > maxT ){
						confirmDiv.style.visibility = 'visible';
					}
				}
				agree.onclick = function (){
					rate.confirm = true;
				}
				disagree.onclick = function (){
					rate.confirm = false;
				}
				function isDone(){
					for( var attr in rate ){
						if( !rate[attr] ){
							return false;
						}
					}
					return true;
				}
				function checkSex(){
					var arr = [male,female];
					for (var i = 0; i < arr.length; i++) {
						if( arr[i].checked ){
							return arr[i].value;
						}
					}
				}
				submit.onclick = function (){
					if( isDone() ){
						var oNewUser = {
							"phoneNum": phoneNum.value,
							"sex": checkSex(),
							"id": id.value,
							"mail": mail.value,
							"password": password.value
						}
						var jsonNewUser = JSON.stringify(oNewUser);
						var time = new Date().getTime();
						localStorage.setItem(time,jsonNewUser);
					}
					else{
						alert('Not yet');
					}
				}
				loginBtn.onclick = function (){
					if( userAccount.value == '' || userPassword.value == '' ){
						alert('Please input your infomation!');
						return;
					}
					for (var key in storage) {
						var obj = JSON.parse(storage[key]);
						if( userAccount.value == obj.mail && userPassword.value == obj.password ){
							alert('Welcome Back,'+ obj.id +'!')
						}
						else{
							alert('Wrong information!');
						}
					}
				}
			}
		}
	};
	verify.init();
}
Project.prototype.createCSS3 = function (index){
	oper.detail.innerHTML = '';
	this.renderBackBtn(index);
	var oCSS3Div = document.createElement('div');
	oCSS3Div.className = 'css3_div';
	oper.detail.appendChild(oCSS3Div);
	oCSS3Div.innerHTML = `
		<div class="cube">
			<div class="out-front"></div>
			<div class="out-back"></div>
			<div class="out-left"></div>
			<div class="out-right"></div> 
			<div class="out-top"></div>
			<div class="out-bottom"></div>
			<span class="in-front"></span>
			<span class="in-back"></span>
			<span class="in-left"></span>
			<span class="in-right"></span>
			<span class="in-top"></span>
			<span class="in-bottom"></span>
		</div>
	`;
}
Project.prototype.createCanvas = function (index){
	oper.detail.innerHTML = '';
	this.renderBackBtn(index);
	var oCanvasDiv = document.createElement('div');
	oCanvasDiv.className = 'canvas_div';
	oper.detail.appendChild(oCanvasDiv);
	oCanvasDiv.innerHTML = `
		<ul>
			<li><canvas width="1000" height="500"></canvas></li>
			<li><canvas width="1000" height="500"></canvas></li>
			<li><canvas width="1000" height="500"></canvas></li>
			<li><canvas width="1000" height="500"></canvas></li>
		</ul>
	`;
	var oBack = oper.detail.children[0];
	var render = {
		oUl: oCanvasDiv.getElementsByTagName('ul')[0],
		aLi: Array.from(oCanvasDiv.getElementsByTagName('li')),
		aCanvas: Array.from(oCanvasDiv.getElementsByTagName('canvas')),
		animation: function (){
			var that = this;
			that.aLi.forEach(function (item){
				move({
					elem: item,
					tar: {
						'top': 0
					},
					lasting: 1000,
					type: 'easeIn',
					endFn: function (){
						oper.detail.style.backgroundColor = 'black';
					}
				})														
			})
			oBack.addEventListener('click',function (){
				that.aLi.forEach(function (item,index){
					if( index%2 == 0 ){
						move({
							elem: item,
							tar: {
								'top': -500
							},
							lasting: 500,
							endFn: function (){
								setTimeout(function (){
									oper.detail.style.backgroundColor = '';
								},1000)
							}
						})
					}
					else{
						move({
							elem: item,
							tar: {
								'top': 500
							},
							lasting: 500
						})						
					}
				});
			});
		},
		_move: function (info){
				clearInterval(info.elem.timer)
				var b = {};
				var c = {};
				var d = info.lasting;
				info.type = info.type || 'linear';
				for( var i in info.tar ){
					b[i] = parseFloat(getComputedStyle(info.elem)[i]);
					c[i] = info.tar[i]-b[i];
				}
				var preTime = new Date().getTime();
				info.elem.timer = setInterval( function (){
					var currTime = new Date().getTime();
					var t = currTime - preTime;
					if( t > d ){
						t = d; 
						clearInterval(info.elem.timer);
					}
					else{
						info.movingFn&&info.movingFn.call(info.elem);
					}
					for( var i in info.tar ){
						var v = Tween[info.type](t,b[i],c[i],d)
						if( i == 'opacity' || i == 'zIndex' ){
							info.elem.style[i] = v;
						}
						else{
							info.elem.style[i] = v + 'px';
						}
					}
					if( t == d ){
						info.endFn&&info.endFn.call(info.elem);
					}
				},20 )			
		},
		init: function (){
			var that = this;
			this.aLi.forEach(function (item,index){
				item.index = index;
				item.style.left = index*250 + 'px';
				item.onmouseover = function (){
					that.over(this);
				}
				item.onmouseout = function (){
					that.out(this);
				}
			})
		},
		over: function (_elem){
			for (var i = 0; i < this.aLi.length; i++) {
				if( i != _elem.index ){
					this.aLi[i].style.opacity = 0;
				}
				if( i <= _elem.index ){
					this._move({
						elem: this.aLi[i],
						tar: {
							'left': 125*i
						},
						lasting: 600,
						type: 'easeIn'
					});
				}
				else{
					this._move({
						elem: this.aLi[i],
						tar: {
							'left': 300+175*i
						},
						lasting: 600,
						type: 'easeIn'
					});
				}
			}
		},
		out: function (_elem){
			for (var i = 0; i < this.aLi.length; i++) {
				if( i != _elem.index ){
					this.aLi[i].style.opacity = 1;
				}
				this._move({
					elem: this.aLi[i],
					tar: {
						'left': 250*i
					},
					lasting: 600,
					type: 'easeOut'
				})
			}				
		}
	};
	render.init();
	render.animation();
	var renderCanvas = {
		canvas1: function (){
			var canvas = render.aCanvas[0],
		    	c = canvas.getContext("2d"),
		    	w = canvas.width,
		    	h = canvas.height,
		    	pos = [],
		    	mouse = {
		    		x:0,
		    		y:0,
		    		r:5
		    	};
		    for (var i = 0; i < 50; i++) {
		    	pos.push( {
		    		x:parseInt(Math.random() * w),
		    		y:parseInt(Math.random() * h),
		    		r:parseInt(Math.random()*2+2),
		    		sx:Math.random()*2-1,
		    		sy:Math.random()*2-1,
		    	} )
		    }
		    pos.push(mouse);
		    c.fillStyle = "white";
		    var l = canvas.getBoundingClientRect().left;
		    var t = canvas.getBoundingClientRect().top;
		    canvas.onmousemove = function(ev){
		    	mouse.x = ev.clientX - l - 215;
		    	mouse.y = ev.clientY - 87;
		    }
		    setInterval(draw,10);
		    var l = pos.length;
		    function draw(){
		    	c.clearRect(0,0,w,h);
		    	for (var i = 0; i < l; i++) {
		    		var d = pos[i]; 
		    		if( i != l-1 ){
		    			d.x += d.sx;
		    			d.y += d.sy; 
		    		}
		    		
		    		if( d.x < 0 ){
		    			d.x = 0;
		    			d.sx *= -1;
		    		}
		    		if( d.y < 0 ){
		    			d.y = 0;
		    			d.sy *= -1;
		    		}
		    		if( d.x > w ){
		    			d.x = w;
		    			d.sx *= -1;
		    		}
		    		if( d.y > h ){
		    			d.y = h;
		    			d.sy *= -1;
		    		}
		    		c.beginPath();
		    		c.arc( d.x, d.y, d.r, 0, Math.PI*2 );
		    		c.save();
		    		if( i == l-1 ){
		    			c.fillStyle = "white";
		    		}
		    		c.fill();
		    		c.restore();
		    	}
		    	for (var i = 0; i < l-1; i++) {
		    		var d = pos[i];
		    		for (var j = i+1; j < l; j++) {
		    			if( getDis(d,pos[j]) < 50 ){
		    				c.beginPath();
		    				c.moveTo(d.x,d.y);
		    				c.lineTo(pos[j].x,pos[j].y);
		    				c.strokeStyle = 'white';
		    				c.stroke();
		    			}
		    		}
		    	}
		    }
		    function getDis(obj1,obj2){
		    	var x = obj1.x - obj2.x,
		    		y = obj1.y - obj2.y;
		    	return Math.sqrt( x*x + y*y );
		    }			
		},
		canvas2: function (){
			var canvasEffect = {
				map: render.aCanvas[3],
				oCtx: render.aCanvas[3].getContext('2d'),
				aPos: [],
				aPos0: [],
				oMousePos: {
					x: 0,
					y: 0
				},
				renderMap: function (){
					for (var i = 0; i < 50; i++) {
						for (var j = 0; j < 50; j++) {
							this.oCtx.fillRect(j*10+10,i*10+10,2,2);
							this.oCtx.fillStyle = 'white'	
							this.aPos.push( {
								x:j*10+10,
								y:i*10+10
							} )
							this.aPos0.push( {
								x:j*10+10,
								y:i*10+10
							} )
						}
					}				
				},
				moveEffect: function (){
					var that = this;
					this.map.onmousemove = function (ev){
						var ev = ev || event;
						var l = this.getBoundingClientRect().left;
						var t = this.getBoundingClientRect().top;						
						that.oMousePos.x = ev.clientX - l;
						that.oMousePos.y = ev.clientY - t;
						that.motion.call(that);
						clearInterval(that.map.timer);
						that.map.timer = setInterval( function (){
							that.motion.call(that);
						},50 )
					}
				},
				motion: function (){
						for (var i = 0; i < this.aPos.length; i++) {
							var iDis = this.getDis(this.oMousePos,this.aPos[i]);
							if( iDis < 100 ){
								this.aPos[i].x += ( this.aPos[i].x - this.oMousePos.x ) * 0.02;
								this.aPos[i].y += ( this.aPos[i].y - this.oMousePos.y ) * 0.02;
							}
							else{
								this.aPos[i].x += (this.aPos0[i].x-this.aPos[i].x) * 0.1;
								this.aPos[i].y += (this.aPos0[i].y-this.aPos[i].y) * 0.1;
							}
						}
						this.oCtx.clearRect(0,0,1000,500);
						for (var i = 0; i < this.aPos.length; i++) {
							this.oCtx.fillRect( this.aPos[i].x,this.aPos[i].y,2,2 )
						}
				},
				getDis: function (obj1,obj2){
					return parseInt( Math.sqrt( Math.pow(obj1.x-obj2.x,2) + Math.pow(obj1.y-obj2.y,2) ) )
				}
			};
			canvasEffect.renderMap();
			canvasEffect.moveEffect();			
		},
		canvas3: function (){
			var map = render.aCanvas[2];
			var c = map.getContext('2d');
		    c.strokeStyle = "rgba(255,255,255,.5)";
			c.lineWidth = 10;
			c.moveTo(100,100);
			c.quadraticCurveTo(200,200,400,400);
			c.stroke();			
			map.onmousedown = function(){
				var l = map.getBoundingClientRect().left;
				var t = map.getBoundingClientRect().top;	
				document.onmousemove = function(ev){
					var x = ev.clientX,
						y = ev.clientY;
					c.clearRect(0,0,1000,500);
					c.beginPath();
					c.moveTo(100,100);
					c.quadraticCurveTo(x-l,y-t,400,400);
					c.stroke();
				}
				document.onmouseup = function(ev){
					var x = ev.clientX - l,
						y = ev.clientY - t,
						count = 0,
						step = x>y?-20:20,
						timer = null,
						max = 0;
					clearInterval( timer );
					timer = setInterval(function(){
						x += step;
						y += -step;
						count ++ ;
						if( Math.abs( x-y ) < Math.abs( step*2 ) && max == 0){
							max = count *2 -1;
						}
						if( count == max ){
							count = 0;
							step = -step;
							max --;
							if( max <= 1 ){
								clearInterval( timer );
								x = y;
							};
						}
						c.clearRect(0,0,600,600);
						c.beginPath();
						c.moveTo(100,100);
						c.quadraticCurveTo(x,y,400,400);
						c.stroke();
					},1);
					document.onmouseup = document.onmousemove = null;
				}
			}			
		},
		canvas4: function (){
			var map = render.aCanvas[1];
			var ctx = map.getContext("2d");
			var width = map.width/2; 
			var height = map.height/2;
			var rem = width/300; 
			var r = width/2-8*rem; 
			function drawBg(){
			    ctx.save();
			    ctx.translate(width/2,width/2);  
			    ctx.lineWidth=4*rem;
			    ctx.shadowBlur=3*rem;
			    ctx.shadowColor="#222";  
			    ctx.shadowOffsetX=3*rem;
			    ctx.shadowOffsetY=3*rem;
			    ctx.strokeStyle="#666";  
			    ctx.fillStyle='rgba(0,0,0,.5)';  
			    ctx.arc(0,0,r,0,2*Math.PI);  
			    ctx.stroke();
			    ctx.fill();
			}
			function drawScale(){
			    ctx.shadowBlur = 0;
			    ctx.shadowColor = "";
			    ctx.shadowOffsetX = 0;
			    ctx.shadowOffsetY = 0;
			    for(var i=0;i<60;i++){
			        ctx.beginPath();
			        if(i%5==0){
			            ctx.strokeStyle="#222";
			            ctx.lineWidth=4;
			            ctx.lineTo((r-8*rem)*Math.cos(2*Math.PI/60*i),(r-8*rem)*Math.sin(2*Math.PI/60*i));
			        }else{
			            ctx.strokeStyle="#666";
			            ctx.lineWidth=2;
			            ctx.lineTo((r-4*rem)*Math.cos(2*Math.PI/60*i),(r-4*rem)*Math.sin(2*Math.PI/60*i));
			        }
			        ctx.lineTo(r*Math.cos(2*Math.PI/60*i),r*Math.sin(2*Math.PI/60*i));
			        ctx.stroke();
			    }
			}
			function drawHour(hour,min){
			    ctx.save();  
			    ctx.beginPath();
			    ctx.lineWidth=6*rem;
			    ctx.lineCap="round";
			    ctx.strokeStyle="#222";
			    ctx.rotate(2*Math.PI/12*(hour-3)+2*Math.PI/12/60*min);
			    ctx.moveTo(-15*rem,0);
			    ctx.lineTo(r/2,0);
			    ctx.stroke();
			    ctx.restore();
			}
			function drawMin(min){
			    ctx.save();
			    ctx.beginPath();
			    ctx.lineWidth=3*rem;
			    ctx.lineCap="round";
			    ctx.strokeStyle="#222";
			    ctx.rotate(2*Math.PI/60*(min-15));
			    ctx.moveTo(-15*rem,0);
			    ctx.lineTo(r/2+30*rem,0);
			    ctx.stroke();
			    ctx.restore();
			}
			function drawSec(sec){
			    ctx.save();
			    ctx.beginPath();
			    ctx.fillStyle="#c14543";
			    ctx.rotate(2*Math.PI/60*(sec-15));
			    ctx.moveTo(-15*rem,2*rem);
			    ctx.lineTo(-15*rem,-2*rem);
			    ctx.lineTo(r-8*rem,-1*rem);
			    ctx.lineTo(r-8*rem,1*rem);
			    ctx.fill();
			    ctx.restore();
			}
			function drawDot(){
			    ctx.beginPath();
			    ctx.fillStyle="#fff";
			    ctx.arc(0,0,6*rem,0,2*Math.PI);
			    ctx.fill();
			}
			function draw(){
			    ctx.clearRect(0,0,width,height); //每秒清除一次矩形
			    var date=new Date();
			    var h=date.getHours();
			    var m=date.getMinutes();
			    var s=date.getSeconds();
			    drawBg();
			    drawScale();
			    drawHour(h,m);
			    drawMin(m);
			    drawSec(s);
			    drawDot();
			    ctx.restore();
			}
			var timer=setInterval(draw, 1000);
			draw();
		}
	};
	for( var attr in renderCanvas ){
		renderCanvas[attr]();
	}
}
var oper = new Operation();
oper.mouseFn();
oper.tabFn();
oper.renderRect();
oper.crush();
var proj = new Project();