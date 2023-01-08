import { strictEqual } from 'assert'
import specTests from '@rdfjs/dataset/test/index.js'
import mocha, { describe, it } from 'mocha'
import DataFactory from '../DataFactory.js'
import DatasetFactory from '../DatasetFactory.js'
import Environment from '../Environment.js'

describe('DatasetFactory', () => {
  it('should be a constructor', () => {
    strictEqual(typeof DatasetFactory, 'function')
  })

  describe('should pass the spec tests', () => {
    const factory = new Environment([DataFactory, DatasetFactory])

    specTests({ factory, mocha })
  })
})
