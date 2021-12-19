import { useRef, useState, useEffect } from 'react';

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Compressor from 'compressorjs';
import { DialogOverlay } from '@reach/dialog';

import Loading from '../../../common/Loading.jsx';
import { isFieldsChecked } from '../../../../utils/validation.js';
import useCurrentUser from '../../../../hooks/useCurrentUser.js';
import {
  getListenedSingleContent,
  onAddShareSubmit,
} from '../../../../utils/firebase';
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
} from '../../../common/popup/PopupUnits.jsx';
import CalendarPopup from '../../MyShareList/components/CalendarPopup';
import MapPopup from '../../MyShareList/components/MapPopup.jsx';
import AlertPopup from '../../../common/popup/AlertPopup.jsx';

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

  useEffect(() => {
    if (currentUser)
      return getListenedSingleContent('users', currentUser?.uid, setUserData);
  }, [currentUser]);

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
    setIsLoading(false);
    closeEditor();
    handleLatLng([]);
    handleAddress('');
    handleFromToDateTime();
    setFile(null);
  };

  const handleAddShareSubmit = () => {
    const enable = isOK();
    if (enable) {
      setIsLoading(true);
      const data = {
        file,
        address,
        fromToDateTime,
        quantities,
        foodName,
        currentUser,
        userData,
        latLng,
      };
      onAddShareSubmit(data).then(() => handleReset());
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
            <Preview src={previewImgUrl} alt="preview-upload" />
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
                <SubmitBtn onClick={handleAddShareSubmit} disabled={isLoading}>
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
