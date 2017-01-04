/**
 * object
 */
//更简洁的对象字面量语法
//属性可以怎么简洁呢
//

let createPerson = function(name, age) {
    return {
        name,
        age
    };
}
console.log(createPerson('original', 'original'));

//原理就是：当一个对象字面量中的属性只有属性名的时候，它会循着作用域链来找和它名字相同的变量，找到的话，那个变量的值就是该属性的值，找不到的话就报错

//再来几个列子
let pName = 'wo';
createPerson = function(name, age) {
    let pAge = '13';
    return {
        pName,
        pAge
    };
}
console.log(createPerson('original', 'original'));

pName = function() {
    console.log(this)
    console.log(this.pAge);
};
let person = createPerson('original', 'original');
console.log(person);
person.pName();
pName();



//方法可以怎么简洁呢
//es5时代
person = {
    name: 'didi',
    getName: function() {
        return this.name;
    }
};

//es6
person = {
    name: 'didi',
    getName() {
        return this.name;
    }
};



/**
 * computed property names
 * 我们想一种情景，我有一个对象，它的属性名是不确定的，比如我们拿今天的日期作为属性名，今天是11，可是明天就是12了，所以我们在创建这个对象的时候，怎么办？
 */

//es5时代
let today = (new Date()).getDate();
person[today] = 'some value';
console.log(person);

//es6时代
//我们可以直接在对象字面量里面用方括号来包裹一个表达式，这个表达式的结果是按照字符串来计算的
person = {
    [today]: 'some value'
};
console.log(person);

//表达式
function getToDay() {
    return (new Date()).getDate();
}
person = {
    [getToDay()]: 'property by function call'
};
console.log(person)

//
function getPropertyName() {
    return {};
}
person = {
    [getPropertyName()]: 'property by function call'
};
console.log(person)



/**
 * new methods
 */

//Object.is()
//现有问题：== 会造成隐式转换 (上那张图)
//        === 会有一些怪癖
console.log(5 == '5');
console.log(0 == false);

console.log(+0 === -0);
console.log(NaN === NaN);

//接受两个参数，只有这两个参数类型相同，值相同，才会返回true
console.log(Object.is(5, '5'));
console.log(Object.is(0, false));
console.log(Object.is(+0, -0));
console.log(Object.is(NaN, NaN));



//Object.assign()
//混合两个object
//es5
let receiver = {
    name: 'didi'
};
let supplier = {
    name: 'dada',
    getName: function() {
        return this.name;
    }
};
/*function mixin(receiver, supplier) {
    Object.keys(supplier).forEach(function(key) {
        receiver[key] = supplier[key];
    });
    return receiver;
}

mixin(receiver, supplier);
console.log(receiver);
console.log(receiver.getName());*/


/*supplier.getName = function() {
    console.log('changed');
}
console.log(receiver);
console.log(receiver.getName());*/


//es6
Object.assign(receiver, supplier);
console.log(receiver);
console.log(receiver.getName());



/**
 * own property enumeration order
 * 定义了对象属性被枚举时的顺序
 * 1、数字类型的key按照升序
 * 2、字符串类型的key按照被添加进的顺序
 * 3、symbol类型的key按照被添加进的顺序
 */
let symbolKey = Symbol();
let obj = {
    by: 1,
    0: 1,
    az: 1,
    symbolKey: 1,
    '2': 1,
    1: 1
};
obj['3'] = 1;
obj['cx'] = 1;
console.log(Object.getOwnPropertyNames(obj));
console.log(Object.keys(obj));
console.log(JSON.stringify(obj));

for (let key in obj) {
    console.log(key);
}




/**
 * more powerful prototypes
 * 原型是什么？
 * 原型是一个对象，我们创建的函数都会有一个prototype属性，指向一个对象，这个对象就被称为原型对象。它有什么作用呢？
 * 这个对象包含由特定类型的所有实例所共享的的属性和方法；那么这个特定类型的实例是怎么来的呢？就是我们用将这个函数当作
 * 构造函数来调用，即new。new出来的实例内部有一个不可以被访问到的属性来指向原型对象.
 * 那么我们现在有了原型，有了实例，怎么来确定他们之间的关系呢
 * 有两种方法  instanceof操作符  和  isPrototypeOf()方法
 *
 * 那么我们怎么获取实例的原型对象呢
 * es5时代有一个方法 Object.getPrototypeOf();
 *
 * 从上面我们可以看出一个东西，es5时代实例的原型对象是不可以被修改的，除非你修改了构造函数的原型对象
 * 可是如果我们就是要修改实例的原型对象呢
 * es6时代新增了一个方法 Object.setPrototypeOf();
 */

//
function Animal() {}
Animal.prototype.type = 'animal';
Animal.prototype.getType = function() { return this.type; };

