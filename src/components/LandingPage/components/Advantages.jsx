import styled from 'styled-components';
import { useTranslation } from '../../../context/LanguageContext';

import ShareFoodOne from '../../../images/homepage/sharefood-2.jpg';
import ShareFoodTwo from '../../../images/homepage/sharefood-3.jpg';
import ShareFoodThree from '../../../images/homepage/sharefood-4.jpg';
import Background from '../../common/Background';

const Advantages = () => {
  const { t } = useTranslation();

  return (
    <AdvantagesContainer>
      <AvtContentOne>
        <AvtImgOne src={ShareFoodOne} alt="share" />
        <StyledAvtColumn>
          <Title>{t('foodTitle')}</Title>
          <Description>
            {t('foodDesc')}
          </Description>
        </StyledAvtColumn>
      </AvtContentOne>
      <AvtContentTwo>
        <Background circleBgColor={'rgba(255, 255, 255, 0.2)'} />
        <AvtColumnTwo>
          <Title>{t('saveTitle')}</Title>
          <Description>
            {t('saveDesc')}
          </Description>
        </AvtColumnTwo>
        <AvtImgTwo src={ShareFoodTwo} alt="share" />
      </AvtContentTwo>
      <AvtContentThree>
        <AvtImgThree src={ShareFoodThree} alt="share" />
        <StyledAvtColumn>
          <Title>{t('valueTitle')}</Title>
          <Description>
            {t('valueDesc')}
          </Description>
        </StyledAvtColumn>
      </AvtContentThree>
    </AdvantagesContainer>
  );
};


const AdvantagesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AvtContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  position: relative;
  background-color: #94d2bd;
  padding: 5rem 2rem;

  @media screen and (min-width: 1500px) {
    padding: 5vw 15vw;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const AvtContentOne = styled(AvtContent)`
  background-color: white;
`;

const AvtContentTwo = styled(AvtContent)`
  background: linear-gradient(60deg, #96deda 0%, #50c9c3 100%);
  backdrop-filter: blur(5px);
`;
const AvtContentThree = styled(AvtContent)`
  background-color: white;
`;

const AvtImg = styled.img`
  max-width: 80vw;
  border-radius: 5px;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);

  @media screen and (min-width: 600px) {
    max-width: 40vw;
  }

  @media screen and (min-width: 1500px) {
    max-width: 30vw;
  }
`;

const AvtImgOne = styled(AvtImg)`
  @media screen and (max-width: 600px) {
    margin-bottom: 1rem;
  }
`;
const AvtImgTwo = styled(AvtImg)`
  margin-top: 1rem;
`;
const AvtImgThree = styled(AvtImg)`
  margin-bottom: 1rem;
`;

const AvtColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 35vw;

  @media screen and (max-width: 600px) {
    max-width: 80vw;
  }
`;

const StyledAvtColumn = styled(AvtColumn)`
  @media screen and (max-width: 600px) {
    margin-top: 3rem;
  }
`;

const AvtColumnTwo = styled(AvtColumn)`
  color: black;
  @media screen and (max-width: 600px) {
    margin-bottom: 3rem;
  }
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 56px;
`;

export const Description = styled.p`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  font-weight: 100;
  line-height: 2rem;
  color: #0000009e;
  @media screen and (min-width: 375px) {
    max-width: 60vw;
  }

  @media screen and (min-width: 1500px) {
    max-width: 20vw;
  }
`;

export default Advantages;
