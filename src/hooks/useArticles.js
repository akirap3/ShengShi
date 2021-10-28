import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from '../utils/firebase';

const useArticles = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);

  useEffect(() => {
    let isMounted = true;
    if (articles) return;

    firebase.fetchArticles().then((data) => {
      if (isMounted) dispatch({ type: 'articles/fetched', payload: data });
    });

    return () => (isMounted = false);
  }, [dispatch, articles]);

  return articles;
};

export default useArticles;
