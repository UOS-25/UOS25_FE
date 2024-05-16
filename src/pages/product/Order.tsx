import React from 'react';
import Menu from 'components/Header/Menu';
import styled from 'styled-components';

const Order = () => {
  const items = [
    '발주',
    '발주 확인',
    '입고 관리',
    '출고 관리',
    '재고 관리',
    '폐기 제품',
    '제품 도난/파손',
  ];
  return (
    <Container>
      <Menu items={items} page="product"></Menu>
      <div>sssadfsadddddddddddddddddddddddddddddddddddddfsa</div>
    </Container>
  );
};
export default Order;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
