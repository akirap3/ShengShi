import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from '../utils/firebase';

const useArticles = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);

  useEffect(() => {
    if (articles) return;

    firebase.fetchArticles().then((data) => {
      dispatch({ type: 'articles/fetched', payload: data });
    });
  });

  return articles;
};

export default useArticles;
