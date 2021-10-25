import React from 'react';
import styled from 'styled-components';

const MemberUpdate = () => {
  return (
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
        <UpdateBtn>更新</UpdateBtn>
      </FormContext>
    </FormContainer>
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
  width: fit-content;
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
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
  background-color: lightslategray;
  color: white;
`;

export default MemberUpdate;
