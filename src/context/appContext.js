import { createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [users, setUser] = useState([
    {
      id: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  ]);

  const [cards, setCard] = useState([]);

  const [statuses, setStatuses] = useState({
    getUserStatus: "",
    getCardsStatus: "",
  });

  useEffect(() => {
    setStatuses({ getUserStatus: "loading", getCardsStatus: "loading" });
    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setStatuses({ ...statuses, getUserStatus: "success" });
      })
      .catch((error) => {
        setStatuses({ ...statuses, getUserStatus: "error" });
        console.log(error);
      });

    fetch("http://localhost:8080/cards")
      .then((res) => res.json())
      .then((data) => {
        setCard(data);
        setStatuses({ ...statuses, getCardsStatus: "success" });
      });
  }, []);

  const [loggedUserData, setLoggedUserData] = useState({
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider
      value={{
        users,
        setUser,
        loggedUserData,
        setLoggedUserData,
        isLoggedIn,
        setIsLoggedIn,
        cards,
        setCard,
        statuses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
export default AppContext;
