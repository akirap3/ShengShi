import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from '../utils/firebase';

const useCheckUser = () => {
  const dispatch = useDispatch();
  const checkUser = useSelector((state) => state.checkUser);

  useEffect(() => {
    firebase.observeUserChange((user) => {
      if (user) {
        dispatch({ type: 'user/loggedIn' });
      } else {
        dispatch({ type: 'user/loggedOut' });
      }
    });
  }, [dispatch]);

  return checkUser;
};

export default useCheckUser;
