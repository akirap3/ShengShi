import { useMemo } from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Ripples from 'react-ripples';
import { IoRibbonSharp } from 'react-icons/io5';
import { BsListNested, BsFillHeartFill, BsShop } from 'react-icons/bs';
import { FaArchive } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';

import useCounts from '../../../../hooks/useCounts';
import { useTranslation } from '../../../../context/LanguageContext';

const DashbaordMenus = ({ location }) => {
  const { t, locale } = useTranslation();
  const {
    myListCounts,
    myBadgeCounts,
    myReceivedCounts,
    myToReceiveCounts,
    myCollectedShareCounts,
    myCollectedStoreCounts,
  } = useCounts();
  const menus = useMemo(
    () => [
      {
        icon: <StyledIcon as={BsListNested} />,
        name: t('menuShares'),
        count: myListCounts || 0,
        path: '/personal/list',
      },
      {
        icon: <StyledIcon as={IoRibbonSharp} />,
        name: t('menuStats'),
        count: myBadgeCounts || 0,
        path: '/personal/badges',
      },
      {
        icon: <StyledIcon as={FaArchive} />,
        name: t('menuRecord'),
        count: myReceivedCounts || 0,
        path: '/personal/received',
      },
      {
        icon: <StyledIcon as={MdFastfood} />,
        name: t('menuToReceive'),
        count: myToReceiveCounts || 0,
        path: '/personal/toReceive',
      },
      {
        icon: <StyledIcon as={BsFillHeartFill} />,
        name: t('menuCollected'),
        count: myCollectedShareCounts || 0,
        path: '/personal/collectedShares',
      },
      {
        icon: <StyledIcon as={BsShop} />,
        name: t('menuStore'),
        count: myCollectedStoreCounts || 0,
        path: '/personal/collectedRestaurants',
      },
    ],

    [
      myListCounts,
      myBadgeCounts,
      myReceivedCounts,
      myToReceiveCounts,
      myCollectedShareCounts,
      myCollectedStoreCounts,
      locale,
      t,
    ]
  );

  return (
    <>
      {menus.map((menu) => (
        <StyledRipples
          key={menu.name}
          color="#fff"
          during={3000}
          active={menu.path === location.pathname ? '#bbdefbaa' : '#e3f2fd01'}
        >
          <Button as={Link} to={`${menu.path}`}>
            <IconContainer>
              {menu.icon}
              {menu.count !== 0 ? <ItemNumber>{menu.count}</ItemNumber> : null}
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
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px 10px 10px 25px;
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
