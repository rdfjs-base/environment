import Formats from './lib/Formats.js'

class FormatsFactory {
  init () {
    this.formats = new Formats({ factory: this })
  }

  clone (original) {
    this.formats.import(original.formats)
  }
}

export default FormatsFactory
