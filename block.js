let q = document.querySelectorAll.bind(document);

/**
 * block bindings
 *
 * 解决什么问题，
 * 没有块级作用域，变量声明提升
 * 很经典的例子
 */

 function getValue(condition) {
    if (condition) {
        var value = 'dog';

        return value;
    }
    else {
        return 'cat';
    }
 }

 var elements = q('.blockBindings-test');
 for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', function() {
        console.log(i);
    }, false);
 }


 /**
  * es5解决办法
  * 手动用匿名函数创建一个块级作用域
  */
 for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', (function(i) {
        return function() {
            console.log(i);
        }
    })(i),false);
 }


 /**
  * es6解决办法
  * 你只需要一个let
  *
  */
 for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', function() {
        console.log(i);
    }, false);
 }

/**
 * 块级作用域是怎么创建的
 * 1、inside of a function
 * 2、inside of a block (indicated by { and } characters)
 *
 * let声明的变量不会提升
 * 一个作用域内，如果一个标识符已经被定义了，那么再次使用那个标识符来声明let 变量时，会报syntax error
 *
 *
 * constant
 * const关键字声明常量，意思是该常量的值一旦被设置之后是不允许被修改的，
 * 所以声明时必须同时伴随着变量的初始化，否则报语法错误
 *
 * es5办法：标识符全大写来约定为常量，但他不是真常量，是可以被修改的
 *
 *
 * let vs const
 * 相同点：块级作用域，没有变量声明提升，同一作用域下不能被重复声明
 * 不同点：const已经声明并初始化的变量，不允许再次被赋值
 * A const declaration prevents modification of the binding and not of the value itself.
 * Just remember: const prevents modification of the binding, not modification of the bound value.
 */

 const variable1 = 'haha';
 //variable1 = 'haha';

/**
 * 有一点比较特殊：
 * const声明的变量是一个object
 */

const obj = {
    name: 'haha'
};
obj.name = 'heihei'; // it works
console.log(obj.name)
/*obj = {
    name: 'haha'
}; */ // throw error

var obj2 = {
    name: 'haha'
};
const obj3 = obj2;
obj2 = null;
console.log(obj3)

var str2 = 'haha';
const str3 = str2;
str2 = 'heihei';
console.log(str2);

const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

//说明：出问题的地方在k++
/*for (const k = 0; k < 3; k++) {
    console.log(k);
}*/

for (let k = 0; k < 3; k++) {
    const j = k;
    console.log(j);
}

let dog = {
    name: 'didi',
    age: '5',
    sex: 'man'
};
for (const key in dog) {
    console.log(key);
}


/**
 * 暂时性死锁 The Temporal Dead Zone
 *
 * A variable declared with either let or const cannot be accessed until after the declaration. Attempting to do so results in a reference error, even when using normally safe operations such as the typeof operation
 */

console.log(typeof notDefined1);

console.log(typeof notDefined2);
//let notDefined2 = 2;

/**
 * todo：查找for loop中let为什么会在{}里
 * On each iteration, the loop creates a new variable and initializes it to the value of the variable with the same name from the previous iteration.
 */


/**
 * let const vs var
 *
 * let和const声明的变量不挂载在window上
 *
 * 不会覆盖window对象的属性
 * 不可以使用delete删除
 */

//let alert = '逗你玩';
var alert = '逗你玩';
console.log(alert);
console.log(window.alert);




















