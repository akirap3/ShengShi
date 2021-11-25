import styled from 'styled-components';
import BoatImg from '../../images/loginPage/boat.png';

const LoginBackground = () => {
  return (
    <Ocean>
      <BoatOne />
      <BoatTwo />
    </Ocean>
  );
};

const Ocean = styled.div`
  background-color: rgba(34, 152, 195, 0.3);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0px;
  z-index: -5;
  height: 55vh;
  box-shadow: 0 0 5px -3px #03374a;
  border-radius: 100% 100% 0 0 / 14% 14% 0 0;
  transition: bottom 0.5s ease;

  animation-name: OceanFloat;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;

  @keyframes OceanFloat {
    from {
      transform: translate(0, 0px);
    }
    45% {
      transform: translate(0, 8px);
    }
    to {
      transform: translate(0, -0px);
    }
  }
`;

const Boat = styled.div`
  background: url(${BoatImg}) no-repeat;
  background-size: 100% auto;
  width: 120px;
  height: 100px;
  position: absolute;
  top: -50px;
  right: 0px;

  animation-name: BoatFloat;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;

  @keyframes BoatFloat {
    from {
      transform: translate(0, 0px);
    }
    50% {
      transform: translate(2px, 4px);
    }
    to {
      transform: translate(0, -0px);
    }
  }
`;

const BoatOne = styled(Boat)`
  animation-name: BoatOneMove;
  animation-duration: 10s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;

  @keyframes BoatOneMove {
    from {
      transform: translate(0%, 0);
    }
    50% {
      transform: translate(-40vw, 0);
    }

    75% {
      transform: translate(-50vw, 0);
    }
    to {
      transform: translate(-70vw, 0);
    }
  }
`;

const BoatTwo = styled(Boat)`
  right: -200px;

  animation-name: BoatTwoMove;
  animation-duration: 15s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;

  @keyframes BoatTwoMove {
    from {
      transform: translate(0%, 0);
    }
    50% {
      transform: translate(-40vw, 0);
    }

    75% {
      transform: translate(-50vw, 0);
    }
    to {
      transform: translate(-60vw, 0);
    }
  }
`;

export default LoginBackground;
