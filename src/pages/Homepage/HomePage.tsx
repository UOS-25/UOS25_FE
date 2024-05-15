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
      {/* <CustomButton onClick={() => handleClick('/product')}>제품 관리</CustomButton> */}
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => handleClick('/sell')}
      >
        판매 관리
      </button>
      <Button variant="secondary" onClick={() => handleClick('/asset')}>
        자산 관리
      </Button>
      <Button onClick={() => handleClick('/event')}>이벤트 관리</Button>
      <Button onClick={() => handleClick('/employee')}>직원 관리</Button>
      <Button onClick={() => handleClick('/etc')}>기타 관리</Button>
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
