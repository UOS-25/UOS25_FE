import React from 'react';
import Menu from 'components/Header/Menu';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from "../login/LoginAxios";
import {Link} from "react-router-dom";

interface order {
  confirm: boolean,
  counts: number,
  id: number,
  orderDate: string,
  orderNumber: string;
  productCode: string,
  storeId: number,
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
        const response = await axiosInstance.get(`/orders/findByStoreId`); // api 주소 변경
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
      <Menu items={items} page="product"></Menu>
      <ul>
        {orderList.map((item) => (
            <li key={item.id} style={{marginLeft: '250px'}}>
              <Link to={`/product/1/${item.id}`}>
                {item.orderNumber}
              </Link>
            </li>
        ))}
      </ul>
    </Container>
  );
};
export default Order;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
