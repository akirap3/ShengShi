import styled from 'styled-components';

export const MgmtContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 150px;
`;

export const Context = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 15px;
  border-radius: 0 0 10px 10px;
  border-top: 10px solid #52b788;
  max-width: 1000px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);

  @media screen and (min-width: 550px) {
    flex-direction: row;
    width: 500px;
    border-left: 10px solid #52b788;
    border-top: 0;
    border-radius: 0 10px 10px 0;
    justify-content: center;
  }

  @media screen and (min-width: 900px) {
    width: 700px;
  }
`;

export const ShareImg = styled.img`
  width: 300px;
  object-fit: cover;

  @media screen and (min-width: 550px) {
    width: 185px;
  }

  @media screen and (min-width: 900px) {
    width: 250px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100%;
  padding: 10px 15px;
  background-color: hsla(146, 40%, 40%, 0.4);
  border-radius: 0 0 10px 10px;
`;

export const Text = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  color: #000000d1;
  line-height: 28px;
`;

export const RequesterName = styled(Text)`
  margin-top: 10px;
  @media screen and (min-width: 550px) {
    margin-top: 5px;
  }
`;

export const RequesterPhone = styled(Text)``;
export const RequesterEmail = styled(Text)``;
export const RequesterQty = styled(Text)``;
export const RequestedDateTime = styled(Text)``;
export const Address = styled(Text)`
  margin-bottom: 25px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1vw;
  justify-content: center;
  margin-bottom: 15px;
  @media screen and (min-width: 550px) {
    margin-bottom: 5px;
  }
`;

export const ConfirmedBtn = styled.button`
  margin-right: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 22px;
  color: white;
  background-color: #1e88e5;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  cursor: pointer;
`;

export const CancleBtn = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 22px;
  background-color: white;
  color: #52b788;
  opacity: 0.8;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  cursor: pointer;
`;
