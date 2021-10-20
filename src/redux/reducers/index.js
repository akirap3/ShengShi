import { combineReducers } from 'redux';

import restaurants from './restaurants';
import shares from './shares';

const reducers = combineReducers({
  restaurants,
  shares,
});

export default reducers;
