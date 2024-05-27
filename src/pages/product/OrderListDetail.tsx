import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../login/LoginAxios';
import Menu from 'components/Header/Menu';

const OrderListDetail = () => {
  const items: string[] = [
    '발주',
    '발주 확인',
    '입고 관리',
    '출고 관리',
    '재고 관리',
    '폐기 제품',
    '제품 도난/파손',
  ];
  const { orderNumber } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axiosInstance.get(
          `/orders/findByOrderNumber?orderNumber=${orderNumber}`,
        );
        setOrder(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrder();
  }, [orderNumber]);

  const processOrders = (orders) => {
    const orderMap = {};

    orders.forEach((order) => {
      const { orderNumber, productCode } = order;

      if (!orderMap[orderNumber]) {
        orderMap[orderNumber] = {};
      }

      if (!orderMap[orderNumber][productCode]) {
        orderMap[orderNumber][productCode] = 0;
      }

      orderMap[orderNumber][productCode] += 1;
    });

    return orderMap;
  };

  const renderOrders = (orders) => {
    return Object.keys(orders).map((orderNumber) => (
      <OrderItem key={orderNumber}>
        <OrderId>발주 번호: {orderNumber}</OrderId>
        {Object.keys(orders[orderNumber]).map((productCode) => (
          <ProductContainer key={productCode}>
            바코드: {productCode} 수량: {orders[orderNumber][productCode]}
          </ProductContainer>
        ))}
      </OrderItem>
    ));
  };

  const processedOrders = processOrders(order);

  return (
    <Container>
      <Menu items={items} page={'product'} />
      {loading ? (
        <LoadingText>loading..</LoadingText>
      ) : (
        <OrderList>{renderOrders(processedOrders)}</OrderList>
      )}
    </Container>
  );
};

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

const OrderId = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const ProductContainer = styled.div`
  margin-left: 20px;
  font-size: 14px;
  color: #555;
  margin-top: 5px;
`;

const LoadingText = styled.h2`
  text-align: center;
`;

export default OrderListDetail;
