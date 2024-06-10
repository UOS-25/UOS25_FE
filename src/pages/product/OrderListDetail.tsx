import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../login/LoginAxios';
import Menu from 'components/Header/Menu';

const OrderListDetail = () => {
  const items = ['발주', '발주 확인', '재고 관리', '폐기 제품 등록'];

  const { orderNumber } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);

  const handleConfirm = async (orderNumber, productCode, orderDate) => {
    try {
      // const response = await axiosInstance.post(`/stocks/save`, {
      //   productCode: 'P002',
      //   counts: 0,
      // });
      const response = await axiosInstance.post(
        `/orders/confirm?orderNumber=${orderNumber}&productCode=${productCode}&confirm=true&orderDate=${orderDate}`,
      );
      console.log(response.data);
      alert('입고 확인');
    } catch (error) {
      console.log(error);
      alert('입고 확인 중 오류가 발생했습니다.');
    }
  };

  const handleNotReceived = () => {
    alert('본사에 전달합니다.');
  };

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
      const { orderNumber, productCode, counts, orderDate } = order;

      if (!orderMap[orderNumber]) {
        orderMap[orderNumber] = [];
      }

      orderMap[orderNumber].push({ productCode, quantity: counts, orderDate });
    });

    return orderMap;
  };

  const renderOrders = (orders) => {
    return Object.keys(orders).map((orderNumber) => (
      <OrderItem key={orderNumber}>
        <OrderId>발주 번호: {orderNumber}</OrderId>
        {orders[orderNumber].map((item, index) => (
          <ProductContainer key={index}>
            바코드: {item.productCode} 수량: {item.quantity}
            <ButtonContainer>
              <ConfirmButton
                onClick={() => handleConfirm(orderNumber, item.productCode, item.orderDate)}
              >
                확인 완료
              </ConfirmButton>
              <NotReceivedButton onClick={() => handleNotReceived()}>미수령</NotReceivedButton>
            </ButtonContainer>
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

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const ConfirmButton = styled.button`
  margin-right: 10px;
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

const NotReceivedButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

const LoadingText = styled.h2`
  text-align: center;
`;

export default OrderListDetail;
