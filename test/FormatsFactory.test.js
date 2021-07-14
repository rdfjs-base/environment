import { notStrictEqual, strictEqual } from 'assert'
import { describe, it } from 'mocha'
import Environment from '../Environment.js'
import FormatsFactory from '../FormatsFactory.js'
import Formats from '../lib/Formats.js'

describe('FormatsFactory', () => {
  it('should be a constructor', () => {
    strictEqual(typeof FormatsFactory, 'function')
  })

  it('should attach a Formats instance to .formats', () => {
    const env = new Environment([FormatsFactory])

    strictEqual(env.formats instanceof Formats, true)
  })

  it('should assign itself as factory to the formats instance', () => {
    const env = new Environment([FormatsFactory])

    strictEqual(env.formats.factory, env)
  })

  describe('.clone', () => {
    it('should import the parsers and serializers from the original environment', () => {
      class Parser {}
      class Serializer {}
      const original = {
        parsers: new Map([['a', new Parser()]]),
        serializers: new Map([['a', new Serializer()]])
      }
      const env = new Environment([FormatsFactory])
      env.formats.import(original)

      const clone = env.clone()

      strictEqual(clone.formats.parsers.size, 1)
      strictEqual(clone.formats.parsers.get('a') instanceof Parser, true)
      notStrictEqual(clone.formats.parsers.get('a'), env.formats.parsers.get('a'))
      strictEqual(clone.formats.serializers.size, 1)
      strictEqual(clone.formats.serializers.get('a') instanceof Serializer, true)
      notStrictEqual(clone.formats.serializers.get('a'), env.formats.serializers.get('a'))
    })
  })
})
