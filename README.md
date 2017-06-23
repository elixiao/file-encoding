# file-encoding

> detect encoding of a file

## Install

```bash
npm install file-encoding --save
yarn add file-encoding
```

## Usage

detect encoding of a file automatically:

```javascript
const fileEncoding = require('file-encoding')
const fe = fileEncoding('./package.json')

fe.detect().then(encoding=>console.log(encoding)) // ascii
```

read file with detected encoding:

```javascript
const fe = fileEncoding('./README.md')
fe.read().then(data=>console.log(data))
```

return decoded stream by [iconv-lite](https://github.com/ashtuchkin/iconv-lite):

```javascript
const fe = fileEncoding('./README.md')
fe.stream().then(stream=>console.log(stream))
```

## License

MIT
