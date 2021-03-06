import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { DialogOverlay } from '@reach/dialog';

import useCurrentUser from '../../../../hooks/useCurrentUser';
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
} from '../../../common/popup/PopupUnits';
import {
  getAllContents,
  getCollectionCounts,
  getCurrentUserData,
  onCommentSubmit,
} from '../../../../utils/firebase';
import {
  CommentSection,
  ReplyArea,
  ReplyRipples,
  RepalyButton,
  CommentSummary,
  NoComment,
} from '../../../common/comment/CommentUnits';
import Comment from '../../../common/comment/Comment';
import { ErrorMessage, Info, Message } from '../../../common/ErrorMessageUnits';

const CheckPopup = ({ showEdit, closeEditor, share }) => {
  const currentUser = useCurrentUser();
  const [userData, setUserData] = useState('');
  const [replyComment, setReplayComment] = useState('');
  const [comments, setComments] = useState('');
  const [commentCounts, setCommentCounts] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    return getCurrentUserData(currentUser, setUserData);
  }, [currentUser]);

  useEffect(() => {
    return getAllContents(`shares/${share.id}/comments`, setComments);
  }, [share.id]);

  useEffect(() => {
    return getCollectionCounts(`shares/${share.id}/comments`, setCommentCounts);
  }, [share.id]);

  const handleOnCommentSubmit = () => {
    if (replyComment) {
      onCommentSubmit(share, userData, replyComment).then(() => {
        setReplayComment('');
        setErrorMessage('');
        setShowErrorMessage(false);
      });
    } else {
      setShowErrorMessage(true);
      setErrorMessage('留言不能是空白');
    }
  };

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
              <StyledLabel>食物名稱</StyledLabel>
              <StyledSpan>{share?.name || ''}</StyledSpan>
            </PopRow>
            <PopRow>
              <StyledLabel>數量</StyledLabel>
              <StyledSpan>
                {share?.receivedInfo[currentUser.uid].quantities || 0}
              </StyledSpan>
            </PopRow>
            <PopRow>
              <StyledLabel>日期及時間</StyledLabel>
              <StyledSpan>
                {share?.receivedInfo[currentUser.uid].confirmedTimestamp
                  ?.toDate()
                  .toLocaleString()}
              </StyledSpan>
            </PopRow>
            <PopRow>
              <LabelIconContainer>
                <StyledLabel>地點</StyledLabel>
                <PopPlaceIcon />
              </LabelIconContainer>
              <StyledSpan>{share?.exchangePlace || ''}</StyledSpan>
            </PopRow>
            <PopRow>
              <StyledLabel>食物照片</StyledLabel>
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
              <ReplyRipples color="#bbdefb" during={3000}>
                <RepalyButton onClick={handleOnCommentSubmit}>
                  留言
                </RepalyButton>
              </ReplyRipples>
              <CommentSummary>
                {`目前共 ${commentCounts || 0} 則留言`}
              </CommentSummary>
              {comments.length !== 0 ? (
                comments.map((comment) => (
                  <Comment
                    key={comment.id}
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

const CommentLabel = styled(StyledLabel)`
  margin-top: 15px;
`;

export default CheckPopup;
