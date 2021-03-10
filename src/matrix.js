// not a bechmark, but a primitive demo of loop interchange
// and related hardware effects
'use strict'

const MATRIX_SIZE = 1000
// we need Smis, so max value must be small enough
const MAX_VALUE = 1000

function generateMatrix(size) {
  const matrix = []
  for (let i = 0; i < size; i++) {
    matrix.push([])
    for (let j = 0; j < size; j++) {
      const value = Math.floor(Math.random() * MAX_VALUE)
      matrix[i].push(value)
    }
  }
  return matrix
}

const matrix = generateMatrix(MATRIX_SIZE)

function sumRowsThenColumns(m, s) {
  let sum = 0
  for (let i = 0; i < s; i++) {
    for (let j = 0; j < s; j++) {
      sum += m[i][j] // <- the difference
    }
  }
  return sum
}

function sumColumnsThenRows(m, s) {
  let sum = 0
  for (let i = 0; i < s; i++) {
    for (let j = 0; j < s; j++) {
      sum += m[j][i] // <- the difference
    }
  }
  return sum
}

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

suite
  .add(
    'm[i][j]',
    () => sumRowsThenColumns(matrix, MATRIX_SIZE)
  )
  .add(
    'm[j][i]',
    () => sumColumnsThenRows(matrix, MATRIX_SIZE)
  )

suite
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Benchmark is complete')
  })
  .run({ 'async': false })
