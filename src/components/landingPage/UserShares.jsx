import styled from 'styled-components';

import UserImgOne from '../../images/homepage/user-2.jpg';
import UserImgTwo from '../../images/homepage/user-5.jpg';

const UserShares = () => {
  return (
    <UserSharesContainer>
      <UserSharesContentOne>
        <UserImage>
          <UserAvatar src={UserImgOne} />
          <UserName>Anna Chen</UserName>
          <UserTag>勝食專家</UserTag>
        </UserImage>
        <Description>
          可以挑選一天當作「剩食消滅日」、使用 APP
          或是勝食網站、冷凍未使用之食材、製備小份餐點（現今一份餐點明顯大於 50
          年前的份量），當然最好的方法還是「完食」
        </Description>
      </UserSharesContentOne>
      <UserSharesContentTwo>
        <UserImage>
          <UserAvatar src={UserImgTwo} />
          <UserName>John Wang</UserName>
          <UserTag>勝食達人</UserTag>
        </UserImage>
        <Description>
          在餐廳用餐，建議打包未食用完之食物，或在一開始就請服務生不提供不想食用的食物，另外也可多去有捐剩食、或低碳製程考量的餐廳，以表支持
        </Description>
      </UserSharesContentTwo>
    </UserSharesContainer>
  );
};

const UserSharesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 4rem 6rem;
  background: rgb(240, 243, 247);

  @media screen and (max-width: 900px) {
    flex-direction: column;
    padding: 3rem 3rem 1rem 3rem;
    align-items: center;
  }

  @media screen and (min-width: 1500px) {
    padding: 5vw 15vw;
  }
`;

const UserSharesContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  background: repeating-linear-gradient(
    -25deg,
    #fff,
    #fff 1px,
    #fbfbfb 1px,
    #fbfbfb 3px
  );
  border-right: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
`;

const UserSharesContentOne = styled(UserSharesContent)`
  @media screen and (max-width: 900px) {
    margin: 4rem auto 0rem auto;
  }
`;
const UserSharesContentTwo = styled(UserSharesContent)`
  @media screen and (max-width: 900px) {
    margin: 2rem auto 4rem auto;
  }
`;

const UserImage = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    height: 75%;
    background: linear-gradient(rgba(black, 0) 10%, rgba(black, 0.4));
    bottom: 0;
    left: 0;
    right: 0;
  }

  & h3 {
    width: 75%;
    margin: 0;
    padding: 3rem 2rem;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    font-family: 'Mansalva', cursive;
    font-size: 24px;
    line-height: 1;
    color: white;
    transform: rotate(-2deg);
  }
`;

const UserAvatar = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 2rem;
  margin-top: 2rem;
  border-radius: 50%;
`;

const UserName = styled.h3`
  margin-bottom: 2rem;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 32px;
`;

const UserTag = styled.div`
  width: fit-content;
  padding: 5px 10px;
  position: absolute;
  left: 22px;
  bottom: -14px;
  border-radius: 10px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 22px;
  color: white;
  background-color: #40916c;
`;

const Description = styled.p`
  max-width: 70vw;
  padding: 2rem;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  line-height: 2rem;
  color: #757575;
  background-color: #b7e4c7;
  border-radius: 0px 0px 10px 10px;
  @media screen and (min-width: 900px) {
    max-width: 25vw;
  }
`;

export default UserShares;
