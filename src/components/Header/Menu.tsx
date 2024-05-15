import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface Props {
  page: string;
  items: string[];
}

const Menu = ({ items, page }: Props) => {
  const navigate = useNavigate();
  const handleClick = (index: number) => {
    navigate(`/${page}/${index}`);
  };

  return (
    <Container>
      <MenuList>
        <MenuItem onClick={() => navigate('/')}>처음 화면으로</MenuItem>
        {items.map((item: string, index: number) => (
          <MenuItem key={index} onClick={() => handleClick(index)}>
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 81px; /* 헤더의 높이에 맞게 조절 */
  bottom: 0;
  left: 0;
  width: 200px;
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 생성 */
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const MenuItem = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

export default Menu;
