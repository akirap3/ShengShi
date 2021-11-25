import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  font-family: 'cwTeXYen', sans-serif;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: rgba(219, 245, 255, 0.3);
  backdrop-filter: blur(5px);
`;

export const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 40px;
  text-transform: uppercase;
  color: #2b2b2b;
`;

export const FieldContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
`;

export const StyledIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  fill: rgb(129, 129, 129);
`;

export const StyledReadOnly = styled.input`
  flex-grow: 1;
  padding: 5px 8px;
  border: none;
  background: none;
  outline: none;
`;

export const StyledInput = styled(StyledReadOnly)`
  border-bottom: 2px solid #d9d7d7;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-family: 'cwTeXYen', sans-serif;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  border-radius: 5px;
  padding: 5px 15px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  @media screen and (max-width: 470px) {
    width: 48%;
    font-size: 14px;
  }
`;

export const NativeButton = styled(Button)`
  margin-right: 5px;
  font-size: 16px;
  color: white;
  background: #1e88e5;

  @media screen and (max-width: 470px) {
    width: 100%;
    margin-bottom: 10px;
    margin-right: 0;
  }
`;

export const FBButton = styled(Button)`
  margin-right: 5px;
  font-size: 16px;
  border: 1px solid #d9d7d7;
`;

export const GoogleButton = styled(Button)`
  border: 1px solid #d9d7d7;
`;

export const StyledBtnIcon = styled.div`
  height: 20px;
  width: 20px;
  margin-right: 5px;
`;

export const FbIcon = styled(StyledBtnIcon)`
  fill: rgb(35, 140, 241);
`;

export const Text = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
  text-align: center;
  margin-top: 15px;
`;

export const StyledLink = styled(Link)`
  font-size: 16px;
  color: #40916c;
`;
