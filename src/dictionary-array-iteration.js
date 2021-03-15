'use strict'

const ITERATION_SIZE = 1000000
const DICT_KIND_THRESHOLD = (32 << 20) + 1

const packedArr = []                           // PACKED_SMI_ELEMENTS
const holeyArr = new Array(ITERATION_SIZE)     // HOLEY_SMI_ELEMENTS
const dictArr = new Array(DICT_KIND_THRESHOLD) // DICTIONARY_ELEMENTS

for (let i = 0; i < ITERATION_SIZE; i++) {
  packedArr.push(1)
  holeyArr[i] = 1
  dictArr[i] = 1
}

function sumArrayItems(arr) {
  let sum = 0
  for (let i = 0; i < ITERATION_SIZE; i++) {
    sum += arr[i]
  }
  return sum
}

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

suite
  .add(
    'PACKED_SMI_ELEMENTS',
    () => sumArrayItems(packedArr)
  )  
  .add(
    'HOLEY_SMI_ELEMENTS',
    () => sumArrayItems(holeyArr)
  )
  .add(
    'DICTIONARY_ELEMENTS',
    () => sumArrayItems(dictArr)
  )

suite
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Benchmark is complete')
  })
  .run({ 'async': false })
