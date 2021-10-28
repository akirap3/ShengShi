import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from '../utils/firebase';

const useCheckUser = () => {
  const dispatch = useDispatch();
  const checkUser = useSelector((state) => state.checkUser);

  useEffect(() => {
    let isMounted = true;

    firebase.observeUserChange((user) => {
      if (isMounted) {
        if (user) {
          dispatch({ type: 'user/loggedIn' });
        } else {
          dispatch({ type: 'user/loggedOut' });
        }
      }
    });

    return () => (isMounted = false);
  }, [dispatch]);

  return checkUser;
};

export default useCheckUser;
