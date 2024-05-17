import React from 'react';
import styled from 'styled-components';
import Menu from 'components/Header/Menu';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

interface Product {
  barcode: string;
  item: string;
  quantity: number;
  price: number;
}

interface parsingProduct {
  barcode: string;
  item: string;
  quantity: number;
  price: number;
  gender: string;
  age: string;
}

interface buyProduct {
  barcode: string;
  quantity: number;
  gender: string;
  age: string;
}

const testData: Product[] = [
  { barcode: '123', item: '삼김', quantity: 1, price: 3300 },
  { barcode: '124', item: '삼김a', quantity: 1, price: 3300 },
  { barcode: '125', item: '삼김b', quantity: 1, price: 3300 },
  { barcode: '125125', item: '삼sssss김b', quantity: 1, price: 3300 },
];
const Sell = () => {
  const items = ['판매', '환불', '영수증 조회'];
  const [products, setProducts] = useState<Product[]>([]);
  const [buyProducts, setBuyProducts] = useState<buyProduct[]>([]);
  const [parsingProducts, setParsingProducts] = useState<parsingProduct[]>([]);
  const [itemInput, setItemInput] = useState<string>('');
  const [barcodeInput, setBarcodeInput] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const barcode = e.target.value;
    setBarcodeInput(barcode);
    const foundProduct = products.find((product) => product.barcode === barcode);
    if (foundProduct) {
      setItemInput(foundProduct.item);
    } else {
      setItemInput(null);
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleAddProduct = () => {
    const newProduct = testData.find((product) => product.barcode === barcodeInput);
    setProducts([...products, newProduct]);
    const parsingProduct: parsingProduct = {
      ...newProduct,
      gender: gender,
      age: age,
    };

    const buyProduct: buyProduct = {
      barcode: parsingProduct.barcode,
      quantity: quantity,
      gender: parsingProduct.gender,
      age: parsingProduct.age,
    };
    setParsingProducts([...parsingProducts, parsingProduct]);
    const updatedBuyProducts = [...buyProducts, buyProduct];
    setBuyProducts(updatedBuyProducts);
    // 6. buyProduct 객체를 buyProducts 배열에 추가
    console.log(buyProducts);
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
        <BuyerContainer>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>성별</Form.Label>
              <Form.Select value={gender} onChange={handleGenderChange}>
                <option>선택</option>
                <option>남</option>
                <option>여</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>연령대</Form.Label>
              <Form.Select value={age} onChange={handleAgeChange}>
                <option>선택</option>
                <option>10대</option>
                <option>20대</option>
                <option>30대</option>
                <option>40대</option>
                <option>50대</option>
                <option>60대</option>
                <option>70대 이상</option>
              </Form.Select>
            </Form.Group>
          </Row>
        </BuyerContainer>
      </InputContainer>
      <ProductContainer>
        <ProductList style={{ borderBottom: '1px solid lightgrey' }}>
          <div>바코드</div>
          <div style={{ paddingRight: '50px' }}>제품</div>
          <div style={{ paddingRight: '70px' }}>수량</div>
          <div>가격</div>
          <div>삭제</div>
        </ProductList>
        <ProductLists>
          {products.map((product, index) => (
            <ProductItem key={index}>
              <Barcode>{product.barcode}</Barcode>
              <div style={{ width: '10%', justifyContent: 'center', margin: '5px' }}>
                {product.item}
              </div>
              <QuantityControl>
                <QuantityButton onClick={() => handleQuantityChange(index, product.quantity - 1)}>
                  -
                </QuantityButton>
                <Quantity>{product.quantity}</Quantity>
                <QuantityButton onClick={() => handleQuantityChange(index, product.quantity + 1)}>
                  +
                </QuantityButton>
              </QuantityControl>
              <div>{product.price}</div>
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
  max-height: 605px;
  margin-right: 5px;
  overflow-y: auto;
  border: 1px solid #ccc;
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
  width: 100%;
  padding: 10px;
`;
const ProductLists = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  max-width: 50px; /* 최대 너비 설정 */
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

const BuyerContainer = styled.div`
  justify-content: center;
  margin-top: 30px;
`;
