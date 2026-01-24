import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import ssbl from './ssbl.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const data = await ssbl(join(__dirname, 'example'))

console.log('This is the data structure generated from the ./example/ directory:')
console.log('-------------------------------------------------------------------')
console.log(JSON.stringify(data, null, 2))
console.log('-------------------------------------------------------------------')
