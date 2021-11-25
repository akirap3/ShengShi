import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import useCurrentUser from '../../hooks/useCurrentUser';
import Loading from './Loading';
import {
  handleDeleteMember,
  handleArchiveShare,
  handleDeleteToReceive,
  handleDeleteCollected,
  getCurrentUserData,
} from '../../utils/firebase';
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
            <StyledSubmitBtn
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
            </StyledSubmitBtn>
            <CancelBtn onClick={closeDelete} disabled={isLoading}>
              取消
            </CancelBtn>
          </AlertBtnRow>
        </AlertDialogContent>
      </CenterDialogOverlay>
    )
  );
};

const StyledSubmitBtn = styled(SubmitBtn)`
  margin-right: 5px;
`;

export default DeletePopup;
