import { useState, useCallback, useEffect, useRef } from 'react';

import styled from 'styled-components';
import Ripples from 'react-ripples';
import {
  BsFillPersonFill,
  BsFillEmojiLaughingFill,
  BsFillTelephoneFill,
  BsFillChatQuoteFill,
} from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { HiLocationMarker } from 'react-icons/hi';

import useCurrentUser from '../../../hooks/useCurrentUser';
import Loading from '../../common/Loading';
import DeletePopup from '../../common/DeletePopup';
import AlertPopup from '../../common/AlertPopup';
import {
  StyledIcon,
  StyledReadOnly,
  StyledInput,
} from '../../common/form/FormUnits';
import {
  getCurrentUserData,
  handleUpdateMember,
} from '../../../utils/firebase';

const MemberUpdate = () => {
  const uploadRef = useRef();
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

  const getUserData = useCallback(
    () => getCurrentUserData(currentUser, setUserData),
    [currentUser]
  );

  useEffect(() => {
    return getUserData();
  }, [getUserData]);

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
                <ImgUpload ref={uploadRef} htmlFor="image-upload">
                  上 傳
                </ImgUpload>
              </UploadRipples>
              <UploadBtn
                type="file"
                id="image-upload"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <UpdateRipples color="#fff" during={3000}>
                <UpdateBtn
                  onClick={() =>
                    handleUpdateMember(
                      checkFields,
                      setIsLoading,
                      currentUser,
                      file,
                      initialUserData,
                      setDisplayName,
                      setAlias,
                      setPhone,
                      setMyPlace,
                      setAbout,
                      setFile
                    )
                  }
                >
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

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  font-family: 'cwTeXYen', sans-serif;
`;

const FormContext = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 5vh auto;
  padding: 30px;
  border-radius: 10px;
  height: fit-content;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: rgba(219, 245, 255, 0.3);

  @media screen and (max-width: 560px) {
    margin-right: 2rem;
    margin-left: 2rem;
    padding: 2rem;
  } ;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 35px;
`;

const NameIcon = styled(BsFillPersonFill)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  fill: rgb(129, 129, 129);

  @media screen and (max-width: 540px) {
    align-self: flex-start;
    margin-top: 10px;
  }
`;

const AboutText = styled.textarea`
  flex-grow: 1;
  border: none;
  background: none;
  outline: none;
  border-bottom: 2px solid #d9d7d7;
  padding: 5px 8px;
`;

const PreviewImg = styled.img`
  width: 250px;
  border-radius: 10px;
  margin-bottom: 2vw;

  @media screen and (min-width: 600px) {
    width: 350px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const UploadRipples = styled(Ripples)`
  flex-grow: 1;
  margin-right: 5px;
  border-radius: 5px;

  @media screen and (max-width: 470px) {
    width: 100%;
    margin-bottom: 0.5rem;
    margin-right: 0;
  }
`;

const ImgUpload = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 0.5rem;
  background-color: #1e88e5;
  border-radius: 5px;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;

const UploadBtn = styled.input`
  display: none;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  border: 1px solid #d9d7d7;
  padding: 0.5rem;
  border: 1px solid darkcyan;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const UpdateRipples = styled(Ripples)`
  flex-grow: 1;
  margin-right: 5px;
  border-radius: 5px;

  @media screen and (max-width: 470px) {
    width: 48%;
  }
`;

const UpdateBtn = styled(Button)`
  background: #52b788;
  backdrop-filter: blur(5px);
  font-size: 16px;
  color: white;
`;

const DelBtnRipples = styled(Ripples)`
  flex-grow: 1;
  border-radius: 5px;
  @media screen and (max-width: 470px) {
    width: 48%;
  }
`;

const DeleteBtn = styled(Button)`
  background: rgba(255, 255, 255, 0.3);
  color: rgb(129, 129, 129);
`;

export default MemberUpdate;
