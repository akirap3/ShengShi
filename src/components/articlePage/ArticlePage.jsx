import React from 'react';
import styled from 'styled-components';
import { layoutConfig, themeColor } from '../../utils/commonVariables';
import { Link } from 'react-router-dom';
import useArticles from '../../hooks/useArticles';

import Img from '../../images/articlePage/article-1.jpg';

const ArticlePage = () => {
  const articles = useArticles();

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
          <SearchBar placeholder="文章搜尋" />
          <SearchButton to="/search">搜尋</SearchButton>
        </SearchContainer>
      </Banner>
      <ArticleContainer>
        {articles &&
          articles.map((article) => (
            <ArticleCard>
              <a href={article.url} target="_blank" rel="noreferrer">
                <CardImg src={article.imageUrl} />
              </a>
              <CardContent>
                <TagContainer>
                  {article.tags.map((tag) => (
                    <Tag>{tag}</Tag>
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

const Main = styled.div`
  position: relative;
  top: ${layoutConfig.navHeight};
  width: 100%;
`;

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

const SearchButton = styled(Link)`
  border: 1px solid black;
  padding: 0.7rem 0.8rem;
  border-radius: 10px;
`;

const ArticleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 2rem;
  margin: 0 4rem;
`;

const ArticleCard = styled.div`
  border: 1px solid black;
  border-radius: 8px;
`;

const CardImg = styled.img`
  width: 100%;
  border-radius: 8px 8px 0px 0px;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const TagContainer = styled.div`
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  border: 1px solid black;
  padding: 0.2rem 0.3rem;
  border-radius: 5px;
  margin-right: 0.5rem;
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
