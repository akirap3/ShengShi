import styled from 'styled-components';

import useSearch from '../../../hooks/useSearch';

import {
  SearchOutline,
  SearchBar as SearchBarUnit,
  SearchIconContainer,
  SearchIcon,
} from './SearchUnits';

const SearchBar = () => {
  const { inputValue, setInputValue, handleSearch, handleOnEnter } =
    useSearch();

  return (
    <StyledSearchOutline>
      <SearchBox
        placeholder="勝食搜尋"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleOnEnter}
      />
      <StyledSearchIconContainer onClick={handleSearch}>
        <SearchIcon />
      </StyledSearchIconContainer>
    </StyledSearchOutline>
  );
};

const StyledSearchOutline = styled(SearchOutline)`
  display: flex;
  flex-wrap: nowrap;
  height: 50px;
  border-radius: 30px;
  transition: 1s;
  background-color: #b7e4c7;

  &:hover {
    flex: 1;
    margin-left: 1rem;
  }

  &:hover > input {
    flex: 1;
    padding: 0 6px;
    color: #40916c;
    opacity: 1;
  }

  &:hover > span {
    background: white;
  }

  @media screen and (max-width: 520px) {
    margin-top: 1rem;
  }

  @media screen and (max-width: 700px) {
    margin-left: auto;
  }
`;

const SearchBox = styled(SearchBarUnit)`
  width: 0px;
  margin-right: auto;
  padding: 0;
  line-height: 32px;
  opacity: 0;
  transition: 1s;

  @media screen and (max-width: 700px) {
    font-size: 20px;
  }
`;

const StyledSearchIconContainer = styled(SearchIconContainer)`
  width: 30px;
  height: 30px;
  background: #b7e4c7;
  transition: 1s;
`;

export default SearchBar;
