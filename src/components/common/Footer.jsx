import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../images/common/logo-2.png';
import { IoLogoFacebook, IoLogoTwitter, IoLogoInstagram } from 'react-icons/io';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <TextRow>
          <HomeText to="/">首 頁</HomeText>
          <RestaurantText to="/restaurants">餐 廳</RestaurantText>
        </TextRow>
        <Link to="/">
          <LogoImg src={Logo} />
        </Link>
        <TextRow>
          <AboutText to="/articles">文 章</AboutText>
          <ContactText to="/search">搜 尋</ContactText>
        </TextRow>
      </FooterContent>
      <LogoRow>
        <FbLogo />
        <TwitterLogo />
        <InstagramLogo />
      </LogoRow>
      <CompanyText>© ShengShi, Inc. 2021. We love our shares!</CompanyText>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  margin: 50px;
  @media screen and (min-width: 1500px) {
    margin: 5vw 15vw;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #a0a0968a;

  @media screen and (max-width: 650px) {
    flex-direction: column;
  }
`;

const TextRow = styled.div`
  display: flex;

  @media screen and (max-width: 650px) {
    order: 1;
    margin-bottom: 3vw;
  }
`;

const Text = styled(Link)`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  color: #40916c;
  position: relative;
  margin: auto 2rem;
  text-align: center;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 3px;
    background-color: #3ea9e1;
    transition: 0.6s width linear;
  }

  &:hover {
    &:after {
      width: 100%;
    }
  }

  @media screen and (min-width: 1500px) {
    font-size: 32px;
  }
`;

const HomeText = styled(Text)``;
const RestaurantText = styled(Text)``;
const AboutText = styled(Text)``;
const ContactText = styled(Text)``;

const LogoImg = styled.img`
  width: 100px;

  @media screen and (max-width: 650px) {
    order: 0;
  }
`;

const LogoRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

const FbLogo = styled(IoLogoFacebook)`
  width: 40px;
  height: 40px;
  fill: rgb(34, 138, 240);
`;

const TwitterLogo = styled(IoLogoTwitter)`
  width: 40px;
  height: 40px;
  fill: rgb(85, 173, 237);
  margin: auto 1rem;
`;

const InstagramLogo = styled(IoLogoInstagram)`
  width: 40px;
  height: 40px;
  fill: orangered;
`;

const CompanyText = styled.div`
  text-align: center;
  color: #757575;
  font-size: 12px;
`;

export default Footer;
