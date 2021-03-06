import styled from 'styled-components';
import { BsFillInfoCircleFill } from 'react-icons/bs';

export const ErrorMessage = styled.div`
  display: ${({ isShow }) => (isShow ? 'flex' : 'none')};
  align-items: center;
  margin-top: 10px;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #d8f3dc;
`;

export const Info = styled(BsFillInfoCircleFill)`
  width: 16px;
  height: 16px;
  margin-right: 10px;
  fill: #1e88e5;
`;

export const Message = styled.span`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 16px;
`;
