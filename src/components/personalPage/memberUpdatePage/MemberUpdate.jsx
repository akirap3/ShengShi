import React, { useState } from 'react';
import styled from 'styled-components';
import DeletePopup from '../../common/DeletePopup';

const MemberUpdate = () => {
  const [showDelete, setShowDelete] = useState(false);

  const openDelete = () => setShowDelete(true);
  const closeDelete = () => setShowDelete(false);

  return (
    <>
      <FormContainer>
        <FormContext>
          <Row>
            <UserNameLabel>姓名</UserNameLabel>
            <UserName placeholder="John Chen" disabled />
          </Row>
          <Row>
            <EmailLabel>電子郵件</EmailLabel>
            <Email placeholder="johnChen@gmail.com" disabled />
          </Row>
          <Row>
            <PhoneLabel>電話</PhoneLabel>
            <Phone />
          </Row>
          <Row>
            <AboutLabel>關於你</AboutLabel>
            <AboutText />
          </Row>
          <Row>
            <UpdateBtn>更新</UpdateBtn>
            <DeleteBtn onClick={openDelete}>刪除會員</DeleteBtn>
          </Row>
        </FormContext>
      </FormContainer>
      <DeletePopup
        showDelete={showDelete}
        closeDelete={closeDelete}
        category="會員"
        toDeleteMember={true}
      />
    </>
  );
};

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContext = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  margin: 2vw auto;
  padding: 5vw 10vw;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2vw;
`;

const StyledLabel = styled.label`
  width: 8vw;
`;

const UserNameLabel = styled(StyledLabel)``;

const StyledInput = styled.input`
  border-radius: 5px;
`;

const UserName = styled(StyledInput)``;

const EmailLabel = styled(StyledLabel)``;

const Email = styled(StyledInput)``;

const PhoneLabel = styled(StyledLabel)``;

const Phone = styled(StyledInput)``;

const AboutLabel = styled(StyledLabel)``;

const AboutText = styled.textarea`
  border-radius: 5px;
  height: 20vh;
`;

const UpdateBtn = styled.button`
  padding: 1vw;
  /* width: 100%; */
  position: relative;
  width: 20vw;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #00b4cc;
  color: white;
  flex-grow: 1;
  margin-right: 1vw;
`;

const DeleteBtn = styled.button`
  padding: 1vw;
  width: 20vw;
  border: 1px solid black;
  border-radius: 5px;
  background-color: orangered;
  color: white;
  flex-grow: 1;
`;

export default MemberUpdate;
