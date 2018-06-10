# Schwarzschild

Library to create read-only object.

## Installation 

```
npm install --save schwarzschild
```

## Usage

```
const Blackhole = require('schwarzschild');
```

Create new write-once-read-only object
```
const config = new Blackhole;

config.env = 'production';
config.env = 'development';

console.log(config.env);
// 'production'
```

Convert existing object into schwarzschild
```
const config = new Blackhole(require('./config'));

const world = new Blackhole({
	timeStep: 1/60,
	fps: 60,
	gravity: [0, 0.3]
});

```

