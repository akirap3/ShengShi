import React, { useState } from 'react';
import styled from 'styled-components';

import * as validation from '../../utils/validation';
import * as firebase from '../../utils/firebase';
import Main from '../common/Main';

import { IoLogoFacebook } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkAndLogin = () => {
    if (validation.checkEmail(email)) firebase.login(email, password);
  };

  return (
    <StyledMain>
      <SignupContainer>
        <Title>登入</Title>
        <Field
          placeholder="請輸入電子郵件"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Field
          type="password"
          placeholder="請輸入密碼"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <ButtonContainer>
          <NativeButton onClick={() => checkAndLogin()}>確認</NativeButton>
          <FBButton onClick={() => firebase.loginWithFB()}>
            <FbIcon />
            <span>FB 登入</span>
          </FBButton>
          <GoogleButton onClick={() => firebase.loginWithGoogle()}>
            <GoogleIcon /> <span>Google 登入</span>
          </GoogleButton>
        </ButtonContainer>
      </SignupContainer>
    </StyledMain>
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
