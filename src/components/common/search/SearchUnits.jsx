import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import Ripples from 'react-ripples';

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
  background: #b7e4c7;
  height: 60px;
  border-radius: 40px;
  padding: 10px;
  color: white;
  margin-right: 1rem;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  backdrop-filter: blur(5px);

  @media screen and (max-width: 520px) {
    margin-bottom: 1rem;
  }
`;

export const SearchBar = styled.input`
  font-family: 'cwTeXYen', sans-serif;
  border: none;
  background: none;
  outline: none;
  float: left;
  width: 240px;
  padding: 0 6px;
  font-size: 24px;
  transition: 0.4s;
  line-height: 40px;
  color: #40916c;
`;

export const SearchIconContainer = styled.span`
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: 0.4;
  background: white;
  cursor: pointer;
`;

export const SearchIcon = styled(IoIosSearch)`
  fill: #1b4332;
  width: 20px;
  height: 20px;
`;

export const StyledRipples = styled(Ripples)`
  height: 60px;
  border-radius: 20px;
  border: 1px solid #a0a0968a;
  color: #52b788;
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
