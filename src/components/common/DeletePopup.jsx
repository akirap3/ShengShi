import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import {
  handleDeleteMember,
  handleArchiveShare,
  handleDeleteToReceive,
  handleDeleteCollected,
  getCurrentUserData,
} from '../../utils/firebase';
import Loading from './Loading';
import useCurrentUser from '../../hooks/useCurrentUser';

import { DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';

import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';

const DeletePopup = ({
  showDelete,
  closeDelete,
  category,
  share,
  isToReceive,
  isCollected,
  toDeleteMember,
}) => {
  const currentUser = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = useCallback(
    () => getCurrentUserData(currentUser, setUserData),
    [currentUser]
  );

  useEffect(() => {
    return getUserData();
  }, [getUserData]);

  return (
    userData && (
      <StyledDialogOverlay
        isOpen={showDelete}
        onDismiss={closeDelete}
        disabled={isLoading}
      >
        <StyledDialogContent aria-label="delete-popup">
          {isLoading && <Loading />}
          <PopClose onClick={closeDelete} disabled={isLoading} />
          <TitleContainer>
            <Info />
            <Title>{`確認刪除此${category}`}</Title>
          </TitleContainer>
          <Row>
            <ConfirmBtn
              onClick={
                isToReceive
                  ? () =>
                      handleDeleteToReceive(setIsLoading, share, closeDelete)
                  : isCollected
                  ? () =>
                      handleDeleteCollected(setIsLoading, share, closeDelete)
                  : toDeleteMember
                  ? () => handleDeleteMember()
                  : () =>
                      handleArchiveShare(
                        setIsLoading,
                        share,
                        closeDelete,
                        currentUser,
                        userData
                      )
              }
              disabled={isLoading}
            >
              確認
            </ConfirmBtn>
            <CancleBtn onClick={closeDelete} disabled={isLoading}>
              取消
            </CancleBtn>
          </Row>
        </StyledDialogContent>
      </StyledDialogOverlay>
    )
  );
};

const StyledDialogOverlay = styled(DialogOverlay)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDialogContent = styled(DialogContent)`
  position: relative;
  border-radius: 10px;
  width: 80vw;
  max-width: 550px;
  background-color: whitesmoke;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;

const PopClose = styled(AiFillCloseCircle)`
  fill: #1e88e582;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 22px;
  height: 22px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Info = styled(BsFillInfoCircleFill)`
  fill: orangered;
  width: 22px;
  height: 22px;
  margin-right: 5px;
`;

const Title = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3vw;
`;

const ConfirmBtn = styled.button`
  margin-right: 5px;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  color: #1e88e5;
  border: 1px solid #1e88e5;
`;

const CancleBtn = styled.button`
  margin-right: 5px;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  color: white;
  background-color: #1e88e5;
`;

export default DeletePopup;
