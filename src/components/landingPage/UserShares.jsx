import React from 'react';
import styled from 'styled-components';
import UserImgOne from '../../images/homepage/user-2.jpg';
import UserImgTwo from '../../images/homepage/user-5.jpg';

const UserShares = () => {
  return (
    <UserSharesContainer>
      <UserSharesContent>
        <UserAvatar src={UserImgOne} />
        <UserName>Anna Chen</UserName>
        <Description>
          可以挑選一天當作「剩食消滅日」、使用APP或是勝食網站、冷凍未使用之食材、製備小份餐點（現今一份餐點明顯大於50年前的份量），當然最好的方法還是「完食」
        </Description>
      </UserSharesContent>
      <UserSharesContent>
        <UserAvatarTwo src={UserImgTwo} />
        <UserName>John Wang</UserName>
        <Description>
          在餐廳用餐，建議打包未食用完之食物，或在一開始就請服務生不提供不想食用的食物，另外也可多去有捐剩食、或低碳製程考量的餐廳，以表支持。
        </Description>
      </UserSharesContent>
    </UserSharesContainer>
  );
};

const UserSharesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 4rem 6rem 2rem 6rem;

  @media screen and (max-width: 600px) {
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
`;

const UserAvatar = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
  border-radius: 50%;
`;

const UserAvatarTwo = styled(UserAvatar)`
  @media screen and (max-width: 600px) {
    margin-top: 1rem;
  }
`;

const UserName = styled.h3`
  margin-bottom: 2rem;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 32px;
`;

const Description = styled.p`
  max-width: 70vw;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  line-height: 2rem;

  @media screen and (min-width: 600px) {
    max-width: 25vw;
  }
`;

export default UserShares;
