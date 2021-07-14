import factory from '@rdfjs/data-model'

class DataFactory {
  namedNode (value) {
    return factory.namedNode(value)
  }

  blankNode (value) {
    return factory.blankNode(value)
  }

  literal (value, languageOrDatatype) {
    return factory.literal(value, languageOrDatatype)
  }

  variable (value) {
    return factory.variable(value)
  }

  defaultGraph () {
    return factory.defaultGraph()
  }

  quad (subject, predicate, object, graph) {
    return factory.quad(subject, predicate, object, graph)
  }

  fromTerm (original) {
    return factory.fromTerm(original)
  }

  fromQuad (original) {
    return factory.fromQuad(original)
  }
}

DataFactory.exports = [
  'namedNode',
  'blankNode',
  'literal',
  'variable',
  'defaultGraph',
  'quad',
  'fromTerm',
  'fromQuad'
]

export default DataFactory
