import { combineReducers } from 'redux';

import restaurants from './restaurants';
import shares from './shares';
import articles from './articles';

const reducers = combineReducers({
  restaurants,
  shares,
  articles,
});

export default reducers;
