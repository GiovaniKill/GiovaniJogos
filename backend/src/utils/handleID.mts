import pkg from 'crypto-js'
const { AES, enc } = pkg

const wordToID = (word: string, passphrase: string): string => {
  return AES.encrypt(word, passphrase).toString()
}
const IDToWord = (word: string, passphrase: string): string => {
  const bytes = AES.decrypt(word, passphrase)
  return bytes.toString(enc.Utf8)
}

export { wordToID, IDToWord }
