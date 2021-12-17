import { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Main from '../common/Main';
import LoginBackground from '../LoginPage/LoginBackground';
import Background from '../common/Background';
import Loading, { PaddingLoading } from '../common/Loading';
import AlertPopup from '../common/popup/AlertPopup';

import {
  FormContainer,
  Title,
  FieldContainer,
  StyledIcon,
  StyledInput,
  ButtonContainer,
  NativeButton,
  FBButton,
  GoogleButton,
  StyledBtnIcon,
  FbIcon,
  Text,
  StyledLink,
} from '../common/form/FormUnits';

import {
  register,
  handleSignUpWithEmail,
  handleSignUpWithProvider,
  loginWithFB,
  loginWithGoogle,
  getAllContents,
} from '../../utils/firebase';
import { Timestamp } from '@firebase/firestore';
import * as validation from '../../utils/validation';

import { IoLogoFacebook } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { BsFillPersonFill, BsFillEmojiLaughingFill } from 'react-icons/bs';
import { RiLock2Fill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { HiLocationMarker } from 'react-icons/hi';

const SignupPage = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [place, setPlace] = useState('');
  const [password, setPassword] = useState('');
  const [secPassword, setSecPassword] = useState('');
  const [usersData, setUsersDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);

  useEffect(() => {
    return getAllContents('users', setUsersDate);
  }, []);

  const initialUserData = {
    displayName: `${firstName}．${lastName}`,
    email: email,
    alias: alias,
    myPoints: 0,
    myPlace: place,
    createdAt: Timestamp.now(),
  };

  const openAlertWithMessage = (msg) => {
    setAlertMessage(msg);
    openInfo();
    return false;
  };

  const checkNames = () => {
    const regex = /[a-zA-Z0-9]+/;
    if (!regex.test(firstName) || !regex.test(lastName)) {
      return openAlertWithMessage('您的名字資料格式不符');
    }
    return true;
  };

  const checkPassword = () => {
    if (!password && !secPassword) {
      return openAlertWithMessage('請輸入密碼');
    } else if (password !== secPassword) {
      return openAlertWithMessage('密碼不相符');
    }
    return true;
  };

  const checkAlias = () => {
    if (alias === '') {
      return openAlertWithMessage('請輸入暱稱');
    }
    return true;
  };

  const checkPlace = () => {
    if (place === '') {
      return openAlertWithMessage('請輸入地點');
    }
    return true;
  };

  const checkSignup = (initialUserData) => {
    if (
      checkNames() &&
      checkAlias() &&
      checkPlace() &&
      validation.checkEmail(email, openAlertWithMessage) &&
      checkPassword()
    ) {
      setIsLoading(true);
      register(email, password)
        .then((userCredential) => {
          handleSignUpWithEmail(initialUserData, userCredential.user.uid);
          openAlertWithMessage(`您使用 ${email} 註冊`);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.code === 'auth/weak-password') {
            openAlertWithMessage('密碼長度需要至少六個字元');
            setPassword('');
            setSecPassword('');
          } else if (error.code === 'auth/email-already-in-use') {
            openAlertWithMessage(
              '此信箱已經註冊過，請您使用信箱或是 FB 及 Google 登入'
            );
            history.push('/login');
          }
        });
    }
  };

  const hasSignedUP = (usersData, uid) => {
    const userIds = usersData.map((user) => user.id);
    if (userIds.includes(uid)) return true;
    return false;
  };

  const handleClickProvider = (
    loginWithProvider,
    imageSize,
    setIsLoading,
    history
  ) => {
    setIsLoading(true);
    loginWithProvider()
      .then((result) => {
        const { displayName, photoURL, email, uid } = result.user;
        if (!hasSignedUP(usersData, uid)) {
          handleSignUpWithProvider(
            displayName,
            email,
            uid,
            photoURL,
            imageSize,
            setIsLoading,
            history
          );
        } else {
          setIsLoading(false);
          history.push('/personal/list');
        }
      })
      .catch((error) => {
        openAlertWithMessage(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {usersData ? (
        <StyledMain>
          {isLoading && <Loading />}
          <LoginBackground />
          <Background circleBgColor={'rgba(183, 228, 199, 0.5)'} />
          <SignupContainer>
            <Title>Sign Up</Title>
            <StyledFieldContainer>
              <NameIcon as={BsFillPersonFill} />
              <NameFiled
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                disabled={isLoading}
              />
              <LastNameField
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                disabled={isLoading}
              />
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledIcon as={BsFillEmojiLaughingFill} />
              <StyledInput
                placeholder="Alias"
                value={alias}
                onChange={(e) => {
                  setAlias(e.target.value);
                }}
                disabled={isLoading}
              />
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledIcon as={HiLocationMarker} />
              <StyledInput
                placeholder="Location"
                value={place}
                onChange={(e) => {
                  setPlace(e.target.value);
                }}
                disabled={isLoading}
              />
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledIcon as={MdEmail} />
              <StyledInput
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                disabled={isLoading}
              />
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledIcon as={RiLock2Fill} />
              <StyledInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                disabled={isLoading}
              />
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledIcon as={RiLock2Fill} />
              <StyledInput
                type="password"
                placeholder="Re-enter Password"
                value={secPassword}
                onChange={(e) => {
                  setSecPassword(e.target.value);
                }}
                disabled={isLoading}
              />
            </StyledFieldContainer>
            <ButtonContainer>
              <NativeButton
                onClick={() => checkSignup(initialUserData)}
                disabled={isLoading}
              >
                確 認
              </NativeButton>
              <FBButton
                onClick={() =>
                  handleClickProvider(
                    loginWithFB,
                    '?type=large',
                    setIsLoading,
                    history
                  )
                }
                disabled={isLoading}
              >
                <FbIcon as={IoLogoFacebook} /> <span>FB </span>
              </FBButton>
              <GoogleButton
                onClick={() =>
                  handleClickProvider(
                    loginWithGoogle,
                    '',
                    setIsLoading,
                    history
                  )
                }
                disabled={isLoading}
              >
                <StyledBtnIcon as={FcGoogle} /> <span>Google</span>
              </GoogleButton>
            </ButtonContainer>
            <Text>
              您已經有帳號了嗎？
              <StyledLink to="/login">登入</StyledLink>
            </Text>
          </SignupContainer>
        </StyledMain>
      ) : (
        <PaddingLoading>
          <Loading />
        </PaddingLoading>
      )}
      <AlertPopup
        showInfo={showInfo}
        closeInfo={closeInfo}
        message={alertMessage}
      />
    </>
  );
};

const StyledMain = styled(Main)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupContainer = styled(FormContainer)`
  margin: 50px auto 50px auto;

  @media screen and (max-width: 560px) {
    margin-right: 2rem;
    margin-left: 2rem;
    padding: 2rem;
  } ;
`;

const StyledFieldContainer = styled(FieldContainer)`
  flex-wrap: wrap;
`;

const NameIcon = styled(StyledIcon)`
  @media screen and (max-width: 540px) {
    align-self: flex-start;
    margin-top: 10px;
  }
`;

const NameFiled = styled(StyledInput)`
  flex-grow: 1;
  margin-right: 0.5rem;
  @media screen and (max-width: 540px) {
    margin-right: 0;
    margin-bottom: 35px;
  }
`;

const LastNameField = styled(StyledInput)`
  flex-grow: 1;
  @media screen and (max-width: 540px) {
    margin-left: 30px;
  }
`;

export default SignupPage;
