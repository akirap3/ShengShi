import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DeletePopup from '../../common/DeletePopup';
import AlertPopup from '../../common/AlertPopup';
import useCurrentUser from '../../../hooks/useCurrentUser';
import Loading from '../../common/Loading';
import Ripples from 'react-ripples';

import { getCurrentUserData } from '../../../utils/firebase';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import {
  BsFillPersonFill,
  BsFillEmojiLaughingFill,
  BsFillTelephoneFill,
  BsFillChatQuoteFill,
} from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { HiLocationMarker } from 'react-icons/hi';

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

  const checkFields = () => {
    const phonNumberRegex = /^\d{10}$/;
    if (!displayName) {
      setAlertMessage('請輸入姓名');
      openInfo();
      return false;
    } else if (!alias) {
      setAlertMessage('請輸入暱稱');
      openInfo();
      return false;
    } else if (!phonNumberRegex.test(phone)) {
      setAlertMessage('請輸入10個數字的電話號碼');
      openInfo();
      return false;
    } else if (!myPlace) {
      setAlertMessage('請輸入你的地點');
      openInfo();
      return false;
    } else if (!about) {
      setAlertMessage('請描述關於你');
      openInfo();
      return false;
    } else if (!file) {
      setAlertMessage('請上傳照片');
      openInfo();
      return false;
    }
    return true;
  };

  const handleUpdateMember = async () => {
    if (checkFields()) {
      setIsLoading(true);
      const docRef = doc(getFirestore(), 'users', currentUser.uid);
      const fileRef = ref(getStorage(), `images/users/${docRef.id}`);
      const metadata = {
        contentType: file.type,
      };
      const uplaodTask = await uploadBytes(fileRef, file, metadata);
      const imageUrl = await getDownloadURL(uplaodTask.ref);
      initialUserData.imageUrl = imageUrl || '';
      await updateDoc(docRef, initialUserData);
      setIsLoading(false);
      setDisplayName('');
      setAlias('');
      setPhone('');
      setMyPlace('');
      setAbout('');
      setFile(null);
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
              <UserName
                placeholder={userData.displayName}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </Row>
            <Row>
              <AliasIcon />
              <Alias
                placeholder={userData?.alias}
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </Row>
            <Row>
              <EmailIcon />
              <Email placeholder={userData?.email} disabled />
            </Row>
            <Row>
              <PhoneIcon />
              <Phone
                placeholder={userData?.phone || '請輸入電話'}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Row>
            <Row>
              <LocationIcon />
              <Place
                placeholder={userData?.myPlace || '請輸入地點'}
                value={myPlace}
                onChange={(e) => setMyPlace(e.target.value)}
              />
            </Row>
            <Row>
              <AboutIcon />
              <AboutText
                placeholder={userData?.about || '請描述你自己'}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </Row>
            <PreviewImg src={previewImgUrl} />
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

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
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

const StyledInput = styled.input`
  flex-grow: 1;
  border: none;
  background: none;
  outline: none;
  border-bottom: 2px solid #d9d7d7;
  padding: 5px 8px;
`;

const StyledReadOnly = styled.input`
  flex-grow: 1;
  border: none;
  background: none;
  outline: none;
  padding: 5px 8px;
`;

const NameIcon = styled(BsFillPersonFill)`
  fill: rgb(129, 129, 129);
  width: 20px;
  height: 20px;
  margin-right: 10px;
  @media screen and (max-width: 540px) {
    align-self: flex-start;
    margin-top: 10px;
  }
`;

const UserName = styled(StyledInput)``;

const AliasIcon = styled(BsFillEmojiLaughingFill)`
  fill: rgb(129, 129, 129);
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Alias = styled(StyledInput)``;

const EmailIcon = styled(MdEmail)`
  fill: rgb(129, 129, 129);
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Email = styled(StyledReadOnly)``;

const PhoneIcon = styled(BsFillTelephoneFill)`
  fill: rgb(129, 129, 129);
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Phone = styled(StyledInput)``;

const LocationIcon = styled(HiLocationMarker)`
  fill: rgb(129, 129, 129);
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Place = styled(StyledInput)``;

const AboutIcon = styled(BsFillChatQuoteFill)`
  fill: rgb(129, 129, 129);
  width: 20px;
  height: 20px;
  margin-right: 10px;
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

  @media screen and (max-width: 470px) {
    justify-content: space-between;
  }
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
  border-radius: 5px;
  padding: 0.5rem;
  cursor: pointer;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  color: white;
  background-color: #1e88e5;
`;

const UploadBtn = styled.input`
  display: none;
`;

const Button = styled.div`
  border: 1px solid darkcyan;
  border-radius: 5px;
  padding: 0.5rem;
  font-family: 'cwTeXYen', sans-serif;
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  border: 1px solid #d9d7d7;
  background: #52b788;
  color: white;
  backdrop-filter: blur(5px);
`;

const DelBtnRipples = styled(Ripples)`
  flex-grow: 1;
  border-radius: 5px;
  @media screen and (max-width: 470px) {
    width: 48%;
  }
`;

const DeleteBtn = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  border: 2px solid #d9d7d7;
  background: rgba(255, 255, 255, 0.3);
  color: rgb(129, 129, 129);
`;

export default MemberUpdate;
