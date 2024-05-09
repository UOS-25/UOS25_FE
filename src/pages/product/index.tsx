import Menu from "components/Header/Menu";
import React from "react";
import styled from "styled-components";

const Product = () => {
  const items = [
    "발주",
    "발주 확인",
    "입고 관리",
    "출고 관리",
    "재고 관리",
    "폐기 제품",
    "제품 도난/파손",
  ];
  return (
    <Container>
      <Menu items={items} page="product"></Menu>
      <div>sssadfsadfsa</div>
    </Container>
  );
};

export default Product;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
