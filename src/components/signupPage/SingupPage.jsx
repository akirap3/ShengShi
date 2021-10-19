import React, { useState } from 'react';
import styled from 'styled-components';

import * as validation from '../../utils/validation';
import * as firebase from '../../utils/firebase';
import { layoutConfig } from '../../utils/commonVariables';

import { IoLogoFacebook } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secPassword, setSecPassword] = useState('');

  const checkNames = () => {
    const regex = /[a-zA-Z0-9]+/;
    if (!regex.test(firstName) || !regex.test(lastName)) {
      alert('您的名字資料格式不符');
      return false;
    }
    return true;
  };

  const checkPassword = () => {
    if (!password && !secPassword) {
      alert('請輸入密碼');
      return false;
    } else if (password !== secPassword) {
      alert('密碼不相符');
      return false;
    }
    return true;
  };

  const checkSignup = () => {
    if (checkNames() && validation.checkEmail(email) && checkPassword())
      firebase.register(email, password);
  };

  return (
    <Main>
      <SignupContainer>
        <Title>註冊</Title>
        <NameContainer>
          <NameFiled
            placeholder="請輸入您的名"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <LastNameField
            placeholder="請輸入您的姓"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </NameContainer>
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
        <Field
          type="password"
          placeholder="請再次輸入密碼"
          onChange={(e) => {
            setSecPassword(e.target.value);
          }}
        />
        <ButtonContainer>
          <NativeButton onClick={() => checkSignup()}>確認</NativeButton>
          <FBButton onClick={() => firebase.loginWithFB()}>
            <FbIcon /> <span>FB 登入</span>
          </FBButton>
          <GoogleButton onClick={() => firebase.loginWithGoogle()}>
            <GoogleIcon /> <span>Google 登入</span>
          </GoogleButton>
        </ButtonContainer>
      </SignupContainer>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: ${layoutConfig.navHeight};
  /* background-color: #c4c4c4; */
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

const NameContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Field = styled.input`
  margin-bottom: 2rem;
  border-radius: 10px;
`;

const NameFiled = styled(Field)`
  flex-grow: 1;
  margin-right: 0.5rem;
`;

const LastNameField = styled(Field)`
  flex-grow: 1;
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
  width: 30%;
  background-color: lightblue;
  @media screen and (max-width: 470px) {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

const FBButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 30%;
  @media screen and (max-width: 470px) {
    width: 48%;
    font-size: 14px;
  }
  @media screen and (max-width: 370px) {
    flex-direction: column;
    width: 48%;
    font-size: 12px;
  }
`;

const GoogleButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media screen and (max-width: 470px) {
    width: 48%;
    font-size: 14px;
  }
  @media screen and (max-width: 370px) {
    flex-direction: column;
    width: 48%;
    font-size: 12px;
  }
`;

const FbIcon = styled(IoLogoFacebook)``;

const GoogleIcon = styled(FcGoogle)``;

export default SignupPage;
