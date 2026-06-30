import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import algolia from '../utils/algolia';
import { getSingleShare } from '../utils/firebase';

import { useTranslation } from '../context/LanguageContext';

const useSearch = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation();
  const [placeholder, setPlaceholder] = useState(t('searchPlaceholder'));

  const handleSearch = () => {
    dispatch({ type: 'isShareSearch/search', payload: true });
    if (inputValue.trim() === '') {
      setPlaceholder(t('enterKeyword'));
      setInputValue('');
      return;
    }

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

  const handleSetInputValue = (value) => {
    setInputValue(value);
    if (value && value.trim() !== '') {
      setPlaceholder(t('searchPlaceholder'));
    }
  };

  return {
    inputValue,
    setInputValue: handleSetInputValue,
    placeholder,
    handleSearch,
    handleOnEnter,
  };
};

export default useSearch;
