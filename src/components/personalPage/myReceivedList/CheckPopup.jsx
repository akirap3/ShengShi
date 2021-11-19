import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { DialogOverlay } from '@reach/dialog';
import {
  StyledDialogContent,
  PopClose,
  PopTitleContainer,
  TitleIcon,
  PopTitle,
  PopContent,
  PopRow,
  StyledLabel,
  StyledSpan,
  Preview,
  LabelIconContainer,
  PopPlaceIcon,
} from '../../common/popup/PopupUnits';
import {
  getAllContents,
  getCollectionCounts,
  getCurrentUserData,
  onCommentSubmit,
} from '../../../utils/firebase';

import {
  CommentSection,
  ReplyArea,
  RepalyButton,
  CommentSummary,
  NoComment,
} from '../../common/comment/CommentUnits';

import Comment from '../../common/comment/Comment';

import { ErrorMessage, Info, Message } from '../../common/ErrorMessageUnits';

import useCurrentUser from '../../../hooks/useCurrentUser';

const CheckPopup = ({ showEdit, closeEditor, share }) => {
  const currentUser = useCurrentUser();
  const [userData, setUserData] = useState('');
  const [replyComment, setReplayComment] = useState('');
  const [comments, setComments] = useState('');
  const [commentCounts, setCommentCounts] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const getUserData = useCallback(
    () => getCurrentUserData(currentUser, setUserData),
    [currentUser]
  );

  const getComments = useCallback(
    () => getAllContents(`shares/${share.id}/comments`, setComments),
    [share.id]
  );

  const getCommentCounts = useCallback(
    () => getCollectionCounts(`shares/${share.id}/comments`, setCommentCounts),
    [share.id]
  );

  useEffect(() => {
    return getUserData();
  }, [getUserData]);

  useEffect(() => {
    return getComments();
  }, [getComments]);

  useEffect(() => {
    return getCommentCounts();
  }, [getCommentCounts]);

  return (
    <>
      <DialogOverlay isOpen={showEdit} onDismiss={closeEditor}>
        <StyledDialogContent aria-label="popup">
          <PopClose onClick={closeEditor} />
          <PopTitleContainer>
            <TitleIcon />
            <PopTitle>{share?.name || ''}</PopTitle>
          </PopTitleContainer>
          <PopContent>
            <PopRow>
              <FoodLabel>食物名稱</FoodLabel>
              <FoodName>{share?.name || ''}</FoodName>
            </PopRow>
            <PopRow>
              <QuantityLabel>數量</QuantityLabel>
              <Quantity>
                {share?.receivedInfo[currentUser.uid].quantities || 0}
              </Quantity>
            </PopRow>
            <PopRow>
              <DateTimeLabel>日期及時間</DateTimeLabel>
              <DateTime>
                {share?.receivedInfo[currentUser.uid].confirmedTimestamp
                  ?.toDate()
                  .toLocaleString()}
              </DateTime>
            </PopRow>
            <PopRow>
              <LabelIconContainer>
                <PopPlaceLabel>地點</PopPlaceLabel>
                <PopPlaceIcon />
              </LabelIconContainer>
              <PopPlace>{share?.exchangePlace || ''}</PopPlace>
            </PopRow>
            <PopRow>
              <FoodImgLabel>食物照片</FoodImgLabel>
            </PopRow>
            <Preview src={share?.imageUrl || ''} />
            <PopRow>
              <CommentLabel>評論</CommentLabel>
            </PopRow>
            <CommentSection>
              <ReplyArea
                value={replyComment}
                onChange={(e) => setReplayComment(e.target.value)}
              />
              <ErrorMessage isShow={showErrorMessage}>
                <Info />
                <Message>{errorMessage}</Message>
              </ErrorMessage>
              <RepalyButton
                onClick={() =>
                  onCommentSubmit(
                    share,
                    userData,
                    replyComment,
                    currentUser,
                    setReplayComment,
                    setErrorMessage,
                    setShowErrorMessage
                  )
                }
              >
                留言
              </RepalyButton>
              <CommentSummary>
                {`目前共 ${commentCounts || 0} 則留言`}
              </CommentSummary>
              {comments.length !== 0 ? (
                comments.map((comment) => (
                  <Comment
                    currentUser={currentUser}
                    share={share}
                    comment={comment}
                    userData={userData}
                  />
                ))
              ) : (
                <NoComment />
              )}
            </CommentSection>
          </PopContent>
        </StyledDialogContent>
      </DialogOverlay>
    </>
  );
};

const FoodLabel = styled(StyledLabel)``;

const FoodName = styled(StyledSpan)``;

const QuantityLabel = styled(StyledLabel)``;

const Quantity = styled(StyledSpan)``;

const DateTimeLabel = styled(StyledLabel)``;

const DateTime = styled(StyledSpan)``;

const PopPlaceLabel = styled(StyledLabel)``;

const PopPlace = styled(StyledSpan)``;

const FoodImgLabel = styled(StyledLabel)``;

const CommentLabel = styled(StyledLabel)`
  margin-top: 15px;
`;

export default CheckPopup;
