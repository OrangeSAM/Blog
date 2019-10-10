rename
rmdir

unlink 删除文件

var readStream = fs.createReadStream()

readStream.on('data')
readStream.on('end')
readStream.on('error')

var writeStream = fs.createWriteStream

writeStream.write(data, 'utf-8')
writeStream.end()
writeStream.on('finish')
writeStream.on('error')
