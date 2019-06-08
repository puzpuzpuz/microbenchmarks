'use strict'

const MASK_1BYTE = (1 << 8) - 1

const writeUtfCustom = (str) => {
  const buf = Buffer.allocUnsafe(str.length * 3)
  let pos = 0
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i)
    if (ch <= 0x007F) {
      buf.writeUInt8(ch & MASK_1BYTE, pos++)
    } else if (ch <= 0x07FF) {
      buf.writeUInt8((0xC0 | ch >> 6 & 0x1F) & MASK_1BYTE, pos++)
      buf.writeUInt8((0x80 | ch & 0x3F) & MASK_1BYTE, pos++)
    } else {
      buf.writeUInt8((0xE0 | ch >> 12 & 0x0F) & MASK_1BYTE, pos++)
      buf.writeUInt8((0x80 | ch >> 6 & 0x3F) & MASK_1BYTE, pos++)
      buf.writeUInt8((0x80 | ch & 0x3F) & MASK_1BYTE, pos++)
    }
  }
  return buf.slice(0, pos)
}

const writeUtfStandard = (str) => Buffer.from(str, 'utf8')

const randomString = (len) => {
  const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let res = ''
  for (let i = 0; i < len; i++) {
    const pos = Math.floor(Math.random() * charSet.length)
    res += charSet.substring(pos, pos + 1)
  }
  return res
}

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

const sizes = [1, 10, 100, 1024]

sizes.forEach(size => {
  const str = randomString(size * 1024)

  suite
    .add(`custom UTF-8 serialization for ${size}KB with ASCII chars`, () => {
      writeUtfCustom(str)
    })
    .add(`standard UTF-8 serialization for ${size}KB with ASCII chars`, () => {
      writeUtfStandard(str)
    })
})

suite
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Benchmark is complete')
  })
  .run({ 'async': true })
