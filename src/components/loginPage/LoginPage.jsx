import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { getAllContents } from '../../utils/firebase';

import * as validation from '../../utils/validation';
import * as firebase from '../../utils/firebase';
import Main from '../common/Main';

import { IoLogoFacebook } from 'react-icons/io';
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
          height={'10vw'}
          width={'10vw'}
        />
      )}
      <SignupContainer>
        <Title>登入</Title>
        <Field
          placeholder="請輸入電子郵件"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          disabled={isLoading}
        />
        <Field
          type="password"
          placeholder="請輸入密碼"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          disabled={isLoading}
        />
        <ButtonContainer>
          <NativeButton onClick={() => checkAndLogin()} disabled={isLoading}>
            確認
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
            <span>FB 登入</span>
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
            <GoogleIcon /> <span>Google 登入</span>
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
  margin: 8rem auto;
  padding: 4rem;
  border: 1px solid black;
  border-radius: 10px;
  @media screen and (max-width: 560px) {
    margin-right: 2rem;
    margin-left: 2rem;
    padding: 2rem;
  } ;
`;

const StyledLoading = styled(ReactLoading)`
  display: flex;
  position: absolute;
  z-index: 10;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const Field = styled.input`
  margin-bottom: 2rem;
  border-radius: 10px;
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
  border: 1px solid darkcyan;
  border-radius: 5px;
  padding: 0.5rem;
  cursor: pointer;
`;

const NativeButton = styled(Button)`
  text-align: center;
  margin-right: 5px;
  background-color: lightblue;
  @media screen and (max-width: 470px) {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

const FBButton = styled(Button)`
  text-align: center;
  margin-right: 5px;
  @media screen and (max-width: 470px) {
    width: 48%;
    font-size: 14px;
  }
`;

const GoogleButton = styled(Button)`
  text-align: center;
  @media screen and (max-width: 470px) {
    width: 48%;
    font-size: 14px;
  }
`;

const FbIcon = styled(IoLogoFacebook)``;

const GoogleIcon = styled(FcGoogle)``;

export default LoginPage;
