import TermMap from '@rdfjs/term-map'
import TermSet from '@rdfjs/term-set'

class TermMapSetFactory {
  termMap (entries) {
    return new TermMap(entries)
  }

  termSet (terms) {
    return new TermSet(terms)
  }
}

TermMapSetFactory.exports = ['termMap', 'termSet']

export default TermMapSetFactory
