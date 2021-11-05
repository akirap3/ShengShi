import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { DialogOverlay, DialogContent } from '@reach/dialog';
import LocationMap from '../../common/LocationMap';
import Loading from '../../common/Loading';

import { getFirestore, doc, updateDoc, Timestamp } from '@firebase/firestore';

import { AiFillCloseCircle } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';
import { BiCrown } from 'react-icons/bi';
import { BsCalendarCheckFill } from 'react-icons/bs';

import SelectDateTimePopup from '../myCollectedList/SelectDateTimePopup';
import useCurrentUser from '../../../hooks/useCurrentUser';

const UpdatePopup = ({ showUpdate, closeUpdate, share }) => {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const [showDateTime, setShowDateTime] = useState(false);
  const [newQuantities, setNewQuantities] = useState(
    share?.toReceiveInfo[currentUser?.uid]?.quantities || 1
  );
  const specificDateTime = useSelector((state) => state.specificDateTime);
  const [isLoading, setIsLoading] = useState(false);

  const openDateTime = () => setShowDateTime(true);
  const closeDateTime = () => setShowDateTime(false);

  const handleSpecificDateTime = (payload) => {
    dispatch({ type: 'specificDateTime/selected', payload: payload });
  };

  const isFieldsChecked = (share) => {
    const newQty = Number(newQuantities);
    if (isNaN(newQty)) {
      alert('數量請輸入數字');
      return false;
    } else if (newQty < 0 || newQty > share.quantities) {
      alert(`請輸入介於 1 ~ ${share.quantities} 的數字`);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (isFieldsChecked(share)) {
      setIsLoading(true);
      const docRef = doc(getFirestore(), 'shares', share.id);
      const updateQuantities = `toReceiveInfo.${currentUser.uid}.quantities`;
      const updateUpcomingTimestamp = `toReceiveInfo.${currentUser.uid}.upcomingTimestamp`;
      await updateDoc(docRef, {
        [updateQuantities]: newQuantities,
        [updateUpcomingTimestamp]: Timestamp.fromDate(specificDateTime),
      });
      setIsLoading(false);
      handleSpecificDateTime(null);
      closeUpdate();
    }
  };

  return (
    <>
      <DialogOverlay isOpen={showUpdate} onDismiss={closeUpdate}>
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
          aria-label="popup"
        >
          <PopClose onClick={closeUpdate} />
          <PopTitleContainer>
            <CrownIcon />
            <PopTitle>{share?.name || ''}</PopTitle>
          </PopTitleContainer>
          <PopContent>
            <PreviewImg src={share?.imageUrl || ''} />
            <PopRow>
              <RegisterQuantityLabel>登記數量</RegisterQuantityLabel>
              <Quantity
                placeholder={
                  share?.toReceiveInfo[currentUser?.uid]?.quantities || ''
                }
                onChange={(e) => setNewQuantities(e.target.value)}
                disabled={isLoading}
              />
            </PopRow>
            <PopRow>
              <DateTimeLabel>領取日期及時間</DateTimeLabel>
              <DateTime>
                {specificDateTime?.toLocaleString() ||
                  share?.toReceiveInfo[currentUser?.uid]?.upcomingTimestamp
                    ?.toDate()
                    .toLocaleString()}
              </DateTime>
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
            <SubmitBtn onClick={() => handleSubmit()} disabled={isLoading}>
              確認更新
            </SubmitBtn>
          </PopContent>
        </DialogContent>
      </DialogOverlay>
      <SelectDateTimePopup
        showDateTime={showDateTime}
        closeDateTime={closeDateTime}
      />
    </>
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

export default UpdatePopup;
