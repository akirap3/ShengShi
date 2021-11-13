import React from 'react';
import styled from 'styled-components';
import BoatImg from '../../images/loginPage/boat.png';

const LoginBackground = () => {
  return (
    <Background>
      <div id="mainMenu" class="mainMenuOverlay open floating2">
        <div class="navire floating3 move1"></div>
        <div class="navire navire2 floating3 move2"></div>
      </div>
    </Background>
  );
};

const Background = styled.div`
  .navire {
    background: url(${BoatImg}) no-repeat;
    background-size: 100% auto;
    width: 120px;
    height: 100px;
    position: absolute;
    top: -50px;
    right: 0px;
  }

  .navire2 {
    right: -200px;
  }

  .mainMenuOverlay {
    background-color: rgba(34, 152, 195, 0.3);
    position: fixed;
    left: 0;
    right: 0;
    bottom: -200px;
    z-index: -5;
    height: 250px;
    box-shadow: 0 0 10px -3px #03374a;
    border-radius: 100% 100% 0 0 / 14% 14% 0 0;
    -webkit-transition: bottom 0.5s ease;
    transition: bottom 0.5s ease;

    @media screen and (max-width: 700px) {
      height: 350px;
    }
  }

  .mainMenuOverlay.open {
    bottom: 0;
  }

  .floating2 {
    animation-name: Floatingx2;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    -webkit-animation-name: Floatingx2;
    -webkit-animation-duration: 3s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: ease-in-out;
  }

  @keyframes Floatingx2 {
    from {
      -webkit-transform: translate(0, 0px);
    }
    45% {
      -webkit-transform: translate(0, 8px);
    }
    to {
      -webkit-transform: translate(0, -0px);
    }
  }

  @-webkit-keyframes Floatingx2 {
    from {
      -webkit-transform: translate(0, 0px);
    }
    45% {
      -webkit-transform: translate(0, 8px);
    }
    to {
      -webkit-transform: translate(0, -0px);
    }
  }

  .floating3 {
    animation-name: Floatingx3;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    -webkit-animation-name: Floatingx3;
    -webkit-animation-duration: 3s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: ease-in-out;
  }

  @keyframes Floatingx3 {
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

  @-webkit-keyframes Floatingx3 {
    from {
      -webkit-transform: translate(0, 0px);
    }
    50% {
      -webkit-transform: translate(2px, 4px);
    }
    to {
      -webkit-transform: translate(0, -0px);
    }
  }

  .move1 {
    animation-name: Moving1;
    animation-duration: 10s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
    -webkit-animation-name: Moving1;
    -webkit-animation-duration: 10s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-fill-mode: forwards;
    -webkit-animation-timing-function: ease-in-out;
  }

  .move2 {
    animation-name: Moving2;
    animation-duration: 15s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
    -webkit-animation-name: Moving2;
    -webkit-animation-duration: 15s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-fill-mode: forwards;
    -webkit-animation-timing-function: ease-in-out;
  }

  @keyframes Moving1 {
    from {
      transform: translate(0%, 0);
    }
    50% {
      transform: translate(-50vw, 0);
    }
    to {
      transform: translate(-70vw, 0);
    }
  }

  @keyframes Moving2 {
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
