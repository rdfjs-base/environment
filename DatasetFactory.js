import factory from '@rdfjs/dataset'

class DatasetFactory {
  dataset (quads) {
    return factory.dataset(quads)
  }
}

DatasetFactory.exports = ['dataset']

export default DatasetFactory
