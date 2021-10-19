import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoImg from '../../images/common/logo-1.png';
import { BsPersonCircle } from 'react-icons/bs';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src={LogoImg} />
      <HomeNav to="/">首頁</HomeNav>
      <RestaurantNav to="/restaurants">合作餐廳地圖</RestaurantNav>
      <ArticleNav to="/articles">文章</ArticleNav>
      <AboutNav to="/about">關於我們</AboutNav>
      <ContactNav to="/contact">聯絡我們</ContactNav>
      <MemberIcon />
      <LoginButton to="/login">登入</LoginButton>
      <SignupButton to="/signup">註冊</SignupButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 7vh;
  background-color: white;
  border-bottom: 1px solid #cccc;
  padding: 0.5rem 2rem;
`;

const Logo = styled.img`
  height: 45px;
  margin-right: 2rem;
`;

const StyledLink = styled(Link)`
  margin-right: 1rem;
`;
const HomeNav = styled(StyledLink)``;
const RestaurantNav = styled(StyledLink)``;
const ArticleNav = styled(StyledLink)``;
const AboutNav = styled(StyledLink)``;
const ContactNav = styled(StyledLink)`
  margin-right: auto;
`;
const MemberIcon = styled(BsPersonCircle)`
  margin-right: 1rem;
  height: 45px;
`;
const LoginButton = styled(StyledLink)``;
const SignupButton = styled(StyledLink)``;

export default Header;
