#ECMAScript 6

##1、let & const

新增了两种声明变量的关键字：let和const，解决js没有块级作用域的问题。         
>*声明全局变量用var关键字，常量用const关键字，其他用let关键字*



##2、解构赋值（destructur）
新增了一种为变量赋值的方式，可以一次性大批量的赋值
```js
function getFullName(user) {
    let firstName = user.firstName;
    let lastName = user.lastName;

    return `${firstName} ${lastName}`;
}

//对比

function getFullName(user) {
    let {firstName, lastName} = user;
    return `${firstName} ${lastName}`;
}


const arr = [0, 1, 2, 3];
let first = arr[0];
let second = arr[1];

//对比

let [first, second] = arr;
```



##3、模板字符串（template strings）
新增了一种拼接字符串的方式，用反引号（``）来包裹字符串，还可以在里面放合法的js表达式        
远离

```js
var tbodyHtml = '';
data.forEach(trData) {
    tbodyHtml += '<tr>' +
        '<td>' + trData.text + '</td>'
    '</tr>';     
} 
```
拥抱
```js
var tbodyHtml = '';
data.forEach(trData) {
    tbodyHtml += `<tr><td>${trData.text}</td></tr>`;     
} 
```



##4、Object & Array new APIs
新增了一些有用的api
```js
Object.is() //来取代 == 和 ===
Object.assign() //取代$.extend()

Array.from() //取代$.makeArray()
Array.find() //取代indexOf
```


##5、箭头函数（arrow function）
新增了一种简洁的定义函数的形式，箭头函数里面使用this没有怪癖，就像正常的变量一样，遵循词法作用域
>*搭配数组内置的函数，用起来真心爽啊*


```js
Array.from($('.area-select'))
     .map(function(select) {
         return $(select).find('option:selected').text();
     })
     .filter(function(text) {
         return isNotEmpty(text);
     })
     .join();

//对比

Array.from($('.area-select'))
     .map((select) => $(select).find(option:selected).text())
     .filter((text) => isNotEmpty(text))
     .join();
```



##6、Default & Rest
可以在定义函数时，为形参添加默认值，或者，获取剩余的参数值了
```js
function eMsg(text, delay = 3000) {
    //
}

function sum(...numbers) {
    //
}
```

##7、promise
新增了一种异步编程方式
>*终于可以写出别人看不懂的ajax了*


##8、模块（modules）
新增了一种js加载方式
>*future，你懂不懂*



##9、for of循环
新增了一种循环方式
>*什么，又新增了一种循环方式，我还在用for循环，怎么办？*



##10、类（class）
你们哭着喊着要的官方的class来了，say good bye to prototype
>*“面向对象编程”学了这么久，学会了么*

```js
class Coder {
    constructor(language) {
        this.language = language;
    }
}
```



















