# @rdfjs/environment

[![build status](https://img.shields.io/github/actions/workflow/status/rdfjs-base/environment/test.yaml?branch=master)](https://github.com/rdfjs-base/environment/actions/workflows/test.yaml)
[![npm version](https://img.shields.io/npm/v/@rdfjs/environment.svg)](https://www.npmjs.com/package/@rdfjs/environment)

This package provides a flexible RDF/JS factory.
The `Environment` class takes one or more RDF/JS factory classes and creates a new, merged instance.
All factory methods will use the `Environment` instance as factory to create new object instances.
Clones can be created to manipulate an instance isolated from other instances.

## Usage

The main export of the package is the `Environment` class.
It can be imported like this:

```javascript
import Environment from '@rdfjs/environment'
```

The package contains multiple factories.
The factories can be imported with the pattern `@rdfjs/environment/{factoryName}.js`.
For the `FormatsFactory`, it would look like this:

```javascript
import FormatsFactory from '@rdfjs/environment/FormatsFactory.js'
```

### Environment(factories)

Creates a new `Environment` instance.
`factories` must be an iterable (e.g. `Array`) of RDF/JS factory classes.

#### clone()

This method creates a new, isolated `Environment` instance with the same set of factories and clones of the instance data.

### DataFactory

An implementation of the [RDF/JS Data Model](http://rdf.js.org/data-model-spec/) that wraps the [@rdfjs/data-model](https://github.com/rdfjs-base/data-model) package. 

### DatasetFactory

An implementation of the [RDF/JS Dataset](https://rdf.js.org/dataset-spec/) that wraps the [@rdfjs/dataset](https://github.com/rdfjs-base/dataset) package.

### FetchFactory

A factory for [@rdfjs/fetch-lite](https://github.com/rdfjs-base/fetch-lite) calls.
This factory must be used together with `FormatsFactory` to provide parsers and serializers.
The environment is injected for calls to `res.dataset()`.

### FormatsFactory

A factory that takes care of parsers and serializers.
An additional `.formats` object will be attached to the environment.
That object is compatible with the data structure of [@rdfjs/formats-common](https://github.com/rdfjs-base/formats-common). 
The `.formats` object has an additional `.import()` function to import other format bundles.
The following code shows how to import the [@rdfjs/formats-common](https://github.com/rdfjs-base/formats-common) bundle:

```javascript
import DataFactory from '@rdfjs/environment/DataFactory.js'
import DatasetFactory from '@rdfjs/environment/DatasetFactory.js'
import Environment from '@rdfjs/environment'
import FormatsFactory from '@rdfjs/environment/FormatsFactory.js'
import formats from '@rdfjs/formats-common'

const env = new Environment([DataFactory, DatasetFactory, FormatsFactory])
env.formats.import(formats)
```

### NamespaceFactory

A factory to create namespace builders based on the [@rdfjs/namespace](https://github.com/rdfjs-base/namespace) package.
Instances of the builder can be created with the `.namespace()` method.

### TermMapSetFactory

A factory to create [@rdfjs/term-map](https://github.com/rdfjs-base/term-map) and [@rdfjs/term-set](https://github.com/rdfjs-base/term-set) objects.
The instances can be created with `.termMap()` and `.termSet()`.
