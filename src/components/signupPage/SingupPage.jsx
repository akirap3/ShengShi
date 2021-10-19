import React from 'react';
import styled from 'styled-components';
import { layoutConfig } from '../../utils/commonVariables';

import { IoLogoFacebook } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';

const SignupPage = () => {
  return (
    <Main>
      <SignupContainer>
        <Title>註冊</Title>
        <NameContainer>
          <NameFiled placeholder="請輸入您的名" />
          <LastNameField placeholder="請輸入您的姓" />
        </NameContainer>
        <Field placeholder="請輸入電子郵件" />
        <Field placeholder="請輸入密碼" />
        <Field placeholder="請再次輸入密碼" />
        <ButtonContainer>
          <NativeButton>確認</NativeButton>
          <FBButton>
            <FbIcon /> <span>FB 登入</span>
          </FBButton>
          <GoogleButton>
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
  text-align: center;
  width: 30%;
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

export default SignupPage;
