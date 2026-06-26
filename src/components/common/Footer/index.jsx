import { Link } from 'react-router-dom';
import { useTranslation } from '../../../context/LanguageContext';

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
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <FooterContent>
        <TextRow>
          <Text to="/">{t('home')}</Text>
          <Text to="/restaurants">{t('partners')}</Text>
        </TextRow>
        <Link to="/">
          <LogoImg src={Logo} alt="Shenshi-logo" />
        </Link>
        <TextRow>
          <Text to="/articles">{t('articles')}</Text>
          <Text to="/search">{t('search')}</Text>
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

