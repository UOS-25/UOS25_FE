import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Etc = () => {
  const navigate = useNavigate();

  const handleClick = (domain: string) => {
    navigate(domain);
  };

  return (
    <ButtonGrid>
      <Button onClick={() => handleClick('/etc/Post/0')}>택배 접수</Button>
      <Button onClick={() => handleClick('/etc/ATM/0')}>ATM</Button>
      <Button onClick={() => handleClick('/etc/Utility/0')}>공공요금 납부</Button>
      <Button onClick={() => handleClick('/etc/Lottery/0')}>롯또복권</Button>
    </ButtonGrid>
  );
};

export default Etc;

const Button = styled.button`
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 10px 20px;
  width: auto;
  height: 300px;
  padding: 10px;
  font-size: 30px;
  background-color: #005eb8;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color: 0.5s;
  border-radius: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;
