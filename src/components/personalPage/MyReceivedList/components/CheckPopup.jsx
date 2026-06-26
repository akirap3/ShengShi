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
import { useTranslation } from '../../../../context/LanguageContext';

const CheckPopup = ({ showEdit, closeEditor, share }) => {
  const currentUser = useCurrentUser();
  const [userData, setUserData] = useState('');
  const [replyComment, setReplayComment] = useState('');
  const [comments, setComments] = useState('');
  const [commentCounts, setCommentCounts] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { t } = useTranslation();

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
      setErrorMessage(t('errCommentEmpty'));
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
              <StyledLabel>{t('foodName')}</StyledLabel>
              <StyledSpan>{share?.name || ''}</StyledSpan>
            </PopRow>
            <PopRow>
              <StyledLabel>{t('quantity')}</StyledLabel>
              <StyledSpan>
                {share?.receivedInfo[currentUser.uid].quantities || 0}
              </StyledSpan>
            </PopRow>
            <PopRow>
              <StyledLabel>{t('dateAndTime')}</StyledLabel>
              <StyledSpan>
                {share?.receivedInfo[currentUser.uid].confirmedTimestamp
                  ?.toDate()
                  .toLocaleString()}
              </StyledSpan>
            </PopRow>
            <PopRow>
              <LabelIconContainer>
                <StyledLabel>{t('place')}</StyledLabel>
                <PopPlaceIcon />
              </LabelIconContainer>
              <StyledSpan>{share?.exchangePlace || ''}</StyledSpan>
            </PopRow>
            <PopRow>
              <StyledLabel>{t('foodPhoto')}</StyledLabel>
            </PopRow>
            <Preview src={share?.imageUrl || ''} />
            <PopRow>
              <CommentLabel>{t('comment')}</CommentLabel>
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
                  {t('postComment')}
                </RepalyButton>
              </ReplyRipples>
              <CommentSummary>
                {t('commentCountLabel').replace('{count}', commentCounts || 0)}
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
