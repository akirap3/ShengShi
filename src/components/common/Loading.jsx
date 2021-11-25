import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Loading = () => {
  return (
    <StyledLoading
      type={'spin'}
      color={'#2a9d8f'}
      height={'100px'}
      width={'100px'}
    />
  );
};

const StyledLoading = styled(ReactLoading)`
  position: absolute;
  z-index: 10;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

export const PaddingLoading = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

export const HalfHeightPaddingLoading = styled(PaddingLoading)`
  height: 50vh;
`;

export default Loading;
