import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DeletePopup from '../../common/DeletePopup';
import useCurrentUser from '../../../hooks/useCurrentUser';
import Loading from '../../common/Loading';

import { getCurrentUserData } from '../../../utils/firebase';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const MemberUpdate = () => {
  const uploadRef = useRef();
  const [showDelete, setShowDelete] = useState(false);
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

  const getUserData = useCallback(
    () => getCurrentUserData(currentUser, setUserData),
    [currentUser]
  );

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const initialUserData = {
    displayName,
    alias,
    phone,
    myPlace,
    about,
  };

  const checkFields = () => {
    if (!displayName) {
      alert('請輸入姓名');
      return false;
    } else if (!alias) {
      alert('請輸入暱稱');
      return false;
    } else if (!file) {
      alert('請上傳照片');
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
            {isLoading && (
              <Loading
                type={'spin'}
                color={'#2a9d8f'}
                height={'10vw'}
                width={'10vw'}
              />
            )}
            <Row>
              <UserNameLabel>姓名</UserNameLabel>
              <UserName
                placeholder={userData.displayName}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </Row>
            <Row>
              <AliasLabel>暱稱</AliasLabel>
              <Alias
                placeholder={userData?.alias}
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </Row>
            <Row>
              <EmailLabel>電子郵件</EmailLabel>
              <Email placeholder={userData?.email} disabled />
            </Row>
            <Row>
              <PhoneLabel>電話</PhoneLabel>
              <Phone
                placeholder={userData?.phone || '請輸入電話'}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Row>
            <Row>
              <PlaceLabel>我的地點</PlaceLabel>
              <Place
                placeholder={userData?.myPlace || '請輸入地點'}
                value={myPlace}
                onChange={(e) => setMyPlace(e.target.value)}
              />
            </Row>
            <Row>
              <AboutLabel>關於你</AboutLabel>
              <AboutText
                placeholder={userData?.about || '請描述你自己'}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </Row>
            <Row>
              <ImgLabel>我的頭像</ImgLabel>
              <ImgUpload ref={uploadRef} htmlFor="image-upload">
                上傳
              </ImgUpload>
              <UploadBtn
                type="file"
                id="image-upload"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Row>
            <PreviewImg src={previewImgUrl} />
            <Row>
              <UpdateBtn onClick={() => handleUpdateMember()}>更新</UpdateBtn>
              <DeleteBtn onClick={openDelete}>刪除會員</DeleteBtn>
            </Row>
          </FormContext>
        )}
      </FormContainer>
      <DeletePopup
        showDelete={showDelete}
        closeDelete={closeDelete}
        category="會員"
        toDeleteMember={true}
      />
    </>
  );
};

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContext = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  margin: 2vw auto;
  padding: 5vw 10vw;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2vw;
`;

const StyledLabel = styled.label`
  width: 8vw;
`;

const StyledInput = styled.input`
  border-radius: 5px;
`;
const UserNameLabel = styled(StyledLabel)``;

const UserName = styled(StyledInput)``;

const AliasLabel = styled(StyledLabel)``;

const Alias = styled(StyledInput)``;

const EmailLabel = styled(StyledLabel)``;

const Email = styled(StyledInput)``;

const PhoneLabel = styled(StyledLabel)``;

const Phone = styled(StyledInput)``;

const PlaceLabel = styled(StyledLabel)``;

const Place = styled(StyledInput)``;

const AboutLabel = styled(StyledLabel)``;

const AboutText = styled.textarea`
  border-radius: 5px;
  height: 20vh;
`;

const ImgLabel = styled(StyledLabel)``;

const ImgUpload = styled.label`
  width: 100%;
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
  width: 50%;
  border-radius: 10px;
  margin-bottom: 2vw;
`;

const UpdateBtn = styled.button`
  padding: 1vw;
  position: relative;
  width: 20vw;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #00b4cc;
  color: white;
  flex-grow: 1;
  margin-right: 1vw;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  padding: 1vw;
  width: 20vw;
  border: 1px solid black;
  border-radius: 5px;
  background-color: orangered;
  color: white;
  flex-grow: 1;
  cursor: pointer;
`;

export default MemberUpdate;
