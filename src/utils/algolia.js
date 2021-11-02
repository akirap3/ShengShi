import algoliasearch from 'algoliasearch';

const client = algoliasearch('M9FCAECTRL', 'c5579c984b47675c143a66c5d3206e0e');

const algolia = client.initIndex('shengshi');

export default algolia;
