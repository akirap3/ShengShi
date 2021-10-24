import { combineReducers } from 'redux';

import restaurants from './restaurants';
import shares from './shares';
import articles from './articles';
import currentUser from './currentUser';

const reducers = combineReducers({
  restaurants,
  shares,
  articles,
  currentUser,
});

export default reducers;
