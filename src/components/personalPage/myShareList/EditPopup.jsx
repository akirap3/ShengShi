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

import { DialogOverlay, DialogContent } from '@reach/dialog';

import ClendarPopup from './CalendarPopup';
import MapPopup from './MapPopup';
import Loading from '../../common/Loading';
import { isFieldsChecked } from '../../../utils/validation';

import SaladImg from '../../../images/common/salad.svg';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiLocationMarker } from 'react-icons/hi';
import { BsCalendarCheckFill } from 'react-icons/bs';

const EditPopup = ({ showEdit, closeEditor, share }) => {
  const dispatch = useDispatch();
  const uploadRef = useRef();
  const fromToDateTime = useSelector((state) => state.fromToDateTime);
  const address = useSelector((state) => state.address);
  const latLng = useSelector((state) => state.latLng);
  const [showCalender, setShowCalendar] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [foodName, setFoodName] = useState(share.name);
  const [quantities, setQuantities] = useState(share.quantities);
  const [file, setFile] = useState(null);
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

  const handleSubmit = async () => {
    if (isFieldsChecked(foodName, quantities, address, file)) {
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
            <SaladIcon src={SaladImg} />
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
              <DateTimeContainer>
                <DateTimeLabel>日期及時間</DateTimeLabel>
                <Calendar onClick={openCalendar} />
              </DateTimeContainer>
              <DateTime>
                {fromToDateTime
                  ? `${fromToDateTime[0].toLocaleString()} - ${fromToDateTime[1].toLocaleString()}`
                  : ''}
              </DateTime>
            </PopRow>
            <PopRow>
              <PlaceContainer>
                <PopPlaceLabel>地點</PopPlaceLabel>
                <PopPlaceIcon onClick={openMap} />
              </PlaceContainer>
              <PopPlace>{address}</PopPlace>
            </PopRow>
            <PopRow></PopRow>
            <PreviewOutline>
              <PreviewImg src={previewImgUrl} />
            </PreviewOutline>
            <ButtonContainer>
              <ImgUpload ref={uploadRef} htmlFor="image-upload">
                上傳
              </ImgUpload>
              <UploadBtn
                type="file"
                id="image-upload"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <SubmitBtn onClick={handleSubmit} disabled={isLoading}>
                確認更新
              </SubmitBtn>
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
    </>
  );
};

const StyledDialogContent = styled(DialogContent)`
  position: relative;
  width: 80vw;
  max-width: 800px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 10px;
`;

const PopClose = styled(AiFillCloseCircle)`
  fill: #1e88e582;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 22px;
  height: 22px;
`;

const PopTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #52b788;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;

const SaladIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const PopTitle = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  color: white;
`;

const PopContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const PopRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const StyledLabel = styled.label`
  background-color: #52b788aa;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;

const FoodLabel = styled(StyledLabel)``;

const StyledInput = styled.input`
  flex-grow: 1;
  border: none;
  background: none;
  outline: none;
  border-bottom: 2px solid #d9d7d7;
  padding: 5px 8px;
  margin-left: 10px;
  margin-top: 10px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 14px;
`;

const FoodName = styled(StyledInput)`
  flex-grow: 1;
`;

const QuantityLabel = styled(StyledLabel)``;

const Quantity = styled(StyledInput)``;

const DateTimeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DateTimeLabel = styled(StyledLabel)`
  margin-right: 10px;
`;

const StyledSpan = styled.span`
  flex-grow: 1;
  border: none;
  background: none;
  outline: none;
  border-bottom: 2px solid #d9d7d7;
  padding: 5px 8px;
  margin-left: 10px;
  margin-top: 10px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 14px;
  line-height: 24px;
`;

const DateTime = styled(StyledSpan)``;

const Calendar = styled(BsCalendarCheckFill)`
  width: 22px;
  height: 22px;
  fill: lightseagreen;
  cursor: pointer;
`;

const PlaceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PopPlaceLabel = styled(StyledLabel)`
  margin-right: 10px;
`;

const PopPlace = styled(StyledSpan)``;

const PopPlaceIcon = styled(HiLocationMarker)`
  width: 22px;
  height: 22px;
  fill: lightseagreen;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ImgUpload = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  background-color: lightskyblue;
  color: white;
`;

const UploadBtn = styled.input`
  display: none;
`;

const PreviewOutline = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewImg = styled.img`
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
`;

const SubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  background-color: #1e88e5;
  color: white;
`;

export default EditPopup;
