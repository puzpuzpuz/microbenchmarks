# microbenchmarks

A collection of various JS microbenchmarks. I'll be adding new benchmarks here, when needed.

## UTF String Serialization

Compares performance of standard API for UTF-8 string serialization (`Buffer.from(string, 'utf8')`) and deserialization (`Buffer.toString('utf8')`) and custom JS implementations. Can be run with the following commands:

```
$ npm run utf-serializers
$ npm run utf-deserializers
```
