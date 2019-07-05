'use strict'

const ASCII_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const UTF8_CHARSET = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя'

const randomString = (len, charSet) => {
  let res = ''
  for (let i = 0; i < len; i++) {
    const pos = Math.floor(Math.random() * charSet.length)
    res += charSet.substring(pos, pos + 1)
  }
  return res
}

module.exports = {
  ASCII_CHARSET,
  UTF8_CHARSET,
  randomString
}
