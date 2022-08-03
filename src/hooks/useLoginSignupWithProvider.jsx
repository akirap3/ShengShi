import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { handleSignUpWithProvider, getAllContents } from '../utils/firebase';

const useLoginSignupWithProvider = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersDate] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);

  useEffect(() => {
    return getAllContents('users', setUsersDate);
  }, []);

  const openAlertWithMessage = (msg) => {
    setAlertMessage(msg);
    openInfo();
    return false;
  };

  const hasSignedUp = (usersData, uid) => {
    const userIds = usersData.map((user) => user.id);
    if (userIds.includes(uid)) return true;
    return false;
  };

  const handleClickProvider = (loginWithProvider, imageSize) => {
    setIsLoading(true);
    loginWithProvider()
      .then((result) => {
        const { displayName, photoURL, email, uid } = result.user;
        if (!hasSignedUp(usersData, uid)) {
          const data = {
            displayName,
            email,
            uid,
            photoURL,
            imageSize,
          };
          handleSignUpWithProvider(data).then(() => {
            setIsLoading(false);
            history.push('/personal/list');
          });
        } else {
          setIsLoading(false);
          history.push('/personal/list');
        }
      })
      .catch((error) => {
        openAlertWithMessage(error.message);
        setIsLoading(false);
      });
  };

  return {
    openAlertWithMessage,
    alertMessage,
    showInfo,
    closeInfo,
    isLoading,
    setIsLoading,
    usersData,
    history,
    handleClickProvider,
  };
};

export default useLoginSignupWithProvider;
