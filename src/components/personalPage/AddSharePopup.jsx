import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Loading from '../common/Loading.jsx';
import Compressor from 'compressorjs';
import { isFieldsChecked } from '../../utils/validation.js';
import useCurrentUser from '../../hooks/useCurrentUser.js';
import {
  getListenedSingleContent,
  handleAddShareSubmit,
} from '../../utils/firebase';

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
  StyleBtnRipples,
  ImgUpload,
  SubmitBtn,
} from '../common/popup/PopupUnits.jsx';

import CalendarPopup from './myShareList/CalendarPopup';
import MapPopup from './myShareList/MapPopup.jsx';
import AlertPopup from '../common/AlertPopup.jsx';

const AddSharePopup = ({ showEdit, closeEditor }) => {
  const dispatch = useDispatch();
  const uploadRef = useRef();
  const currentUser = useCurrentUser();
  const fromToDateTime = useSelector((state) => state.fromToDateTime);
  const address = useSelector((state) => state.address);
  const latLng = useSelector((state) => state.latLng);
  const [showCalender, setShowCalendar] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [foodName, setFoodName] = useState('');
  const [quantities, setQuantities] = useState(1);
  const [file, setFile] = useState(null);
  const [userData, setUserData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleFromToDateTime = () => {
    dispatch({ type: 'fromToDateTime/default' });
  };

  const getListenedUserData = useCallback(() => {
    return getListenedSingleContent('users', currentUser?.uid, setUserData);
  }, [currentUser?.uid]);

  useEffect(() => {
    if (currentUser) return getListenedUserData();
  }, [currentUser, getListenedUserData]);

  const handleCompressFile = (e) => {
    const image = e.target.files[0];
    if (image)
      new Compressor(image, {
        quality: 0.2,
        convertSize: 1000000,
        success: (res) => {
          setFile(res);
        },
      });
  };

  const isOK = () => {
    return isFieldsChecked(
      foodName,
      quantities,
      fromToDateTime,
      address,
      file,
      setAlertMessage,
      openInfo
    );
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
              <StyledLabel>食物名稱</StyledLabel>
              <StyledInput onChange={(e) => setFoodName(e.target.value)} />
            </PopRow>
            <PopRow>
              <StyledLabel>數量</StyledLabel>
              <StyledInput onChange={(e) => setQuantities(e.target.value)} />
            </PopRow>
            <PopRow>
              <LabelIconContainer>
                <DateTimeLabel>日期及時間</DateTimeLabel>
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
            <PopRow>
              <StyledLabel>食物照片</StyledLabel>
            </PopRow>
            <Preview src={previewImgUrl} />
            <ButtonContainer>
              <StyleBtnRipples color="#fff" during={3000}>
                <ImgUpload
                  ref={uploadRef}
                  htmlFor="image-upload"
                  disabled={isLoading}
                >
                  上傳
                </ImgUpload>
              </StyleBtnRipples>
              <UploadBtn
                type="file"
                id="image-upload"
                onChange={(e) => handleCompressFile(e)}
                disabled={isLoading}
              />
              <StyleBtnRipples color="#fff" during={3000}>
                <SubmitBtn
                  onClick={() =>
                    handleAddShareSubmit(
                      isOK,
                      setIsLoading,
                      file,
                      address,
                      fromToDateTime,
                      quantities,
                      foodName,
                      currentUser,
                      userData,
                      latLng,
                      closeEditor,
                      handleLatLng,
                      handleAddress,
                      handleFromToDateTime,
                      setFile
                    )
                  }
                  disabled={isLoading}
                >
                  分享
                </SubmitBtn>
              </StyleBtnRipples>
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
      <AlertPopup
        showInfo={showInfo}
        closeInfo={closeInfo}
        message={alertMessage}
      />
    </>
  );
};

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

export default AddSharePopup;
