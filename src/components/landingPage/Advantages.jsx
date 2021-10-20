import React from 'react';
import styled from 'styled-components';
import ShareFoodOne from '../../images/homepage/sharefood-2.jpg';
import ShareFoodTwo from '../../images/homepage/sharefood-3.jpg';
import ShareFoodThree from '../../images/homepage/sharefood-4.jpg';

const Advantages = () => {
  return (
    <AdvantagesContainer>
      <AvtContentOne>
        <AvtImgOne src={ShareFoodOne} />
        <AvtColumn>
          <Title>優點一</Title>
          <Description>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.
          </Description>
        </AvtColumn>
      </AvtContentOne>
      <AvtContentTwo>
        <AvtColumn>
          <Title>優點二</Title>
          <Description>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.
          </Description>
        </AvtColumn>
        <AvtImgTwo src={ShareFoodTwo} />
      </AvtContentTwo>
      <AvtContentThree>
        <AvtImgThree src={ShareFoodThree} />
        <AvtColumn>
          <Title>優點三</Title>
          <Description>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.
          </Description>
        </AvtColumn>
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
  background-color: #94d2bd;
  padding: 2rem;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const AvtContentOne = styled(AvtContent)``;

const AvtContentTwo = styled(AvtContent)`
  background-color: white;
`;
const AvtContentThree = styled(AvtContent)``;

const AvtImg = styled.img`
  max-width: 40vw;
  border-radius: 5px;

  @media screen and (max-width: 600px) {
    max-width: 80vw;
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

const Title = styled.h2`
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  line-height: 1.4rem;
`;

export default Advantages;
