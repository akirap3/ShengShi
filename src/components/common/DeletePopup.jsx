import React, { useState, useCallback, useEffect } from 'react';
import {
  handleDeleteMember,
  handleArchiveShare,
  handleDeleteToReceive,
  handleDeleteCollected,
  getCurrentUserData,
} from '../../utils/firebase';
import Loading from './Loading';
import useCurrentUser from '../../hooks/useCurrentUser';

import {
  CenterDialogOverlay,
  AlertDialogContent,
  PopClose,
  PopTitleContainer,
  PopTitle,
  AlertBtnRow,
  SubmitBtn,
  CancelBtn,
  InfoIcon,
} from './popup/PopupUnits';

const DeletePopup = ({
  showDelete,
  closeDelete,
  category,
  share,
  isToReceive,
  isCollected,
  toDeleteMember,
}) => {
  const currentUser = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = useCallback(
    () => getCurrentUserData(currentUser, setUserData),
    [currentUser]
  );

  useEffect(() => {
    return getUserData();
  }, [getUserData]);

  return (
    userData && (
      <CenterDialogOverlay
        isOpen={showDelete}
        onDismiss={closeDelete}
        disabled={isLoading}
      >
        <AlertDialogContent aria-label="delete-popup">
          {isLoading && <Loading />}
          <PopClose onClick={closeDelete} disabled={isLoading} />
          <PopTitleContainer>
            <InfoIcon />
            <PopTitle>{`確認刪除此${category}`}</PopTitle>
          </PopTitleContainer>
          <AlertBtnRow>
            <SubmitBtn
              onClick={
                isToReceive
                  ? () =>
                      handleDeleteToReceive(setIsLoading, share, closeDelete)
                  : isCollected
                  ? () =>
                      handleDeleteCollected(setIsLoading, share, closeDelete)
                  : toDeleteMember
                  ? () => handleDeleteMember()
                  : () =>
                      handleArchiveShare(
                        setIsLoading,
                        share,
                        closeDelete,
                        currentUser,
                        userData
                      )
              }
              disabled={isLoading}
            >
              確認
            </SubmitBtn>
            <CancelBtn onClick={closeDelete} disabled={isLoading}>
              取消
            </CancelBtn>
          </AlertBtnRow>
        </AlertDialogContent>
      </CenterDialogOverlay>
    )
  );
};

export default DeletePopup;
