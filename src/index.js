const waterfall = require('promise-waterfall');

/**
 * @param {Function<Promise<*>>[]} promiseFactories
 * @param {Function<Promise<*>>} chain
 * @returns {Function<Promise<*>>}
 */
const batch = (promiseFactories, chain = Promise.resolve) => (
  () => (Promise.all(promiseFactories.map(pf => (pf()))).then(chain))
);

/**
 *
 * @param {Function<Promise<*>>[]} promiseFactories an array of functions returning a promise
 * @param {Number} batchSize integer expected to be >= 1
 * @returns {Promise}
 */
const rockfall = (promiseFactories = [], batchSize = 10) => {
  let size = parseInt(batchSize, 10);
  if (!Array.isArray(promiseFactories) || promiseFactories.length === 0) {
    return Promise.resolve([]);
  }
  if (isNaN(size) || size < 1) {
    size = 1;
  }
  const batches = [];
  const allPromises = [];
  const chain = (rs) => {
    return Promise.resolve(rs);
  };
  let currentBatch = [];
  promiseFactories.forEach((pf) => {
    if (currentBatch.length === size) {
      batches.push(batch(currentBatch, ));
      currentBatch = [];
    }
    currentBatch.push(pf);
  });
  batches.push(batch(currentBatch));
  return waterfall(batches).then(() => {
    return Promise.all(allPromises);
  });
};

module.exports = rockfall;
module.exports.batch = batch;
