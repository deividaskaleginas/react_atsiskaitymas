import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

import AppContext from "../../context/appContext";

const LOGGED_IN_USER_NAV_LINKS = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Add",
    link: "/add",
  },
];

const OFFLINE_USER_NAV_LINKS = [
  {
    name: "Login",
    link: "/login",
  },
  {
    name: "Register",
    link: "/register",
  },
];

export const Header = () => {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <HeaderStyled>
      <NavWrapper>
        <FakeLogo to="/">React APP</FakeLogo>
        <nav>
          <NavigationList>
            {isLoggedIn
              ? LOGGED_IN_USER_NAV_LINKS.map(({ name, link }, index) => (
                  <NavListItem key={index}>
                    <NavLink key={index} to={link}>
                      {name}
                    </NavLink>
                  </NavListItem>
                ))
              : OFFLINE_USER_NAV_LINKS.map(({ name, link }, index) => (
                  <NavListItem key={index}>
                    <NavLink key={index} to={link}>
                      {name}
                    </NavLink>
                  </NavListItem>
                ))}
          </NavigationList>
        </nav>
      </NavWrapper>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;

  @media only screen and (min-width: 75rem) {
    margin: 0 auto;
    max-width: 75rem;
  }
`;

const FakeLogo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  color: black;
`;

const NavigationList = styled.ul`
  display: flex;
  gap: 1rem;
`;

const NavListItem = styled.li`
  list-style: none;
  font-weight: 700;

  a {
    color: #222;
    text-decoration: none;

    &:hover {
      color: #129575;
    }
  }
`;
