import { useState, useEffect, useCallback } from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Ripples from 'react-ripples';
import { IoRibbonSharp } from 'react-icons/io5';
import { BsListNested, BsFillHeartFill, BsShop } from 'react-icons/bs';
import { FaArchive } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';

import useCurrentUser from '../../../hooks/useCurrentUser';
import {
  getContentCounts,
  getCountsTwoFiltered,
} from '../../../utils/firebase';

const DashbaordMenus = ({ location }) => {
  const [myListCounts, setMyListCounts] = useState(0);
  const [myBadgeCounts, setMyBadgeCounts] = useState(0);
  const [myReceivedCounts, setMyReceivedCounts] = useState(0);
  const [myToReceiveCounts, setMyToReceiveCounts] = useState(0);
  const [myCollectedShareCounts, setMyCollectedShareCounts] = useState(0);
  const [myCollectedStoreCounts, setMyCollectedStoreCounts] = useState(0);
  const currentUser = useCurrentUser();

  const menus = [
    {
      icon: [<StyledIcon as={BsListNested} key={uuidv4()} />],
      name: '清單',
      count: myListCounts || 0,
      path: '/personal/list',
    },
    {
      icon: [<StyledIcon as={IoRibbonSharp} key={uuidv4()} />],
      name: '統計',
      count: myBadgeCounts || 0,
      path: '/personal/badges',
    },
    {
      icon: [<StyledIcon as={FaArchive} key={uuidv4()} />],
      name: '紀錄',
      count: myReceivedCounts || 0,
      path: '/personal/received',
    },
    {
      icon: [<StyledIcon as={MdFastfood} key={uuidv4()} />],
      name: '已訂',
      count: myToReceiveCounts || 0,
      path: '/personal/toReceive',
    },
    {
      icon: [<StyledIcon as={BsFillHeartFill} key={uuidv4()} />],
      name: '收藏',
      count: myCollectedShareCounts || 0,
      path: '/personal/collectedShares',
    },
    {
      icon: [<StyledIcon as={BsShop} key={uuidv4()} />],
      name: '店家',
      count: myCollectedStoreCounts || 0,
      path: '/personal/collectedRestaurants',
    },
  ];

  const getMyListCounts = useCallback(
    () =>
      getCountsTwoFiltered(
        'shares',
        'postUser.id',
        'isArchived',
        '==',
        '==',
        currentUser,
        false,
        setMyListCounts
      ),
    [currentUser]
  );

  const getBadgeCounts = useCallback(
    () =>
      getContentCounts(
        'badges',
        'ownedBy',
        'array-contains',
        currentUser,
        setMyBadgeCounts
      ),
    [currentUser]
  );

  const getReceivedCounts = useCallback(
    () =>
      getContentCounts(
        'shares',
        'receivedUserId',
        'array-contains',
        currentUser,
        setMyReceivedCounts
      ),
    [currentUser]
  );

  const getToReceiveCounts = useCallback(
    () =>
      getContentCounts(
        'shares',
        'toReceiveUserId',
        'array-contains',
        currentUser,
        setMyToReceiveCounts
      ),
    [currentUser]
  );

  const getCollectedShareCounts = useCallback(
    () =>
      getContentCounts(
        'shares',
        'savedUserId',
        'array-contains',
        currentUser,
        setMyCollectedShareCounts
      ),
    [currentUser]
  );

  const getCollectedStoreCounts = useCallback(
    () =>
      getContentCounts(
        'restaurants',
        'savedUserId',
        'array-contains',
        currentUser,
        setMyCollectedStoreCounts
      ),
    [currentUser]
  );

  useEffect(() => {
    return getMyListCounts();
  }, [getMyListCounts]);

  useEffect(() => {
    return getBadgeCounts();
  }, [getBadgeCounts]);

  useEffect(() => {
    return getReceivedCounts();
  }, [getReceivedCounts]);

  useEffect(() => {
    return getToReceiveCounts();
  }, [getToReceiveCounts]);

  useEffect(() => {
    return getCollectedShareCounts();
  }, [getCollectedShareCounts]);

  useEffect(() => {
    return getCollectedStoreCounts();
  }, [getCollectedStoreCounts]);

  return (
    <>
      {menus.map((menu) => (
        <StyledRipples
          key={menu.name}
          color="#fff"
          during={3000}
          active={menu.path === location.pathname ? '#bbdefbaa' : '#e3f2fd01'}
        >
          <Button key={menu.name} as={Link} to={`${menu.path}`}>
            <IconContainer>
              {menu.icon.map((icon) => icon)}
              {menu.count !== 0 ? <ItemNumber>{menu.count}</ItemNumber> : <></>}
            </IconContainer>

            <ButtonName>{menu.name}</ButtonName>
          </Button>
        </StyledRipples>
      ))}
    </>
  );
};

const StyledRipples = styled(Ripples)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: #2d6a4f;
  background-color: #e3f2fd01;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${({ active }) => active};

  &:hover {
    transform: translateY(-5px);
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  color: #2d6a4f;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? '#bbdefbaa' : '#e3f2fd01')};
`;

const StyledIcon = styled.div`
  fill: rgb(129, 129, 129);
  width: 22px;
  height: 22px;
`;

const IconContainer = styled.div`
  position: relative;
  margin-right: 40px;
`;

const ItemNumber = styled.div`
  position: absolute;
  bottom: -5px;
  right: -10px;
  padding: 5px 8px;
  border-radius: 50%;
  font-size: 12px;
  color: white;
  background: #1e88e582;
  backdrop-filter: blur(5px);

  @media screen and (max-width: 700px) {
    margin-top: 0;
  }
`;

const ButtonName = styled.div`
  font-size: 18px;
  @media screen and (min-width: 800px) {
    font-size: 22px;
  }
`;

export default DashbaordMenus;