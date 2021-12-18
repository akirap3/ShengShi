import styled from 'styled-components';
import Ripples from 'react-ripples';
import { BsFillPersonFill } from 'react-icons/bs';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  font-family: 'cwTeXYen', sans-serif;
`;

const FormContext = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 5vh auto;
  padding: 30px;
  border-radius: 10px;
  height: fit-content;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: rgba(219, 245, 255, 0.3);

  @media screen and (max-width: 560px) {
    margin-right: 2rem;
    margin-left: 2rem;
    padding: 2rem;
  } ;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 35px;
`;

const NameIcon = styled(BsFillPersonFill)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  fill: rgb(129, 129, 129);

  @media screen and (max-width: 540px) {
    align-self: flex-start;
    margin-top: 10px;
  }
`;

const AboutText = styled.textarea`
  flex-grow: 1;
  border: none;
  background: none;
  outline: none;
  border-bottom: 2px solid #d9d7d7;
  padding: 5px 8px;
`;

const PreviewImg = styled.img`
  width: 250px;
  border-radius: 10px;
  margin-bottom: 2vw;

  @media screen and (min-width: 600px) {
    width: 350px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const UploadRipples = styled(Ripples)`
  flex-grow: 1;
  margin-right: 5px;
  border-radius: 5px;

  @media screen and (max-width: 470px) {
    width: 100%;
    margin-bottom: 0.5rem;
    margin-right: 0;
  }
`;

const ImgUpload = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 0.5rem;
  background-color: #1e88e5;
  border-radius: 5px;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;

const UploadBtn = styled.input`
  display: none;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  border: 1px solid #d9d7d7;
  padding: 0.5rem;
  border: 1px solid darkcyan;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const UpdateRipples = styled(Ripples)`
  flex-grow: 1;
  margin-right: 5px;
  border-radius: 5px;

  @media screen and (max-width: 470px) {
    width: 48%;
  }
`;

const UpdateBtn = styled(Button)`
  background: #52b788;
  backdrop-filter: blur(5px);
  font-size: 16px;
  color: white;
`;

const DelBtnRipples = styled(Ripples)`
  flex-grow: 1;
  border-radius: 5px;
  @media screen and (max-width: 470px) {
    width: 48%;
  }
`;

const DeleteBtn = styled(Button)`
  background: rgba(255, 255, 255, 0.3);
  color: rgb(129, 129, 129);
`;

export {
  FormContainer,
  FormContext,
  Row,
  NameIcon,
  AboutText,
  PreviewImg,
  ButtonContainer,
  UploadRipples,
  ImgUpload,
  UploadBtn,
  UpdateRipples,
  UpdateBtn,
  DelBtnRipples,
  DeleteBtn,
};
