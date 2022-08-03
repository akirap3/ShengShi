import { useState } from 'react';

import { ErrorMessage, Info, Message } from '../ErrorMessageUnits';
import {
  CommentContainer,
  CommentAvatar,
  CommentContent,
  CommentRow,
  CommentAuthor,
  CommentDateTime,
  CommentText,
  CommentButtonRow,
  EditButton,
  ConfirmBtnRipples,
  ConfirmButton,
  DeleteButton,
} from './style/Comment.style';
import {
  confirmCommentEdit,
  handleDeleteComment,
} from '../../../utils/firebase';

const Comment = ({ share, comment, userData }) => {
  const { author, createdAt, commentContent } = comment;
  const [isEdit, setIsEdit] = useState(false);
  const [editedComment, setEditedComment] = useState(commentContent);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleConfirmCommentEdit = () => {
    if (editedComment) {
      confirmCommentEdit(editedComment, share, comment).then(() => {
        setEditedComment('');
        setIsEdit(false);
        setErrorMessage('');
        setShowErrorMessage(false);
      });
    } else {
      setShowErrorMessage(true);
      setErrorMessage('留言不能是空白');
    }
  };

  const handleEnter = (e) => {
    if (e.charCode === 13) {
      handleConfirmCommentEdit();
    }
  };

  return (
    <>
      <CommentContainer>
        <CommentAvatar src={author.imageUrl} alt="avatar" />
        <CommentContent>
          <CommentRow>
            <CommentAuthor>{author.displayName}</CommentAuthor>
            <CommentDateTime>
              {createdAt.toDate().toLocaleString()}
            </CommentDateTime>
          </CommentRow>
          <CommentText
            value={isEdit ? editedComment : commentContent}
            onChange={
              isEdit ? (e) => setEditedComment(e.target.value) : () => {}
            }
            onKeyPress={handleEnter}
            isEdit
            disabled={!isEdit}
          />
          <ErrorMessage isShow={showErrorMessage}>
            <Info />
            <Message>{errorMessage}</Message>
          </ErrorMessage>
        </CommentContent>
      </CommentContainer>

      <CommentButtonRow>
        {userData.id === author.id && (
          <>
            <EditButton isEdit={isEdit} onClick={() => setIsEdit(true)}>
              編輯
            </EditButton>
            <ConfirmBtnRipples color="#fff" during={3000}>
              <ConfirmButton isEdit={isEdit} onClick={handleConfirmCommentEdit}>
                確定
              </ConfirmButton>
            </ConfirmBtnRipples>
            <DeleteButton
              onClick={() => handleDeleteComment(share, comment, userData)}
            >
              刪除
            </DeleteButton>
          </>
        )}
      </CommentButtonRow>
    </>
  );
};

export default Comment;
