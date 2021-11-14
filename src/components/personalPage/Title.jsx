import React from 'react';
import styled from 'styled-components';

import Hotpot from '../../images/searchPage/hotpot.svg';

const Title = ({ title }) => {
  return (
    <SharesTitleContainer>
      <Outline>
        <TitleIcon src={Hotpot} />
        <SharesTitle>{title}</SharesTitle>
      </Outline>
    </SharesTitleContainer>
  );
};

const SharesTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto 0;
`;

const Outline = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #52b788;
  border-radius: 40px;
  padding: 2px 20px;
  width: fit-content;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
`;

const TitleIcon = styled.img`
  width: 50px;
  padding-bottom: 0.5rem;
  margin-right: 1rem;
`;

const SharesTitle = styled.span`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 22px;
  color: white;
`;

export default Title;
