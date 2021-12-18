import { StyledFieldContainer } from '../style/Index.style';
import { StyledIcon, StyledInput } from '../../common/form/FormUnits';

const SignupFiled = ({
  icon,
  hint,
  fieldValue,
  fieldType,
  setFn,
  isLoading,
}) => {
  return (
    <StyledFieldContainer>
      <StyledIcon as={icon} />
      <StyledInput
        type={fieldType}
        placeholder={hint}
        value={fieldValue}
        onChange={(e) => {
          setFn(e.target.value);
        }}
        disabled={isLoading}
      />
    </StyledFieldContainer>
  );
};

export default SignupFiled;
