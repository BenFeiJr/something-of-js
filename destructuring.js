//在函数调用时用不理解
//

//结构赋值
//提供了第二种  为变量赋值  的语法
//es5：(示例都用var关键字来声明，避免let关键字重复声明报错)
//关键字（var,let,const） 标识符 = js表达式;
var a = 1;
var b = 2;

//es6新增:
//关键字 字面量（数组或者对象）= js表达式
var [a, b] = [1, 2];
var {a, b} = {a: 1, b: 2};



//分两部分来讲
//对象的解构
//有两种赋值的情况
//1）初始化
var value = {a: 1, b: 2};
var {a, b} = value;

//2）赋新值
({a, b} = {a: 3, b: 4});

//对象的结构在这两种情况有个注意点，赋新值得时候，得用圆括号包裹一下
//因为，不包裹的话，以为是块作用域的声明

//赋值的细节
//一句话：以形补形
//上例写完整就是
({a: a, b: b} = {a: 3, b: 4});
//赋值语句左边的对象字面量里面的 属性，起到的是定位的作用，把定位到的值赋给属性的右边
//上例也就是说：读取对象里面的a属性的值，把它赋给a变量

//如果想用其他变量名
({a: myA, b: myB} = {a: 3, b: 4});
//上例也就是说，读取对象里面的a属性的值，把它赋给myA变量
//如果没有找到对应的属性呢？
//赋给变量的值是undefined
({c: myC} = {a: 3, b: 4});

//当有可能检索不到对应的属性的时候，就想着要给它个默认值
//语法
({c: myC = 5} = {a: 3, b: 4});
//5被赋给myC的时机：c属性不存在或者值为undefined
//也就是说，这种情况下还是5
({c: myC = 5} = {c: (function() { var c = 6; })()});

//但是这种情况下就不是5了
({c: myC = 5} = {c: null});
//差不多和function的参数的默认值相似


//=右边的js表达式在不同情况下的赋值
//注意的是，当等号左边的解构目标是对象字面量的时候，等号右边的解构来源就会被强制转换成object，调用内部方法ToObject()
//null ->  抛出错误
//undefined ->   抛出错误
//这两个抛出错误也就表明了解构来源不能是null和undefined

//number -> new Number(value)
//string -> new String(value)
//bollean -> new Bollean(value)
//object -> object




//数组的解构赋值
//基本和对象的一样
var citys = ['北京', '上海', '苏州'];
var [firstCity, secondCity] = citys;
//对象解构赋值的定位是根据属性名，数组解构赋值的定位是根据数组项的位置

//如果只想取个别几项
var [,, thirdCity] = citys;

//注意的是，当等号左边的解构目标是数组字面量的时候，等号右边的解构来源必须是可迭代的值
//null ->  抛出错误
//undefined ->   抛出错误
//number -> 抛出错误
//string -> ok
//bollean -> 抛出错误
//object -> 除去可迭代对象（array,set,map）外，其他抛出错误


//rest items
//解构来源是数组字面量的时候，也可以使用reset items，
//语法：...标识符
//作用：将剩余的数组项包裹成一个数组赋值给该变量
//



//复杂的解构赋值
//就是对象解构赋值和数组解构赋值 混合起来
//详细见应用中的第一个



//解构赋值的几种应用
//用途：
//1、在复杂结构的数据中简单的获取某一段数据
/*let response = {
    success: true,
    data: {
        name: 'didi',
        age: 20,
        sex: '男',
        orderList: [
            {
                id: '001',
                name: '白金套餐'
            },
            {
                id: '002',
                name: '黄金套餐'
            }
        ],
        lovedCity: ['北京', '上海', '苏州']
    }
};*/

let response = {
    success: false,
    data: null
};

//es5时代的方案：
/*let name = response.data.name;
let orderList = response.data.orderList;
let firstLovedCity = response.data.lovedCity[0];*/
//缺点：
//1、变量得一个一个的声明，赋值，繁琐
//2、为了寻找一个嵌套在最深层的数据，得一层一层地找下去
//3、还得判断，比如上例，很平常的异步返回结果，想按照上面的取值方法，得进行这些判断
//1）success是否为ture
//2）respinse.data是否为null
//3）response.data.orderList和response.data.lovedCity是否为null
//
//


//es6时代的方案：
let {
    data = {
        name: '',
        orderList: [],
        lovedCity: []
    }
} = response;
//缺点：
//还是要进行判断

console.log(data)
/*console.log(name);
console.log(orderList);
console.log(firstLovedCity);*/



//2、函数的参数上面做点文章
//情景：
//写一个提示的函数
//es5:
var eMsg = function(text, options) {
    options = options || {};
    //延迟delay时间来显示信息
    var delay = typeof options.delay === 'undefined' ? 0 : options.delay;
    //显示信息后timer时间后消失
    var timer = typeof options.timer === 'undefined' ? 3000 : options.timer;

    setTimeout(function() {
        alert(`显示${text}`);

        setTimeout(function() {
            alert(`隐藏${text}`);
        }, timer);

    }, delay)
};

//es6
var eMsg = function(text, {delay = 0, timer = 3000} = {}) {
    setTimeout(function() {
        alert(`显示${text}`);

        setTimeout(function() {
            alert(`隐藏${text}`);
        }, timer);

    }, delay)
};












