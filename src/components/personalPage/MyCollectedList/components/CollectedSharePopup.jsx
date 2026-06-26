import { useEffect, useState } from 'react';

import Ripples from 'react-ripples';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { DialogOverlay } from '@reach/dialog';

import useCurrentUser from '../../../../hooks/useCurrentUser';
import {
  StyledDialogContent,
  PopClose,
  PopTitleContainer,
  TitleIcon,
  PopTitle,
  PopContent,
  PopRow,
  StyledLabel,
  StyledInput,
  StyledSpan,
  LabelIconContainer,
  Calendar,
  PopPlaceIcon,
  Preview,
  ButtonContainer,
  SubmitBtn,
} from '../../../common/popup/PopupUnits';
import SelectDateTimePopup from './SelectDateTimePopup';
import ConfirmedPopup from '../../../common/popup/ConfirmedPopup';
import AlertPopup from '../../../common/popup/AlertPopup';
import LocationMap from '../../../common/MyMap/components/ExchangeMap';
import Loading from '../../../common/Loading';
import Comment from '../../../common/comment/Comment';
import {
  CommentSection,
  CommentSummary,
  NoComment,
} from '../../../common/comment/CommentUnits';
import {
  getCurrentUserData,
  getAllContents,
  getCollectionCounts,
  confirmBooking,
} from '../../../../utils/firebase';
import { useTranslation } from '../../../../context/LanguageContext';

const CollectedSharePopup = ({ showEdit, closeEditor, share }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const [showDateTime, setShowDateTime] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [reqQuantities, setReqQuantities] = useState();
  const [userData, setUserData] = useState('');
  const specificDateTime = useSelector((state) => state.specificDateTime);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState('');
  const [commentCounts, setCommentCounts] = useState('');

  const openDateTime = () => setShowDateTime(true);
  const closeDateTime = () => setShowDateTime(false);
  const openConfirmation = () => setShowConfirmation(true);
  const closeConfirmation = () => setShowConfirmation(false);
  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);

  useEffect(() => {
    return getCurrentUserData(currentUser, setUserData);
  }, [currentUser]);

  useEffect(() => {
    return getAllContents(`shares/${share.id}/comments`, setComments);
  }, [share.id]);

  useEffect(() => {
    return getCollectionCounts(`shares/${share.id}/comments`, setCommentCounts);
  }, [share.id]);

  const openAlertWithMessage = (msg) => {
    setAlertMessage(msg);
    openInfo();
    return false;
  };

  const isFieldsChecked = (share, specificDateTime) => {
    const newQty = Number(reqQuantities);
    if (isNaN(newQty)) {
      return openAlertWithMessage(t('errQtyFormat'));
    } else if (newQty < 0 || newQty > share.quantities) {
      return openAlertWithMessage(t('qtyRangeMinMax').replace('{max}', share.quantities));
    } else if (specificDateTime === null) {
      return openAlertWithMessage(t('errSelectDateTime'));
    }
    return true;
  };

  const handleConfirmation = () => {
    if (isFieldsChecked(share, specificDateTime)) {
      setIsLoading(true);
      confirmBooking(share, specificDateTime, currentUser, reqQuantities).then(
        () => {
          setIsLoading(false);
          dispatch({ type: 'specificDateTime/selected', payload: null });
          openConfirmation();
          closeEditor();
        }
      );
    }
  };

  return (
    userData && (
      <>
        <DialogOverlay isOpen={showEdit} onDismiss={closeEditor}>
          <StyledDialogContent aria-label="collected-share-popup">
            {isLoading && <Loading />}
            <PopClose onClick={closeEditor} />
            <PopTitleContainer>
              <TitleIcon />
              <PopTitle>{share?.name || ''}</PopTitle>
            </PopTitleContainer>
            <PopContent>
              <Preview
                src={share?.imageUrl || ''}
                alt="preview-redundant-food"
              />
              <StyledPopRow>
                <StyledLabel>{t('currentQuantity')}</StyledLabel>
                <StyledSpan>{share?.quantities || ''}</StyledSpan>
              </StyledPopRow>
              <PopRow>
                <StyledLabel>{t('requestedQuantity')}</StyledLabel>
                <StyledInput
                  placeholder={t('enterQuantity')}
                  onChange={(e) => setReqQuantities(e.target.value)}
                />
              </PopRow>
              <PopRow>
                <DateTimeLabel>{t('availableTimeRange')}</DateTimeLabel>
                <StyledSpan>
                  {share?.fromTimeStamp.toDate().toLocaleString()}
                  {` ~ `}
                  {share?.toTimeStamp.toDate().toLocaleString()}
                </StyledSpan>
              </PopRow>
              <PopRow>
                <LabelIconContainer>
                  <DateTimeLabel>{t('dateAndTime')}</DateTimeLabel>
                  <Calendar onClick={openDateTime} />
                </LabelIconContainer>
                <StyledSpan>
                  {specificDateTime?.toLocaleString() || ''}
                </StyledSpan>
              </PopRow>
              <PopRow>
                <LabelIconContainer>
                  <PopPlaceLabel>{t('place')}</PopPlaceLabel>
                  <PopPlaceIcon />
                </LabelIconContainer>
                <StyledSpan>{share?.exchangePlace || ''}</StyledSpan>
              </PopRow>
              <MapWrapper>
                <LocationMap />
              </MapWrapper>
              <PopRow>
                <CommentLabel>{t('comment')}</CommentLabel>
              </PopRow>
              <CommentSection>
                <CommentSummary>
                  {t('commentCountLabel').replace('{count}', commentCounts || 0)}
                </CommentSummary>
                {comments.length !== 0 ? (
                  comments.map((comment) => (
                    <Comment
                      key={comment.id}
                      currentUser={currentUser}
                      share={share}
                      comment={comment}
                      userData={userData}
                    />
                  ))
                ) : (
                  <NoComment />
                )}
              </CommentSection>
              <ButtonContainer>
                <Ripples color="#fff" during={3000}>
                  <SubmitBtn onClick={handleConfirmation}>{t('confirmPickup')}</SubmitBtn>
                </Ripples>
              </ButtonContainer>
            </PopContent>
          </StyledDialogContent>
        </DialogOverlay>
        <SelectDateTimePopup
          showDateTime={showDateTime}
          closeDateTime={closeDateTime}
          share={share}
        />
        <ConfirmedPopup
          showConfirmation={showConfirmation}
          closeConfirmation={closeConfirmation}
          share={share}
        />
        <AlertPopup
          showInfo={showInfo}
          closeInfo={closeInfo}
          message={alertMessage}
        />
      </>
    )
  );
};

const StyledPopRow = styled(PopRow)`
  margin-top: 15px;
`;

const DateTimeLabel = styled(StyledLabel)`
  margin-right: 10px;
`;

const PopPlaceLabel = styled(StyledLabel)`
  margin-right: 10px;
`;

const MapWrapper = styled.div`
  margin-bottom: 10px;
`;

const CommentLabel = styled(StyledLabel)`
  margin-top: 15px;
`;

export default CollectedSharePopup;
