import namespace from '@rdfjs/namespace'

class NamespaceFactory {
  namespace (baseIRI) {
    return namespace(baseIRI, { factory: this })
  }
}

NamespaceFactory.exports = ['namespace']

export default NamespaceFactory
