import React, { useState } from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  SearchOutline,
  SearchBar as SearchBarUnit,
  SearchIconContainer,
  SearchIcon,
} from './search/SearchUnits';
import algolia from '../../utils/algolia';
import { getSingleShare } from '../../utils/firebase';

const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    dispatch({ type: 'isShareSearch/search', payload: true });
    if (inputValue === '') setInputValue('請輸入關鍵字');
    algolia.search(inputValue || '請輸入關鍵字').then((result) => {
      const searchResults = result.hits.map((hit) => {
        return {
          docId: hit.objectID,
        };
      });
      const contents = searchResults.map((result) =>
        getSingleShare(result.docId)
      );
      Promise.all(contents).then((values) => {
        dispatch({ type: 'searchedShares/get', payload: values || [] });
      });
      history.push('/search');
    });
  };

  const handleOnEnter = (e) => {
    if (e.charCode === 13) handleSearch();
  };

  return (
    <StyledSearchOutline>
      <SearchBox
        placeholder="勝食搜尋"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => handleOnEnter(e)}
      />
      <StyledSearchIconContainer onClick={() => handleSearch()}>
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
    color: #40916c;
    flex: 1;
    padding: 0 6px;
    opacity: 1;
  }

  &:hover > span {
    background: white;
  }

  @media screen and (max-width: 700px) {
    margin-left: auto;
  }
`;

const SearchBox = styled(SearchBarUnit)`
  padding: 0;
  transition: 1s;
  line-height: 32px;
  width: 0px;
  margin-right: auto;
  opacity: 0;

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
