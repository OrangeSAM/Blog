const fs = require('fs')

fs.readdir('Node.js学习', function (err, file) {
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
                fs.stat('Node.js学习/' + file[i], function (error, stats) {
                    if (stats.isDirectory()) {
                        console.log(file[i])
                    }
                })
                getFile(i + 1)
            }
        })(0)
    }
})