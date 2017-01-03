/**
 * es5时代有五种基本数据类型，number、string、boolean、null、undefined
 * es6新增了一种基本数据类型：symbol
 * 功能：可以用Symbol创建一个独一无二的值
 */

//创建
let name = Symbol();
let sex = Symbol();
let age = Symbol('age') //symbol变量的描述
//验证独一无二
console.log(name === sex);

//怎么判断一个值是不是Symbol呢？
console.log(typeof name);



//方法
//Symbol.for()
var color1 = Symbol.for('color');
var color2 = Symbol.for('color');
console.log(color1 === color2);
//用for来创建的时候，会在全局搜索标识符为color的Symbol是不是存在，不存在，创建一个，存在，就返回那个

//Symbol.keyFor()
console.log(Symbol.keyFor(color1));
console.log(Symbol.keyFor(name));



//Symbol和其他类型的值得转换
//1、Symbol -> bollean
//Bollean(name) ok
//!name ok

//2、Symbol -> number
//Number(name) error
//name * 10 error

//3、Symbol -> string
//String(name) ok
//'' + name error

//4、Symbol -> object
//Object(name) ok



//最主要的用途：
//对象的属性
//es5：对象的属性只能是字符串
//es6：对象的属性可以是字符串和Symbol
//例子
var student = {
    [name]: 'didi',
    [age]: '17',
    sex: '1',
    birth: '1997-01-01',
    getName: function() {
        return this[name];
    }
};
//好处：1、不会冲突；2、“较为”私有



//获取对象属性
//es5：
//Object.keys()  返回对象可枚举的属性
//Object.getOwnPropertyNames() 返回对象的属性

//es6新增：
//Object.getOwnPropertySymbols() 返回对象的Symbol属性


//well-know symbols
//内置的Symbol
//Symbol.iterator
//...











