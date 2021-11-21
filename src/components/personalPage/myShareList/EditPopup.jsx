import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  getFirestore,
  doc,
  updateDoc,
  Timestamp,
  GeoPoint,
} from '@firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@firebase/storage';

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
  Preview,
  LabelIconContainer,
  Calendar,
  PopPlaceIcon,
  ButtonContainer,
  StyleBtnRipples,
  ImgUpload,
  SubmitBtn,
} from '../../common/popup/PopupUnits';

import ClendarPopup from './CalendarPopup';
import MapPopup from './MapPopup';
import AlertPopup from '../../common/AlertPopup';
import Loading from '../../common/Loading';
import { isFieldsChecked } from '../../../utils/validation';

const EditPopup = ({ showEdit, closeEditor, share }) => {
  const dispatch = useDispatch();
  const uploadRef = useRef();
  const fromToDateTime = useSelector((state) => state.fromToDateTime);
  const address = useSelector((state) => state.address);
  const latLng = useSelector((state) => state.latLng);
  const [showCalender, setShowCalendar] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [foodName, setFoodName] = useState(share.name);
  const [quantities, setQuantities] = useState(share.quantities);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoaging] = useState(false);

  const openCalendar = () => setShowCalendar(true);
  const closeCalendar = () => setShowCalendar(false);

  const openMap = () => setShowMap(true);
  const closeMap = () => setShowMap(false);

  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);

  const handleAddress = (payload) => {
    dispatch({ type: 'address/get', payload: payload });
  };

  const handleLatLng = (payload) => {
    dispatch({ type: 'latLng/get', payload: payload });
  };

  const handleSubmit = async () => {
    if (
      isFieldsChecked(
        foodName,
        quantities,
        fromToDateTime,
        address,
        file,
        setAlertMessage,
        openInfo
      )
    ) {
      setIsLoaging(true);
      const docRef = doc(getFirestore(), 'shares', share.id);
      const fileRef = ref(getStorage(), `images/shares/${share.id}`);
      const metadata = {
        contentType: file.type,
      };
      const uplaodTask = await uploadBytes(fileRef, file, metadata);
      const imageUrl = await getDownloadURL(uplaodTask.ref);
      await updateDoc(docRef, {
        exchangePlace: address,
        fromTimeStamp: Timestamp.fromDate(fromToDateTime[0]),
        toTimeStamp: Timestamp.fromDate(fromToDateTime[1]),
        imageUrl,
        quantities: Number(quantities),
        name: foodName,
        createdAt: Timestamp.fromDate(new Date()),
        exchangeLocation: new GeoPoint(latLng[0], latLng[1]),
      });
      setIsLoaging(false);
      closeEditor();
      handleLatLng([]);
      handleAddress('');
      setFile(null);
    }
  };

  const previewImgUrl = file
    ? URL.createObjectURL(file)
    : 'https://react.semantic-ui.com/images/wireframe/image.png';

  return (
    <>
      <DialogOverlay isOpen={showEdit} onDismiss={closeEditor}>
        <StyledDialogContent aria-label="popup">
          {isLoading && <Loading />}
          <PopClose onClick={closeEditor} disabled={isLoading} />
          <PopTitleContainer>
            <TitleIcon />
            <PopTitle>{share.name}</PopTitle>
          </PopTitleContainer>
          <PopContent>
            <PopRow>
              <FoodLabel>食物名稱</FoodLabel>
              <FoodName
                placeholder={`${share.name}`}
                onChange={(e) => setFoodName(e.target.value)}
              />
            </PopRow>
            <PopRow>
              <QuantityLabel>數量</QuantityLabel>
              <Quantity
                placeholder={`${share.quantities}`}
                onChange={(e) => setQuantities(e.target.value)}
              />
            </PopRow>
            <PopRow>
              <OriDateTimeLabel>原定時間及日期</OriDateTimeLabel>
              <OriDateTime>
                {`${share.fromTimeStamp.toDate().toLocaleString()} -
                  ${share.toTimeStamp.toDate().toLocaleString()}`}
              </OriDateTime>
            </PopRow>
            <PopRow>
              <LabelIconContainer>
                <DateTimeLabel>更改日期及時間</DateTimeLabel>
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
                <StyledPopPlaceIcon onClick={openMap} />
              </LabelIconContainer>
              <PopPlace>{address}</PopPlace>
            </PopRow>
            <PopRow></PopRow>
            <Preview src={previewImgUrl} />
            <ButtonContainer>
              <StyleBtnRipples color="#fff" during={3000}>
                <ImgUpload ref={uploadRef} htmlFor="image-upload">
                  上傳
                </ImgUpload>
              </StyleBtnRipples>
              <UploadBtn
                type="file"
                id="image-upload"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <StyleBtnRipples color="#fff" during={3000}>
                <SubmitBtn onClick={handleSubmit} disabled={isLoading}>
                  確認更新
                </SubmitBtn>
              </StyleBtnRipples>
            </ButtonContainer>
          </PopContent>
        </StyledDialogContent>
      </DialogOverlay>
      <ClendarPopup showCalender={showCalender} closeCalendar={closeCalendar} />
      <MapPopup
        showMap={showMap}
        closeMap={closeMap}
        handleAddress={handleAddress}
        handleLatLng={handleLatLng}
      />
      <AlertPopup
        showInfo={showInfo}
        closeInfo={closeInfo}
        message={alertMessage}
      />
    </>
  );
};

const FoodLabel = styled(StyledLabel)``;
const FoodName = styled(StyledInput)`
  flex-grow: 1;
`;
const QuantityLabel = styled(StyledLabel)``;
const Quantity = styled(StyledInput)``;
const OriDateTimeLabel = styled(StyledLabel)``;
const OriDateTime = styled(StyledSpan)``;
const DateTimeLabel = styled(StyledLabel)`
  margin-right: 10px;
`;
const DateTime = styled(StyledSpan)``;
const PopPlaceLabel = styled(StyledLabel)`
  margin-right: 10px;
`;
const PopPlace = styled(StyledSpan)``;

const StyledPopPlaceIcon = styled(PopPlaceIcon)`
  cursor: pointer;
`;

const UploadBtn = styled.input`
  display: none;
`;

export default EditPopup;
