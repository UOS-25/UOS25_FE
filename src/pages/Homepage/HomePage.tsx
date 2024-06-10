import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './Homepage.css';

interface Props {
  onClick: () => void;
}

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = (domain: string) => {
    navigate(domain);
  };

  const ExampleComponent: React.FC<Props> = ({ onClick }) => (
    <Button id="a" variant="primary" onClick={onClick}>
      자산 관리
    </Button>
  );
  // 버튼 클릭때마다 post 필요
  return (
    <ButtonGrid>
      <Button onClick={() => handleClick('/product/0')}>
        <Text>제품 관리</Text>
      </Button>
      <Button onClick={() => handleClick('/sell/0')}>
        <Text>판매 관리</Text>
      </Button>
      <Button onClick={() => handleClick('/asset')}>
        <Text>자산 관리</Text>
      </Button>
      <Button onClick={() => handleClick('/event/0')}>
        <Text>이벤트 관리</Text>
      </Button>
      <Button onClick={() => handleClick('/employee/0')}>
        <Text>직원 관리</Text>
      </Button>
      <Button onClick={() => handleClick('/etc')}>
        <Text>기타 관리</Text>
      </Button>
    </ButtonGrid>
  );
};

export default HomePage;

const ButtonGrid = styled.div`
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 95%;
  height: 600px;
`;

const Text = styled.div`
  font-family: sans-serif;
  font-size: 40px;
`;
