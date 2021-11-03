import algoliasearch from 'algoliasearch';
require('dotenv').config();

const client = algoliasearch('M9FCAECTRL', 'c11b29f9c3d1591ca125fe9ebae2c347');

const algolia = client.initIndex('shengshi');

export default algolia;
