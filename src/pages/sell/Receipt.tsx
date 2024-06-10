import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosInstance from 'pages/login/LoginAxios';
import { Link } from 'react-router-dom';
import Menu from 'components/Header/Menu';

interface ReceiptInfo {
  id: number;
  salesDate: string;
  isCancelled: boolean;
}

const Receipt = () => {
  const items = ['판매', '영수증 조회'];

  const [receiptData, setReceiptData] = useState<ReceiptInfo[]>([]);

  useEffect(() => {
    const getReceipt = async () => {
      try {
        const response = await axiosInstance.get('/sales/store');
        console.log(response.data);
        setReceiptData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getReceipt();
  }, []);

  return (
    <Container>
      <Menu items={items} page="sell" />
      <ReceiptList>
        {receiptData
          .filter((receipt) => !receipt.isCancelled) // isCancelled가 false인 항목만 필터링
          .map((receipt) => (
            <ReceiptItem key={receipt.id}>
              <StyledLink to={`/sell/receipt/${receipt.id}`}>
                <ReceiptId>영수증 번호: {receipt.id}</ReceiptId>
                <ReceiptDate>결제 날짜: {receipt.salesDate}</ReceiptDate>
              </StyledLink>
            </ReceiptItem>
          ))}
      </ReceiptList>
    </Container>
  );
};

export default Receipt;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-left: 180px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  width: 100%;
`;

const ReceiptList = styled.ul`
  width: 80%;
  padding: 0;
  list-style: none;
  margin-top: 20px;
`;

const ReceiptItem = styled.li`
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const ReceiptId = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const ReceiptDate = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 5px;
`;
