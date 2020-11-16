'use strict'

const keys = [
  'TCN',
  'ETag',
  'date',
  'Vary',
  'server',
  'Server',
  'status',
  'version',
  'Expires',
  'alt-svc',
  'location',
  'Connection',
  'Keep-Alive',
  'content-type',
  'Content-Type',
  'Cache-Control',
  'Last-Modified',
  'Accept-Ranges',
  'content-length',
  'x-frame-options',
  'x-xss-protection',
  'Content-Encoding',
  'Content-Location',
  'Transfer-Encoding',
  'alternate-protocol',
  ':', // invalid input
  '@@',
  '中文呢', // unicode
  '((((())))', // invalid
  ':alternate-protocol', // fast bailout
  'alternate-protocol:', // slow bailout
]

const randKeysPoolSize = 1e6
const randKeysPool = []

for (let i = 0; i < randKeysPoolSize; i++) {
  const idx = Math.floor(Math.random() * Math.floor(keys.length))
  randKeysPool.push(keys[idx])
}

const tokenRegExp = /^[\^_`a-zA-Z\-0-9!#$%&'*+.|~]+$/

function regexpCheck(val) {
  return tokenRegExp.test(val)
}

function loopBasedCheck(val) {
  if (val.length === 0) {
    return false
  }
  // Character check based off of previous regex:
  // /^[\^_`a-zA-Z\-0-9!#$%&'*+.|~]+$/
  for (let i = 0; i < val.length; i++) {
    const cc = val.charCodeAt(i)
    if (
      (cc >= 97 && cc <= 122) || // a-z
      (cc >= 65 && cc <= 90) || // A-z
      cc === 45 || // -
      cc === 33 || // !
      (cc >= 35 && cc <= 39) || // # $ % & '
      cc === 42 || // *
      cc === 43 || // +
      cc === 46 || // .
      (cc >= 48 && cc <= 57) || // 0-9
      (cc >= 94 && cc <= 96) || // ^ _ `
      cc === 124 || // |
      cc === 126 // ~
    ) {
      continue
    } else {
      return false
    }
  }
  return true
}

let iterations = 0

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

suite
  .add(
    'reg exp',
    () => {
      const idx = iterations++ % randKeysPoolSize
      return regexpCheck(randKeysPool[idx])
    }
  )
  .add(
    'loop',
    () => {
      const idx = iterations++ % randKeysPoolSize
      return loopBasedCheck(randKeysPool[idx])
    }
  )

suite
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Benchmark is complete')
  })
  .run({ 'async': false })
