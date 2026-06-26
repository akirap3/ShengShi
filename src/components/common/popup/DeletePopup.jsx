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
import { useTranslation } from '../../../context/LanguageContext';

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
  const { t } = useTranslation();

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

  const choose = () => {
    if (isToReceive) {
      handleDeleteToReceive();
    } else if (isCollected) {
      handleDeleteCollected();
    } else if (toDeleteMember) {
      handleDeleteMember();
    } else {
      handleArchiveShare();
    }
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
            <PopTitle>{t('confirmDeleteTitle').replace('{category}', category)}</PopTitle>
          </PopTitleContainer>
          <AlertBtnRow>
            <StyledSubmitBtn onClick={choose} disabled={isLoading}>
              {t('confirm')}
            </StyledSubmitBtn>
            <CancelBtn onClick={closeDelete} disabled={isLoading}>
              {t('cancel')}
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
