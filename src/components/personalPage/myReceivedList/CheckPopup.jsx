import React from 'react';
import styled from 'styled-components';

import { DialogOverlay } from '@reach/dialog';
import {
  StyledDialogContent,
  PopClose,
  PopTitleContainer,
  TitleIcon,
  PopTitle,
  PopContent,
  PopRow,
  StyledLabel,
  StyledSpan,
  Preview,
  LabelIconContainer,
  PopPlaceIcon,
} from '../../common/popup/PopupUnits';

import useCurrentUser from '../../../hooks/useCurrentUser';

const CheckPopup = ({ showEdit, closeEditor, share }) => {
  const currentUser = useCurrentUser();

  return (
    <>
      <DialogOverlay isOpen={showEdit} onDismiss={closeEditor}>
        <StyledDialogContent aria-label="popup">
          <PopClose onClick={closeEditor} />
          <PopTitleContainer>
            <TitleIcon />
            <PopTitle>{share?.name || ''}</PopTitle>
          </PopTitleContainer>
          <PopContent>
            <PopRow>
              <FoodLabel>食物名稱</FoodLabel>
              <FoodName>{share?.name || ''}</FoodName>
            </PopRow>
            <PopRow>
              <QuantityLabel>數量</QuantityLabel>
              <Quantity>
                {share?.receivedInfo[currentUser.uid].quantities || 0}
              </Quantity>
            </PopRow>
            <PopRow>
              <DateTimeLabel>日期及時間</DateTimeLabel>
              <DateTime>
                {share?.receivedInfo[currentUser.uid].confirmedTimestamp
                  ?.toDate()
                  .toLocaleString()}
              </DateTime>
            </PopRow>
            <PopRow>
              <LabelIconContainer>
                <PopPlaceLabel>地點</PopPlaceLabel>
                <PopPlaceIcon />
              </LabelIconContainer>
              <PopPlace>{share?.exchangePlace || ''}</PopPlace>
            </PopRow>
            <PopRow>
              <FoodImgLabel>食物照片</FoodImgLabel>
            </PopRow>
            <Preview src={share?.imageUrl || ''} />
          </PopContent>
        </StyledDialogContent>
      </DialogOverlay>
    </>
  );
};

const FoodLabel = styled(StyledLabel)``;

const FoodName = styled(StyledSpan)``;

const QuantityLabel = styled(StyledLabel)``;

const Quantity = styled(StyledSpan)``;

const DateTimeLabel = styled(StyledLabel)``;

const DateTime = styled(StyledSpan)``;

const PopPlaceLabel = styled(StyledLabel)``;

const PopPlace = styled(StyledSpan)``;

const FoodImgLabel = styled(StyledLabel)``;

export default CheckPopup;