person = new Animal();
person.type = 'person';
let friends = new Animal();
console.log(friends.getType());
console.log(friends instanceof Animal);
console.log(Animal.prototype.isPrototypeOf(friends));
console.log(Object.is(Object.getPrototypeOf(friends), Animal.prototype));

//改变原型
Object.setPrototypeOf(friends, person);
console.log(friends.getType());
console.log(friends instanceof Animal);
console.log(Animal.prototype.isPrototypeOf(friends));
console.log(Object.is(Object.getPrototypeOf(friends), Animal.prototype));




/**
 * super
 */
person = {
    type: 'person',
    getGreeting() {
        return 'hello, by ' + this.type;
    }
};

dog = {
    type: 'dog',
    getGreeting() {
        return 'woof, by ' + this.type;
    }
};

friend = {
    type: 'friend',
    getGreeting() {
        return Object.getPrototypeOf(this).getGreeting.call(this) + ',hi!';
    }
};

Object.setPrototypeOf(friend, person);
console.log(friend.getGreeting());

//super的作用就相当于 Object.getPrototypeOf(this) 的缩写,并且还给绑定了正确的this值
friend = {
    type: 'friend',
    getGreeting() {
        return super.getGreeting() + ',hi!';
    }
};
Object.setPrototypeOf(friend, person);
/*
console.log(friend);
console.log(friend.getGreeting());

Object.setPrototypeOf(friend, dog);
console.log(friend);
console.log(friend.getGreeting());*/


//但是有一个限制，就是super只能用在简洁的方法定义中
//可能会感觉，也就精简了一下代码而已，但是我们看个例子
let gFriend = Object.create(friend);
console.log(gFriend.getGreeting());


/********************************************************************************************/

/**
 * array
 */

//创建array
//es5时代：new Array()方法，array字面量
//其中new方法有一些怪癖
let arr = new Array(2);
console.log(arr.length);
console.log(arr[0]);
console.log(arr[1]);

arr = new Array('2');
console.log(arr.length);
console.log(arr[0]);
console.log(arr[1]);

arr = new Array(1, 2);
console.log(arr.length);
console.log(arr[0]);
console.log(arr[1]);

arr = new Array(3, '2');
console.log(arr.length);
console.log(arr[0]);
console.log(arr[1]);

//综上，只传一个数字类型的参数时，该数组的长度就是由这个数字决定的；
//只传一个非数字类型的参数时，数组只有一项，该项的值是这个参数
//传多个参数时，每个参数都是数组的一项

//es6提供了第三种创建方法
//Array.of()
//会创建一个数组，数组的每一项对应每一个参数


//类数组对象 -》 数组
//es5时代
function makeArray(arrayLike) {
    var result = [];
    for (var i = 0, len = arrayLike.length; i < len; i++) {
        result.push(arrayLike[i]);
    }

    return result;
}

//比较简洁的方法
function makeArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
}


//es6时代
//Array.from() 接受两个参数
//
//


//找到数组中的特定的某一项
//es5时代 indexOf() lastIndexOf()
//局限，不够灵

//es6时代。find() findIndex();
//补充经典的数组使用方法
//1、拼接表格
//2、自定义标签传值







//Set&Map
//set
//值的集合（值得类型可以是任意的）
//创建
var set = new Set();
//或者
//var set = new Set(任意的iterable的值);
//添加
set.add(1);
set.add(2);
set.add(3);
//删除
set.delete(1);
//全部清除
set.clear();
//set的长度
set.size;
//是否存在某一个值
set.has(2);



//set vs array
//1、可以互相转换
//set -> array
var set = new set([1, 2, 3]);
var array = [...set];
//array -> set
set = new set(array);

//2、set里面的每一个值是唯一的，不允许重复
//不允许重复，那么就涉及到值的比较
//set里面判断两个值是否一样的规则是
//基本和===全等差不多(Object.is())
//区别在于 认为 NaN 与 NaN相等


//weakset
//也是值的集合，但是这个值，只能是对象
//创建
var weakset = new WeakSet();
var name = {};
weakset.add(name);
weakset.has(name);
weakset.delete(name);

//weakset vs set
//1、值必须是对象
//2、不可迭代，所以用不了for of 循环，也用不了keys()和values()
//3、没有forEach方法
//4、没有size属性



//map
//键值对的集合
//创建
var map = new Map();
//或者var map = new Map([['name': 'didi'], ['age': '17']]);
//添加
map.set('name', 'didi');
//获取
map.get('name');
//检测是否存在
map.has('name');
//删除某一项
map.delete('name');
//删除全部
map.clear();
//map长度
map.size;


//map vs object
//1、map的key的类型可以是任何类型，甚至object
//2、no prototype
//



//weakmap
//键值对的集合，但是这个键必须是非null对象
//创建
var weakmap = new WeakMap();
//添加
var name = {};
weakmap.set(name, 'didi');
//检测
weakmap.has(name);
//获取
weakmap.get(name);
//删除
weakmap.delete(name);

//weakmap vs map
//1、键必须是非null object










