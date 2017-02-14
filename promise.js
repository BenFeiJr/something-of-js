function readFile1() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(1);
        }, 1000);
    });
}

function readFile2() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('finished')
            resolve(2);
        }, 1000);
    });
}

function readFile3() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(3);
        }, 1000);
    });
}

var p4 = Promise.all([readFile1(), readFile2(), readFile3()]);
p4.then(function(data) {
    console.log(data);
});


//var promise = readFile();
//promise.then(function(data) {console.log(data)});
//promise.catch(function(err) {console.log(err)});



//promise chains
//怎么解决传值
//成功怎么调失败，失败怎么调成功


function fetch(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        }
        xhr.onerror = function() {
            reject('error');
        }
        xhr.send(null);
    });
}

fetch('./getJson').then(function(data) {
    console.log(data);
}).catch(function(err) {
    console.log(err);
});

sleep(10000);

function sleep(m) {
    var start = Date.now();
    while((Date.now() - start) < m) {}
}

/**
 * promise并不能取代event和callback
 * promise更适合状态比较少的异步操作
 * 如果状态比较多的话，event和cb更灵活
 */


/**
 * es5时代异步编程有两种
 * 说一下异步？
 * 1、event
 * 2、callback(嵌套太多时，回调地狱)
 *
 * es6新增一种
 * 3、promise
 *
 * es7新增一种
 * 4、async
 */

/**
 * promise是什么？
 *
 * promise在js里面是一个对象，是对异步操作结果的包装
 *
 * 比如：let promise = getData();
 * 那么，promise就是对getData结果的包装
 * 这个包装会有两个状态，在这个结果没有出来之前属于操作中，出来后属于操作完成，操作完成时，又有两个状态，一个是操作成功，一个是操作失败
 * 操作中的状态不可以取到，但是可以取到操作完成的状态，在操作完成时可以绑定成功或者失败的处理函数
 *
 * 创建一个promise
 *
 * //最基本的 new Promise创建
 * function fetch(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        }
        xhr.onerror = function() {
            reject('error');
        }
        xhr.send(null);
    });
}
    //也可以用 Promise.resolve() 或者 Promise.reject()
 *
 * 绑定成功和失败的处理函数
 *
 * promise.then(
 *     function() {
 *         //成功处理
 *     },
 *     function() {
 *         //失败处理
 *     }
 * );
 *
 * 或者
 *
 * promise
 *     .then(function() {
 *         //成功处理
 *     })
 *     .catch(function() {
 *         //失败处理
 *     });
 */

//上面和我们平常使用的回调感觉也差不多啊
//厉害的事，它可以链式调用(也就是说，我有好几个异步操作，但是它们必须得是一个接一个被调用的)
//比如我有一个需求，是
//1、获取用户登录信息
//2、根据用户登录信息获取用户详细信息
//3、根据用户详细信息获取用户历史订单数据
//4、渲染历史订单数据
//我们可以直接这样写

login().then(function(loginNumber) {
    return getUserInfo(loginNumber);
}).then(function(userInfo) {
    return getOrder(userInfo.id);
}).then(function(orderList) {
    render(orderList);
})


//还要一个厉害的是，它可以监控多个同时在跑的异步操作
//用计算完整度来举例子

Promise.all()














