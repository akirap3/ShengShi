import React from 'react';
import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';

const SearchBar = () => {
  return (
    <SearchWrapper>
      <SearchContainer>
        <SearchBox />
        <SearchButton>
          <SearchIcon />
        </SearchButton>
      </SearchContainer>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  width: 30%;
  margin-right: 1vw;

  @media screen and (max-width: 610px) {
    flex-grow: 1;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
`;

const SearchBox = styled.input`
  width: 100%;
  border: 3px solid #00b4cc;
  border-right: none;
  padding: 0.5vh;
  height: 3.8vh;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9dbfaf;

  &:focus {
    color: #00b4cc;
  }
`;

const SearchButton = styled.button`
  width: 3.8vh;
  height: 3.8vh;
  border: 1px solid #00b4cc;
  background: #00b4cc;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
`;

const SearchIcon = styled(IoIosSearch)``;

export default SearchBar;
