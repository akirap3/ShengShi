import React from 'react';
import styled from 'styled-components';
import Img from '../../../images/homepage/food-1.jpg';
const QRCode = require('qrcode.react');

const MyMgmtList = () => {
  return (
    <>
      <MgmtContainer>
        <Context>
          <ShareImg src={Img} />
          <InfoContainer>
            <QRcodeOne>
              <EmbedQrcode size={60} width={10} height={10} />
            </QRcodeOne>
            <QRcodeTwo>
              <EmbedQrcode size={50} width={10} height={10} />
            </QRcodeTwo>
            <QRcodeThree>
              <EmbedQrcode size={30} width={5} height={5} />
            </QRcodeThree>
            <QRcodeFour>
              <EmbedQrcode size={25} width={5} height={5} />
            </QRcodeFour>
            <RequesterName>領取者：Peter Fan</RequesterName>
            <RequesterPhone>電話：0987654321</RequesterPhone>
            <RequesterEmail>電子郵件：test@gmail.com</RequesterEmail>
            <RequesterQty>領取數量： 10</RequesterQty>
            <RequestedDateTime>
              日期時間：11/5/2021, 5:00:00 PM
            </RequestedDateTime>
            <Address>交換地點：110台灣台北市信義區基隆路一段178號</Address>
            <ButtonContainer>
              <ConfirmedBtn>確認領取</ConfirmedBtn>
              <CancleBtn>取消</CancleBtn>
            </ButtonContainer>
          </InfoContainer>
        </Context>
      </MgmtContainer>
    </>
  );
};

const MgmtContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2vw auto;
`;

const QRcodeBasic = styled.div`
  position: absolute;
  top: 2vw;
  right: 2vw;
`;

const QRcodeOne = styled(QRcodeBasic)`
  @media screen and (max-width: 770px) {
    display: none;
  }
`;

const QRcodeTwo = styled(QRcodeBasic)`
  @media screen and (min-width: 770px) {
    display: none;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const QRcodeThree = styled(QRcodeBasic)`
  @media screen and (min-width: 600px) {
    display: none;
  }
  @media screen and (max-width: 400px) {
    display: none;
  }
`;

const QRcodeFour = styled(QRcodeBasic)`
  @media screen and (min-width: 400px) {
    display: none;
  }
`;

const EmbedQrcode = ({ info, size, height, width }) => {
  const initialProps = {
    value: `http://localhost:3000/personal/${info}`,
    size,
    bgColor: '#ffffff',
    fgColor: '#000000',
    level: 'L',
    includeMargin: false,
    renderAs: 'svg',
    imageSettings: {
      src: 'https://firebasestorage.googleapis.com/v0/b/shengshi-8bc48.appspot.com/o/images%2Flogo%2F5A39D652-C0D9-4689-B443-F410ACC73F15_4_5005_c.jpeg?alt=media&token=f08780e2-f205-44b9-97ca-a30604ed690e',
      x: null,
      y: null,
      height,
      width,
      excavate: true,
    },
  };

  return <QRCode {...initialProps} />;
};

const Context = styled.div`
  display: flex;
  border: 1px solid black;
  max-width: 70vw;
  margin: 1vw 2vw;
  border-radius: 10px;
  @media screen and (max-width: 700px) {
    max-width: 80vw;
    margin: 1.5vw;
  }
`;
const ShareImg = styled.img`
  max-width: 30vw;
  border-radius: 10px 0 0 10px;
  @media screen and (max-width: 700px) {
    max-width: 30vw;
  }
  @media screen and (max-width: 460px) {
    max-width: 30vw;
  }
`;
const InfoContainer = styled.div`
  position: relative;
  padding: 2vw;
  font-size: 16px;
  line-height: 24px;
  @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 24px;
  }
  @media screen and (max-width: 700px) {
    font-size: 14px;
    line-height: 20px;
  }
  @media screen and (max-width: 460px) {
    font-size: 10px;
    line-height: 14px;
  }
`;
const RequesterName = styled.div``;
const RequesterPhone = styled.div``;
const RequesterEmail = styled.div``;
const RequesterQty = styled.div``;
const RequestedDateTime = styled.div``;
const Address = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1vw;
  justify-content: center;
`;
const ConfirmedBtn = styled.button`
  border: 1px solid black;
  padding: 1vw;
  border-radius: 10px;
  background-color: lightseagreen;
  margin-right: 0.5vw;
  color: white;
`;
const CancleBtn = styled.button`
  border: 1px solid black;
  padding: 1vw;
  border-radius: 10px;
  background-color: orangered;
  color: white;
`;

export default MyMgmtList;
