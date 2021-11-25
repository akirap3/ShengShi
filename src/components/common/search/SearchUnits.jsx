import styled from 'styled-components';
import Ripples from 'react-ripples';
import { IoIosSearch } from 'react-icons/io';

export const SearchContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  padding: 0 0 3rem 0;

  @media screen and (max-width: 600px) {
    margin: 1rem auto;
  }

  @media screen and (max-width: 520px) {
    flex-direction: column;
  }
`;

export const SearchOutline = styled.div`
  position: relative;
  height: 60px;
  margin-right: 1rem;
  padding: 10px;
  color: white;
  border-radius: 40px;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  background: #b7e4c7;
  backdrop-filter: blur(5px);

  @media screen and (max-width: 520px) {
    margin-bottom: 1rem;
  }
`;

export const SearchBar = styled.input`
  width: 240px;
  padding: 0 6px;
  float: left;
  background: none;
  border: none;
  outline: none;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  color: #40916c;
  line-height: 40px;
  transition: 0.4s;
`;

export const SearchIconContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  float: right;
  background: white;
  border-radius: 50%;
  text-decoration: none;
  transition: 0.4;
  cursor: pointer;
`;

export const SearchIcon = styled(IoIosSearch)`
  width: 20px;
  height: 20px;
  fill: #1b4332;
`;

export const StyledRipples = styled(Ripples)`
  height: 60px;
  color: #52b788;
  border-radius: 20px;
  border: 1px solid #a0a0968a;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  backdrop-filter: blur(5px);
`;

export const ResetButton = styled.button`
  position: relative;
  padding: 0.5rem;
  height: 60px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  cursor: pointer;
`;
