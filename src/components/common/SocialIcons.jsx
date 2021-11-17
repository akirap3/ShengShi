import React from 'react';
import styled from 'styled-components';
import { IoLogoFacebook, IoLogoTwitter, IoLogoInstagram } from 'react-icons/io';

const SocialIcons = () => {
  return (
    <Icons>
      <div className="social-button insta">
        <InstagramIcon />
        <span>Instagram</span>
      </div>

      <div className="social-button facebook">
        <FbIcon />
        <span>Facebook</span>
      </div>

      <div className="social-button twitter">
        <TwitterIcon />
        <span>Twitter</span>
      </div>
    </Icons>
  );
};

const FbIcon = styled(IoLogoFacebook)``;

const TwitterIcon = styled(IoLogoTwitter)``;

const InstagramIcon = styled(IoLogoInstagram)``;

const Icons = styled.div`
  display: flex;

  .social-button {
    background: hsl(0 0% 10%);
    background: radial-gradient(
      circle at 30% 107%,
      #fdf497 0%,
      #fdf497 5%,
      #fd5949 45%,
      #d6249f 60%,
      #285aeb 90%
    );
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    border-radius: 100vw;
    display: flex;
    align-items: center;
    margin: 0.2rem;
    color: white;
  }

  .facebook {
    background: #3b5998;
  }

  .twitter {
    background: #1da1f2;
  }

  .dribbble {
    background: #ea4c89;
  }

  .social-button:hover {
    cursor: pointer;
  }

  .social-button span {
    display: inline-block;
    max-width: 0px;
    overflow: hidden;
    transition: 350ms ease;
  }

  .social-button:hover span {
    max-width: 100px;
    margin-left: 0.5rem;
  }
`;

export default SocialIcons;
