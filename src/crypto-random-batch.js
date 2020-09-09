'use strict'

const crypto = require('crypto')

const pool16 = new Uint8Array(16)
const pool64 = new Uint8Array(64)
const pool128 = new Uint8Array(128)
const pool256 = new Uint8Array(256)

const randomFillSync = (pool) => {
  crypto.randomFillSync(pool)
}

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

suite
  .add(
    'crypto.randomFillSync for 16 bytes',
    () => randomFillSync(pool16)
  )
  .add(
    'crypto.randomFillSync for 64 bytes',
    () => randomFillSync(pool64)
  )
  .add(
    'crypto.randomFillSync for 128 bytes',
    () => randomFillSync(pool128)
  )
  .add(
    'crypto.randomFillSync for 256 bytes',
    () => randomFillSync(pool256)
  )

suite
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Benchmark is complete')
  })
  .run({ 'async': false })
