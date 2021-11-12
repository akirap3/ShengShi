import React from 'react';
import styled from 'styled-components';
import ShareFoodOne from '../../images/homepage/sharefood-2.jpg';
import ShareFoodTwo from '../../images/homepage/sharefood-3.jpg';
import ShareFoodThree from '../../images/homepage/sharefood-4.jpg';
import HomepageBackground from '../common/HomepageBackground';

const Advantages = () => {
  return (
    <AdvantagesContainer>
      <AvtContentOne>
        <AvtImgOne src={ShareFoodOne} />
        <AvtColumnOne>
          <Title>糧食</Title>
          <Description>
            全球有 8 億 2 千萬人仍處於飢餓狀態，相當於每 9
            個人即有一人無法取得足夠糧食
          </Description>
        </AvtColumnOne>
      </AvtContentOne>
      <AvtContentTwo>
        <HomepageBackground />
        <AvtColumnTwo>
          <Title>節約</Title>
          <Description>
            台灣一年約有 340 萬噸的廚餘量，相當於每人每天的剩食量約一盒炒飯
          </Description>
        </AvtColumnTwo>
        <AvtImgTwo src={ShareFoodTwo} />
      </AvtContentTwo>
      <AvtContentThree>
        <AvtImgThree src={ShareFoodThree} />
        <AvtColumnThree>
          <Title>價值</Title>
          <Description>
            如果全世界食物浪費的排碳量位居世界第三，透過惜食減碳，共創美好環境
          </Description>
        </AvtColumnThree>
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
  position: relative;
  background-color: #94d2bd;
  padding: 5rem 2rem;
  justify-content: space-around;
  align-items: center;

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
  /* background-color: #2d6a4f; */
  background-image: linear-gradient(60deg, #96deda 0%, #50c9c3 100%);
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

const AvtColumnOne = styled(AvtColumn)`
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

const AvtColumnThree = styled(AvtColumn)`
  @media screen and (max-width: 600px) {
    margin-top: 3rem;
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
