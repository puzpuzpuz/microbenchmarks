'use strict'

const SIZE = 5000
const MAX = 1000
const arr = []

for (let i = 0; i < SIZE; i++) {
  arr.push(Math.floor(Math.random() * (MAX + 1)))
}

function loop() {
  let max = 0
  for (let i = 0; i < SIZE; i++) {
    if (arr[i] > max) max = arr[i]
  }
  return max
}

function reducer() {
  return arr.reduce((prev, curr) => {
    if (curr > prev) {
      return curr
    }
    return prev
  }, 0)
}

function mathmax() {
  return Math.max(...arr)
}

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

suite
  .add('loop', loop)
  .add('reducer', reducer)
  .add('Math.max', mathmax)

suite
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Benchmark is complete')
  })
  .run({ 'async': false })
