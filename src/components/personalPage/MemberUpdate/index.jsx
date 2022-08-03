import { useState, useEffect } from 'react';

import {
  BsFillEmojiLaughingFill,
  BsFillTelephoneFill,
  BsFillChatQuoteFill,
} from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { HiLocationMarker } from 'react-icons/hi';

import useCurrentUser from '../../../hooks/useCurrentUser';
import handleCompressFile from '../../../utils/compressImg';
import Loading from '../../common/Loading';
import DeletePopup from '../../common/popup/DeletePopup';
import AlertPopup from '../../common/popup/AlertPopup';
import {
  StyledIcon,
  StyledReadOnly,
  StyledInput,
} from '../../common/form/FormUnits';
import {
  FormContainer,
  FormContext,
  Row,
  NameIcon,
  AboutText,
  PreviewImg,
  ButtonContainer,
  UploadRipples,
  ImgUpload,
  UploadBtn,
  UpdateRipples,
  UpdateBtn,
  DelBtnRipples,
  DeleteBtn,
} from './style/Index.style';
import { getCurrentUserData, updateMember } from '../../../utils/firebase';

const MemberUpdate = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [alias, setAlias] = useState('');
  const [phone, setPhone] = useState('');
  const [myPlace, setMyPlace] = useState('');
  const [about, setAbout] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useCurrentUser();

  const previewImgUrl = file
    ? URL.createObjectURL(file)
    : 'https://react.semantic-ui.com/images/wireframe/image.png';

  const openDelete = () => setShowDelete(true);
  const closeDelete = () => setShowDelete(false);
  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);

  useEffect(() => {
    return getCurrentUserData(currentUser, setUserData);
  }, [currentUser]);

  const initialUserData = {
    displayName,
    alias,
    phone,
    myPlace,
    about,
  };

  const openAlertWithMessage = (msg) => {
    setAlertMessage(msg);
    openInfo();
    return false;
  };

  const checkFields = () => {
    const phonNumberRegex = /^\d{10}$/;
    if (!displayName) {
      return openAlertWithMessage('請輸入姓名');
    } else if (!alias) {
      return openAlertWithMessage('請輸入暱稱');
    } else if (!phonNumberRegex.test(phone)) {
      return openAlertWithMessage('請輸入10個數字的電話號碼');
    } else if (!myPlace) {
      return openAlertWithMessage('請輸入你的地點');
    } else if (!about) {
      return openAlertWithMessage('請描述關於你');
    } else if (!file) {
      return openAlertWithMessage('請上傳照片');
    }
    return true;
  };

  const resetUpdateField = () => {
    setIsLoading(false);
    setDisplayName('');
    setAlias('');
    setPhone('');
    setMyPlace('');
    setAbout('');
    setFile(null);
  };

  const handleUpdateMember = () => {
    const enableUpdate = checkFields();
    if (enableUpdate) {
      setIsLoading(true);
      updateMember(currentUser, file, initialUserData).then(() => {
        resetUpdateField();
      });
    }
  };

  return (
    <>
      <FormContainer>
        {userData && (
          <FormContext>
            {isLoading && <Loading />}
            <Row>
              <NameIcon />
              <StyledInput
                placeholder={userData.displayName}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </Row>
            <Row>
              <StyledIcon as={BsFillEmojiLaughingFill} />
              <StyledInput
                placeholder={userData?.alias}
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </Row>
            <Row>
              <StyledIcon as={MdEmail} />
              <StyledReadOnly placeholder={userData?.email} disabled />
            </Row>
            <Row>
              <StyledIcon as={BsFillTelephoneFill} />
              <StyledInput
                placeholder={userData?.phone || '請輸入電話'}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Row>
            <Row>
              <StyledIcon as={HiLocationMarker} />
              <StyledInput
                placeholder={userData?.myPlace || '請輸入地點'}
                value={myPlace}
                onChange={(e) => setMyPlace(e.target.value)}
              />
            </Row>
            <Row>
              <StyledIcon as={BsFillChatQuoteFill} />
              <AboutText
                placeholder={userData?.about || '請描述你自己'}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </Row>
            <PreviewImg src={previewImgUrl} alt="preview-avatar" />
            <ButtonContainer>
              <UploadRipples color="#fff" during={3000}>
                <ImgUpload htmlFor="image-upload">上 傳</ImgUpload>
              </UploadRipples>
              <UploadBtn
                type="file"
                id="image-upload"
                onChange={(e) => handleCompressFile(e, setFile)}
              />
              <UpdateRipples color="#fff" during={3000}>
                <UpdateBtn onClick={() => handleUpdateMember()}>
                  更 新
                </UpdateBtn>
              </UpdateRipples>
              <DelBtnRipples color="#fff" during={3000}>
                <DeleteBtn onClick={openDelete}>刪除會員</DeleteBtn>
              </DelBtnRipples>
            </ButtonContainer>
          </FormContext>
        )}
      </FormContainer>
      <DeletePopup
        showDelete={showDelete}
        closeDelete={closeDelete}
        category="會員"
        toDeleteMember={true}
      />
      <AlertPopup
        showInfo={showInfo}
        closeInfo={closeInfo}
        message={alertMessage}
      />
    </>
  );
};

export default MemberUpdate;
