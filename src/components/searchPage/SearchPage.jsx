import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import SearchPageCard from './SearchPageCard';
import SharesContainer from '../common/SharesContainer';
import Title from '../personalPage/Title';
import Loading from '../common/Loading';
import { getSingleShare } from '../../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import {
  getAllOrderedContents,
  getAllOrderedOtherShares,
} from '../../utils/firebase';
import useCurrentUser from '../../hooks/useCurrentUser';

import Main from '../common/Main';
import {
  SearchContent,
  SearchOutline,
  SearchBar,
  SearchIconContainer,
  SearchIcon,
  ResetButton,
} from '../common/search/SearchUnits';

import NoResult from '../personalPage/NoResult';

import Img from '../../images/restaurantPage/restaurant-8.jpg';
import Wave from 'react-wavify';
import LoginBg2 from '../loginPage/LoginBg2';
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
      const searchResults = result.hits.map((hit) => {
        return {
          docId: hit.objectID,
        };
      });
      const contents = searchResults.map((result) =>
        getSingleShare(result.docId)
      );
      Promise.all(contents).then((values) => {
        dispatch({ type: 'searchedShares/get', payload: values });
      });
    });
  };

  const handleOnEnter = (e) => {
    if (e.charCode === 13) handleSearch();
  };

  const getShares = useCallback(() => {
    getAllOrderedContents(
      'shares',
      'createdAt',
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
        .filter((share) => share.quantities > 0)
        .filter((share) => share.toTimeStamp.toDate() > new Date());
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
            'createdAt',
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
      <UpperPart>
        <LoginBg2 />
        <WaveBackground />
        <Banner>
          <BannerContent>
            <BannerTitle>勝食</BannerTitle>
            <SubTitle>
              善於分享的人時常受到眷顧，常與他人分享讓生活更多采多姿更有趣
            </SubTitle>
            <ButtonRow>
              <StartButton to="/login">開始使用</StartButton>
              <LookButton to="/restaurants">合作餐廳</LookButton>
            </ButtonRow>
          </BannerContent>
          <BannerImg src={Img} />
        </Banner>
        <SearchContent>
          <SearchOutline>
            <SearchBar
              placeholder="勝食搜尋"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => handleOnEnter(e)}
            />
            <SearchIconContainer onClick={() => handleSearch()}>
              <SearchIcon />
            </SearchIconContainer>
          </SearchOutline>
          <ResetButton onClick={handleResetSearch}>清除搜尋</ResetButton>
        </SearchContent>
      </UpperPart>
      <Title title="目前其他人分享的勝食" />
      <Outer>
        {shares ? (
          shares.length !== 0 ? (
            <SharesContainer>
              {shares
                .filter((share) => share.isArchived === false)
                .filter((share) => share.toTimeStamp.toDate() > new Date())
                .map((share) => (
                  <SearchPageCard key={uuidv4()} share={share} />
                ))}
            </SharesContainer>
          ) : (
            <NoResult text="搜尋不到" />
          )
        ) : (
          <Loading />
        )}
      </Outer>
      <Waypoint onEnter={handleInfiniteScroll} />
    </Main>
  );
};

const UpperPart = styled.div`
  position: relative;
  padding-bottom: 2rem;
`;

const WaveBackground = () => {
  return (
    <Wave
      mask="url(#mask)"
      fill="#52b788"
      style={{
        position: 'absolute',
        bottom: '0',
        height: '100px',
        zIndex: '-3',
      }}
      options={{
        height: 20,
      }}
    >
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="0" stopColor="white" />
          <stop offset="0.5" stopColor="black" />
        </linearGradient>
        <mask id="mask">
          <rect x="0" y="0" width="3000" height="150" fill="url(#gradient)" />
        </mask>
      </defs>
    </Wave>
  );
};

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

  @media screen and (min-width: 700px) {
    max-width: 40vw;
  }

  @media screen and (max-width: 450px) {
    display: none;
  }

  @media screen and (max-width: 700px) {
    margin-bottom: 60px;
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

const BannerTitle = styled.h1`
  margin-bottom: 2rem;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 56px;
  font-weight: 600;
  color: black;
`;

const SubTitle = styled.h3`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  font-weight: 100;
  margin-bottom: 2rem;
  line-height: 2rem;
  color: #0000009e;

  @media screen and (min-width: 375px) {
    max-width: 60vw;
  }

  @media screen and (min-width: 1500px) {
    max-width: 20vw;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledLink = styled(Link)`
  margin-right: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
`;

const StartButton = styled(StyledLink)`
  color: white;
  background-color: #1e88e5;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  backdrop-filter: blur(5px);
`;

const LookButton = styled(StyledLink)`
  background-color: rgba(255, 255, 255, 0.8);
  color: rgb(147, 188, 225);
  border: 1px solid #a0a0968a;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  backdrop-filter: blur(5px);
`;

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default SearchPage;
