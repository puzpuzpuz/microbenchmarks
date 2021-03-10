'use strict'

const OPERATIONS = 1000
const DICT_KIND_THRESHOLD = (32 << 20) + 1

const plainArr = new Array(1) // HOLEY_SMI_ELEMENTS
const dictArr = new Array(DICT_KIND_THRESHOLD) // DICTIONARY_ELEMENTS

function pushThenPop(arr) {
  for (let i = 0; i < OPERATIONS; i++) {
    arr.push(i)
  }
  for (let i = 0; i < OPERATIONS; i++) {
    arr.pop()
  }
}

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

suite
  .add(
    'HOLEY_SMI_ELEMENTS',
    () => pushThenPop(plainArr)
  )
  .add(
    'DICTIONARY_ELEMENTS',
    () => pushThenPop(dictArr)
  )

suite
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Benchmark is complete')
  })
  .run({ 'async': false })
