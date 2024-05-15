import React from 'react';
import styled from 'styled-components';
import Menu from 'components/Header/Menu';
import { useState } from 'react';

interface Product {
  barcode: string;
  quantity: number;
}

const Sell = () => {
  const items = ['판매', '환불', '영수증 조회'];
  const [products, setProducts] = useState<Product[]>([]);
  const [barcodeInput, setBarcodeInput] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarcodeInput(e.target.value);
  };

  const handleAddProduct = () => {
    const newProduct: Product = { barcode: barcodeInput, quantity };
    setProducts([...products, newProduct]);
    setBarcodeInput('');
    setQuantity(1);
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedProducts = [...products];
    if (newQuantity < 0) {
      updatedProducts[index].quantity = 0;
    } else updatedProducts[index].quantity = newQuantity;
    setProducts(updatedProducts);
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleCheckOut = () => {
    console.log('제품 정보:', products);
    // 서버 전송 필요
  };

  return (
    <Container>
      <Menu items={items} page="sell" />
      <InputContainer>
        <InputArea>
          <BarcodeInput
            type="text"
            value={barcodeInput}
            onChange={handleBarcodeChange}
            placeholder="바코드를 입력하세요"
          />
          <QuantityInput
            type="number"
            value={quantity.toString()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuantity(parseInt(e.target.value))
            }
          />
          <AddButton onClick={handleAddProduct}>추가</AddButton>
        </InputArea>
        <PaymentContainer>
          <CardPaymentButton>카드 결제</CardPaymentButton>
          <NaverPayButton>네이버페이</NaverPayButton>
          <KakaoPayButton>카카오페이</KakaoPayButton>
          <CashPaymentButton>현금 결제</CashPaymentButton>
        </PaymentContainer>
      </InputContainer>
      <ProductContainer>
        <ProductList style={{ borderBottom: '1px solid lightgrey' }}>
          <div>바코드</div>
          <div>수량</div>
          <div>수량 조정</div>
          <div>삭제</div>
        </ProductList>
        <ProductLists>
          {products.map((product, index) => (
            <ProductItem key={index}>
              <Barcode>{product.barcode}</Barcode>
              <Quantity>{product.quantity}</Quantity>
              <QuantityControl>
                <QuantityButton onClick={() => handleQuantityChange(index, product.quantity - 1)}>
                  -
                </QuantityButton>
                <span style={{ margin: '0 5px' }}></span>
                <QuantityButton onClick={() => handleQuantityChange(index, product.quantity + 1)}>
                  +
                </QuantityButton>
              </QuantityControl>
              <RemoveButton onClick={() => handleRemoveProduct(index)}>삭제</RemoveButton>
            </ProductItem>
          ))}
        </ProductLists>
      </ProductContainer>
    </Container>
  );
};

export default Sell;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  margin-left: 30px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-right: 70px;
  width: 400px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 300px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const BarcodeInput = styled.input`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const QuantityInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const ProductList = styled.div`
  display: flex;
  justify-content: space-between; // 마찬가지로 각 항목이 공간을 균등하게 차지하도록 조정
  align-items: center;
  width: 80%;
  padding: 10px;
`;
const ProductLists = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between; // 각 항목이 공간을 균등하게 차지하도록 조정
  align-items: center;
  width: 100%; // 부모 컨테이너의 너비를 100%로 설정하여 꽉 차게 만듦
  padding: 10px;
  box-sizing: border-box; // 패딩 포함 너비 계산
`;

const BarcodeQuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Barcode = styled.span`
  padding: 5px 10px;
  border-radius: 5px 0 0 5px;
  max-width: 100px; /* 최대 너비 설정 */
  overflow: hidden; /* 넘치는 내용 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 '...'로 표시 */
  white-space: nowrap; /* 텍스트가 한 줄로 나오도록 설정 */
`;
const Quantity = styled.span`
  padding: 5px 10px;
  border-radius: 0 5px 5px 0;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  padding: 5px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const PaymentButton = styled.button`
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
`;

const CardPaymentButton = styled(PaymentButton)`
  background-color: #4caf50; /* 카드 결제 버튼 색상 */
`;

const NaverPayButton = styled(PaymentButton)`
  background-color: #1ec800; /* 네이버페이 버튼 색상 */
`;

const KakaoPayButton = styled(PaymentButton)`
  background-color: #fee500; /* 카카오페이 버튼 색상 */
  color: black; /* 카카오페이 텍스트 색상은 검은색으로 */
`;

const CashPaymentButton = styled(PaymentButton)`
  background-color: #ff5722; /* 현금 결제 버튼 색상 */
`;
const PaymentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2열로 나눔
  grid-gap: 10px; // 그리드 사이 간격
  width: 100%; // 부모 컨테이너의 너비에 맞게 조정
  max-width: 300px; // 최대 너비 설정
`;
