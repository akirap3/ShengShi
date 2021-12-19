import { Link } from 'react-router-dom';

import {
  FooterContainer,
  FooterContent,
  TextRow,
  Text,
  LogoImg,
  LogoRow,
  CompanyText,
} from './style/Index.style';
import Logo from '../../../images/common/shengshi-logo2.svg';
import SocialIcons from '../SocialIcons';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <TextRow>
          <Text to="/">首 頁</Text>
          <Text to="/restaurants">餐 廳</Text>
        </TextRow>
        <Link to="/">
          <LogoImg src={Logo} alt="Shenshi-logo" />
        </Link>
        <TextRow>
          <Text to="/articles">文 章</Text>
          <Text to="/search">搜 尋</Text>
        </TextRow>
      </FooterContent>
      <LogoRow>
        <SocialIcons />
      </LogoRow>
      <CompanyText>© ShengShi, Inc. 2021. We love our shares!</CompanyText>
    </FooterContainer>
  );
};

export default Footer;
