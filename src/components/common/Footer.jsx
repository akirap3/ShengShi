import React from 'react';
import styled from 'styled-components';
import Logo from '../../images/common/logo-2.png';
import { IoLogoFacebook, IoLogoTwitter, IoLogoInstagram } from 'react-icons/io';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Text>首頁</Text>
        <Text>餐廳</Text>
        <LogoImg src={Logo} />
        <Text>關於</Text>
        <Text>聯絡</Text>
      </FooterContent>
      <LogoRow>
        <FbLogo />
        <TwitterLogo />
        <InstagramLogo />
      </LogoRow>
      <CompanyText>© ShengShi, Inc. 2019. We love our shares!</CompanyText>
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
`;

const Text = styled.div`
  margin: auto 2rem;
`;

const LogoImg = styled.img`
  width: 100px;
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
`;

export default Footer;
