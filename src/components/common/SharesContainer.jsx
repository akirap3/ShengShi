import styled from 'styled-components';

const SharesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
  padding: 50px 0 150px;

  @media screen and (min-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default SharesContainer;
