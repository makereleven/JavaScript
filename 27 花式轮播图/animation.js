/*
 * Tween.js
 * t: current time（当前时间）
 * b: beginning value（初始值）
 * c: change in value（变化量）
 * d: duration（持续时间）
*/
var Tween = {
    
    //直线运动
    Linear:  function(t, b, c, d) { return c*t/d + b; },

    //二次曲线
    Quad: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c *(t /= d)*(t-2) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t-2) - 1) + b;
        }
    },

    //三次曲线
    Cubic: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
            return c / 2*((t -= 2) * t * t + 2) + b;
        }
    },

    //四次曲线
    Quart: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t*t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c * ((t = t/d - 1) * t * t*t - 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
        }
    },

    //五
    Quint: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2*((t -= 2) * t * t * t * t + 2) + b;
        }
    },

    Sine: {
        easeIn: function(t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
        }
    },
    
    Expo: {
        easeIn: function(t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t, b, c, d) {
            return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Bounce: {
        easeIn: function(t, b, c, d) {
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function(t, b, c, d) {
            if (t < d / 2) {
                return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            } else {
                return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
};



/*  
* 完整版运动框架
* ele 元素节点对象
* attr 属性值（json数据对象）
* time 时间相关 （json数据对象）
* callback 回调函数
*/
function animation(ele,attr,time,callback){

    var goTime = new Date(),//获取开始时间
        startValue = {},//储存初始值
        timingFn = Tween.Linear,//速度曲线函数
        timingType = ['easeIn','easeOut','easeInOut'];//曲线类型

    //如果设置了动画曲线
    if(time.timing){

        //设置用户传进来的动画曲线类型
        (Tween[time.timing][timingType[time.timingType]]) && (timingFn = Tween[time.timing][timingType[time.timingType]]);
    }

    //遍历json数据并设置到startValue
    for(var key in attr){

        //判断是不是一个josn数据
        if(typeof attr[key] === 'object'){

            //启动start函数进行设置
            startValue[key] = attr[key].up.bind(ele,attr[key].start.call(ele,key));
        }else{

            var start = parseFloat(getStyle(ele)[key]),//初始值
                change = parseFloat(attr[key]) - start;//运动总路程

            //如果总路程不为0才加入
            if(change !== 0){
                startValue[key] = {
                    start : start,
                    change : change
                }
            }
        }
    }

    //开始之前取消之前的动画
    cancelAnimationFrame(ele.animaTimer);

    //如果需要延迟
    if(time.delay){

        //延迟动画
        (function delay(){

            if(new Date().getTime() - goTime >= time.delay){

                goTime = new Date();//调用之前需要重新设置开始时间，因为延迟之后时间不准了！
                fn();//延迟时间到，开始调用
            }else{

                //时间没到，那就下次浏览器重绘制时重新调用
                ele.animaTimer = requestAnimationFrame(delay);
            }
        })();
    }else{

        goTime = new Date();//调用之前需要重新设置开始时间，因为延迟之后时间不准了！
        fn();//不需要延迟直接调用
    }

    //调用动画函数
    function fn(){

        var now = new Date().getTime() - goTime;//当前时间
        
        //时间未到
        if(now / time.duration >= 1){

            //当前时间设置成完成时间
            now = time.duration;

            //设置样式
            setStyle(ele,startValue,now,time.duration,timingFn);

            //启用回调函数
            callback && callback.call(ele);
        }else{

            //设置样式
            setStyle(ele,startValue,now,time.duration,timingFn);

            //时间未到重新调用
            requestAnimationFrame(fn);
        }
    };
}

//设置样式
function setStyle(ele,attr,now,duration,timingFn){

    for(var key in attr){

        if(typeof attr[key] === 'function'){

            attr[key](now,duration,key,timingFn);
        }else{

            //默认px单位
            var em = 'px';
            if(key === 'opacity'){

                //如果是渐变属性
                em = '';
            }
            
            ele.style[key] = timingFn(now,attr[key].start,attr[key].change,duration)+em;
        }
        
    }
}

//获取最终样式
function getStyle(ele){

    return ele.currentStyle || getComputedStyle(ele);
}