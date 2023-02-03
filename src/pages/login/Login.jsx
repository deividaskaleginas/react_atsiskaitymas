import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FormInput } from "../../components/formInput/FormInput";

import AppContext from "../../context/appContext";

export const Login = () => {
  const { users, setLoggedUserData, setIsLoggedIn } = useContext(AppContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Enter Password",
      label: "Password",
    },
  ];

  const [failedLogIn, setFailedLogIn] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const checkUser = () => {
    const loggedInUser = users.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (loggedInUser) {
      setLoggedUserData(loggedInUser);
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setFailedLogIn(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkUser();
  };

  return (
    <LoginSection>
      <WelcomeTextBox>
        <span className="helloMessage">Login</span>
      </WelcomeTextBox>

      <LoginForm onSubmit={handleSubmit}>
        <div className="formInputs">
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          {failedLogIn && <span>Wrong username our password</span>}
        </div>
        <div className="button-div">
          <ButtonBig>Sign In</ButtonBig>
        </div>
      </LoginForm>
    </LoginSection>
  );
};

const LoginSection = styled.section`
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
  padding-bottom: 3.5625rem;

  .helloMessage {
    font-size: 1.875rem;
    font-weight: 600;
    line-height: 2.8125rem;
  }

  .welcomeMessage {
    font-size: 1.25rem;
    font-weight: 400;
    color: rgba(18, 18, 18, 1);
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;

  .formInputs {
    span {
      color: #ff9c00;
    }
  }

  span {
    padding-top: 40px;
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
