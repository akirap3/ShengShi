import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { themeColor } from '../../utils/commonVariables';
import Main from '../common/Main';
import { Link } from 'react-router-dom';
import useArticles from '../../hooks/useArticles';
import { getAllContents, getSearchedContents } from '../../utils/firebase';

const ArticlePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [articles, setArticles] = useState();
  const [isSearch, setIsSearch] = useState(false);

  const getArticles = useCallback(() => {
    getAllContents('articles', setArticles);
  }, []);

  useEffect(() => {
    if (!isSearch) return getArticles();
  }, [getArticles, isSearch]);

  const handleSearch = () => {
    setIsSearch(true);
    getSearchedContents(
      'articles',
      'tags',
      'array-contains',
      inputValue,
      setArticles
    );
  };

  const handleTagSearch = (tag) => {
    setInputValue(tag);
    handleSearch();
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    setInputValue('');
  };

  return (
    <Main>
      <Banner>
        <BannerContent>
          <BannerTitle>
            Lorem ipsum dolor sit amet eam quas malorum accusam
          </BannerTitle>
          <BannerSubtitle>
            Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
            no suscipit quaerendum. At nam minimum ponderum. Est audiam animal
            molestiae te.
          </BannerSubtitle>
        </BannerContent>
        <SearchContainer>
          <SearchBar
            value={inputValue}
            placeholder="文章搜尋"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <SearchButton onClick={() => handleSearch()}>搜尋</SearchButton>
          <ResetButton onClick={() => handleClearSearch()}>
            清除搜尋
          </ResetButton>
        </SearchContainer>
      </Banner>
      <ArticleContainer>
        {articles &&
          articles.map((article) => (
            <ArticleCard key={article.id}>
              <a href={article.url} target="_blank" rel="noreferrer">
                <CardImg src={article.imageUrl} />
              </a>
              <CardContent>
                <TagContainer>
                  {article.tags.map((tag) => (
                    <Tag key={uuidv4()} onClick={() => handleTagSearch(tag)}>
                      {tag}
                    </Tag>
                  ))}
                </TagContainer>
                <CardTitle>{article.title}</CardTitle>
                <CardSubtitle>{article.subtitle}</CardSubtitle>
              </CardContent>
            </ArticleCard>
          ))}
      </ArticleContainer>
      <PageContainer>
        <PageContent>
          <Page>1</Page>
          <Page>2</Page>
          <Page>3</Page>
          <Page>4</Page>
          <Page>5</Page>
        </PageContent>
      </PageContainer>
    </Main>
  );
};

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  margin-bottom: 3rem;
  background-color: ${themeColor.blue};
`;

const BannerContent = styled.div`
  max-width: 60vw;
  margin-bottom: 3rem;
`;

const BannerTitle = styled.h1`
  font-size: 45px;
  margin-bottom: 2rem;
`;

const BannerSubtitle = styled.h2`
  font-size: 24px;
  line-height: 36px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBar = styled.input`
  margin-right: 1rem;
  min-width: 40vw;
  line-height: 32px;
  border-radius: 10px;
`;

const SearchButton = styled.button`
  border: 1px solid black;
  padding: 0.7rem 0.8rem;
  border-radius: 10px;
  cursor: pointer;
`;

const ResetButton = styled(SearchButton)``;

const ArticleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 2rem;
  margin: 0 4rem;
`;

const ArticleCard = styled.div`
  border: 1px solid ${themeColor.outLineColor};
  border-radius: 8px;
`;

const CardImg = styled.img`
  height: 30vh;
  width: 100%;
  border-radius: 8px 8px 0px 0px;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const TagContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
`;

const Tag = styled.div`
  border: 1px solid black;
  padding: 0.2rem 0.3rem;
  border-radius: 5px;
  margin-right: 0.5rem;
  cursor: pointer;
`;

const CardTitle = styled.div`
  margin-bottom: 1rem;
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
`;

const CardSubtitle = styled.div`
  line-height: 20px;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 3rem auto 6rem auto; */
  padding: 4rem;
`;

const PageContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  min-width: 30vw;
  border: 1px solid blueviolet;
  padding: 0.5rem 0.8rem;
  border-radius: 5px;
`;

const Page = styled.div``;

export default ArticlePage;
