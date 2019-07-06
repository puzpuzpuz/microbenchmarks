# microbenchmarks

A collection of various JS microbenchmarks. I'll be adding new benchmarks here, when needed.

## UTF String Serialization

Compares performance of standard API for UTF-8 string serialization (`Buffer.from(string, 'utf8')`) and deserialization (`Buffer.toString('utf8')`) and custom JS implementations. Can be run with the following commands:

```
$ npm run utf-serializers
$ npm run utf-deserializers
```

## Results

Test environment: i5 8400h, 32 GB RAM, Ubuntu 18.04 (Linux 4.15.0-47, x86_64), Node.js 10.15.3.

### utf-serializers

```
custom UTF-8 serialization for   100B with ASCII chars x     2,021,798 ops/sec ±1.35% (80 runs sampled)
standard UTF-8 serialization for 100B with ASCII chars x     3,815,279 ops/sec ±1.56% (88 runs sampled)
custom UTF-8 serialization for   100B with non-ASCII chars x 1,761,194 ops/sec ±1.32% (93 runs sampled)
standard UTF-8 serialization for 100B with non-ASCII chars x 1,867,045 ops/sec ±1.11% (93 runs sampled)

custom UTF-8 serialization for   1024B with ASCII chars x       277,181 ops/sec ±1.64% (91 runs sampled)
standard UTF-8 serialization for 1024B with ASCII chars x     1,577,050 ops/sec ±0.55% (87 runs sampled)
custom UTF-8 serialization for   1024B with non-ASCII chars x   218,856 ops/sec ±1.53% (93 runs sampled)
standard UTF-8 serialization for 1024B with non-ASCII chars x   298,843 ops/sec ±2.22% (90 runs sampled)

custom UTF-8 serialization for   10240B with ASCII chars x      29,162 ops/sec ±1.63% (88 runs sampled)
standard UTF-8 serialization for 10240B with ASCII chars x     181,772 ops/sec ±0.30% (85 runs sampled)
custom UTF-8 serialization for   10240B with non-ASCII chars x  22,887 ops/sec ±1.28% (95 runs sampled)
standard UTF-8 serialization for 10240B with non-ASCII chars x  26,477 ops/sec ±1.71% (89 runs sampled)

custom UTF-8 serialization for   102400B with ASCII chars x      2,998 ops/sec ±1.13% (94 runs sampled)
standard UTF-8 serialization for 102400B with ASCII chars x     22,674 ops/sec ±1.39% (86 runs sampled)
custom UTF-8 serialization for   102400B with non-ASCII chars x  2,336 ops/sec ±0.49% (93 runs sampled)
standard UTF-8 serialization for 102400B with non-ASCII chars x  2,670 ops/sec ±1.37% (92 runs sampled)
```

### utf-deserializers

```
custom UTF-8 deserialization for   100B with ASCII chars x      1,515,803 ops/sec ±1.50% (87 runs sampled)
standard UTF-8 deserialization for 100B with ASCII chars x     11,297,821 ops/sec ±1.41% (88 runs sampled)
custom UTF-8 deserialization for   100B with non-ASCII chars x  1,093,390 ops/sec ±1.08% (91 runs sampled)
standard UTF-8 deserialization for 100B with non-ASCII chars x  1,311,610 ops/sec ±1.56% (91 runs sampled)

custom UTF-8 deserialization for   1024B with ASCII chars x       160,622 ops/sec ±1.35% (87 runs sampled)
standard UTF-8 deserialization for 1024B with ASCII chars x     4,668,274 ops/sec ±1.44% (88 runs sampled)
custom UTF-8 deserialization for   1024B with non-ASCII chars x   102,269 ops/sec ±1.63% (88 runs sampled)
standard UTF-8 deserialization for 1024B with non-ASCII chars x   102,166 ops/sec ±1.40% (90 runs sampled)

custom UTF-8 deserialization for   10240B with ASCII chars x      13,927 ops/sec ±1.50% (86 runs sampled)
standard UTF-8 deserialization for 10240B with ASCII chars x     651,968 ops/sec ±1.56% (85 runs sampled)
custom UTF-8 deserialization for   10240B with non-ASCII chars x   9,191 ops/sec ±1.45% (85 runs sampled)
standard UTF-8 deserialization for 10240B with non-ASCII chars x   8,163 ops/sec ±1.19% (93 runs sampled)

custom UTF-8 deserialization for   102400B with ASCII chars x        616 ops/sec ±1.40% (62 runs sampled)
standard UTF-8 deserialization for 102400B with ASCII chars x     68,721 ops/sec ±1.34% (87 runs sampled)
custom UTF-8 deserialization for   102400B with non-ASCII chars x    613 ops/sec ±1.50% (83 runs sampled)
standard UTF-8 deserialization for 102400B with non-ASCII chars x    794 ops/sec ±1.16% (91 runs sampled)
```
