import React from 'react';
import styled from 'styled-components';
import emblem from './emblem.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <HeaderContainer>
      <Container>
        <LogoContainer to="/">
          <LogoImage src={emblem} alt="emblem" />
          <h1>UOS25</h1>
        </LogoContainer>
        <WelcomeMessage>000님 환영합니다</WelcomeMessage>
      </Container>
      <Separator />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LogoImage = styled.img`
  height: 70px;
`;
const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black; // 여기서 색상을 원하는 대로 조정하세요.
`;

const WelcomeMessage = styled.div`
  font-size: 1rem;
  color: #666; // 여기서 색상을 원하는 대로 조정하세요.
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd; // 구분선 색상을 여기서 조정하세요.
  margin-top: 10px;
`;
