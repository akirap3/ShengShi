import { useState } from 'react';

import LoginBackground from '../LoginPage/LoginBackground';
import Background from '../common/Background';
import Loading, { PaddingLoading } from '../common/Loading';
import AlertPopup from '../common/popup/AlertPopup';
import SignupFiled from './components/SignupField';

import {
  Title,
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
  StyledMain,
  SignupContainer,
  StyledFieldContainer,
  NameIcon,
  NameFiled,
  LastNameField,
} from './style/Index.style';

import {
  register,
  handleSignUpWithEmail,
  loginWithFB,
  loginWithGoogle,
} from '../../utils/firebase';
import useLoginSignupWithProvider from '../../hooks/useLoginSignupWithProvider';
import { Timestamp } from '@firebase/firestore';
import * as validation from '../../utils/validation';

import { IoLogoFacebook } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { BsFillPersonFill, BsFillEmojiLaughingFill } from 'react-icons/bs';
import { RiLock2Fill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { HiLocationMarker } from 'react-icons/hi';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [place, setPlace] = useState('');
  const [password, setPassword] = useState('');
  const [secPassword, setSecPassword] = useState('');
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

  const initialUserData = {
    displayName: `${firstName}．${lastName}`,
    email: email,
    alias: alias,
    myPoints: 0,
    myPlace: place,
    createdAt: Timestamp.now(),
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
            <SignupFiled
              icon={BsFillEmojiLaughingFill}
              hint="Alias"
              fieldValue={alias}
              setFn={setAlias}
              isLoading={isLoading}
            />
            <SignupFiled
              icon={HiLocationMarker}
              hint="Location"
              fieldValue={place}
              setFn={setPlace}
              isLoading={isLoading}
            />
            <SignupFiled
              icon={MdEmail}
              hint="Email"
              fieldValue={email}
              setFn={setEmail}
              isLoading={isLoading}
            />
            <SignupFiled
              icon={RiLock2Fill}
              hint="Password"
              fieldValue={password}
              fieldType="password"
              setFn={setPassword}
              isLoading={isLoading}
            />
            <SignupFiled
              icon={RiLock2Fill}
              hint="Re-enter Password"
              fieldValue={secPassword}
              fieldType="password"
              setFn={setSecPassword}
              isLoading={isLoading}
            />
            <ButtonContainer>
              <NativeButton
                onClick={() => checkSignup(initialUserData)}
                disabled={isLoading}
              >
                確 認
              </NativeButton>
              <FBButton
                onClick={() => handleClickProvider(loginWithFB, '?type=large')}
                disabled={isLoading}
              >
                <FbIcon as={IoLogoFacebook} /> <span>FB </span>
              </FBButton>
              <GoogleButton
                onClick={() => handleClickProvider(loginWithGoogle, '')}
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

export default SignupPage;
