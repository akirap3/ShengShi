import { useState, useEffect } from 'react';
import styled from 'styled-components';

import useCurrentUser from '../../../hooks/useCurrentUser';
import Loading from '../Loading';
import {
  handleDeleteMember,
  archiveShare,
  deleteToReceive,
  deleteCollected,
  getCurrentUserData,
} from '../../../utils/firebase';
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
} from './PopupUnits';

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

  useEffect(() => {
    return getCurrentUserData(currentUser, setUserData);
  }, [currentUser]);

  const handleDeleteToReceive = () => {
    setIsLoading(true);
    deleteToReceive(share).then(() => {
      setIsLoading(false);
      closeDelete();
    });
  };

  const handleArchiveShare = () => {
    archiveShare(share, currentUser, userData).then(() => {
      setIsLoading(false);
      closeDelete();
    });
  };

  const handleDeleteCollected = () => {
    setIsLoading(true);
    deleteCollected(share).then(() => {
      setIsLoading(false);
      closeDelete();
    });
  };

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
                  ? () => handleDeleteToReceive()
                  : isCollected
                  ? () => handleDeleteCollected()
                  : toDeleteMember
                  ? () => handleDeleteMember()
                  : () => handleArchiveShare()
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
