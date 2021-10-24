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
          <AboutText to="/about">關 於</AboutText>
          <ContactText to="contact">聯 絡</ContactText>
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
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;

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
  margin: auto 2rem;
  letter-spacing: 0.5vw;
  @media screen and (max-width: 650px) {
    letter-spacing: 2vw;
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
  fill: blue;
`;

const TwitterLogo = styled(IoLogoTwitter)`
  width: 40px;
  height: 40px;
  fill: cyan;
  margin: auto 1rem;
`;

const InstagramLogo = styled(IoLogoInstagram)`
  width: 40px;
  height: 40px;
  fill: orangered;
`;

const CompanyText = styled.div`
  text-align: center;

  @media screen and (max-width: 650px) {
    font-size: 3vw;
  }
`;

export default Footer;
