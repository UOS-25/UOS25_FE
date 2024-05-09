import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
        <ul>
          {items.map((item: string, index: number) => (
            <li key={index} onClick={() => handleClick(index)}>
              {item}
            </li>
          ))}
        </ul>
      </MenuList>
    </Container>
  );
};

const Container = styled.div`
  width: 10%;
  border-right: 1px lightgrey solid;
  // padding: 20px;
`;
const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: 810px;
  // text-align: center;
  ul {
    list-style-type: none;
  }
  li {
    margin-bottom: 10px;
    cursor: pointer;
  }
`;
export default Menu;
