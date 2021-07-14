import { strictEqual } from 'assert'
import { describe, it } from 'mocha'
import DataFactory from '../DataFactory.js'
import Environment from '../Environment.js'
import NamespaceFactory from '../NamespaceFactory.js'

const env = new Environment([DataFactory, NamespaceFactory])

describe('NamespaceFactory', () => {
  it('should be a constructor', () => {
    strictEqual(typeof NamespaceFactory, 'function')
  })

  describe('.namespace', () => {
    it('should be a method', () => {
      strictEqual(typeof env.namespace, 'function')
    })

    it('should return a namespace builder', () => {
      const ns = env.namespace('http://example.org/')

      const result = ns.test

      strictEqual(result.termType, 'NamedNode')
    })

    it('should use the given baseURL', () => {
      const ns = env.namespace('http://example.org/')

      const result = ns.test

      strictEqual(result.value, 'http://example.org/test')
    })
  })
})
