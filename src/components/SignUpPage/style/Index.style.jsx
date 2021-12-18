import styled from 'styled-components';
import Main from '../../common/Main';
import {
  FormContainer,
  FieldContainer,
  StyledIcon,
  StyledInput,
} from '../../common/form/FormUnits';

const StyledMain = styled(Main)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupContainer = styled(FormContainer)`
  margin: 50px auto 50px auto;

  @media screen and (max-width: 560px) {
    margin-right: 2rem;
    margin-left: 2rem;
    padding: 2rem;
  } ;
`;

const StyledFieldContainer = styled(FieldContainer)`
  flex-wrap: wrap;
`;

const NameIcon = styled(StyledIcon)`
  @media screen and (max-width: 540px) {
    align-self: flex-start;
    margin-top: 10px;
  }
`;

const NameFiled = styled(StyledInput)`
  flex-grow: 1;
  margin-right: 0.5rem;
  @media screen and (max-width: 540px) {
    margin-right: 0;
    margin-bottom: 35px;
  }
`;

const LastNameField = styled(StyledInput)`
  flex-grow: 1;
  @media screen and (max-width: 540px) {
    margin-left: 30px;
  }
`;

export {
  StyledMain,
  SignupContainer,
  StyledFieldContainer,
  NameIcon,
  NameFiled,
  LastNameField,
};
