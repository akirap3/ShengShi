import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from '../utils/firebase';

const useShares = () => {
  const dispatch = useDispatch();
  const shares = useSelector((state) => state.shares);

  useEffect(() => {
    let isMounted = true;
    if (shares) return;

    firebase.fetchShares().then((data) => {
      if (isMounted) dispatch({ type: 'shares/fetched', payload: data });
    });

    return () => (isMounted = false);
  }, [dispatch, shares]);

  return shares;
};

export default useShares;
