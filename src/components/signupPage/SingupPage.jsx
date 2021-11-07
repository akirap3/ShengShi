import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';

import * as validation from '../../utils/validation';
import * as firebase from '../../utils/firebase';
import Main from '../common/Main';
import { getAllContents } from '../../utils/firebase';

import { IoLogoFacebook } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
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
      <SignupContainer>
        {isLoading && (
          <StyledLoading
            type={'spin'}
            color={'#2a9d8f'}
            height={'10vw'}
            width={'10vw'}
          />
        )}
        <Title>註冊</Title>
        <NameContainer>
          <NameFiled
            placeholder="請輸入您的名"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            disabled={isLoading}
          />
          <LastNameField
            placeholder="請輸入您的姓"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            disabled={isLoading}
          />
        </NameContainer>
        <Field
          placeholder="請輸入你的暱稱"
          value={alias}
          onChange={(e) => {
            setAlias(e.target.value);
          }}
          disabled={isLoading}
        />
        <Field
          placeholder="請輸入你的居住地"
          value={place}
          onChange={(e) => {
            setPlace(e.target.value);
          }}
          disabled={isLoading}
        />
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
        <Field
          type="password"
          placeholder="請再次輸入密碼"
          value={secPassword}
          onChange={(e) => {
            setSecPassword(e.target.value);
          }}
          disabled={isLoading}
        />
        <ButtonContainer>
          <NativeButton
            onClick={() => checkSignup(initialUserData)}
            disabled={isLoading}
          >
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
            <FbIcon /> <span>FB 登入</span>
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

const StyledLoading = styled(ReactLoading)`
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SignupContainer = styled.div`
  display: flex;
  position: relative;
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
