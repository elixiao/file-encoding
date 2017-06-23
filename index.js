const firstChunk = require('first-chunk')
const jschardet = require('jschardet')
const iconv = require('iconv-lite')
const fs = require('fs')

function FileEncoding(file) {
  this.file = file
}

const p = FileEncoding.prototype

p.detect = function () {
  return firstChunk(this.file).then(chunk => jschardet.detect(chunk).encoding)
}

p.stream = function (encoding) {
  const file = this.file
  return firstChunk(file)
    .then(chunk => {
      encoding = encoding || jschardet.detect(chunk).encoding || 'utf8'
      return fs.createReadStream(file).pipe(iconv.decodeStream(encoding))
    })
}

p.read = function (encoding) {
  const file = this.file
  return firstChunk(file)
    .then(chunk => {
      encoding = encoding || jschardet.detect(chunk).encoding || 'utf8'
      return new Promise((resolve, reject) => {
        let chunks = [], size = 0;
        fs.createReadStream(file)
          .pipe(iconv.decodeStream(encoding))
          .on('data', function (chunk) {
            chunks.push(chunk);
            size += chunk.length;
          })
          .on('end', function () {
            let data = null;
            switch (chunks.length) {
              case 0:
                data = new Buffer(0);
                break;
              case 1:
                data = chunks[0];
                break;
              default:
                data = new Buffer(size);
                for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
                  let chunk = chunks[i];
                  chunk.copy(data, pos);
                  pos += chunk.length;
                }
                break;
            }
            resolve(data)
          })
          .on('error', function (err) {
            reject(err)
          })
      })
    })
}

module.exports = function (file) {
  return new FileEncoding(file)
}
