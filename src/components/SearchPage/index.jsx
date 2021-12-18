import { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Waypoint } from 'react-waypoint';

import useCurrentUser from '../../hooks/useCurrentUser';
import Main from '../common/Main';
import SharesContainer from '../common/ShareCard/components/SharesContainer';
import Outer from '../common/Outer';
import SearchPageCard from './components/SearchPageCard';
import NoResult from '../common/NoResult';
import WaveBackground from './components/WaveBackground';
import Background from '../common/Background';
import Title from '../common/Title';
import Loading from '../common/Loading';
import Img from '../../images/restaurantPage/restaurant-8.jpg';
import algolia from '../../utils/algolia';

import {
  getSingleShare,
  getAllOrderedContents,
  getAllOrderedOtherShares,
} from '../../utils/firebase';

import {
  BannerContent,
  BannerTitle,
  Subtitle,
  ButtonRow,
  StartButton,
  LearnMoreButton,
} from '../common/banner/CommonBanner';

import {
  SearchContent,
  SearchOutline,
  SearchBar,
  SearchIconContainer,
  SearchIcon,
  StyledRipples,
  ResetButton,
} from '../common/search/SearchUnits';

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

  useEffect(() => {
    if (!isShareSearch) {
      if (currentUser) {
        return getAllOrderedOtherShares(
          'shares',
          setShares,
          currentUser,
          lastPostSnapshotRef,
          false,
          shares
        );
      } else {
        return getAllOrderedContents(
          'shares',
          'createdAt',
          setShares,
          lastPostSnapshotRef,
          false,
          shares,
          true
        );
      }
    }
  }, [currentUser, isShareSearch]);

  useEffect(() => {
    if (searchedShares) {
      const otherShares = searchedShares.filter(
        (share) =>
          share.postUser.id !== currentUser?.uid &&
          share.quantities > 0 &&
          share.toTimeStamp.toDate() > new Date()
      );
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
            shares,
            true
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
        <Background circleBgColor={'rgba(183, 228, 199, 0.5)'} />
        <WaveBackground />
        <Banner>
          <StyledBannerContent>
            <BannerTitle>勝食</BannerTitle>
            <Subtitle>
              善於分享的人時常受到眷顧，常與他人分享讓生活更多采多姿更有趣
            </Subtitle>
            <ButtonRow>
              <StartButton to="/login">開始使用</StartButton>
              <LookButton to="/restaurants">合作餐廳</LookButton>
            </ButtonRow>
          </StyledBannerContent>
          <BannerImg src={Img} alt="share" />
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
          <StyledRipples during={3000}>
            <ResetButton onClick={handleResetSearch}>清除搜尋</ResetButton>
          </StyledRipples>
        </SearchContent>
      </UpperPart>
      <Title title="目前其他人分享的勝食" />
      <StyledOuter>
        {shares ? (
          shares.length !== 0 ? (
            <SharesContainer>
              {shares.map((share) => (
                <SearchPageCard key={share.id} share={share} />
              ))}
            </SharesContainer>
          ) : (
            <NoResult text="搜尋不到" />
          )
        ) : (
          <Loading />
        )}
      </StyledOuter>
      <Waypoint onEnter={handleInfiniteScroll} />
    </Main>
  );
};

const UpperPart = styled.div`
  position: relative;
  padding-bottom: 2rem;
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

const StyledBannerContent = styled(BannerContent)`
  @media screen and (max-width: 700px) {
    order: 1;
    margin-bottom: 3rem;
    max-width: 80vw;
  }
`;

const LookButton = styled(LearnMoreButton)`
  border: 1px solid #a0a0968a;
`;

const StyledOuter = styled(Outer)`
  position: relative;
`;

export default SearchPage;
