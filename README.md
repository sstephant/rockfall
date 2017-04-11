# promise-rockfall

![master branch build status](https://travis-ci.org/sstephant/rockfall.svg?branch=master)
![dependencies version status](https://www.versioneye.com/user/projects/58eca9a6d6c98d0043fec932/badge.svg?style=flat-square)

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
rockfall(promises, 10).then(() => {console.log('all done');});
```
