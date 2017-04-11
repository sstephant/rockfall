# promise-rockfall

![master branch build status][promise-rockfall-travis]
![dependencies version status][promise-rockfall-versioneye]

[![NPM][promise-rockfall-ico]][promise-rockfall-url]

## desscription

> Runs an array of promises in chunked series one after another. 

## installation

```bash
npm i -S promise-rockfall
```

## usage

```javascript
const rockfall = require('promise-rockfall');
// Array of promises
const promises = Array(100).fill(null).map(() => (Promise.resolve(Math.random())));
// Process promises in several batches of 10 promises at max.
rockfall(promises, 10);
// It is possible do something when each batch is resolved
rockfall(promises, 10, (rs) => {console.log(rs);});
// It is possible to do something when everything is resovled
rockfall(promises, 10)
  .then(() => {console.log('all done');})
  .catch((err) => {console.error(err);});
```

## API

#### `rockfall(functions, size, batchThen)` -> `promise`

Runs an array of promises in chunked series one after another.

##### functions

*Required*
Type: `array[function]`

##### size

*Optional*
Type: `integer`

batches' size

##### batchThen

*Optional*
Type: `function`

function that takes the resolution of one batch of promises in input 

[promise-rockfall-url]: https://www.npmjs.com/package/promise-rockfall
[promise-rockfall-ico]: https://nodei.co/npm/promise-rockfall.png?compact=true
[promise-rockfall-travis]: https://travis-ci.org/sstephant/rockfall.svg?branch=master
[promise-rockfall-versioneye]: https://www.versioneye.com/user/projects/58eca9a6d6c98d0043fec932/badge.svg?style=flat-square
