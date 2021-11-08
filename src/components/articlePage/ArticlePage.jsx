import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Waypoint } from 'react-waypoint';
import { themeColor } from '../../utils/commonVariables';
import Main from '../common/Main';
import {
  getAllOrderedContents,
  getSearchedOrderedContents,
} from '../../utils/firebase';

const ArticlePage = () => {
  const lastPostSnapshotRef = useRef();
  const [inputValue, setInputValue] = useState('');
  const [articles, setArticles] = useState();
  const [isSearch, setIsSearch] = useState(false);

  const getArticles = useCallback(() => {
    getAllOrderedContents(
      'articles',
      'createdAt',
      setArticles,
      lastPostSnapshotRef,
      false,
      articles
    );
  }, []);

  useEffect(() => {
    if (!isSearch) return getArticles();
  }, [getArticles, isSearch]);

  const handleSearch = () => {
    setIsSearch(true);
    getSearchedOrderedContents(
      'articles',
      'tags',
      'array-contains',
      inputValue,
      setArticles,
      lastPostSnapshotRef,
      false,
      articles
    );
  };

  const handleOnEnter = (e) => {
    if (e.charCode === 13) handleSearch();
  };

  const handleTagSearch = (tag) => {
    setInputValue(tag);
    handleSearch();
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    setInputValue('');
  };

  const handleInfiniteScroll = () => {
    if (lastPostSnapshotRef.current) {
      if (!isSearch) {
        getAllOrderedContents(
          'articles',
          'createdAt',
          setArticles,
          lastPostSnapshotRef,
          true,
          articles
        );
      } else {
        getSearchedOrderedContents(
          'articles',
          'tags',
          'array-contains',
          inputValue,
          setArticles,
          lastPostSnapshotRef,
          true,
          articles
        );
      }
    }
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
            onKeyPress={(e) => handleOnEnter(e)}
          />
          <SearchButton onClick={() => handleSearch()}>搜尋</SearchButton>
          <ResetButton onClick={() => handleClearSearch()}>
            清除搜尋
          </ResetButton>
        </SearchContainer>
      </Banner>

      {articles ? (
        articles.length !== 0 ? (
          <ArticleContainer>
            {articles.map((article) => (
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
        ) : (
          <NoResultContainer>
            <NoResult>搜尋不到</NoResult>
          </NoResultContainer>
        )
      ) : (
        <NoResultContainer>
          <NoResult>搜尋不到</NoResult>
        </NoResultContainer>
      )}

      {articles && <Waypoint onEnter={handleInfiniteScroll} />}
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
  margin: 0 5vw 10vw 5vw;
  @media screen and (max-width: 1020px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 860px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 650px) {
    padding: 0 15vw;
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (max-width: 450px) {
    padding: 0 5vw;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ArticleCard = styled.div`
  border: 1px solid ${themeColor.outLineColor};
  border-radius: 8px;
  @media screen and (max-width: 650px) {
    min-width: 250px;
  }
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

const NoResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10vw;
`;

const NoResult = styled.div`
  font-size: 16px;
`;

export default ArticlePage;
