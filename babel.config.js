// Used ONLY by Jest (tests), never by the running job.
//
// @faker-js/faker v10 is published as an ES module. Node 22 can require()
// it directly (that is what the real job does), but Jest's own module loader
// cannot, so during tests Babel converts faker to CommonJS on the fly - see
// transformIgnorePatterns in jest.config.js.
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
};
