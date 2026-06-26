import React from 'react';

import {
  CenterDialogOverlay,
  AlertDialogContent,
  PopClose,
  PopTitleContainer,
  PopTitle,
  AlertBtnRow,
  SubmitBtn,
  InfoIcon,
} from './PopupUnits';
import { useTranslation } from '../../../context/LanguageContext';

const AlertPopup = ({ showInfo, closeInfo, message }) => {
  const { t } = useTranslation();
  return (
    <CenterDialogOverlay isOpen={showInfo} onDismiss={closeInfo}>
      <AlertDialogContent aria-label="delete-popup">
        <PopClose onClick={closeInfo} />
        <PopTitleContainer>
          <InfoIcon />
          <PopTitle>{message}</PopTitle>
        </PopTitleContainer>
        <AlertBtnRow>
          <SubmitBtn onClick={closeInfo}>{t('confirm')}</SubmitBtn>
        </AlertBtnRow>
      </AlertDialogContent>
    </CenterDialogOverlay>
  );
};

export default AlertPopup;
