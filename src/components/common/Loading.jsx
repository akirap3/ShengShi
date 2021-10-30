import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Loading = () => {
  return (
    <StyledLoading
      type={'spin'}
      color={'#2a9d8f'}
      height={'10vw'}
      width={'10vw'}
    />
  );
};

const StyledLoading = styled(ReactLoading)`
  display: flex;
  position: relative;
  z-index: 10;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
`;

export default Loading;
