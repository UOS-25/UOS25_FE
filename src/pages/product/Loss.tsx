import React, { useState } from 'react';
import styled from 'styled-components';
import axiosInstance from 'pages/login/LoginAxios';
import Menu from 'components/Header/Menu';

const Loss = () => {
  const items = ['발주', '발주 확인', '재고 관리', '물건 유실 등록'];

  const [productsCode, setProductCode] = useState('');
  const [counts, setCounts] = useState(0);
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    try {
      console.log({
        productsCode,
        counts,
        reason,
      });
      const response = await axiosInstance.post('/loss/save', {
        productsCode,
        counts,
        reason,
      });
      console.log(response.data);
      setMessage('반영되었습니다.');
      alert('반영되었습니다.');
    } catch (error) {
      console.error(error);
      alert('물건 유실 반영 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Menu items={items} page={'product'} />
      <Title>물건 유실 등록</Title>
      <Input
        type="text"
        placeholder="바코드를 입력해주세요."
        value={productsCode}
        onChange={(e) => setProductCode(e.target.value)}
      />
      <Input
        type="number"
        placeholder="물건 수량을 입력해주세요."
        value={counts}
        onChange={(e) => setCounts(parseInt(e.target.value))}
      />
      <Input
        type="text"
        placeholder="사유를 입력해주세요"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <Button onClick={handleSave}>Save</Button>
    </Container>
  );
};

export default Loss;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 50px auto;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;
