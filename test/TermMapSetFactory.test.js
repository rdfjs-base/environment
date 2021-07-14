import { strictEqual } from 'assert'
import TermMap from '@rdfjs/term-map'
import TermSet from '@rdfjs/term-set'
import { describe, it } from 'mocha'
import DataFactory from '../DataFactory.js'
import Environment from '../Environment.js'
import TermMapSetFactory from '../TermMapSetFactory.js'

const env = new Environment([DataFactory, TermMapSetFactory])

describe('TermMapSetFactory', () => {
  it('should be a constructor', () => {
    strictEqual(typeof TermMapSetFactory, 'function')
  })

  describe('.termMap', () => {
    it('should be a method', () => {
      strictEqual(typeof env.termMap, 'function')
    })

    it('should return a TermMap instance', () => {
      const result = env.termMap()

      strictEqual(result instanceof TermMap, true)
    })

    it('should add the given entries to the map', () => {
      const entry0 = [env.namedNode('http://example.or/0'), {}]
      const entry1 = [env.namedNode('http://example.or/1'), {}]

      const result = env.termMap([entry0, entry1])

      strictEqual(result.get(entry0[0]), entry0[1])
      strictEqual(result.get(entry1[0]), entry1[1])
    })
  })

  describe('.termSet', () => {
    it('should be a method', () => {
      strictEqual(typeof env.termSet, 'function')
    })

    it('should return a TermSet instance', () => {
      const result = env.termSet()

      strictEqual(result instanceof TermSet, true)
    })

    it('should add the given terms to the set', () => {
      const term0 = env.namedNode('http://example.or/0')
      const term1 = env.namedNode('http://example.or/1')

      const result = env.termSet([term0, term1])

      strictEqual(result.has(term0), true)
      strictEqual(result.has(term1), true)
    })
  })
})
