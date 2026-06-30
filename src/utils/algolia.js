import algoliasearch from 'algoliasearch';
require('dotenv').config();

const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPLICATION_ID,
  process.env.REACT_APP_SEARCH_ONLY_API_KEY
);

const algolia = client.initIndex('shengshi');

export default algolia;
