import React, { useState } from 'react';
import Menu from 'components/Header/Menu';
import axiosInstance from 'pages/login/LoginAxios';
import styled from 'styled-components';

const LotteryPost = () => {
  const items = ['로또 구매', '로또 번호 등록(관리자)'];
  const [price, setPrice] = useState('');
  const [winningNumber, setWinningNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      price: parseInt(price, 10),
      winningNumber,
    };

    try {
      const response = await axiosInstance.post('/lotto/', data);
      console.log(response.data);
      alert('로또 번호가 성공적으로 등록되었습니다.');
    } catch (error) {
      console.log(error);
      alert('로또 번호 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <Menu items={items} page={'etc/lottery'} />
      <FormContainer onSubmit={handleSubmit}>
        <Label style={{ marginLeft: '28px' }}>
          금액:
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </Label>
        <Label>
          당첨번호:
          <Input
            type="text"
            value={winningNumber}
            onChange={(e) => setWinningNumber(e.target.value)}
            required
          />
        </Label>
        <Button type="submit">Submit</Button>
      </FormContainer>
    </div>
  );
};

export default LotteryPost;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 16px;
`;

const Input = styled.input`
  margin-left: 10px;
  padding: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
