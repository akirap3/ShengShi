import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from '../utils/firebase';

const useShares = () => {
  const dispatch = useDispatch();
  const shares = useSelector((state) => state.shares);

  useEffect(() => {
    if (shares) return;

    firebase.fetchShares().then((data) => {
      dispatch({ type: 'shares/fetched', payload: data });
    });
  }, [dispatch, shares]);

  return shares;
};

export default useShares;
