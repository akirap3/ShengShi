import { DialogOverlay, DialogContent } from '@reach/dialog';
import styled from 'styled-components';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiLocationMarker } from 'react-icons/hi';
import { BsCalendarCheckFill, BsFillInfoCircleFill } from 'react-icons/bs';
import SaladImg from '../../../images/common/salad.svg';

export const StyledDialogContent = styled(DialogContent)`
  position: relative;
  width: 80vw;
  max-width: 800px;
  margin-top: 100px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 10px;
`;

export const AlertDialogContent = styled(StyledDialogContent)`
  max-width: 500px;
`;

export const PopClose = styled(AiFillCloseCircle)`
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

export const PopTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #52b788;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;

export const TitleIcon = () => {
  return <SaladIcon src={SaladImg} />;
};

const SaladIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

export const PopTitle = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  color: white;

  @media screen and (min-width: 600px) {
    font-size: 28px;
  }
`;

export const PopContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const PopRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const StyledLabel = styled.label`
  background-color: #52b788aa;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);

  @media screen and (min-width: 600px) {
    font-size: 22px;
  }
`;

export const StyledInput = styled.input`
  flex-grow: 1;
  border: none;
  background: none;
  outline: none;
  border-bottom: 2px solid #d9d7d7;
  padding: 5px 8px;
  margin-left: 10px;
  margin-top: 10px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 14px;

  @media screen and (min-width: 600px) {
    font-size: 18px;
  }
`;

export const StyledSpan = styled.span`
  flex-grow: 1;
  border: none;
  background: none;
  outline: none;
  padding: 5px 8px;
  margin-left: 10px;
  margin-top: 10px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 14px;
  line-height: 24px;

  @media screen and (min-width: 600px) {
    font-size: 18px;
  }
`;

export const LabelIconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const PopPlaceIcon = styled(HiLocationMarker)`
  width: 22px;
  height: 22px;
  fill: lightseagreen;
`;

export const Calendar = styled(BsCalendarCheckFill)`
  width: 22px;
  height: 22px;
  fill: lightseagreen;
  cursor: pointer;
`;

export const Preview = ({ src }) => {
  return (
    <PreviewOutline>
      <PreviewImg src={src} />
    </PreviewOutline>
  );
};

const PreviewOutline = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewImg = styled.img`
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const ImgUpload = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  background-color: lightskyblue;
  color: white;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);

  @media screen and (min-width: 600px) {
    font-size: 22px;
  }
`;

const StyledBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);

  @media screen and (min-width: 600px) {
    font-size: 22px;
  }
`;

export const SubmitBtn = styled(StyledBtn)`
  background-color: #1e88e5;
  color: white;
`;

export const CancelBtn = styled(StyledBtn)`
  border: 1px solid #1e88e5;
  color: #1e88e5;
`;

export const CenterDialogOverlay = styled(DialogOverlay)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AlertBtnRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const InfoIcon = styled(BsFillInfoCircleFill)`
  fill: #2d6a4fee;
  width: 22px;
  height: 22px;
  margin-right: 10px;
`;
