import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = (domain: string) => {
    navigate(domain);
  };

  return (
    <ButtonGrid>
      <Button onClick={() => handleClick("/product")}>제품 관리</Button>
      <Button onClick={() => handleClick("/sell")}>판매 관리</Button>
      <Button onClick={() => handleClick("/asset")}>자산 관리</Button>
      <Button onClick={() => handleClick("/event")}>이벤트 관리</Button>
      <Button onClick={() => handleClick("/employee")}>기타 관리</Button>
      <Button onClick={() => handleClick("/etc")}>직원 관리</Button>
    </ButtonGrid>
  );
};

export default HomePage;

const Button = styled.button`
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 10px 20px;
  width: auto;
  height: 300px;
  padding: 10px;
  font-size: 30px;
  background-color: #005eb8;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color: 0.5s;
  border-radius: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;
