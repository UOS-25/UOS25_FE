import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Menu from 'components/Header/Menu';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axiosInstance from 'pages/login/LoginAxios';

interface Product {
  productCode: string;
  productName: string;
  salePrice: number;
  orderPrice: number;
  quantity: number; // 추가된 속성
}

interface parsingProduct {
  productCode: string;
  productName: string;
  quantity: number;
  salePrice: number;
  gender: string;
  age: string;
}

interface buyProduct {
  productCode: string;
  quantity: number;
  gender: string;
  age: string;
}

const Sell = () => {
  const items = ['판매', '영수증 조회'];
  const [products, setProducts] = useState<Product[]>([]);
  const [buyProducts, setBuyProducts] = useState<buyProduct[]>([]);
  const [parsingProducts, setParsingProducts] = useState<parsingProduct[]>([]);
  const [itemInput, setItemInput] = useState<string>('');
  const [barcodeInput, setBarcodeInput] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // Fetch all products on component mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axiosInstance.get('/products/');
        setAllProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching all products:', error);
      }
    };
    fetchAllProducts();
  }, []);

  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const barcode = e.target.value;
    setBarcodeInput(barcode);
    const foundProduct = allProducts.find((product) => product.productCode === barcode);
    if (foundProduct) {
      setItemInput(foundProduct.productName);
    } else {
      setItemInput('');
    }
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAge(event.target.value);
  };

  const handleAddProduct = () => {
    const foundProduct = allProducts.find((product) => product.productCode === barcodeInput);
    if (foundProduct) {
      const newProduct = { ...foundProduct, quantity: quantity };
      setProducts((prevProducts) => [...prevProducts, newProduct]);

      const newParsingProduct: parsingProduct = {
        ...newProduct,
        productName: foundProduct.productName,
        salePrice: foundProduct.salePrice,
        gender: gender,
        age: age,
      };

      const newBuyProduct: buyProduct = {
        productCode: newProduct.productCode,
        quantity: newProduct.quantity,
        gender: gender,
        age: age,
      };

      setParsingProducts((prev) => [...prev, newParsingProduct]);
      setBuyProducts((prev) => [...prev, newBuyProduct]);

      setBarcodeInput('');
      setQuantity(1);
    }
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, quantity: newQuantity < 0 ? 0 : newQuantity } : product,
      ),
    );
  };

  const handleRemoveProduct = (index: number) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  const handleCheckOut = async (paymentType: string) => {
    const totalAmount = products.reduce(
      (acc, product) => acc + product.salePrice * product.quantity,
      0,
    );
    const points = totalAmount * 0.05;

    const salesData = {
      salesItems: products.map((product) => ({
        productCode: product.productCode,
        counts: product.quantity, // 제품 수량을 사용합니다.
      })),
      isCancelled: false,
      totalAmount: totalAmount,
      type: paymentType,
      gender: gender,
      ageGroup: `${age}`,
    };

    try {
      const response = await axiosInstance.post('sales/save', salesData);
      console.log('판매 데이터 저장 성공:', response.data);
      alert(`${Math.round(points)}원이 포인트로 적립되었습니다.`);
    } catch (error) {
      console.log(salesData);
      console.error('판매 데이터 저장 실패:', error);
    }
  };

  const totalAmount = products.reduce(
    (acc, product) => acc + product.salePrice * product.quantity,
    0,
  );

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
          <CardPaymentButton onClick={() => handleCheckOut('CARD')}>카드 결제</CardPaymentButton>
          <NaverPayButton onClick={() => handleCheckOut('NAVERPAY')}>네이버페이</NaverPayButton>
          <KakaoPayButton onClick={() => handleCheckOut('KAKAOPAY')}>카카오페이</KakaoPayButton>
          <CashPaymentButton onClick={() => handleCheckOut('CASH')}>현금 결제</CashPaymentButton>
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
        <ProductLists>
          {products.map((product, index) => (
            <ProductItem key={index}>
              <Barcode>{product.productCode}</Barcode>
              <div style={{ width: '15%', justifyContent: 'center', margin: '5px' }}>
                {product.productName}
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
              <div>{product.salePrice}</div>
              <RemoveButton onClick={() => handleRemoveProduct(index)}>삭제</RemoveButton>
            </ProductItem>
          ))}
        </ProductLists>
        <TotalAmount>총 금액: {totalAmount} 원</TotalAmount>
      </ProductContainer>
    </Container>
  );
};

export default Sell;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  max-height: 605px;
  margin-right: 5px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 20px;
  padding-bottom: 20px;
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

const ProductLists = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 8px;
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const Barcode = styled.span`
  padding: 0px 10px;
  border-radius: 5px 0 0 5px;
  max-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  background-color: #4caf50;
`;

const NaverPayButton = styled(PaymentButton)`
  background-color: #1ec800;
`;

const KakaoPayButton = styled(PaymentButton)`
  background-color: #fee500;
  color: black;
`;

const CashPaymentButton = styled(PaymentButton)`
  background-color: #ff5722;
`;

const PaymentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  width: 100%;
  max-width: 300px;
`;

const BuyerContainer = styled.div`
  justify-content: center;
  margin-top: 30px;
`;

const TotalAmount = styled.div`
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;
