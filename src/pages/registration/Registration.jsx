import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid";
import styled from "styled-components";

import { FormInput } from "../../components/formInput/FormInput";
import AppContext from "../../context/appContext";

export const Registration = () => {
  const { users, setUser, setLoggedUserData, setIsLoggedIn } =
    useContext(AppContext);
  const [exist, setExist] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const navigate = useNavigate();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const createUser = () => {
    const userData = {
      id: uniqid(),
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    setLoggedUserData(userData);
    setUser([...users, userData]);

    fetch("http://localhost:8080/users/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUser = users.find((user) => user.email === values.email);

    if (existingUser) {
      setExist(true);
    } else {
      createUser();
      setIsLoggedIn(true);
      navigate("/");
    }
  };
  return (
    <RegistrationSection>
      <WelcomeTextBox>
        <span className="createAccText">Create an account</span>
      </WelcomeTextBox>
      <RegistrationFormContainer>
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          {exist && (
            <span className="userExist">
              User with this email already exists
            </span>
          )}
          <div className="button-div">
            <ButtonBig>Sign Up</ButtonBig>
          </div>
        </form>
      </RegistrationFormContainer>
    </RegistrationSection>
  );
};

const RegistrationSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 19.6875rem;

  margin: 0 auto;
`;

const WelcomeTextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.25rem;

  .createAccText {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 30px;
  }

  .helpCreateAcc {
    font-size: 0.6875rem;
    font-weight: 400;
    line-height: 1.0313rem;
    color: rgba(18, 18, 18, 1);
  }
`;
const RegistrationFormContainer = styled.div`
  .userExist {
    display: block;
    text-align: center;
    font-size: 16px;
    padding-bottom: 16px;
    color: #ff9c00;
  }
  .toSignIn {
    display: block;
    padding-top: 1.875rem;
    text-align: center;
    color: black;

    a {
      text-decoration: none;
      color: #ff9c00;
    }
  }
`;

const ButtonBig = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5625rem;
  height: 3.75rem;
  width: 315px;
  border: none;
  border-radius: 0.625rem;
  background-color: rgba(18, 149, 117, 1);

  color: rgba(255, 255, 255, 1);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  align-items: center;

  :hover {
    cursor: pointer;
    background-color: #08a880;
  }
`;
