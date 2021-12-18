import { useState } from 'react';

import styled from 'styled-components';

import { IoLogoFacebook } from 'react-icons/io';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiLock2Fill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';

import Main from '../common/Main';
import LoginBackground from './LoginBackground';
import Background from '../common/Background';
import AlertPopup from '../common/popup/AlertPopup';
import Loading, { PaddingLoading } from '../common/Loading';
import { checkEmail } from '../../utils/validation';
import { login, loginWithFB, loginWithGoogle } from '../../utils/firebase';
import useLoginSignupWithProvider from '../../hooks/useLoginSignupWithProvider';
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

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    openAlertWithMessage,
    alertMessage,
    showInfo,
    closeInfo,
    isLoading,
    setIsLoading,
    usersData,
    history,
    handleClickProvider,
  } = useLoginSignupWithProvider();

  const hasPassword = () => {
    if (password) {
      return true;
    } else {
      return openAlertWithMessage('請輸入密碼');
    }
  };

  const checkAndLogin = () => {
    if (checkEmail(email, openAlertWithMessage) && hasPassword()) {
      setIsLoading(true);
      login(email, password)
        .then(() => {
          setIsLoading(false);
          history.push('/personal/list');
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.code === 'auth/user-not-found') {
            openAlertWithMessage('您輸入的帳號不存在，請先註冊');
            setEmail('');
            setPassword('');
          } else if (error.code === 'auth/wrong-password') {
            openAlertWithMessage('您輸入的密碼錯誤，請重新輸入密碼');
            setPassword('');
          }
        });
    }
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
                onClick={() => handleClickProvider(loginWithFB, '?type=large')}
                disabled={isLoading}
              >
                <FbIcon as={IoLogoFacebook} />
                <span>FB</span>
              </FBButton>
              <GoogleButton
                onClick={() => handleClickProvider(loginWithGoogle, '')}
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
