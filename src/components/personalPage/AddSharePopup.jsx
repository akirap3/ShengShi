import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

import {
  collection,
  doc,
  setDoc,
  getFirestore,
  Timestamp,
  GeoPoint,
  increment,
  updateDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { isFieldsChecked } from '../../utils/validation.js';
import useCurrentUser from '../../hooks/useCurrentUser.js';
import { getListenedSingleContent, handleAddBadge } from '../../utils/firebase';

import { DialogOverlay, DialogContent } from '@reach/dialog';

import CalendarPopup from './myShareList/CalendarPopup';
import MapPopup from './myShareList/MapPopup.jsx';

import { AiFillCloseCircle } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';
import { BiCrown } from 'react-icons/bi';
import { BsCalendarCheckFill } from 'react-icons/bs';

const AddSharePopup = ({ showEdit, closeEditor }) => {
  const dispatch = useDispatch();
  const uploadRef = useRef();
  const currentUser = useCurrentUser();
  const fromToDateTime = useSelector((state) => state.fromToDateTime);
  const address = useSelector((state) => state.address);
  const latLng = useSelector((state) => state.latLng);
  const [showCalender, setShowCalendar] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [quantities, setQuantities] = useState(1);
  const [file, setFile] = useState(null);
  const [userData, setUserData] = useState('');
  const [isLoading, setIsLoaging] = useState(false);

  const openCalendar = () => setShowCalendar(true);
  const closeCalendar = () => setShowCalendar(false);
  const openMap = () => setShowMap(true);
  const closeMap = () => setShowMap(false);

  const handleAddress = (payload) => {
    dispatch({ type: 'address/get', payload: payload });
  };
  const handleLatLng = (payload) => {
    dispatch({ type: 'latLng/get', payload: payload });
  };

  const handleFromToDateTime = () => {
    dispatch({ type: 'fromToDateTime/default' });
  };

  const getListenedUserData = useCallback(() => {
    return getListenedSingleContent('users', currentUser?.uid, setUserData);
  }, [currentUser?.uid]);

  useEffect(() => {
    if (currentUser) return getListenedUserData();
  }, [currentUser, getListenedUserData]);

  const handleSubmit = async () => {
    if (isFieldsChecked(foodName, quantities, address, file)) {
      setIsLoaging(true);
      const docRef = doc(collection(getFirestore(), `shares`));
      const fileRef = ref(getStorage(), `images/shares/${docRef.id}`);
      const metadata = {
        contentType: file.type,
      };
      const uplaodTask = await uploadBytes(fileRef, file, metadata);
      const imageUrl = await getDownloadURL(uplaodTask.ref);
      await setDoc(
        docRef,
        {
          exchangePlace: address,
          fromTimeStamp: Timestamp.fromDate(fromToDateTime[0]),
          toTimeStamp: Timestamp.fromDate(fromToDateTime[1]),
          imageUrl,
          quantities: Number(quantities),
          name: foodName,
          postUser: {
            id: currentUser.uid,
            displayName: userData.displayName,
          },
          rating: 5,
          createdAt: Timestamp.fromDate(new Date()),
          userLocation: userData.myPlace || '未提供',
          exchangeLocation: new GeoPoint(latLng[0], latLng[1]),
          receivedInfo: {},
          receivedUserId: [],
          toReceiveInfo: {},
          toReceiveUserId: [],
          savedUserId: [],
          bookedQuantities: 0,
          isArchived: false,
        },
        { merge: true }
      );

      await updateDoc(doc(getFirestore(), 'users', currentUser.uid), {
        myPoints: increment(10),
      });

      handleAddBadge(currentUser.uid);

      setIsLoaging(false);
      closeEditor();
      handleLatLng([]);
      handleAddress('');
      handleFromToDateTime();
      setFile(null);
    }
  };

  const previewImgUrl = file
    ? URL.createObjectURL(file)
    : 'https://react.semantic-ui.com/images/wireframe/image.png';

  return (
    <>
      <DialogOverlay isOpen={showEdit} onDismiss={closeEditor}>
        {isLoading && (
          <StyledReactLoading
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
          aria-label="add-share-popup"
        >
          <PopClose onClick={closeEditor} disabled={isLoading} />
          <PopTitleContainer>
            <CrownIcon />
            <PopTitle>分享勝食</PopTitle>
          </PopTitleContainer>
          <PopContent>
            <PopRow>
              <FoodLabel>食物名稱</FoodLabel>
              <FoodName onChange={(e) => setFoodName(e.target.value)} />
            </PopRow>
            <PopRow>
              <QuantityLabel>數量</QuantityLabel>
              <Quantity onChange={(e) => setQuantities(e.target.value)} />
            </PopRow>
            <PopRow>
              <DateTimeLabel>日期及時間</DateTimeLabel>
              <DateTime>
                {`${fromToDateTime[0].toLocaleString()} - ${fromToDateTime[1].toLocaleString()}`}
              </DateTime>
              <Calendar onClick={openCalendar} />
            </PopRow>
            <PopRow>
              <PopPlaceLabel>地點</PopPlaceLabel>
              <PopPlace>{address}</PopPlace>
              <PopPlaceIcon onClick={openMap} />
            </PopRow>
            <PopRow>
              <FoodImgLabel>食物照片</FoodImgLabel>
              <ImgUpload
                ref={uploadRef}
                htmlFor="image-upload"
                disabled={isLoading}
              >
                上傳
              </ImgUpload>
              <UploadBtn
                type="file"
                id="image-upload"
                onChange={(e) => setFile(e.target.files[0])}
                disabled={isLoading}
              />
            </PopRow>
            <PreviewImg src={previewImgUrl} />
            <SubmitBtn onClick={handleSubmit} disabled={isLoading}>
              分享
            </SubmitBtn>
          </PopContent>
        </DialogContent>
      </DialogOverlay>
      <CalendarPopup
        showCalender={showCalender}
        closeCalendar={closeCalendar}
      />
      <MapPopup
        showMap={showMap}
        closeMap={closeMap}
        handleAddress={handleAddress}
        handleLatLng={handleLatLng}
      />
    </>
  );
};

const StyledReactLoading = styled(ReactLoading)`
  display: flex;
  position: relative;
  z-index: 10;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
`;

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

const FoodLabel = styled.label`
  width: 9vw;
`;

const FoodName = styled.input`
  flex-grow: 1;
`;

const QuantityLabel = styled.label`
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

const FoodImgLabel = styled.label`
  width: 9vw;
`;

const ImgUpload = styled.label`
  border: 1px solid lightslategrey;
  border-radius: 5px;
  background-color: lightskyblue;
  padding: 0.5vw;
  cursor: pointer;
`;

const UploadBtn = styled.input`
  display: none;
`;

const PreviewImg = styled.img`
  border-radius: 10px;
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

export default AddSharePopup;
