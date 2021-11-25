import { combineReducers } from 'redux';

import currentUser from './currentUser';
import checkUser from './checkUser';
import fromToDateTime from './fromToDateTime';
import latLng from './latLng';
import address from './address';
import specificDateTime from './specificDateTime';
import searchedShares from './searchedShares';
import isShareSearch from './isShareSearch';

const reducers = combineReducers({
  currentUser,
  checkUser,
  fromToDateTime,
  latLng,
  address,
  specificDateTime,
  searchedShares,
  isShareSearch,
});

export default reducers;
