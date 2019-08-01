
const fs = require('fs')
const loader = require('./src/loader')
const source = fs.readFileSync('example/src/test.md', 'utf-8')

loader(source)