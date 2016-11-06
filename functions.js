//"use strict";
/**
 * functions
 */

/**
 * default parameter values
 *
 */

//es5时代解法
function getSomeData(url, timeout, callback) {
    timeout = timeout || 3000;
    callback = callback || function() {};

    //other
}
//问题：或语句会进行隐士转换 getSomedata('./aa', 0, cb);
//改进版：
function getSomeData(url, timeout, callback) {
    timeout = (typeof timeout === 'undefined') ? 3000 : timeout;
    callback = (typeof callback === 'undefined') ? function() {} : callback;

    //other
}

//es6解法，给形参初始化一个值
function getSomeData(url, timeout = 3000, callback = function() {}) {

    //other
}
//可以给任意参数设置默认值
function getSomeData(url, timeout = 3000, callback) {

    //other
}
//那么，在什么时候，函数会使用我们设置的默认值呢？
//1）参数没有传的时候
//2）参数传了，但是值是 undefined（不包括null）的时候

function getSomeData(url, timeout = 3000, callback = function() {}) {

    //other
    console.log(timeout);
}
//getSomeData('./aa', void(0));
//getSomeData('./aa', null);

//default parameter values affect the arguments object
//es5时代：no strict模式下，在函数体内，形参的值变了，arguments对象中对应的值也会变；strict模式下，不会变
//es6时代：同es5 strict模式
function getSomeData(url, timeout = 3000) {
    console.log(arguments.length);
    console.log(url === arguments[0]);
    console.log(timeout === arguments[1]);
    console.log(arguments[0]);
    console.log(arguments[1]);

    url = './change';
    timeout = 16;

    console.log(url === arguments[0]);
    console.log(timeout === arguments[1]);
    console.log(arguments[0]);
    console.log(arguments[1]);
}
//getSomeData('./aa', 4000);
//getSomeData('./aa')

//default parameter values可以怎么初始化呢
//任意的javascript表达式
//甚至是前面的形参，但是不能是后面的形参，因为暂时性死区
//执行时机：调用方法且该参数未传或者值为undefined
function getTimeout() {
    return 3000;
}
function getSomeData(url, timeout = getTimeout()) {
    console.log(timeout)
}
var timer = 16;
function getSomeData(url, timeout = (delete window.timer)) {
    console.log(timeout)
}
function getSomeData(url, timeout = (timer > 0 ? 'false' : 'true')) {
    console.log(timeout)
}
function getSomeData(url, timeout = void(0)) {
    console.log(timeout)
}
getSomeData('./aa');


//介绍 default 和 unnamed时可以从两方面入手
//js中对函数的参数不做限制，也就是说，在调用时可以传入少于或者多余 声明时的 形参的个数
//少于时的情况见上方
//多余时的情况见下方
//
//
//有一个例子

//es5
//1）不清楚，因为形参只定义了一个，所以并不知道可以传多个参数，除非加注释
//2）i 从一开始
function pick(obj) {
    var result = {};
    for (var i = 1; i < arguments.length; i++) {
        result[arguments[i]] = obj[arguments[i]];
    }

    return result;
}

/**
 * rest parameters
 * 由三个点加一个标识符来表示，这个标识符在函数体内是数组格式的，包含所有剩余的参数
 * 注意：
 * rest parameters 必须得是最后一个形参
 */

function pick(obj, ...keys) {
    var result = {};
    for (var i = 0; i < keys.length; i++) {
        result[keys[i]] = obj[keys[i]];
    }

    return result;
}


/**
 * the spread opetator
 * 用途：将数组进行分割，然后把各项作为参数传递给函数
 *      set转换成array
 *      有待扩充
 */
//经典例子，比较数组中数字的大小
let numbers = [0, -1, 99, 25];
let max;
//es5
max = Math.max.apply(Math, numbers);
console.log(max);

//es6
max = Math.max(...numbers);
console.log(max)


/**
 * name property
 */

function fn1() {}
console.log(fn1.name);

let fn2 = function() {};
console.log(fn2.name);

let fn3 = function fn4() {};
console.log(fn3.name);

let dog = {
    name: 'didi',
    getName: function() {
        return this.name;
    }
};
console.log(dog.getName.name);


function fn5() {};
console.log(fn5.bind().name);

console.log(function() {}.name);

console.log((new Function()).name);



/**
 * block level function
 * strict模式和非strict模式表现不一样
 * 非strict模式会提升到global
 */

if (true) {
    console.log(typeof fn6);
    function fn6() {};
}
console.log(typeof fn6);



/**
 * arrow functions
 * 一种新的定义函数的语法
 * 语法： 参数 => 函数体
 */
//参数个数为0
let arrowFnDemo = () => '参数个数为0';
console.log(arrowFnDemo());

//参数个数为1
arrowFnDemo = msg => msg;
console.log(arrowFnDemo('参数个数为1_1'));

arrowFnDemo = (msg) => msg;
console.log(arrowFnDemo('参数个数为1_2'));

//参数个数大于1
arrowFnDemo = (msg1, msg2) => msg1 + msg2;
console.log(arrowFnDemo('参数个数', '大于1'));

//使用default parameter values
arrowFnDemo = (msg1, msg2 = '是几呢？') => msg1 + msg2;
console.log(arrowFnDemo('参数个数'));

//使用rest operator
arrowFnDemo = (...msgs) => {
    let result = '';
    for (let i = 0; i < msgs.length; i++) {
        result += msgs[i];
    }
    return result;
}
console.log(arrowFnDemo('这回', '使用了', 'rest operator'));
console.log(arrowFnDemo(...['这回', '使用了', 'spread operator']));


//函数体什么都没有
arrowFnDemo = () => {};
console.log(arrowFnDemo());

//函数体只有一句
arrowFnDemo = (msg) => msg;
console.log(arrowFnDemo('函数体只有一句'));

//函数体大于一句
arrowFnDemo = (msg) => {
    msg += ',so';
    return msg;
};
console.log(arrowFnDemo('函数体大于一句'));

//函数体没返回任何东西
arrowFnDemo = (msg) => {
    msg += ',so2';
};
console.log(arrowFnDemo('函数体没返回任何东西'));

//函数体只有一句且返回的是一个对象字面量
arrowFnDemo = () => ({name: 'didi'});
console.log(arrowFnDemo());




/**
 * 箭头函数与正经函数表达式的区别
 */

//no this bindings, can not change this
//this的值是由最近的父级作用域的this决定的
let page;
/*page = {
    title: 'es6',
    init: function() {
        document.addEventListener('click', function(event) {
            console.log(this);
            this.doSomething();
        }, false);
    },
    doSomething: function() {
        console.log('doSomething');
    }
};*/
//page.init();

page = {
    title: 'es6',
    init: function() {
        document.addEventListener('click',
            event => {
                console.log(this);
                this.doSomething();
            }, false);
    },
    doSomething: function() {
        console.log('doSomething');
    }
};

page = {
    title: 'es6',
    init: function() {
        document.addEventListener('click',
            (event => {
                console.log(this);
                this.doSomething();
            }).bind(window), false);
    },
    doSomething: function() {
        console.log('doSomething');
    }
};
page.init();

arrowFnDemo = () => {return this};
console.log(arrowFnDemo());

//no arguments object

//cannit be called with new, no prototype



























