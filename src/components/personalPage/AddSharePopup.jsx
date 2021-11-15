import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Loading from '../common/Loading.jsx';

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
  PopPlaceIcon,
  Calendar,
  Preview,
  ButtonContainer,
  ImgUpload,
  SubmitBtn,
} from '../common/popup/PopupUnits.jsx';

import CalendarPopup from './myShareList/CalendarPopup';
import MapPopup from './myShareList/MapPopup.jsx';

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
        <StyledDialogContent aria-label="add-share-popup">
          {isLoading && <Loading />}
          <PopClose onClick={closeEditor} disabled={isLoading} />
          <PopTitleContainer>
            <TitleIcon />
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
              <LabelIconContainer>
                <DateTimeLabel>日期及時間</DateTimeLabel>
                <Calendar onClick={openCalendar} />
              </LabelIconContainer>
              <DateTime>
                {fromToDateTime
                  ? `${fromToDateTime[0].toLocaleString()} - ${fromToDateTime[1].toLocaleString()}`
                  : ''}
              </DateTime>
            </PopRow>
            <PopRow>
              <LabelIconContainer>
                <PopPlaceLabel>地點</PopPlaceLabel>
                <PopPlaceIcon onClick={openMap} />
              </LabelIconContainer>
              <PopPlace>{address}</PopPlace>
            </PopRow>
            <PopRow>
              <FoodImgLabel>食物照片</FoodImgLabel>
            </PopRow>
            <Preview src={previewImgUrl} />
            <ButtonContainer>
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
              <SubmitBtn onClick={handleSubmit} disabled={isLoading}>
                分享
              </SubmitBtn>
            </ButtonContainer>
          </PopContent>
        </StyledDialogContent>
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

const FoodLabel = styled(StyledLabel)``;

const FoodName = styled(StyledInput)``;

const QuantityLabel = styled(StyledLabel)``;

const Quantity = styled(StyledInput)``;

const DateTimeLabel = styled(StyledLabel)`
  margin-right: 10px;
`;

const DateTime = styled(StyledSpan)``;

const PopPlaceLabel = styled(StyledLabel)`
  margin-right: 10px;
`;

const PopPlace = styled(StyledSpan)``;

const FoodImgLabel = styled(StyledLabel)``;

const UploadBtn = styled.input`
  display: none;
`;

export default AddSharePopup;
