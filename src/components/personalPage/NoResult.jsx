import styled from 'styled-components';
import CatImg from '../../images/PersonalPage/cat.gif';

const NoResult = ({ text }) => {
  return (
    <NoResultContainer>
      <NoResultText>{text}</NoResultText>
      <Cat src={CatImg}></Cat>
    </NoResultContainer>
  );
};

const NoResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40vh;
  padding: 10vw;
  background-color: white;

  @media screen and (min-width: 650px) {
    flex-direction: row;
  }
`;

const NoResultText = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  color: rgb(129, 129, 129);
  @media screen and (min-width: 650px) {
    font-size: 32px;
  }
`;

const Cat = styled.img`
  max-width: 150px;
  margin-top: 10px;
  @media screen and (min-width: 650px) {
    margin-left: 10px;
  }
`;

export default NoResult;
