import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

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

import { AiFillCloseCircle } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';
import { BiCrown } from 'react-icons/bi';
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
      timestamp: Timestamp.fromDate(new Date()),
      exchangeLocation: new GeoPoint(latLng[0], latLng[1]),
    });
    setIsLoaging(false);
    closeEditor();
    handleLatLng([]);
    handleAddress('');
    setFile(null);
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
        >
          <PopClose onClick={closeEditor} />
          <PopTitleContainer>
            <CrownIcon />
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
              <DateTimeLabel>日期及時間</DateTimeLabel>
              <DateTime>{`${fromToDateTime[0].toLocaleString()} - ${fromToDateTime[1].toLocaleString()}`}</DateTime>
              <Calendar onClick={openCalendar} />
            </PopRow>
            <PopRow>
              <PopPlaceLabel>地點</PopPlaceLabel>
              <PopPlace>{address}</PopPlace>
              <PopPlaceIcon onClick={openMap} />
            </PopRow>
            <PopRow>
              <FoodImgLabel>食物照片</FoodImgLabel>
              <ImgUpload ref={uploadRef} htmlFor="image-upload">
                上傳
              </ImgUpload>
              <UploadBtn
                type="file"
                id="image-upload"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </PopRow>
            <PreviewImg src={previewImgUrl} />
            <SubmitBtn onClick={handleSubmit}>確認更新</SubmitBtn>
          </PopContent>
        </DialogContent>
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

export default EditPopup;
