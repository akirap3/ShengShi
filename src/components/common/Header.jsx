import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logOut, getCurrentUserData } from '../../utils/firebase';

import LogoImg from '../../images/common/logo-1.png';
import { BsPersonCircle } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FcMenu } from 'react-icons/fc';
import useCurrentUser from '../../hooks/useCurrentUser';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [userData, setUserData] = useState(null);

  const checkUser = useSelector((state) => state.checkUser);
  const currentUser = useCurrentUser();

  const logout = () => {
    logOut().then(() => {
      dispatch({ type: 'currentUser/get', payload: null });
      history.push('/');
    });
  };

  const getUserData = useCallback(
    () => getCurrentUserData(currentUser, setUserData),
    [currentUser]
  );

  useEffect(() => {
    return getUserData();
  }, [getUserData]);

  return (
    <>
      <HeaderContainer>
        <Link to="/">
          <Logo src={LogoImg} />
        </Link>
        <HomeNav to="/">首頁</HomeNav>
        <RestaurantNav to="/restaurants">合作餐廳</RestaurantNav>
        <ArticleNav to="/articles">文章</ArticleNav>
        <AboutNav to="/about">關於我們</AboutNav>
        <ContactNav to="/contact">聯絡我們</ContactNav>
        <SearchBar />

        {checkUser.isLoggedIn && userData ? (
          <>
            <MemberLoggedIcon src={userData.imageUrl} />
            <MyDashboard to="/personal/list">我的看板</MyDashboard>
            <LogoutButton as={Link} to="/" onClick={() => logout()}>
              登出
            </LogoutButton>
          </>
        ) : (
          <>
            <MemberIcon />
            <LoginButton to="/login">登入</LoginButton>
            <SignupButton to="/signup">註冊</SignupButton>
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
          <MobileHomeNav to="/">首頁</MobileHomeNav>
          <MobileRestaurantNav to="/restaurants">合作餐廳</MobileRestaurantNav>
          <MobileArticleNav to="/articles">文章</MobileArticleNav>
          <MobileAboutNav to="/about">關於我們</MobileAboutNav>
          <MobileContactNav to="/contact">聯絡我們</MobileContactNav>
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
  height: 7vh;
  background-color: white;
  border-bottom: 1px solid #cccc;
  padding: 0.5rem 2vw;

  @media screen and (max-width: 610px) {
    display: none;
  }
`;

const Logo = styled.img`
  height: 45px;
  margin-right: 2rem;
`;

const StyledLink = styled(Link)`
  margin-right: 1rem;
`;
const HomeNav = styled(StyledLink)`
  width: 35px;
`;
const RestaurantNav = styled(StyledLink)`
  width: 70px;
`;
const ArticleNav = styled(StyledLink)`
  width: 35px;

  @media screen and (max-width: 760px) {
    margin-right: auto;
  }
`;
const AboutNav = styled(StyledLink)`
  width: 70px;

  @media screen and (max-width: 760px) {
    display: none;
  }

  @media screen and (max-width: 870px) {
    margin-right: auto;
  }
`;
const ContactNav = styled(StyledLink)`
  width: 70px;
  margin-right: auto;

  @media screen and (max-width: 870px) {
    display: none;
  }
`;

const MemberLoggedIcon = styled.img`
  margin-right: 1rem;
  border-radius: 50%;
  border: 1px solid skyblue;
  height: 30px;
  width: 30px;
`;

const MemberIcon = styled(BsPersonCircle)`
  margin-right: 1rem;
  height: 30px;
  width: 30px;
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

const LogoutButton = styled.div`
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
  height: 7vh;
  background-color: white;
  border-bottom: 1px solid #cccc;
  padding: 0.5rem 2vw;

  @media screen and (max-width: 610px) {
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
  background-color: lightgray;
  border-radius: 0px 0px 10px 0px;
  padding: 2vh 3.5vw;
  width: 40vw;
  height: 60vh;
`;

const MenuClose = styled(AiFillCloseCircle)`
  position: absolute;
  top: 2vw;
  right: 2vw;
  fill: blue;
  border: 1px solid blue;
  border-radius: 50%;
  opacity: 0.7;
  cursor: pointer;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid black;
  margin-bottom: 2vw;
`;

const MobileLogo = styled.img`
  width: 80px;
`;

const MobileHomeNav = styled(Link)`
  margin-bottom: 2vw;
`;

const MobileRestaurantNav = styled(Link)`
  margin-bottom: 2vw;
`;

const MobileArticleNav = styled(Link)`
  margin-bottom: 2vw;
`;

const MobileAboutNav = styled(Link)`
  margin-bottom: 2vw;
`;

const MobileContactNav = styled(Link)`
  margin-bottom: 2vw;
  margin-bottom: auto;
`;

const MobileLoginButton = styled(Link)`
  margin-bottom: 2vw;
`;
const MobileSignupButton = styled(Link)``;

const MyMobileDashboard = styled(Link)`
  margin-bottom: 2vw;
`;

const MobileLogoutButton = styled.div`
  margin-bottom: 2vw;
  cursor: pointer;
`;

export default Header;
