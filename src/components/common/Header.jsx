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

import LogoImg from '../../images/common/shengshi-logo.svg';
import LogoImg2 from '../../images/common/shengshi-logo2.svg';
import { BsPersonCircle } from 'react-icons/bs';
import { FcMenu } from 'react-icons/fc';
import { GrFormClose } from 'react-icons/gr';
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
        <MobileLogoLink to="/">
          <MobileHeaderLogo src={LogoImg} />
        </MobileLogoLink>
        <MobileSearchBar />
        <MobileMenuIcon onClick={() => setShowMenu(!showMenu)} />
      </MobileHeader>
      {showMenu && (
        <MobileMenu>
          <MenuClose onClick={() => setShowMenu(false)} />
          <ImgContainer as={Link} to="/">
            <MobileLogo src={LogoImg2} />
          </ImgContainer>
          <MobileMenuContent>
            <MobileHomeNav as={Link} to="/">
              首頁
            </MobileHomeNav>
            <MobileRestaurantNav as={Link} to="/restaurants">
              合作餐廳
            </MobileRestaurantNav>
            <MobileArticleNav as={Link} to="/articles">
              文章
            </MobileArticleNav>
            <MobileShareNav as={Link} to="/search">
              他人分享
            </MobileShareNav>
            {checkUser.isLoggedIn ? (
              <>
                <MyMobileDashboard as={Link} to="/personal/list">
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
  height: 70px;
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
  width: 70px;
`;

const ArticleTag = styled(Tag)`
  margin-right: auto;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const ArticleNav = styled(StyledLink)`
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
  border-radius: 50%;
  opacity: 0.8;
  color: white;
  padding: 5px 8px;
  font-size: 12px;
  background: #2196f3;
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
`;
const SignupButton = styled(StyledLink)`
  width: 35px;
`;

const MyDashboard = styled(StyledLink)`
  width: 70px;
  cursor: pointer;
`;

const LogoutButton = styled(StyledLink)`
  width: 35px;
  cursor: pointer;
`;

const MobileHeader = styled.div`
  display: none;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 70px;
  background-color: white;
  padding: 0.5rem 20px;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);

  @media screen and (max-width: 700px) {
    display: flex;
  }
`;

const MobileLogoLink = styled(Link)`
  margin-right: auto;
`;

const MobileHeaderLogo = styled.img`
  height: 45px;
`;

const MobileSearchBar = styled(SearchBar)``;

const MobileMenuIcon = styled(FcMenu)`
  margin-left: 1vw;
  height: 25px;
  width: 25px;
  cursor: pointer;
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  z-index: 9;
  display: flex;
  flex-direction: column;
  background: rgb(217, 237, 225, 0.6);
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
  border-radius: 0px 0px 10px 0px;
  padding: 35px 35px 35px 20px;
  width: 260px;
  height: 600px;
  color: black;
`;

const MenuClose = styled(GrFormClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 22px;
  height: 22px;
  cursor: pointer;

  &:hover {
    background-color: #95d5b2;
    border-radius: 3px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 65px;
  margin-bottom: 20px;
  border-radius: 5px;
  padding: 5px;
  background-color: rgb(4, 169, 109, 0.6);
  cursor: pointer;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;

const MobileLogo = styled.img`
  width: 80px;
`;

const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 15px;
`;

const StyledMobileLink = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
  transition: 1s;
  &:hover {
    background-color: #95d5b2;
    padding: 10px;
    border-radius: 5px;
    color: #2d6a4f;
    box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  }
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

const MobileLogoutButton = styled(StyledMobileLink)`
  color: rgb(129, 129, 129);

  &:hover {
    color: white;
  }
`;

export default Header;
