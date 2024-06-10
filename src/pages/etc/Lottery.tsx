import React, { useState } from 'react';
import Menu from 'components/Header/Menu';
import axiosInstance from 'pages/login/LoginAxios';
import styled from 'styled-components';

const Lottery = () => {
  const items = ['로또 구매', '로또 번호 등록(관리자)'];
  const [lottoNumber, setLottoNumber] = useState('');
  const [result, setResult] = useState({ count: 0, rank: '' });

  const handleBuyLotto = async () => {
    try {
      const lottoAmount = {
        amount: 1,
      };
      console.log(lottoAmount);
      const response = await axiosInstance.post('/lotto/buy', lottoAmount);
      alert('로또 구매 완료');
      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert('로또 구매 중 오류가 발생했습니다.');
    }
  };

  const handleCheckLotto = async (e) => {
    e.preventDefault();
    if (lottoNumber.length !== 6 || !/^\d{6}$/.test(lottoNumber)) {
      alert('로또 번호는 5자리 숫자여야 합니다.');
      return;
    }

    try {
      const response = await axiosInstance.get(`/lotto/check/${lottoNumber}`);
      setResult(response.data);
      alert(`맞춘 개수: ${response.data.count}, 등수: ${response.data.rank}`);
    } catch (error) {
      console.log(error);
      alert('로또 번호 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <Menu items={items} page={'etc/lottery'} />
      <FormContainer>
        <Button onClick={handleBuyLotto}>로또 구매</Button>
        <form>
          <Label>
            로또 번호:
            <Input
              type="text"
              value={lottoNumber}
              onChange={(e) => setLottoNumber(e.target.value)}
              maxLength={6}
              placeholder="6자리 숫자를 입력해주세요."
              pattern="\d{6}"
              required
            />
          </Label>
          <Button type="submit" onClick={handleCheckLotto}>
            번호 확인
          </Button>
        </form>
      </FormContainer>
      {result.rank && (
        <ResultContainer>
          <p>맞춘 개수: {result.count}</p>
          <p>등수: {result.rank}</p>
        </ResultContainer>
      )}
    </div>
  );
};

export default Lottery;

const FormContainer = styled.div`
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

const ResultContainer = styled.div`
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
`;
