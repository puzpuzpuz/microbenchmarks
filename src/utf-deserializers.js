'use strict'

const {ASCII_CHARSET, UTF8_CHARSET, randomString} = require('./utils')

const MASK_1BYTE = (1 << 8) - 1

const readUtfCustom = (buf, len) => {
  let readingIndex = 0
  let result = ''
  let leadingByte
  for (let i = 0; i < len; i++) {
    let charCode
    leadingByte = buf.readUInt8(readingIndex) & MASK_1BYTE
    readingIndex += 1

    const b = leadingByte & 0xFF
    switch (b >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        charCode = leadingByte
        break
      case 12:
      case 13:
        const first = (b & 0x1F) << 6
        const second = buf.readUInt8(readingIndex) & 0x3F
        readingIndex += 1
        charCode = first | second
        break
      case 14:
        const first2 = (b & 0x0F) << 12
        const second2 = (buf.readUInt8(readingIndex) & 0x3F) << 6
        readingIndex += 1
        const third2 = buf.readUInt8(readingIndex) & 0x3F
        readingIndex += 1
        charCode = (first2 | second2 | third2)
        break
      default:
        throw new RangeError('Malformed UTF8 string')
    }
    result += String.fromCharCode(charCode)
  }
  return result
}

const readUtfStandard = (buf) => buf.toString('utf8')

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

const sizes = [1, 10, 100, 1024]

sizes.forEach(size => {
  const strAscii = randomString(size * 1024, ASCII_CHARSET)
  const bufAscii = Buffer.from(strAscii, 'utf8')

  const strUtf8 = randomString(size * 1024, UTF8_CHARSET)
  const bufUtf8 = Buffer.from(strUtf8, 'utf8')

  suite
    .add(
      `custom UTF-8 deserialization for ${size}KB with ASCII chars`,
      () => readUtfCustom(bufAscii, strAscii.length)
    )
    .add(
      `custom UTF-8 deserialization for ${size}KB with UTF-8 chars`,
      () => readUtfCustom(bufUtf8, strUtf8.length)
    )
    .add(
      `standard UTF-8 deserialization for ${size}KB with ASCII chars`,
      () => readUtfStandard(bufAscii)
    )
    .add(
      `standard UTF-8 deserialization for ${size}KB with UTF-8 chars`,
      () => readUtfStandard(bufUtf8)
    )
})

suite
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Benchmark is complete')
  })
  .run({ 'async': true })
