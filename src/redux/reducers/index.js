import { combineReducers } from 'redux';

import restaurants from './restaurants';
import shares from './shares';
import articles from './articles';
import currentUser from './currentUser';
import checkUser from './checkUser';

const reducers = combineReducers({
  restaurants,
  shares,
  articles,
  currentUser,
  checkUser,
});

export default reducers;
