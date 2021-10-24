import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from '../utils/firebase';

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) return;

    firebase.observeUserChange((currentUser) => {
      console.log(currentUser);
      dispatch({ type: 'currentUser/get', payload: currentUser });
    });
  });

  return currentUser;
};

export default useCurrentUser;
