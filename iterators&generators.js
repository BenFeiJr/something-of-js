//Iterators and Generators
//迭代器和生成器

//迭代器解决的是for循环的问题
//1、得额外定义变量来定位位置
//2、

//迭代器
//迭代器是一个对象
//该对象有一个next的方法，当调用这个方法的时候，会返回一个对象，
//返回的对象有两个属性，一个是value（表示的是当前迭代到的值），一个是done（bollean值，表示是否已经迭代到最后）

//生成器
//生成器是一个函数(函数表达式和对象的方法也可以成为生成器)
//这个函数定义的时候是用*号在function关键字后面，函数名前面来标识的，
//在函数体内用yield关键字来定义迭代时返回的value值
//该函数返回一个迭代器

//例子
//生成器
function *getCitys() {
    yield '北京';
    yield '上海';
    yield '苏州';
}

//迭代器
var citys = getCitys(); //生成器按照正常函数正常调用
console.log(citys.next());
console.log(citys.next());
console.log(citys.next());
console.log(citys.next());

//这样直接每次调用next方法，也没什么用
//因为我们需要一个循环的过程（让它自己动起来），以及结束循环的点

//es6新引入了一个循环语法 for of
//这个for of循环，只可以用来循环可迭代的值
//可迭代是由该值有没有Symbol.iterator属性来决定的，有则可以使用，无则不可以使用
//1、生成器生成的迭代器肯定有
//2、集合对象有（array,set,map）
//3、string有

//例子
var citys = ['北京', '上海', '苏州'];
for (let city of citys) {
    console.log(city);
}
//for of循环会首先调用citys的Symbol.iterator属性对应的方法,生成一个迭代器，
//然后在每次循环的时候调用这个迭代器的next方法，将调用方法返回的对象的value属性值赋给city变量
//直至done属性为true，结束循环

//明白上面的for of循环的过程，我们自己也可以手动创建一个可迭代的对象
var iterableCitys = {
    citys: ['北京', '上海', '苏州'],
    [Symbol.iterator]: function *() {
        for (let i = 0; i < this.citys.length; i++) {
            yield this.citys[i];
        }
    }
};
for (let city of iterableCitys) {
    console.log(city);
}



//内置的迭代器
//1、集合对象的（array,set,map）
//entries()  返回一个迭代器，迭代器每次调用next方法时返回的对象的value值是一个数组[key, value]（map类型的默认）
//values()   返回一个迭代器，迭代器每次调用next方法时返回的对象的value值是集合中当前项的value  （array和set类型的默认）
//keys()     返回一个迭代器，迭代器每次调用next方法时返回的对象的value值是集合中当前项的key

//2、字符串的

//3、nodelist的


//spread operators (...)
//扩展运算符
//目前为止，我们在三个地方见到了这个操作符
//1、函数参数
//2、解构赋值
//3、迭代器
//也就对应了它的三个用途
//1、保存函数调用时多传的参数值，此时叫做rest parameters
//2、保存数组解构赋值时剩余的数组项，此时叫做rest items
//3、将一个可迭代的值按照默认的迭代方式返回所有的value值，此时叫做spread operators












function *test(items) {
    for (let i = 0; i < items.length; i++) {
        console.log(items[i] + 'before');
        yield items[i];
        console.log(items[i] + 'after');
    }
}

var ite = test([1, 2, 3]);