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
import { useTranslation } from '../../context/LanguageContext';
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
  const { t } = useTranslation();
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
      return openAlertWithMessage(t('errNameFormat'));
    }
    return true;
  };

  const checkPassword = () => {
    if (!password && !secPassword) {
      return openAlertWithMessage(t('errEnterPassword'));
    } else if (password !== secPassword) {
      return openAlertWithMessage(t('errPasswordMismatch'));
    }
    return true;
  };

  const checkAlias = () => {
    if (alias === '') {
      return openAlertWithMessage(t('errEnterAlias'));
    }
    return true;
  };

  const checkPlace = () => {
    if (place === '') {
      return openAlertWithMessage(t('errEnterLocation'));
    }
    return true;
  };

  const checkSignup = (initialUserData) => {
    if (
      checkNames() &&
      checkAlias() &&
      checkPlace() &&
      validation.checkEmail(email, openAlertWithMessage, t) &&
      checkPassword()
    ) {
      setIsLoading(true);
      register(email, password)
        .then((userCredential) => {
          handleSignUpWithEmail(initialUserData, userCredential.user.uid);
          openAlertWithMessage(`${t('registerSuccess')}: ${email}`);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.code === 'auth/weak-password') {
            openAlertWithMessage(t('errPasswordLength'));
            setPassword('');
            setSecPassword('');
          } else if (error.code === 'auth/email-already-in-use') {
            openAlertWithMessage(t('errEmailAlreadyInUse'));
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
            <Title>{t('signup')}</Title>
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
                {t('confirm')}
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
              {t('haveAccount')}
              <StyledLink to="/login">{t('login')}</StyledLink>
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
