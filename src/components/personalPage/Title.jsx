import React from 'react';
import styled from 'styled-components';

import Hotpot from '../../images/searchPage/hotpot.svg';

const Title = () => {
  return (
    <SharesTitleContainer>
      <TitleIcon src={Hotpot} />
      <SharesTitle>我的分享清單</SharesTitle>
    </SharesTitleContainer>
  );
};

const SharesTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  margin: auto 4rem;
`;

const TitleIcon = styled.img`
  width: 50px;
  padding-bottom: 0.5rem;
  margin-right: 1rem;
`;

const SharesTitle = styled.h2`
  font-size: 24px;
  @media screen and (max-width: 460px) {
    font-size: 4vw;
  }
`;

export default Title;
