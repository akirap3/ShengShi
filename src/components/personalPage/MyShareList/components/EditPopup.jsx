import { useRef, useState } from 'react';

import Ripples from 'react-ripples';
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
  Preview,
  LabelIconContainer,
  Calendar,
  PopPlaceIcon,
  ButtonContainer,
  ImgUpload,
  SubmitBtn,
} from '../../../common/popup/PopupUnits';
import ClendarPopup from './CalendarPopup';
import MapPopup from './MapPopup';
import AlertPopup from '../../../common/popup/AlertPopup';
import Loading from '../../../common/Loading';
import { isFieldsChecked } from '../../../../utils/validation';
import { onEditSubmit } from '../../../../utils/firebase';

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

  const openAlertWithMessage = (msg) => {
    setAlertMessage(msg);
    openInfo();
    return false;
  };

  const isOK = () => {
    return isFieldsChecked(
      foodName,
      quantities,
      fromToDateTime,
      address,
      file,
      openAlertWithMessage
    );
  };

  const handleReset = () => {
    setIsLoaging(false);
    closeEditor();
    handleLatLng([]);
    handleAddress('');
    setFile(null);
  };

  const handleEditSubmit = () => {
    const enable = isOK();
    if (enable) {
      const data = {
        share,
        file,
        address,
        fromToDateTime,
        quantities,
        foodName,
        latLng,
      };
      setIsLoaging(true);
      onEditSubmit(data).then(() => handleReset());
    }
  };

  const previewImgUrl = file ? URL.createObjectURL(file) : share.imageUrl;

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
              <StyledLabel>食物名稱</StyledLabel>
              <FoodName
                placeholder={`${share.name}`}
                onChange={(e) => setFoodName(e.target.value)}
              />
            </PopRow>
            <PopRow>
              <StyledLabel>數量</StyledLabel>
              <StyledInput
                placeholder={`${share.quantities}`}
                onChange={(e) => setQuantities(e.target.value)}
              />
            </PopRow>
            <PopRow>
              <StyledLabel>原定時間及日期</StyledLabel>
              <StyledSpan>
                {`${share.fromTimeStamp.toDate().toLocaleString()} -
                  ${share.toTimeStamp.toDate().toLocaleString()}`}
              </StyledSpan>
            </PopRow>
            <PopRow>
              <LabelIconContainer>
                <DateTimeLabel>更改日期及時間</DateTimeLabel>
                <Calendar onClick={openCalendar} />
              </LabelIconContainer>
              <StyledSpan>
                {fromToDateTime
                  ? `${fromToDateTime[0].toLocaleString()} - ${fromToDateTime[1].toLocaleString()}`
                  : ''}
              </StyledSpan>
            </PopRow>
            <PopRow>
              <LabelIconContainer>
                <PopPlaceLabel>地點</PopPlaceLabel>
                <StyledPopPlaceIcon onClick={openMap} />
              </LabelIconContainer>
              <StyledSpan>{address}</StyledSpan>
            </PopRow>
            <PopRow></PopRow>
            <Preview src={previewImgUrl} />
            <ButtonContainer>
              <Ripples color="#fff" during={3000}>
                <ImgUpload ref={uploadRef} htmlFor="image-upload">
                  上傳
                </ImgUpload>
              </Ripples>
              <UploadBtn
                type="file"
                id="image-upload"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <Ripples color="#fff" during={3000}>
                <SubmitBtn onClick={handleEditSubmit} disabled={isLoading}>
                  確認更新
                </SubmitBtn>
              </Ripples>
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

const FoodName = styled(StyledInput)`
  flex-grow: 1;
`;

const DateTimeLabel = styled(StyledLabel)`
  margin-right: 10px;
`;

const PopPlaceLabel = styled(StyledLabel)`
  margin-right: 10px;
`;

const StyledPopPlaceIcon = styled(PopPlaceIcon)`
  cursor: pointer;
`;

const UploadBtn = styled.input`
  display: none;
`;

export default EditPopup;
