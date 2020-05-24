// 判断当前路径是否有文件夹，有则打印。

const fs = require('fs')

fs.readdir('../Javascript', function (err, file) {
    if (err) {
        console.log(err)
    } else {
        // console.log(file)
        // for (let i = 0; i < file.length; i++) {
        //     fs.statS(file[i], function (error, stats) {
        //         console.log(file[i], error, stats)
        // if (file[i].isDirectory()) {
        //     console.log(file[i])
        // }
        //     })
        // }
        (function getFile(i) {
            if (i === file.length) {
                return false
            } else {
                fs.stat('../Javascript/' + file[i], function (error, stats) {
                    console.log(`../Javascript/${file[i]}`)
                    if (error) {
                        console.log(error)
                    }
                    if (stats.isDirectory()) {
                        console.log(file[i])
                    }
                })
                getFile(i + 1)
            }
        })(0)
    }
})