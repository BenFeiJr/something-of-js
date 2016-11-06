/**
 * strings and regular expressions
 *
 * template literals (模板字面量)
 *
 * 我们常常在代码里面会有一个操作是 用获取到的数据来拼接 html字符串
 *
 *
 *
 */

/**
 * 基础语法：
 * 反引号 包裹
 */

let message = `today is 11.11`;
console.log(message);
console.log(typeof message);

//如果字符串内想包含反引号的话，用\转义
message = `today is \` 11.11 \``;
console.log(message);

/**
 * 先有问题：
 * 创建 多行字符串
 */

//es5时代 用单引号或者多引号 创建的字符串 是单行的
message = 'tody\
is\
11.11\
';
console.log(message);

//es5解决办法 加一个换行的转义字符
message = 'tody \n\
is\n\
11.11';
console.log(message);


/**
 * 替换 ${} 包裹 任何合法的js表达式
 *
 * 列举 表达式 包括哪些 calculations function call
 * 常见的哪些是：literals(null true false array object), function defining expressions, template literals, grouping operator, property accessors, new operator, function calls, delete operator,void operator, typeof opetator, + - ! operator, conditional operator, comma operator
 * 常见的哪些不是：if 语句，循环语句，switch 语句， return
 */

let date = '11.12';
message = `today is ${date}`;
console.log(message);

//
let count = 10;
let price = 100;
message = `today is ${date}, i payed ￥${(count * price).toFixed(2)}`;
console.log(message);

//条件语句
//message = `today is ${date}, i payed ￥ ${ if (count > 0) count * price }`;
//console.log(message);
count = 0;
message = `today is ${date}, i payed ${ count > 0 ? '￥' + (count * price).toFixed(2) : 'no money' }`;
console.log(message);

//循环语句
//message = `today is ${date}, i payed ${ return '￥1000'; }`;
//console.log(message);
//
//
//tag

















