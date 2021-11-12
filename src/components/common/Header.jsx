import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  logOut,
  getCurrentUserData,
  getCollectionCounts,
} from '../../utils/firebase';

import LogoImg from '../../images/common/logo-1.png';
import { BsPersonCircle } from 'react-icons/bs';
import { FcMenu } from 'react-icons/fc';
import { FaWindowClose } from 'react-icons/fa';
import useCurrentUser from '../../hooks/useCurrentUser';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const [messagesCount, setMessagesCount] = useState('');

  const checkUser = useSelector((state) => state.checkUser);
  const currentUser = useCurrentUser();

  const logout = () => {
    logOut().then(() => {
      dispatch({ type: 'currentUser/get', payload: null });
      history.push('/');
    });
  };

  const getMessageCounts = useCallback(
    () =>
      getCollectionCounts(
        `users/${currentUser?.uid}/messages`,
        setMessagesCount
      ),
    [currentUser]
  );

  const getUserData = useCallback(
    () => getCurrentUserData(currentUser, setUserData),
    [currentUser]
  );

  useEffect(() => {
    return getUserData();
  }, [getUserData]);

  useEffect(() => {
    return getMessageCounts();
  }, [getMessageCounts]);

  return (
    <>
      <HeaderContainer>
        <Link to="/">
          <Logo src={LogoImg} />
        </Link>
        <Tag>
          <HomeNav to="/">首頁</HomeNav>
        </Tag>
        <RestaurantTag>
          <RestaurantNav to="/restaurants">合作餐廳</RestaurantNav>
        </RestaurantTag>
        <ArticleTag>
          <ArticleNav to="/articles">文章</ArticleNav>
        </ArticleTag>
        <SearchBar />
        {checkUser.isLoggedIn && userData ? (
          <>
            <MemberIconContainer as={Link} to="/personal/notification">
              <MemberLoggedIcon src={userData.imageUrl} />
              {messagesCount !== 0 ? (
                <MessageCount>{messagesCount}</MessageCount>
              ) : (
                <></>
              )}
            </MemberIconContainer>
            <Tag>
              <MyDashboard to="/personal/list">我的看板</MyDashboard>
            </Tag>
            <Tag>
              <LogoutButton as={Link} to="/" onClick={() => logout()}>
                登出
              </LogoutButton>
            </Tag>
          </>
        ) : (
          <>
            <MemberIcon />
            <Tag>
              <LoginButton to="/login">登入</LoginButton>
            </Tag>
            <Tag>
              <SignupButton to="/signup">註冊</SignupButton>
            </Tag>
          </>
        )}
      </HeaderContainer>

      <MobileHeader>
        <MobileHeaderLogo src={LogoImg} />
        <MobileSearchBar />
        <MobileMenuIcon onClick={() => setShowMenu(!showMenu)} />
      </MobileHeader>
      {showMenu && (
        <MobileMenu>
          <MenuClose onClick={() => setShowMenu(false)} />
          <ImgContainer>
            <MobileLogo src={LogoImg} />
          </ImgContainer>
          <MobileMenuContent>
            <MobileHomeNav to="/">首頁</MobileHomeNav>
            <MobileRestaurantNav to="/restaurants">
              合作餐廳
            </MobileRestaurantNav>
            <MobileArticleNav to="/articles">文章</MobileArticleNav>
            <MobileShareNav to="/search">他人分享</MobileShareNav>
            {checkUser.isLoggedIn ? (
              <>
                <MyMobileDashboard to="/personal/list">
                  我的看板
                </MyMobileDashboard>
                <MobileLogoutButton onClick={() => logout()}>
                  登出
                </MobileLogoutButton>
              </>
            ) : (
              <>
                <MobileLoginButton to="/login">登入</MobileLoginButton>
                <MobileSignupButton to="/signup">註冊</MobileSignupButton>
              </>
            )}
          </MobileMenuContent>
        </MobileMenu>
      )}
    </>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 8vh;
  padding: 0.5rem 2vw;
  color: #2d6a4f;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  backdrop-filter: blur(5px);

  @media screen and (min-width: 1500px) {
    padding: 0 15vw;
  }

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const Logo = styled.img`
  height: 45px;
  margin-right: 1rem;
  @media screen and (min-width: 1500px) {
    height: 60px;
    margin-right: 2rem;
  }
`;

const StyledLink = styled(Link)`
  font-family: 'cwTeXYen', sans-serif;

  @media screen and (min-width: 650px) {
    font-size: 24px;
  }
  @media screen and (min-width: 1540px) {
    font-size: 32px;
  }

  &::after {
    position: absolute;
    content: '';
    top: 130%;
    left: 0;
    width: 100%;
    height: 5px;
    background: #95d5b2;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 1s;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const Tag = styled.div`
  position: relative;
  margin-right: 1rem;

  @media screen and (min-width: 1700px) {
    margin-right: 3rem;
  }

  @media screen and (min-width: 1500px) {
    margin-right: 2rem;
  }
`;
const HomeNav = styled(StyledLink)`
  width: 35px;
`;

const RestaurantTag = styled(Tag)`
  @media screen and (max-width: 800px) {
    margin-right: auto;
  }
`;

const RestaurantNav = styled(StyledLink)`
  font-family: 'cwTeXYen', sans-serif;
  width: 70px;
`;

const ArticleTag = styled(Tag)`
  margin-right: auto;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const ArticleNav = styled(StyledLink)`
  font-family: 'cwTeXYen', sans-serif;
  width: 35px;
  margin-right: auto;
`;

const MemberIconContainer = styled.div`
  position: relative;
`;

const MemberLoggedIcon = styled.img`
  margin-right: 1rem;
  border-radius: 50%;
  border: 1px solid skyblue;
  height: 30px;
  width: 30px;
`;

const MessageCount = styled.div`
  position: absolute;
  bottom: 0px;
  right: 10px;
  background-color: brown;
  padding: 1px 5px;
  border-radius: 50%;
  opacity: 0.8;
  color: white;
`;

const MemberIcon = styled(BsPersonCircle)`
  fill: #b7b7a4;
  margin-right: 1rem;
  height: 30px;
  width: 30px;
  @media screen and (min-width: 1500) {
    width: 50px;
    height: 50px;
    margin-right: 3rem;
  }
`;

const LoginButton = styled(StyledLink)`
  width: 35px;
  font-family: 'cwTeXYen', sans-serif;
`;
const SignupButton = styled(StyledLink)`
  width: 35px;
  font-family: 'cwTeXYen', sans-serif;
`;

const MyDashboard = styled(StyledLink)`
  width: 70px;
  font-family: 'cwTeXYen', sans-serif;
  cursor: pointer;
`;

const LogoutButton = styled(StyledLink)`
  width: 35px;
  font-family: 'cwTeXYen', sans-serif;
  cursor: pointer;
`;

const MobileHeader = styled.div`
  display: none;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 8vh;
  background-color: white;
  border-bottom: 1px solid #cccc;
  padding: 0.5rem 2vw;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);

  @media screen and (max-width: 700px) {
    display: flex;
  }
`;

const MobileHeaderLogo = styled.img`
  height: 45px;
  margin-right: 1vw;
`;

const MobileSearchBar = styled(SearchBar)``;

const MobileMenuIcon = styled(FcMenu)`
  margin-left: 1vw;
  height: 3vh;
  width: 3vh;
  cursor: pointer;
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  background: hsla(0, 0%, 0%, 0.7);
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(5px);
  border-radius: 0px 0px 10px 0px;
  padding: 2vh 3.5vw;
  width: 50vw;
  height: 60vh;
  color: white;
`;

const MenuClose = styled(FaWindowClose)`
  position: absolute;
  top: 2vw;
  right: 2vw;
  width: 22px;
  height: 22px;
  fill: white;
  cursor: pointer;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid white;
  margin-bottom: 3vw;
  margin-top: 3vw;
  margin-right: 3vw;
  border-radius: 5px;
  background-color: #b7e4c7;
`;

const MobileLogo = styled.img`
  width: 80px;
`;

const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 4vw;
`;

const StyledMobileLink = styled(Link)`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  margin-bottom: 3vw;
`;

const MobileHomeNav = styled(StyledMobileLink)``;

const MobileRestaurantNav = styled(StyledMobileLink)``;

const MobileArticleNav = styled(StyledMobileLink)``;

const MobileShareNav = styled(StyledMobileLink)`
  margin-bottom: auto;
`;

const MobileLoginButton = styled(StyledMobileLink)``;
const MobileSignupButton = styled(StyledMobileLink)``;

const MyMobileDashboard = styled(StyledMobileLink)``;

const MobileLogoutButton = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  margin-bottom: 3vw;
  color: #ccc;
  cursor: pointer;
`;

export default Header;
