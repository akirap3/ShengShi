import { useEffect } from 'react';
import * as firebase from '../utils/firebase';

import { useDispatch, useSelector } from 'react-redux';

const useRestaurants = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurants);

  useEffect(() => {
    if (restaurants) return;

    firebase.fetchRestaurants().then((data) => {
      console.log(data);
      dispatch({ type: 'restaurants/fetched', payload: data });
    });
  }, [dispatch]);

  return restaurants;
};

export default useRestaurants;
