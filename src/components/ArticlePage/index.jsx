import React, { useState, useEffect, useRef } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { Waypoint } from 'react-waypoint';

import Main from '../common/Main';
import Background from '../common/Background';
import Loading, { HalfHeightPaddingLoading } from '../common/Loading';
import NoResult from '../common/NoResult';

import {
  SearchContent,
  SearchOutline,
  SearchBar,
  SearchIconContainer,
  SearchIcon,
  StyledRipples,
} from '../common/search/SearchUnits';

import {
  UpperPart,
  Banner,
  BannerImg,
  StyledBannerContent,
  StyledBannerTitle,
  Styledsubtitle,
  StyledResetButton,
  ArticleContainer,
  ArticleCard,
  CardImg,
  CardContent,
  TagContainer,
  Tag,
  CardTitle,
  CardSubtitle,
} from './style/Index.style';

import ArticleBannerImg from '../../images/articlePage/articleImage.jpg';

import {
  getAllOrderedContents,
  getSearchedOrderedContents,
} from '../../utils/firebase';

const ArticlePage = () => {
  const lastPostSnapshotRef = useRef();
  const [inputValue, setInputValue] = useState('');
  const [articles, setArticles] = useState();
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (!isSearch)
      return getAllOrderedContents(
        'articles',
        'createdAt',
        setArticles,
        lastPostSnapshotRef,
        false,
        articles
      );
  }, [isSearch]);

  const handleSearch = (tag) => {
    if (!tag && inputValue === '') return;
    setIsSearch(true);
    getSearchedOrderedContents(
      'articles',
      'tags',
      'array-contains',
      tag || inputValue,
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
    handleSearch(tag);
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
      <UpperPart>
        <Background circleBgColor={'rgba(255, 255, 255, 0.2)'} />
        <Banner>
          <BannerImg src={ArticleBannerImg} alt="share-food" />
          <StyledBannerContent>
            <StyledBannerTitle>剩食與解決</StyledBannerTitle>
            <Styledsubtitle>
              透過分享剩食打擊食物浪費，分享你多出的資源，剩食也可以點亮街燈，讓我們共謀解決剩食的創新之道
            </Styledsubtitle>
          </StyledBannerContent>
        </Banner>
        <SearchContent>
          <SearchOutline>
            <SearchBar
              value={inputValue}
              placeholder="文章搜尋"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleOnEnter}
            />
            <SearchIconContainer onClick={() => handleSearch('')}>
              <SearchIcon />
            </SearchIconContainer>
          </SearchOutline>
          <StyledRipples during={3000}>
            <StyledResetButton onClick={handleClearSearch}>
              清除搜尋
            </StyledResetButton>
          </StyledRipples>
        </SearchContent>
      </UpperPart>

      {articles ? (
        articles.length ? (
          <ArticleContainer>
            {articles.map((article) => (
              <ArticleCard key={article.id}>
                <a href={article.url} target="_blank" rel="noreferrer">
                  <CardImg src={article.imageUrl} alt="card-article" />
                </a>
                <CardContent>
                  <TagContainer>
                    {article.tags.map((tag) => (
                      <Tag key={uuidv4()} onClick={() => handleTagSearch(tag)}>
                        {`# ${tag}`}
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
          <NoResult text="搜尋不到文章" />
        )
      ) : (
        <HalfHeightPaddingLoading>
          <Loading />
        </HalfHeightPaddingLoading>
      )}

      {articles && <Waypoint onEnter={handleInfiniteScroll} />}
    </Main>
  );
};

export default ArticlePage;
