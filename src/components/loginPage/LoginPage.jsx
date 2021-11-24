import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import Loading, { PaddingLoading } from '../common/Loading';
import { getAllContents } from '../../utils/firebase';

import * as validation from '../../utils/validation';
import * as firebase from '../../utils/firebase';
import {
  FormContainer,
  Title,
  FieldContainer,
  StyledIcon,
  StyledInput,
  ButtonContainer,
  NativeButton,
  StyledBtnIcon,
  FbIcon,
  FBButton,
  GoogleButton,
  Text,
  StyledLink,
} from '../common/form/FormUnits';
import Main from '../common/Main';
import LoginBackground from './LoginBackground';
import Background from '../common/Background';
import AlertPopup from '../common/AlertPopup';

import { IoLogoFacebook } from 'react-icons/io';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiLock2Fill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersDate] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);

  const getUsersData = useCallback(
    () => getAllContents('users', setUsersDate),
    []
  );

  useEffect(() => {
    return getUsersData();
  }, [getUsersData]);

  const hasPassword = () => {
    if (password) {
      return true;
    } else {
      setAlertMessage('請輸入密碼');
      openInfo();
      return false;
    }
  };

  const checkAndLogin = () => {
    if (
      validation.checkEmail(email, setAlertMessage, openInfo) &&
      hasPassword()
    ) {
      setIsLoading(true);
      firebase
        .login(email, password)
        .then(() => {
          setIsLoading(false);
          history.push('/personal/list');
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.code === 'auth/user-not-found') {
            setAlertMessage('您輸入的帳號不存在，請先註冊');
            openInfo();
            setEmail('');
            setPassword('');
          } else if (error.code === 'auth/wrong-password') {
            setAlertMessage('您輸入的密碼錯誤，請重新輸入密碼');
            openInfo();
            setPassword('');
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
          firebase.handleSignUpWithProvider(
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
        setAlertMessage(error.message);
        openInfo();
        setIsLoading(false);
      });
  };

  return (
    <>
      {usersData ? (
        <StyledMain>
          {isLoading && <Loading />}
          <LoginBackground />
          <Background
            circleBgColor={'linear-gradient(253deg, #0cc898, #1797d2, #864fe1)'}
          />
          <LoginContainer>
            <Title>Ｗelcome back</Title>
            <FieldContainer>
              <StyledIcon as={BsFillPersonFill} />
              <Field
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                disabled={isLoading}
              />
            </FieldContainer>
            <FieldContainer>
              <StyledIcon as={RiLock2Fill} />
              <Field
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                disabled={isLoading}
              />
            </FieldContainer>
            <ButtonContainer>
              <NativeButton
                onClick={() => checkAndLogin()}
                disabled={isLoading}
              >
                <span>確 認</span>
              </NativeButton>
              <FBButton
                onClick={() =>
                  handleClickProvider(
                    firebase.loginWithFB,
                    '?type=large',
                    setIsLoading,
                    history
                  )
                }
                disabled={isLoading}
              >
                <FbIcon as={IoLogoFacebook} />
                <span>FB</span>
              </FBButton>
              <GoogleButton
                onClick={() =>
                  handleClickProvider(
                    firebase.loginWithGoogle,
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
              還沒有建立帳號嗎？
              <StyledLink to="/signup">註冊</StyledLink>
            </Text>
          </LoginContainer>
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

const LoginContainer = styled(FormContainer)`
  width: 325px;
  margin: 100px auto;

  @media screen and (max-width: 700px) {
    margin: 50px auto;
  }
`;

const Field = styled(StyledInput)`
  width: 60%;
`;

export default LoginPage;
