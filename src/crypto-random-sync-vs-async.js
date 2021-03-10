'use strict'

const crypto = require('crypto')
const util = require('util')
const randomFill = util.promisify(crypto.randomFill)

const randomFillSync = () => {
  const buf = Buffer.alloc(256)
  for (let i = 0; i < 100; i++) {
    crypto.randomFillSync(buf)
  }
}

const randomFillAsync = (deferred) => {
  const arr = new Array(100)
  const buf = Buffer.alloc(256)
  for (let i = 0; i < 100; i++) {
    arr[i] = randomFill(buf)
  }
  Promise.all(arr).then(() => deferred.resolve())
}

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

suite
  .add(
    'crypto.randomFillSync',
    () => randomFillSync()
  )
  .add(
    'crypto.randomFillAsync',
    (deferred) => randomFillAsync(deferred),
    { defer: true }
  )

suite
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Benchmark is complete')
  })
  .run({ 'async': true })
