import { useContext } from "react";
import styled from "styled-components";

import AppContext from "../../context/appContext";

export const Home = () => {
  const { cards, statuses } = useContext(AppContext);

  const isCardsListEmpty = cards?.length === 0;

  return (
    <>
      {statuses.getCardsStatus === "loading" ? (
        "loading..."
      ) : (
        <GridWrapper>
          {isCardsListEmpty ? (
            <h4>No cards</h4>
          ) : (
            cards?.map((card, index) => {
              return (
                <OrderCardStyled key={index}>
                  <div>
                    <OrderID>{card.title}</OrderID>
                  </div>
                  <OrderPriceCostumersData>
                    <span>{card.description}</span>
                  </OrderPriceCostumersData>
                </OrderCardStyled>
              );
            })
          )}
        </GridWrapper>
      )}
    </>
  );
};

const GridWrapper = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(2, 1fr);
  padding: 2rem 1rem;
  min-height: 60vh;
`;

const OrderCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  &:hover {
    box-shadow: rgba(18, 149, 117) 0px 10px 50px;
  }
`;

const OrderID = styled.div`
  font-weight: 700;
  color: #129575;
`;

const OrderPriceCostumersData = styled.div`
  display: flex;
  gap: 20px;
  margin: 0.625rem;
  padding: 5px 15px;
  border: 2px solid #129575;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`;
