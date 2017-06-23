const fileEncoding = require('./index')
const log = console.log
const fe1 = fileEncoding('./package.json')
const fe2 = fileEncoding('./README.md')
const fe3 = fileEncoding('./.editorconfig')

fe1.detect().then(encoding=>log(encoding))
fe2.read().then(data=>log(data))
fe3.stream().then(stream=>log(stream))

