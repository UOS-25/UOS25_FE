import Menu from 'components/Header/Menu';
import React from 'react';
import styled from 'styled-components';
import './product.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axiosInstance from 'pages/login/LoginAxios';
interface product {
  id: number;
  name: string;
  barcode: string;
  checked: boolean;
  count: number;
}

const handleSingup = async () => {
  try {
    // const token = localStorage.getItem('accessToken');
    // console.log(token);
    const response = await axiosInstance.post('/orders/save', {
      orderNumber: '4',
      productsMap: {
        '123': 2,
        '124': 3,
        '125': 1
      },
    });
    console.log(response.data);
    // handleClick('/login');
  } catch (error) {
    console.log(error);
    // setCode('');
    // setLocation('');
  }
};

const balItems: product[] = [];
const initialItems: product[] = [
  { id: 0, name: '물품1', barcode: '123123', checked: false, count: 0 },
  { id: 1, name: '물품2', barcode: '123213', checked: false, count: 0 },
];
const Product = () => {
  const [products, setProducts] = useState<product[]>(balItems);
  const [onChecked, setOnChecked] = useState<boolean>(false);
  const items = [
    '발주',
    '발주 확인',
    '입고 관리',
    '출고 관리',
    '재고 관리',
    '폐기 제품',
    '제품 도난/파손',
  ];

  const testClick = (index: number) => {
    initialItems[index].checked = !initialItems[index].checked;
    if (initialItems[index].checked) {
      const newItem: product = {
        id: initialItems[index].id,
        name: initialItems[index].name,
        barcode: initialItems[index].barcode,
        checked: initialItems[index].checked,
        count: 0,
      };
      setProducts([...products, newItem]);
      console.log(products);
    } else {
      setProducts(products.filter((product) => product.id !== index));
    }
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedProducts = [...products];
    if (newQuantity < 0) {
      updatedProducts[index].count = 0;
    } else updatedProducts[index].count = newQuantity;
    setProducts(updatedProducts);
    console.log(products);
  };

  return (
    <Container>
      <Menu items={items} page="product"></Menu>
      <ProductContainer>
        {initialItems.map((item) => (
          <ItemContainer key={item.id}>
            <ItemBox>
              <CheckItem>
                <input type="checkbox" id={`item-${item.id}`} onChange={() => testClick(item.id)} />
                <div>{item.name}</div>
              </CheckItem>
              <div>{item.barcode}</div>
            </ItemBox>
          </ItemContainer>
        ))}
      </ProductContainer>
      <ProductsContainer>
        {products.map((products, index) => (
          <ProductItem key={index}>
            <Barcode>{products.barcode}</Barcode>
            <ProductName>{products.name}</ProductName>
            <span>
              <QuantityButton onClick={() => handleQuantityChange(index, products.count - 1)}>
                -
              </QuantityButton>
              <ProductName>{products.count}</ProductName>
              <QuantityButton onClick={() => handleQuantityChange(index, products.count + 1)}>
                +
              </QuantityButton>
            </span>
          </ProductItem>
        ))}
      </ProductsContainer>
      <ButtonContainer>
        <Button variant="primary" onClick={handleSingup} size="lg">
          발주
        </Button>{' '}
        <Button variant="secondary" type="submit" size="lg">
          초기화
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Product;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductContainer = styled.div`
  margin-top: 10px;
  margin-left: 210px;
  width: 20%;
  max-height: 605px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1; // 균등한 크기
  margin: 0 10px; // 좌우 마진 설정
}
`;

const CheckItem = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductsContainer = styled.div`
  margin-top: 10px;
  margin-left: 30px;
  width: 30%;
  max-height: 605px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between; // 각 항목이 공간을 균등하게 차지하도록 조정
  align-items: center;
  width: 100%; // 부모 컨테이너의 너비를 100%로 설정하여 꽉 차게 만듦
  padding: 10px;
  box-sizing: border-box; // 패딩 포함 너비 계산
`;

const Barcode = styled.span`
  padding: 5px 10px;
  border-radius: 5px 0 0 5px;
  max-width: 100px; /* 최대 너비 설정 */
  overflow: hidden; /* 넘치는 내용 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 '...'로 표시 */
  white-space: nowrap; /* 텍스트가 한 줄로 나오도록 설정 */
`;

const ProductName = styled.span`
  padding: 5px 10px;
  border-radius: 5px 0 0 5px;
  max-width: 100px; /* 최대 너비 설정 */
  overflow: hidden; /* 넘치는 내용 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 '...'로 표시 */
  white-space: nowrap; /* 텍스트가 한 줄로 나오도록 설정 */
`;

const QuantityButton = styled.button`
  padding: 5px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  margin-left: 55px;
  margin-top: 20px;
`;
