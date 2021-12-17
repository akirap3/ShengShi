import styled from 'styled-components';

import Background from '../../common/Background';
import {
  BannerContent,
  BannerTitle,
  Subtitle,
  ButtonRow,
  StartButton,
  LearnMoreButton,
} from '../../common/banner/CommonBanner';
import BannerImage from '../../../images/homepage/sharefood-1.jpg';

const Banner = () => {
  return (
    <BannerContainer>
      <Background circleBgColor={'rgba(255, 255, 255, 0.2)'} />
      <StyledBannerContent>
        <BannerTitle>分享</BannerTitle>
        <Subtitle>
          透過交換平台分享剩食幫助別人與環境，一起把「剩食」變成「勝食」吧
        </Subtitle>
        <ButtonRow>
          <StartButton to="/login">開始使用</StartButton>
          <LearnMoreButton to="/search">了解更多</LearnMoreButton>
        </ButtonRow>
      </StyledBannerContent>
      <BannerImg src={BannerImage} alt="share-food" />
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: no-wrap;
  position: relative;
  padding: 5rem 2rem;
  background: linear-gradient(to right, #4ac29a, #bdfff3);
  backdrop-filter: blur(5px);

  @media screen and (min-width: 1500px) {
    padding: 5vw 15vw;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledBannerContent = styled(BannerContent)`
  @media screen and (max-width: 600px) {
    max-width: 80vw;
    margin-bottom: 3rem;
  }
`;

const BannerImg = styled.img`
  max-width: 80vw;
  align-self: center;
  border-radius: 5px;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  @media screen and (min-width: 600px) {
    max-width: 40vw;
  }

  @media screen and (min-width: 1500px) {
    max-width: 30vw;
  }
`;

export default Banner;
