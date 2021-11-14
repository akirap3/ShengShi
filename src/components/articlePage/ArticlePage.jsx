import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Waypoint } from 'react-waypoint';
import Main from '../common/Main';
import NoResult from '../personalPage/NoResult';
import HomepageBackground from '../common/HomepageBackground';
import ArticleBannerImg from '../../images/articlePage/articleImage1.jpg';
import { IoIosSearch } from 'react-icons/io';
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
      <UpperPart>
        <HomepageBackground />
        <Banner>
          <BannerImg src={ArticleBannerImg} />
          <BannerContent>
            <Title>剩食與解決</Title>
            <SubTitle>
              透過分享剩食打擊食物浪費，分享你多出的資源，剩食也可以點亮街燈，讓我們共謀解決剩食的創新之道
            </SubTitle>
          </BannerContent>
        </Banner>
        <SearchContent>
          <SearchOutline>
            <SearchBar
              value={inputValue}
              placeholder="文章搜尋"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => handleOnEnter(e)}
            />
            <SearchIconContainer onClick={() => handleSearch()}>
              <SearchIcon />
            </SearchIconContainer>
          </SearchOutline>
          <ResetButton onClick={() => handleClearSearch()}>
            清除搜尋
          </ResetButton>
        </SearchContent>
      </UpperPart>

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
          <NoResult text="搜尋不到" />
        )
      ) : (
        <NoResult text="搜尋不到" />
      )}

      {articles && <Waypoint onEnter={handleInfiniteScroll} />}
    </Main>
  );
};

const UpperPart = styled.div`
  position: relative;
  padding-bottom: 2rem;
  background: linear-gradient(253deg, #0cc898, #1797d2, #864fe1);
  background-size: 300% 300%;
  -webkit-animation: Background 25s ease infinite;
  -moz-animation: Background 25s ease infinite;
  animation: Background 25s ease infinite;

  @-webkit-keyframes Background {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @-moz-keyframes Background {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes Background {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5rem 2rem;

  @media screen and (min-width: 1500px) {
    padding: 5vw 15vw;
  }

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }

  @media screen and (max-width: 450px) {
    padding: 5rem 2rem 1rem;
  }
`;

const BannerImg = styled.img`
  max-width: 80vw;
  border-radius: 5px;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);

  @media screen and (max-width: 700px) {
    order: 2;
  }

  @media screen and (min-width: 700px) {
    max-width: 40vw;
  }

  @media screen and (max-width: 450px) {
    display: none;
  }

  @media screen and (min-width: 1500px) {
    max-width: 30vw;
  }
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 35vw;

  @media screen and (max-width: 700px) {
    order: 1;
    margin-bottom: 3rem;
    max-width: 80vw;
  }
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 56px;
  font-weight: 600;
  color: white;
`;

const SubTitle = styled.h3`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  font-weight: 100;
  margin-bottom: 2rem;
  line-height: 2rem;
  color: #ffffff9e;

  @media screen and (min-width: 375px) {
    max-width: 60vw;
  }

  @media screen and (min-width: 1500px) {
    max-width: 20vw;
  }
`;

const SearchContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  padding: 0 0 3rem 0;

  @media screen and (max-width: 600px) {
    margin: 1rem auto;
  }

  @media screen and (max-width: 520px) {
    flex-direction: column;
  }
`;

const SearchOutline = styled.div`
  position: relative;
  background: #b7e4c7;
  height: 60px;
  border-radius: 40px;
  padding: 10px;
  color: white;
  margin-right: 1rem;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  backdrop-filter: blur(5px);

  &:hover > input {
    color: #40916c;
    width: 240px;
    padding: 0 6px;
  }

  &:hover > span {
    background: white;
  }
`;

const SearchBar = styled.input`
  font-family: 'cwTeXYen', sans-serif;
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  font-size: 24px;
  transition: 0.4s;
  line-height: 40px;
  width: 0px;
`;

const SearchIconContainer = styled.span`
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #b7e4c7;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: 0.4;
`;

const SearchIcon = styled(IoIosSearch)`
  fill: #1b4332;
  width: 20px;
  height: 20px;
`;

const ResetButton = styled.button`
  position: relative;
  padding: 0.5rem;
  height: 60px;
  border-radius: 20px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  border: 1px solid #a0a0968a;
  color: white;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  backdrop-filter: blur(5px);

  @media screen and (max-width: 520px) {
    margin-top: 1rem;
  }
`;

const ArticleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 20rem);
  grid-template-rows: auto;
  gap: 2rem;
  padding-top: 100px;
  margin-bottom: 150px;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(2, 20rem);
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(3, 20rem);
  }
`;

const ArticleCard = styled.div`
  width: 20rem;
  min-height: 20rem;
  background-color: whitesmoke;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const CardImg = styled.img`
  height: 30vh;
  width: 100%;
  border-radius: 8px 8px 0px 0px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  justify-self: center;
  padding: 1rem 2rem 2rem;
`;

const TagContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
`;

const Tag = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  padding: 5px 8px;
  border-radius: 5px;
  margin-right: 0.5rem;
  cursor: pointer;
  color: white;
  background: #52b788;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
`;

const CardTitle = styled.div`
  margin-bottom: 1rem;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  line-height: 28px;
  font-weight: 600;
`;

const CardSubtitle = styled.div`
  color: hsl(0, 0%, 51%);
  font-weight: 300;
  line-height: 20px;
`;

export default ArticlePage;
