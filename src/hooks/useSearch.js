import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import algolia from '../utils/algolia';
import { getSingleShare } from '../utils/firebase';

const useSearch = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    dispatch({ type: 'isShareSearch/search', payload: true });
    if (inputValue === '') {
      setInputValue('請輸入關鍵字');
      return;
    }
    if (inputValue === '請輸入關鍵字') return;

    algolia.search(inputValue).then((result) => {
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

  return {
    inputValue,
    setInputValue,
    handleSearch,
    handleOnEnter,
  };
};

export default useSearch;
