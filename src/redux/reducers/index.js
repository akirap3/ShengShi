import { combineReducers } from 'redux';

import articles from './articles';
import currentUser from './currentUser';
import checkUser from './checkUser';
import fromToDateTime from './fromToDateTime';
import latLng from './latLng';
import address from './address';
import specificDateTime from './specificDateTime';

const reducers = combineReducers({
  articles,
  currentUser,
  checkUser,
  fromToDateTime,
  latLng,
  address,
  specificDateTime,
});

export default reducers;
