import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';

import * as validation from '../../utils/validation';
import * as firebase from '../../utils/firebase';
import Main from '../common/Main';
import LoginBackground from '../loginPage/LoginBackground';
import LoginBg2 from '../loginPage/LoginBg2';
import { getAllContents } from '../../utils/firebase';

import { IoLogoFacebook } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiLock2Fill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { HiLocationMarker } from 'react-icons/hi';
import { BsFillEmojiLaughingFill } from 'react-icons/bs';

import { Timestamp } from '@firebase/firestore';

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

  const getUsersData = useCallback(
    () => getAllContents('users', setUsersDate),
    []
  );

  useEffect(() => {
    return getUsersData();
  }, [getUsersData]);

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

  const checkAlias = () => {
    if (alias === '') {
      alert('請輸入暱稱');
      return false;
    }
    return true;
  };

  const checkPlace = () => {
    if (place === '') {
      alert('請輸入暱稱');
      return false;
    }
    return true;
  };

  const checkSignup = (initialUserData) => {
    if (
      checkNames() &&
      validation.checkEmail(email) &&
      checkPassword() &&
      checkAlias() &&
      checkPlace()
    ) {
      setIsLoading(true);
      firebase
        .register(email, password)
        .then((userCredential) => {
          firebase.handleSignUpWithEmail(
            initialUserData,
            userCredential.user.uid
          );
          alert(`You have signed up with ${email}`);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.code === 'auth/weak-password') {
            alert('密碼長度需要至少六個字元');
            setPassword('');
            setSecPassword('');
          } else if (error.code === 'auth/email-already-in-use') {
            alert('此信箱已經註冊過，請您使用信箱或是 FB 及 Google 登入');
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
      <LoginBackground />
      <LoginBg2 />
      <SignupContainer>
        <Title>Sign Up</Title>
        <FiledContainer>
          <NameIcon />
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
        </FiledContainer>
        <FiledContainer>
          <AliasIcon />
          <Field
            placeholder="Alias"
            value={alias}
            onChange={(e) => {
              setAlias(e.target.value);
            }}
            disabled={isLoading}
          />
        </FiledContainer>
        <FiledContainer>
          <LocationIcon />
          <Field
            placeholder="Location"
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
            }}
            disabled={isLoading}
          />
        </FiledContainer>
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
        <FiledContainer>
          <PasswordIcon />
          <Field
            type="password"
            placeholder="Re-enter Password"
            value={secPassword}
            onChange={(e) => {
              setSecPassword(e.target.value);
            }}
            disabled={isLoading}
          />
        </FiledContainer>
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
                firebase.loginWithFB,
                '?type=large',
                setIsLoading,
                history
              )
            }
            disabled={isLoading}
          >
            <FbIcon /> <span>FB </span>
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

const StyledLoading = styled(ReactLoading)`
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5vh auto;
  padding: 30px;
  border-radius: 10px;
  height: fit-content;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: rgba(219, 245, 255, 0.3);
  backdrop-filter: blur(5px);
  @media screen and (max-width: 560px) {
    margin-right: 2rem;
    margin-left: 2rem;
    padding: 2rem;
  } ;
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
  flex-wrap: wrap;
  margin-bottom: 35px;
`;

const NameIcon = styled(BsFillPersonFill)`
  fill: rgb(129, 129, 129);
  width: 20px;
  height: 20px;
  margin-right: 10px;
  @media screen and (max-width: 540px) {
    align-self: flex-start;
    margin-top: 10px;
  }
`;

const Field = styled.input`
  flex-grow: 1;
  border: none;
  background: none;
  outline: none;
  border-bottom: 2px solid #d9d7d7;
  padding: 5px 8px;
`;

const NameFiled = styled(Field)`
  flex-grow: 1;
  margin-right: 0.5rem;
  @media screen and (max-width: 540px) {
    margin-right: 0;
    margin-bottom: 35px;
  }
`;

const LastNameField = styled(Field)`
  flex-grow: 1;
  @media screen and (max-width: 540px) {
    margin-left: 30px;
  }
`;

const AliasIcon = styled(BsFillEmojiLaughingFill)`
  fill: rgb(129, 129, 129);
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const LocationIcon = styled(HiLocationMarker)`
  fill: rgb(129, 129, 129);
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const EmailIcon = styled(MdEmail)`
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin-right: 5px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  color: white;
  background-color: #1e88e5;
  @media screen and (max-width: 470px) {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

const FBButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
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
  flex-grow: 1;
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

export default SignupPage;
