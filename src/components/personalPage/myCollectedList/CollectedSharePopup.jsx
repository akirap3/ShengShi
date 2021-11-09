import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { DialogOverlay, DialogContent } from '@reach/dialog';
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
import { AiFillCloseCircle } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';
import { BiCrown } from 'react-icons/bi';
import { BsCalendarCheckFill } from 'react-icons/bs';

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
          {isLoading && (
            <Loading
              type={'spin'}
              color={'#2a9d8f'}
              height={'10vw'}
              width={'10vw'}
            />
          )}
          <DialogContent
            style={{
              position: 'relative',
              border: 'solid 1px lightBlue',
              borderRadius: '10px',
            }}
            aria-label="collected-share-popup"
          >
            <PopClose onClick={closeEditor} />
            <PopTitleContainer>
              <CrownIcon />
              <PopTitle>{share?.name || ''}</PopTitle>
            </PopTitleContainer>
            <PopContent>
              <PreviewImg src={share?.imageUrl || ''} />
              <PopRow>
                <CurrentNumberLabel>目前數量</CurrentNumberLabel>
                <CurrentNumber>{share?.quantities || ''}</CurrentNumber>
              </PopRow>
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
                <DateTimeLabel>領取日期及時間</DateTimeLabel>
                <DateTime>{specificDateTime?.toLocaleString() || ''}</DateTime>
                <Calendar onClick={openDateTime} />
              </PopRow>
              <PopRow>
                <PopPlaceLabel>地點</PopPlaceLabel>
                <PopPlace>{share?.exchangePlace || ''}</PopPlace>
                <PopPlaceIcon />
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
                  {`目前共${commentCounts || 0}則留言`}
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
              <SubmitBtn
                onClick={() => handleConfirmation(share, specificDateTime)}
              >
                確認領取
              </SubmitBtn>
            </PopContent>
          </DialogContent>
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

const StyledColse = styled(AiFillCloseCircle)`
  fill: lightblue;
  background-color: blue;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
`;

const PopClose = styled(StyledColse)`
  position: absolute;
  top: 2vw;
  right: 2vw;
  width: 3vw;
  height: 3vw;
  cursor: pointer;
`;

const PopTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1vw;
  border-bottom: 1px solid lightskyblue;
`;

const CrownIcon = styled(BiCrown)`
  fill: lightskyblue;
  width: 3vw;
  height: 3vw;
  margin-right: 2vw;
`;

const PopTitle = styled.div`
  font-size: 2.5vw;
`;

const PopContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vw 1.5vw;
`;

const PopRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  font-size: 1.5vw;
  margin-bottom: 2vw;
`;

const CurrentNumberLabel = styled.label`
  width: 9vw;
`;

const CurrentNumber = styled.span`
  flex-grow: 1;
`;

const RegisterQuantityLabel = styled.label`
  width: 9vw;
`;

const Quantity = styled.input``;

const DateTimeLabel = styled.label`
  width: 9vw;
`;

const DateTime = styled.span`
  margin-right: 1vw;
`;

const Calendar = styled(BsCalendarCheckFill)`
  width: 2vw;
  height: 2vw;
  fill: lightseagreen;
  cursor: pointer;
`;

const PopPlaceLabel = styled.label`
  width: 9vw;
`;

const PopPlace = styled.span`
  margin-right: 1vw;
`;

const PopPlaceIcon = styled(GrLocation)`
  width: 2vw;
  height: 2vw;
`;

const PreviewImg = styled.img`
  border-radius: 10px;
  margin-bottom: 2vw;
`;

const MapWrapper = styled.div`
  margin-bottom: 2vw;
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2vw;
`;

const ReplyArea = styled.textarea`
  width: 100%;
  min-height: 10vh;
  max-height: 20vh;
  padding: 1vw;
  line-height: 16px;
  font-size: 12px;
  border-radius: 5px;
`;

const RepalyButton = styled.button`
  border: 1px solid black;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 1vw auto 2vw auto;
`;

const CommentSummary = styled.div`
  margin-bottom: 2vw;
`;

const SubmitBtn = styled.button`
  flex-grow: 1;
  border: none;
  border-radius: 5px;
  background-color: lightskyblue;
  color: white;
  cursor: pointer;
  padding: 1vw;
  letter-spacing: 0.5vw;
`;

export default CollectedSharePopup;
