import styled from 'styled-components';

const SharesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 2rem;
  padding: 3vw 4rem;
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export default SharesContainer;
