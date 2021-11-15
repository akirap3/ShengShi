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
  addDoc,
  collection,
} from '@firebase/firestore';

import Comment from './Comment';

const CollectedSharePopup = ({ showEdit, closeEditor, share }) => {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const [showDateTime, setShowDateTime] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reqQuantities, setReqQuantities] = useState();
  const [userData, setUserData] = useState('');
  const specificDateTime = useSelector((state) => state.specificDateTime);
  const [isLoading, setIsLoading] = useState(false);
  const [replyComment, setReplayComment] = useState('');
  const [comments, setComments] = useState('');
  const [commentCounts, setCommentCounts] = useState('');

  const openDateTime = () => setShowDateTime(true);
  const closeDateTime = () => setShowDateTime(false);
  const openConfirmation = () => setShowConfirmation(true);
  const closeConfirmation = () => setShowConfirmation(false);

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

  const onCommentSubmit = async (share, userData) => {
    await addDoc(collection(getFirestore(), `shares/${share.id}/comments`), {
      createdAt: Timestamp.now(),
      commentContent: replyComment,
      author: {
        id: currentUser.uid,
        displayName: userData.displayName,
        imageUrl: userData.imageUrl,
      },
    });

    await addDoc(
      collection(getFirestore(), `users/${share.postUser.id}/messages`),
      {
        createdAt: Timestamp.now(),
        messageContent: `${userData.displayName}在您的${share.name}勝食頁面上留言`,
        kind: 'comment',
      }
    );

    setReplayComment('');
  };

  const handleSpecificDateTime = (payload) => {
    dispatch({ type: 'specificDateTime/selected', payload: payload });
  };

  const isFieldsChecked = (share, specificDateTime) => {
    const newQty = Number(reqQuantities);
    if (isNaN(newQty)) {
      alert('數量請輸入數字');
      return false;
    } else if (newQty < 0 || newQty > share.quantities) {
      alert(`請輸入介於 1 ~ ${share.quantities} 的數字`);
      return false;
    } else if (specificDateTime < new Date()) {
      alert(`您選定時間小於現在時間`);
      return false;
    } else if (specificDateTime < share.fromTimeStamp.toDate()) {
      alert(`您選定時間小於可領取時間`);
      return false;
    } else if (specificDateTime > share.toTimeStamp.toDate()) {
      alert(`您選定時間大於可領取時間`);
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
              <CommentSection>
                <ReplyArea
                  value={replyComment}
                  onChange={(e) => setReplayComment(e.target.value)}
                />
                <RepalyButton onClick={() => onCommentSubmit(share, userData)}>
                  留言
                </RepalyButton>
                <CommentSummary>
                  {`目前共 ${commentCounts || 0} 則留言`}
                </CommentSummary>
                {comments &&
                  comments.map((comment) => (
                    <Comment
                      currentUser={currentUser}
                      share={share}
                      comment={comment}
                      userData={userData}
                    />
                  ))}
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

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const ReplyArea = styled.textarea`
  max-width: 100%;
  min-height: 100px;
  max-height: 200px;
  padding: 10px;
  line-height: 16px;
  font-size: 14px;
  border-radius: 5px;
  border-color: lightgray;
`;

const RepalyButton = styled.button`
  cursor: pointer;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  background-color: white;
  color: #1e88e5;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #1e88e5;
  margin: 10px auto 20px auto;
`;

const CommentSummary = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  margin-bottom: 15px;
  background-color: rgb(46, 180, 204);
  width: fit-content;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;

export default CollectedSharePopup;
