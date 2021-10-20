import React from 'react';
import styled from 'styled-components';
import UserImgOne from '../../images/homepage/user-2.jpg';
import UserImgTwo from '../../images/homepage/user-5.jpg';

const UserShares = () => {
  return (
    <UserSharesContainer>
      <UserSharesContent>
        <UserAvatar src={UserImgOne} />
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
  padding: 2rem 6rem;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    padding: 1rem 3rem;
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
  margin-bottom: 1rem;
`;

const Description = styled.p`
  max-width: 35vw;
  line-height: 1.4rem;

  @media screen and (max-width: 750px) {
    max-width: 30vw;
  }
  @media screen and (max-width: 600px) {
    max-width: 70vw;
  }
`;

export default UserShares;
