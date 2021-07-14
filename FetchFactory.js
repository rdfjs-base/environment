import fetch from '@rdfjs/fetch-lite'

class FetchFactory {
  fetch (url, options = {}) {
    const factory = typeof this.dataset === 'function' ? this : null
    const formats = this.formats

    return fetch(url, { ...options, factory, formats })
  }
}

FetchFactory.exports = ['fetch']

export default FetchFactory
