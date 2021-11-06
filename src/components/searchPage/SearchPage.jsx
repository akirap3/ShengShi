import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import SearchPageCard from './SearchPageCard';
import SharesContainer from '../common/SharesContainer';
import { getSingleShare } from '../../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import {
  getAllOrderedContents,
  getAllOrderedOtherShares,
} from '../../utils/firebase';
import useCurrentUser from '../../hooks/useCurrentUser';
import { themeColor } from '../../utils/commonVariables';
import Main from '../common/Main';

import Img from '../../images/restaurantPage/restaurant-8.jpg';
import Hotpot from '../../images/searchPage/hotpot.svg';

import algolia from '../../utils/algolia';

const SearchPage = () => {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const lastPostSnapshotRef = useRef();
  const [inputValue, setInputValue] = useState('');
  const [shares, setShares] = useState();
  const isShareSearch = useSelector((state) => state.isShareSearch);
  const searchedShares = useSelector((state) => state.searchedShares);

  const handleSearch = () => {
    dispatch({ type: 'isShareSearch/search', payload: true });
    if (inputValue === '') setInputValue('請輸入關鍵字');
    algolia.search(inputValue || '請輸入關鍵字').then((result) => {
      console.log(inputValue);
      const searchResults = result.hits.map((hit) => {
        return {
          docId: hit.objectID,
        };
      });
      const contents = searchResults.map((result) =>
        getSingleShare(result.docId)
      );
      Promise.all(contents).then((values) => {
        console.log(values);
        dispatch({ type: 'searchedShares/get', payload: values });
      });
    });
  };

  const getShares = useCallback(() => {
    getAllOrderedContents(
      'shares',
      'timestamp',
      setShares,
      lastPostSnapshotRef,
      false,
      shares
    );
  }, []);

  const getOtherShares = useCallback(() => {
    getAllOrderedOtherShares(
      'shares',
      setShares,
      currentUser,
      lastPostSnapshotRef,
      false,
      shares
    );
  }, []);

  useEffect(() => {
    if (!isShareSearch) {
      if (currentUser) {
        return getOtherShares();
      } else {
        return getShares();
      }
    }
  }, [getOtherShares, getShares, currentUser, isShareSearch]);

  useEffect(() => {
    if (searchedShares) {
      const otherShares = searchedShares
        .filter((share) => share.postUser.id !== currentUser?.uid)
        .filter((share) => share.quantities > 0);
      setShares(otherShares);
    }
  }, [currentUser?.uid, searchedShares]);

  const handleInfiniteScroll = () => {
    if (!isShareSearch) {
      if (lastPostSnapshotRef.current) {
        if (currentUser) {
          getAllOrderedOtherShares(
            'shares',
            setShares,
            currentUser,
            lastPostSnapshotRef,
            true,
            shares
          );
        } else {
          getAllOrderedContents(
            'shares',
            'timestamp',
            setShares,
            lastPostSnapshotRef,
            true,
            shares
          );
        }
      }
    }
  };

  const handleResetSearch = () => {
    setInputValue('');
    dispatch({ type: 'isShareSearch/search', payload: false });
  };

  return (
    <Main>
      <Banner>
        <BannerContent>
          <Title>
            Ad eos saepe lucilius, noster postulant philosophia ea usu, qui
            dicta sadipscing te.
          </Title>
          <SubTitle>
            Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
            no suscipit quaerendum. At nam minimum ponderum. Est audiam animal
            molestiae te. Ex duo eripuit mentitum.
          </SubTitle>
          <ButtonRow>
            <StartButton to="/login">開始使用</StartButton>
            <LookButton to="/restaurants">合作餐廳</LookButton>
          </ButtonRow>
        </BannerContent>
        <BannerImg src={Img} />
      </Banner>
      <SearchContent>
        <SearchBar
          placeholder="勝食搜尋"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <SearchButton onClick={() => handleSearch()}>搜尋</SearchButton>
        <ResetButton onClick={handleResetSearch}>清除搜尋</ResetButton>
      </SearchContent>
      <SharesTitleContainer>
        <TitleIcon src={Hotpot} />
        <SharesTitle>目前其他人分享的勝食</SharesTitle>
      </SharesTitleContainer>
      <SharesContainer>
        {shares ? (
          <>
            {shares.length !== 0 ? (
              shares.map((share) => (
                <>
                  <SearchPageCard key={uuidv4()} share={share} />
                </>
              ))
            ) : (
              <div>搜尋不到</div>
            )}
          </>
        ) : (
          <div>搜尋不到</div>
        )}
      </SharesContainer>
      <Waypoint onEnter={handleInfiniteScroll} />
    </Main>
  );
};

const Banner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4rem;
  background-color: ${themeColor.blue};

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const BannerImg = styled.img`
  max-width: 40vw;
  border-radius: 10px;

  @media screen and (max-width: 600px) {
    order: 2;
    max-width: 80vw;
  }

  @media screen and (max-width: 450px) {
    display: none;
  }
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 35vw;
  line-height: 1.4rem;

  @media screen and (max-width: 600px) {
    order: 1;
    margin-bottom: 2rem;
    max-width: 80vw;
  }
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const SubTitle = styled.h3`
  margin-bottom: 1rem;
`;

const ButtonRow = styled.div`
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  padding: 0.5rem 0.8rem;
  border: 1px solid black;
  border-radius: 10px;
`;

const StartButton = styled(StyledLink)`
  margin-right: 0.5rem;
  color: white;
  background-color: lightgray;
`;

const LookButton = styled(StyledLink)``;

const SearchContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;

  @media screen and (max-width: 700px) {
  }

  @media screen and (max-width: 600px) {
    margin: 2rem auto;
  }
`;

const SearchBar = styled.input`
  min-width: 70vw;
  border-radius: 8px;
  @media screen and (max-width: 460px) {
    min-width: 50vw;
  }
`;

const SearchButton = styled.button`
  margin-left: 1vw;
  padding: 0.5rem 0.8rem;
  border: 1px solid black;
  border-radius: 8px;
  background-color: ${themeColor.blue};
`;

const ResetButton = styled(SearchButton)``;

const SharesTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  margin: auto 4rem;
`;

const TitleIcon = styled.img`
  width: 50px;
  padding-bottom: 0.5rem;
  margin-right: 1rem;
`;

const SharesTitle = styled.h2`
  font-size: 24px;
  @media screen and (max-width: 460px) {
    font-size: 4vw;
  }
`;

export default SearchPage;
