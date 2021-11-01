import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from '../utils/firebase';

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    let isMounted = true;
    if (currentUser) return;

    firebase.observeUserChange((currentUser) => {
      if (isMounted)
        dispatch({ type: 'currentUser/get', payload: currentUser });
    });

    return () => (isMounted = false);
  }, [dispatch, currentUser]);

  return currentUser;
};

export default useCurrentUser;
