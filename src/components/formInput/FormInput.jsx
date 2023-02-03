import styled from "styled-components";

export const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  return (
    <InputContainer>
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;

  label {
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.3125rem;
    color: rgba(18, 18, 18, 1);
  }

  input {
    width: 300px;
    border: 1.5px solid rgba(217, 217, 217, 1);
    border-radius: 0.625rem;
    color: rgba(18, 18, 18, 1);
    font-size: 11px;
    padding: 1.1875rem 0 1.1875rem 1.25rem;
    line-height: 16.5px;
    margin-bottom: 1.875rem;
  }
`;
