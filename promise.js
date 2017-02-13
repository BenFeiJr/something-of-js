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
















