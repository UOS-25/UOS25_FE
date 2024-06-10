import React from 'react';
import styled from 'styled-components';
import axiosInstance from 'pages/login/LoginAxios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// saleInfo 인터페이스 정의
interface saleInfo {
  id: number;
  storeId: number;
  salesDate: string;
  salesItems: [
    {
      productCode: string;
      counts: number;
    },
  ];
  isCancelled: boolean;
  totalAmount: number;
  type: string;
  gender: string;
  ageGroup: string;
}

const ReceiptDetail = () => {
  const { receiptNumber } = useParams<{ receiptNumber: string }>();
  const [loading, setLoading] = useState(true);
  const [sale, setSale] = useState<saleInfo>();
  const navigate = useNavigate();

  useEffect(() => {
    const getSaleInfo = async () => {
      try {
        const response = await axiosInstance.get(`/sales/${receiptNumber}`);
        setSale(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getSaleInfo();
  }, [receiptNumber]);

  // 환불을 진행하는 함수
  const handleRefund = async () => {
    try {
      const response = await axiosInstance.post(`/sales/refund/${sale?.id}`);
      console.log(response.data);
      alert('환불이 완료되었습니다.');
      navigate('/'); // 환불 후 원하는 페이지로 리디렉션
    } catch (error) {
      console.error(error);
      alert('환불 처리 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <Loading>Loading...</Loading>;

  return (
    <Container>
      <Title>영수증 상세</Title>
      {sale?.salesItems.map((item, index) => (
        <Item key={index}>
          <p>제품 코드: {item.productCode}</p>
          <p>수량: {item.counts}</p>
        </Item>
      ))}
      <TotalAmount>총 금액: {sale?.totalAmount}원</TotalAmount>
      <RefundButton onClick={handleRefund}>환불하기</RefundButton>
    </Container>
  );
};

// Styled-components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Item = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  p {
    margin: 0;
    padding: 5px 0;
  }
`;

const TotalAmount = styled.p`
  font-weight: bold;
  text-align: right;
  margin-top: 20px;
`;

const RefundButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #ff1a1a;
  }
`;

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
  padding: 20px;
`;

export default ReceiptDetail;
