import { useEffect } from 'react';
import * as firebase from '../utils/firebase';

import { useDispatch, useSelector } from 'react-redux';

const useRestaurants = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurants);

  useEffect(() => {
    let isMounted = true;
    if (restaurants) return;

    firebase.fetchRestaurants().then((data) => {
      console.log(data);
      if (isMounted) dispatch({ type: 'restaurants/fetched', payload: data });
    });

    return () => (isMounted = false);
  }, [dispatch, restaurants]);

  return restaurants;
};

export default useRestaurants;
