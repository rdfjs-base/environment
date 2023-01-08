import { strictEqual } from 'assert'
import specTests from '@rdfjs/data-model/test/index.js'
import mocha, { describe, it } from 'mocha'
import DataFactory from '../DataFactory.js'
import Environment from '../Environment.js'

describe('DataFactory', () => {
  it('should be a constructor', () => {
    strictEqual(typeof DataFactory, 'function')
  })

  describe('should pass the spec tests', () => {
    const factory = new Environment([DataFactory])

    specTests({ factory, mocha })
  })
})
