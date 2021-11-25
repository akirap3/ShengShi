import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ImSpoonKnife } from 'react-icons/im';
import { BsGear } from 'react-icons/bs';

const DashboardLeftColumn = ({ userData }) => {
  return (
    <LeftColumn>
      <AvatarContainer>
        <Avatar src={userData?.imageUrl} />
        <SettingContainer as={Link} to="/personal/memberUpdate/">
          <Setting />
        </SettingContainer>
      </AvatarContainer>
      <NameContext>
        <BoardIcon as={ImSpoonKnife} />
        <Alias>{userData?.alias}</Alias>
      </NameContext>
    </LeftColumn>
  );
};

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-area: leftColumn;
  background-color: #e3f2fd01;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  border-radius: 8px;
  padding: 10px;

  @media screen and (min-width: 700px) {
    padding: 25px;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);

  @media screen and (min-width: 700px) {
    width: 125px;
    height: 125px;
  }
`;

const SettingContainer = styled.div`
  background-color: rgb(183, 228, 199, 0.3);
  border-radius: 50%;
`;

const Setting = styled(BsGear)`
  position: absolute;
  bottom: -5px;
  right: 5px;
  width: 25px;
  height: 25px;
  padding: 5px;
  fill: white;
  cursor: pointer;
  background-color: rgb(129, 129, 129);
  border-radius: 50%;

  @media screen and (min-width: 700px) {
    bottom: 5px;
    right: 5px;
  }
`;

const NameContext = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const BoardIcon = styled.div`
  fill: white;
  width: 25px;
  height: 25px;
  padding: 5px;
  background-color: rgb(129, 129, 129);
  border-radius: 50%;
  margin-right: 5px;

  @media screen and (min-width: 500px) {
    margin-right: 20px;
  }
`;

const Alias = styled.span`
  font-size: 16px;
  color: rgb(129, 129, 129);

  @media screen and (min-width: 800px) {
    font-size: 20px;
  }
`;

export default DashboardLeftColumn;
