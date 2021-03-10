'use strict'

const totalSize = 100
const sliceSize = 100
const source = []

for (let i = 0; i < totalSize; i++) {
  source.push({ num: i })
}

function slice(acc) {
  let arr = source.slice()
  for (let i = 0; i < sliceSize; i++) {
    acc.sum += arr[i].num
  }
  const subArr = arr.slice(0, sliceSize)
  arr = arr.slice(sliceSize)
  acc.sum += subArr.length
  acc.sum += arr.length
}

function shiftAndPush(acc) {
  let arr = source.slice()
  const subArr = []
  for (let i = 0; i < sliceSize; i++) {
    const it = arr.shift()
    subArr.push(it)
    acc.sum += it.num
  }
  acc.sum += subArr.length
  acc.sum += arr.length
}

const acc = { sum: 0 }

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

suite
  .add(
    'slice',
    () => slice(acc)
  )
  .add(
    'shift and push',
    () => shiftAndPush(acc)
  )

suite
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Accumulated', acc.sum)
    console.log('Benchmark is complete')
  })
  .run({ 'async': false })
