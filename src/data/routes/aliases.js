const aliases = (prefix = `src`) => ({
  '@assets': `${prefix}/assets`,
  '@backend': `${prefix}/backend`,
  '@data': `${prefix}/data`,
  '@components': `${prefix}/components`,
  '@pages': `${prefix}/pages`,
  '@src': `${prefix}`,
});

module.exports = aliases;