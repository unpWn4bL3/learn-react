class MyPromise {
    constructor(executor) {
        this.status = "pending"

        this.value
        this.error

        this.resolveCallbacks = []
        this.rejectedCallbacks = []

        let resolve = (res) => {
            if (this.status = 'pending') {
                this.status = 'fullfilled'
                this.value = res
            }
        }

        let reject = (err) => {
            if (this.status = 'pending') {
                this.status = 'rejected'
                this.error = err
            }
        }
        executor(resolve, reject)
    }

    then(onFullfilled, onRejected) {
        if (this.status === 'resolved') {
            onFullfilled(this.value)
        }
        if (this.status === 'rejected') {
            onRejected(this.error)
        }
    }

    catch(rejected) {
        return this.then(null, rejected)
    }
}

MyPromise.then = (onFullfilled, onRejected) => {
    let promise2 // then会返回一个新的promise
    promise2 = new MyPromise((resolve, reject) => {
        if (this.status == 'fullfilled') {
            setTimeout(() => {
                let x = onFullfilled(this.value)
                resolvePromise(promise2, x, resolve, reject)
            });
        }
        if (this.status == 'rejected') {
            setTimeout(() => {
                let x = onRejected(this.error)
                resolvePromise(promise2, x, resolve, reject)
            });
        }
        if (this.status == 'pending') {
            this.resolveCallbacks.push(() => {
                setTimeout(() => {
                    let x = onFullfilled(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                });
            })
        }
    })

    return promise2
}

function resolvePromise(promise2, x, resolve, reject) {
    if (x == promise2) {
        return reject(new TypeError('chaining cycle detected for promise'))
    }
    let called

    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then
            if (typeof then === 'function') { //Promise.then是一个函数
                then.call(x, y => {
                    if (called) {
                        return
                    }
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, err => {
                    if (called) {
                        return
                    }
                    called = true
                    reject(err)
                })
            } else { // 返回的是一个值 成功了
                resolve(x)
            }
        } catch (e) {
            if (called) {
                return
            }
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}

let pro1 = new MyPromise((resolve, reject) => {
    resolve('win')
}).then(res => {
    console.log(res)
})

// console.log(pro1)