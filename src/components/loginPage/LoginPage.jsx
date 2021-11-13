import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { getAllContents } from '../../utils/firebase';

import * as validation from '../../utils/validation';
import * as firebase from '../../utils/firebase';
import Main from '../common/Main';
import LoginBackground from './LoginBackground';
import LoginBg2 from './LoginBg2';

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
      alert('請輸入密碼');
      return false;
    }
  };

  const checkAndLogin = () => {
    if (validation.checkEmail(email) && hasPassword()) {
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
            alert('您輸入的帳號不存在，請先註冊');
            setEmail('');
            setPassword('');
          } else if (error.code === 'auth/wrong-password') {
            alert('您輸入的密碼錯誤，請重新輸入密碼');
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
        console.log(error.code);
        alert(error.message);
        setIsLoading(false);
      });
  };

  return usersData ? (
    <StyledMain>
      {isLoading && (
        <StyledLoading
          type={'spin'}
          color={'#2a9d8f'}
          height={'100px'}
          width={'100px'}
        />
      )}
      <LoginBackground />
      <LoginBg2 />
      <SignupContainer>
        <Title>Ｗelcome back</Title>
        <FiledContainer>
          <EmailIcon />
          <Field
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            disabled={isLoading}
          />
        </FiledContainer>
        <FiledContainer>
          <PasswordIcon />
          <Field
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            disabled={isLoading}
          />
        </FiledContainer>
        <ButtonContainer>
          <NativeButton onClick={() => checkAndLogin()} disabled={isLoading}>
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
            <FbIcon />
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
            <GoogleIcon /> <span>Google</span>
          </GoogleButton>
        </ButtonContainer>
      </SignupContainer>
    </StyledMain>
  ) : (
    <StyledLoading
      type={'spin'}
      color={'#2a9d8f'}
      height={'10vw'}
      width={'10vw'}
    />
  );
};

const StyledMain = styled(Main)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20vh auto;
  padding: 30px;
  border-radius: 10px;
  height: fit-content;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: rgba(219, 245, 255, 0.3);
  backdrop-filter: blur(5px);

  @media screen and (max-width: 700px) {
    margin: 8vh auto;
  }
`;

const StyledLoading = styled(ReactLoading)`
  display: flex;
  position: absolute;
  z-index: 10;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  text-align: center;
  margin-bottom: 40px;
  text-transform: uppercase;
  color: #2b2b2b;
`;

const FiledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
`;

const EmailIcon = styled(BsFillPersonFill)`
  fill: rgb(129, 129, 129);
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const PasswordIcon = styled(RiLock2Fill)`
  fill: rgb(129, 129, 129);
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Field = styled.input`
  width: 60%;
  border: none;
  background: none;
  outline: none;
  flex-grow: 1;
  border-bottom: 2px solid #d9d7d7;
  padding: 5px 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media screen and (max-width: 470px) {
    justify-content: space-between;
  }
`;

const Button = styled.div`
  border-radius: 5px;
  padding: 5px 15px;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const NativeButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  color: white;
  background-color: #1e88e5;

  @media screen and (max-width: 470px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const FBButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  border: 1px solid #d9d7d7;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  @media screen and (max-width: 470px) {
    width: 48%;
    font-size: 14px;
  }
`;

const GoogleButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #d9d7d7;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  @media screen and (max-width: 470px) {
    width: 48%;
    font-size: 14px;
  }
`;

const FbIcon = styled(IoLogoFacebook)`
  fill: rgb(35, 140, 241);
  height: 20px;
  width: 20px;
  margin-right: 5px;
`;

const GoogleIcon = styled(FcGoogle)`
  height: 20px;
  width: 20px;
  margin-right: 5px;
`;

export default LoginPage;
