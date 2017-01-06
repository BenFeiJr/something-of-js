/*function readFile() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            var err = Math.random() < 0.5;
            if (err) {
                reject('error');
            }
            else {
                resolve('success');
            }
        }, 2000);
    });
}

var promise = readFile();
promise.then(function(data) {
    console.log(data);
});
promise.catch(function(err) {
    console.log(err);
});
setTimeout(function() {
    promise.then(function(data) {
        console.log('2' + data);
    })
}, 4000)*/

var promise = Promise.resolve(1);
promise.then(function(data) {
    console.log(data);
});
console.log(2);
promise.then(function(data) {
    console.log(3)
});
















