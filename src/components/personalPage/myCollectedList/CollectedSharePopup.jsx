import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

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
  StyledInput,
  StyledSpan,
  LabelIconContainer,
  Calendar,
  PopPlaceIcon,
  Preview,
  ButtonContainer,
  SubmitBtn,
} from '../../common/popup/PopupUnits';
import SelectDateTimePopup from './SelectDateTimePopup';
import LocationMap from '../../common/LocationMap';
import Loading from '../../common/Loading';
import ConfirmedPopup from '../../common/ConfirmedPopup';
import AlertPopup from '../../common/AlertPopup';
import useCurrentUser from '../../../hooks/useCurrentUser';
import {
  getCurrentUserData,
  getAllContents,
  getCollectionCounts,
} from '../../../utils/firebase';

import {
  getFirestore,
  doc,
  Timestamp,
  updateDoc,
  arrayUnion,
  increment,
} from '@firebase/firestore';

import {
  CommentSection,
  CommentSummary,
  NoComment,
} from '../../common/comment/CommentUnits';
import Comment from '../../common/comment/Comment';

const CollectedSharePopup = ({ showEdit, closeEditor, share }) => {
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

  const getUserData = useCallback(
    () => getCurrentUserData(currentUser, setUserData),
    [currentUser]
  );

  const getComments = useCallback(
    () => getAllContents(`shares/${share.id}/comments`, setComments),
    [share.id]
  );

  const getCommentCounts = useCallback(
    () => getCollectionCounts(`shares/${share.id}/comments`, setCommentCounts),
    [share.id]
  );

  useEffect(() => {
    return getUserData();
  }, [getUserData]);

  useEffect(() => {
    return getComments();
  }, [getComments]);

  useEffect(() => {
    return getCommentCounts();
  }, [getCommentCounts]);

  const handleSpecificDateTime = (payload) => {
    dispatch({ type: 'specificDateTime/selected', payload: payload });
  };

  const isFieldsChecked = (share, specificDateTime) => {
    const newQty = Number(reqQuantities);
    if (isNaN(newQty)) {
      setAlertMessage('數量請輸入數字');
      openInfo();
      return false;
    } else if (newQty < 0 || newQty > share.quantities) {
      setAlertMessage(`請輸入介於 1 ~ ${share.quantities} 的數字`);
      openInfo();
      return false;
    } else if (specificDateTime < new Date()) {
      setAlertMessage('您選定時間小於現在時間');
      openInfo();
      return false;
    } else if (specificDateTime < share.fromTimeStamp.toDate()) {
      setAlertMessage('您選定時間小於可領取時間');
      openInfo();
      return false;
    } else if (specificDateTime > share.toTimeStamp.toDate()) {
      setAlertMessage('您選定時間大於可領取時間');
      openInfo();
      return false;
    }
    return true;
  };

  const handleConfirmation = async (share, specificDateTime) => {
    if (isFieldsChecked(share, specificDateTime)) {
      setIsLoading(true);
      const docRef = doc(getFirestore(), 'shares', share.id);
      await updateDoc(docRef, {
        toReceiveUserId: arrayUnion(currentUser.uid),
        [`toReceiveInfo.${currentUser.uid}`]: {
          quantities: Number(reqQuantities) || 1,
          upcomingTimestamp: Timestamp.fromDate(specificDateTime),
        },
        bookedQuantities: increment(Number(reqQuantities) || 1),
      });
      setIsLoading(false);
      handleSpecificDateTime(null);
      openConfirmation();
      closeEditor();
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
              <Preview src={share?.imageUrl || ''} />

              <StyledPopRow>
                <CurrentNumberLabel>目前數量</CurrentNumberLabel>
                <CurrentNumber>{share?.quantities || ''}</CurrentNumber>
              </StyledPopRow>
              <PopRow>
                <RegisterQuantityLabel>登記數量</RegisterQuantityLabel>
                <Quantity
                  placeholder="請輸入數量"
                  onChange={(e) => setReqQuantities(e.target.value)}
                />
              </PopRow>
              <PopRow>
                <DateTimeLabel>可領取時段</DateTimeLabel>
                <DateTime>
                  {share?.fromTimeStamp.toDate().toLocaleString()}
                  {`~`}
                  {share?.toTimeStamp.toDate().toLocaleString()}
                </DateTime>
              </PopRow>
              <PopRow>
                <LabelIconContainer>
                  <DateTimeLabel>領取日期及時間</DateTimeLabel>
                  <Calendar onClick={openDateTime} />
                </LabelIconContainer>
                <DateTime>{specificDateTime?.toLocaleString() || ''}</DateTime>
              </PopRow>
              <PopRow>
                <LabelIconContainer>
                  <PopPlaceLabel>地點</PopPlaceLabel>
                  <PopPlaceIcon />
                </LabelIconContainer>
                <PopPlace>{share?.exchangePlace || ''}</PopPlace>
              </PopRow>
              <MapWrapper>
                <LocationMap />
              </MapWrapper>
              <PopRow>
                <CommentLabel>評論</CommentLabel>
              </PopRow>
              <CommentSection>
                <CommentSummary>
                  {`目前共 ${commentCounts || 0} 則留言`}
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
                <SubmitBtn
                  onClick={() => handleConfirmation(share, specificDateTime)}
                >
                  確認領取
                </SubmitBtn>
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

const CurrentNumberLabel = styled(StyledLabel)``;

const CurrentNumber = styled(StyledSpan)``;

const RegisterQuantityLabel = styled(StyledLabel)``;

const Quantity = styled(StyledInput)``;

const DateTimeLabel = styled(StyledLabel)`
  margin-right: 10px;
`;

const DateTime = styled(StyledSpan)``;

const PopPlaceLabel = styled(StyledLabel)`
  margin-right: 10px;
`;

const PopPlace = styled(StyledSpan)``;

const MapWrapper = styled.div`
  margin-bottom: 10px;
`;

const CommentLabel = styled(StyledLabel)`
  margin-top: 15px;
`;

export default CollectedSharePopup;
