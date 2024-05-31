import React from 'react';
import Menu from 'components/Header/Menu';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../login/LoginAxios';
import { Link } from 'react-router-dom';

interface order {
  orderDate: string;
  orderNumber: string;
}
const Order = () => {
  const items: string[] = [
    '발주',
    '발주 확인',
    '입고 관리',
    '출고 관리',
    '재고 관리',
    '폐기 제품',
    '제품 도난/파손',
  ];

  const [orderList, setOrderList] = useState<order[]>([]);
  useEffect(() => {
    const getOrderList = async () => {
      try {
        const response = await axiosInstance.post(`/orders/board`); // api 주소 변경
        setOrderList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching board list:', error);
      }
    };

    getOrderList();
  }, []);

  return (
    <Container>
      <Menu items={items} page={'product'} />
      <OrderList>
        {orderList.map((item) => (
          <OrderItem key={item.orderNumber}>
            <StyledLink to={`/product/1/${item.orderNumber}`}>
              <OrderId>발주 번호: {item.orderNumber}</OrderId>
              <OrderDate>발주 일자: {item.orderDate}</OrderDate>
            </StyledLink>
          </OrderItem>
        ))}
      </OrderList>
    </Container>
  );
};

export default Order;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-left: 180px;
`;

const OrderList = styled.ul`
  width: 80%;
  padding: 0;
  list-style: none;
  margin-top: 20px;
`;

const OrderItem = styled.li`
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  width: 100%;
`;

const OrderId = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const OrderDate = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 5px;
`;
