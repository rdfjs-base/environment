import { strictEqual } from 'assert'
import rdf from '@rdfjs/data-model'
import formats from '@rdfjs/formats-common'
import toNT from '@rdfjs/to-ntriples'
import withServer from 'express-as-promise/withServer.js'
import { describe, it } from 'mocha'
import DataFactory from '../DataFactory.js'
import DatasetFactory from '../DatasetFactory.js'
import Environment from '../Environment.js'
import FetchFactory from '../FetchFactory.js'
import FormatsFactory from '../FormatsFactory.js'

const example = {}
example.quad = rdf.quad(
  rdf.namedNode('http://example.org/'),
  rdf.namedNode('http://example.org/predicate'),
  rdf.literal('object')
)

describe('FetchFactory', () => {
  it('should be a constructor', () => {
    strictEqual(typeof FetchFactory, 'function')
  })

  describe('.fetch', () => {
    it('should be a method', () => {
      const env = new Environment([FetchFactory])

      strictEqual(typeof env.fetch, 'function')
    })

    it('should use the DatasetFactory if available', async () => {
      await withServer(async server => {
        let called = false

        class CustomDatasetFactory extends DatasetFactory {
          dataset (quads) {
            called = true

            return super.dataset(quads)
          }
        }

        const env = new Environment([CustomDatasetFactory, DataFactory, FetchFactory, FormatsFactory])
        env.formats.import(formats)

        server.app.get('/', (req, res) => {
          res.set('content-type', 'text/turtle').end(toNT(example.quad))
        })

        const res = await env.fetch(await server.listen())
        await res.dataset()

        strictEqual(called, true)
      })
    })

    it('should work without DatasetFactory', async () => {
      await withServer(async server => {
        const env = new Environment([DataFactory, FetchFactory, FormatsFactory])
        env.formats.import(formats)

        server.app.get('/', (req, res) => {
          res.set('content-type', 'text/turtle').end(toNT(example.quad))
        })

        const res = await env.fetch(await server.listen())

        strictEqual(res.ok, true)
      })
    })

    it('should use the formats from the environment', async () => {
      await withServer(async server => {
        let called = false

        class CustomParser extends formats.parsers.get('text/turtle').constructor {
          import (stream) {
            called = true

            return super.import(stream)
          }
        }

        const env = new Environment([DataFactory, DatasetFactory, FetchFactory, FormatsFactory])
        env.formats.import({
          parsers: new Map([['text/turtle', new CustomParser()]])
        })

        server.app.get('/', (req, res) => {
          res.set('content-type', 'text/turtle').end(toNT(example.quad))
        })

        const res = await env.fetch(await server.listen())
        await res.dataset()

        strictEqual(called, true)
      })
    })
  })
})
