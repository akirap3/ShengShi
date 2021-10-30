import { combineReducers } from 'redux';

import restaurants from './restaurants';
import shares from './shares';
import articles from './articles';
import currentUser from './currentUser';
import checkUser from './checkUser';
import fromToDateTime from './fromToDateTime';
import latLng from './latLng';
import address from './address';
import specificDateTime from './specificDateTime';

const reducers = combineReducers({
  restaurants,
  shares,
  articles,
  currentUser,
  checkUser,
  fromToDateTime,
  latLng,
  address,
  specificDateTime,
});

export default reducers;
