import React from 'react';
import styled from 'styled-components';
import UserImgOne from '../../images/homepage/user-2.jpg';
import UserImgTwo from '../../images/homepage/user-5.jpg';

const UserShares = () => {
  return (
    <UserSharesContainer>
      <UserSharesContent>
        <UserAvatarOne src={UserImgOne} />
        <UserName>使用者名稱</UserName>
        <Description>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt. Neque porro quisquam est, qui dolorem.
        </Description>
      </UserSharesContent>
      <UserSharesContent>
        <UserAvatarTwo src={UserImgTwo} />
        <UserName>使用者名稱</UserName>
        <Description>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt. Neque porro quisquam est, qui dolorem.
        </Description>
      </UserSharesContent>
    </UserSharesContainer>
  );
};

const UserSharesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem 6rem;
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

const UserAvatarOne = styled(UserAvatar)``;
const UserAvatarTwo = styled(UserAvatar)``;

const UserName = styled.h3`
  margin-bottom: 1rem;
`;

const Description = styled.p`
  max-width: 300px;
  line-height: 1.4rem;
`;

export default UserShares;
