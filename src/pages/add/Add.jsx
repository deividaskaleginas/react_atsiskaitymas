import { useContext, useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";

import AppContext from "../../context/appContext";
import { FormInput } from "../../components/formInput/FormInput";

export const Add = () => {
  const { setCard, cards } = useContext(AppContext);
  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const [cardStatus, setCardStatus] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "title",
      type: "text",
      placeholder: "Enter Title",
      label: "Title",
    },
    {
      id: 2,
      name: "description",
      type: "textarea",
      placeholder: "Enter Description",
      label: "Description",
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const createCard = () => {
    const cardData = {
      id: uniqid(),
      title: values.title,
      description: values.description,
    };

    fetch("http://localhost:8080/cards/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(cardData),
    });

    setCard([...cards, cardData]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCard();
    setCardStatus(true);
  };
  return (
    <RegistrationSection>
      <WelcomeTextBox>
        <span className="createAccText">Add card</span>
      </WelcomeTextBox>
      <RegistrationFormContainer>
        {!cardStatus ? (
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <div className="button-div">
              <ButtonBig>Add card</ButtonBig>
            </div>
          </form>
        ) : (
          <span>Your card successfully submitted</span>
        )}
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
  background-color: #129575;

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
