function move(info){
	if( info.elem.bMoving ){
		return;
	}
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
		info.elem.bMoving = true;
		if( t > d ){
			t = d; 
			clearInterval(info.elem.timer);
			info.elem.bMoving = false;
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
}	
var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},  
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 4;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},      
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},  
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};



function transform(el,attr,val){
	if(!el.transform){
		el.transform = {};
	}
	if(typeof val == "undefined"){
		return el.transform[attr];
	} else {
		el.transform[attr] = val;
		var inner = "";
		for(var s in el.transform){
			switch(s){
				case "rotate":
				case "rotateX":
				case "rotateY":
				case "rotateZ":
				case "skewX":
				case "skewY":
					inner += s+'('+el.transform[s]+'deg)';
					break;
				case "translateX":
				case "translateY":
				case "translateZ":
					inner += s+'('+el.transform[s]+'px) ';
					break;
				case "scale":
				case "scaleX":
				case "scaleY":
					inner += s+'('+el.transform[s]+')';		
			}
		}
		el.style.WebkitTransform = el.style.transform = inner;
	}
}
function css(el,attr,val){
	var CSS3TRANSFORM = [
		"rotate",
		"rotateX",
		"rotateY",
		"rotateZ",
		"skewX",
		"skewY",
		"translateX",
		"translateY",
		"translateZ",
		"scale",
		"scaleX",
		"scaleY"
	];
	for(var i = 0; i < CSS3TRANSFORM.length; i++){
		if(CSS3TRANSFORM[i] == attr){
			return transform(el,attr,val);
		}
	}
	if(typeof val == "undefined"){
		val = parseFloat(getComputedStyle(el)[attr]);
		return val;
	}
	switch(attr){
		case "opacity":
		case "zIndex":
			el.style[attr] = val;
			break;
		default:
			el.style[attr] = val + "px";	
	}
}