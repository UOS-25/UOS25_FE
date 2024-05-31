import Menu from 'components/Header/Menu';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './product.css';
import Button from 'react-bootstrap/Button';
import axiosInstance from 'pages/login/LoginAxios';

interface Product {
  productName: string;
  productCode: string;
  salePrice: number;
  orderPrice: number;
}

interface BalProduct extends Product {
  checked: boolean;
  count: number;
}

const Product = () => {
  const [products, setProducts] = useState<BalProduct[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [inputProductCode, setInputProductCode] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products/');
        const productsWithDefaults = response.data.map((product: Product) => ({
          ...product,
          checked: false,
          count: 0,
        }));
        setProducts(productsWithDefaults);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const items = [
    '발주',
    '발주 확인',
    '입고 관리',
    '출고 관리',
    '재고 관리',
    '폐기 제품',
    '제품 도난/파손',
  ];

  const handleCheckboxChange = (productCode: string) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [productCode]: !prevCheckedItems[productCode],
    }));
  };

  const handleQuantityChange = (productCode: string, newQuantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productCode]: newQuantity < 0 ? 0 : newQuantity,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputProductCode(e.target.value);
  };

  const addProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/${inputProductCode}`);
      const product = response.data;
      setProducts((prevProducts) => [...prevProducts, { ...product, checked: true, count: 1 }]);
      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [product.productCode]: true,
      }));
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product.productCode]: 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = (productCode: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.productCode !== productCode),
    );
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = { ...prevCheckedItems };
      delete updatedCheckedItems[productCode];
      return updatedCheckedItems;
    });
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[productCode];
      return updatedQuantities;
    });
  };

  const handleSubmit = async () => {
    const productsMap = Object.keys(quantities)
      .filter((productCode) => quantities[productCode] > 0)
      .reduce(
        (acc, productCode) => {
          acc[productCode] = quantities[productCode];
          return acc;
        },
        {} as { [key: string]: number },
      );

    const orderData = {
      orderNumber,
      productsMap,
    };

    try {
      await axiosInstance.post('/orders/save', orderData);
      alert('Order submitted successfully');
    } catch (error) {
      console.log(error);
      alert('Failed to submit order');
    }
  };

  const handleOrderNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderNumber(e.target.value);
  };

  const totalOrderPrice = products
    .filter((product) => checkedItems[product.productCode])
    .reduce((acc, product) => acc + (quantities[product.productCode] || 0) * product.salePrice, 0);

  return (
    <Container>
      <Menu items={items} page="product"></Menu>
      <div>
        <input
          type="text"
          value={inputProductCode}
          onChange={handleInputChange}
          placeholder="Enter product code"
        />
        <Button variant="primary" onClick={addProduct}>
          Add Product
        </Button>
      </div>
      <div>
        <input
          type="text"
          value={orderNumber}
          onChange={handleOrderNumberChange}
          placeholder="Enter order number"
        />
      </div>
      <ProductContainer>
        {products.map((item, index) => (
          <ItemContainer key={item.productCode}>
            <ItemBox>
              <CheckItem>
                <input
                  type="checkbox"
                  id={`item-${item.productCode}`}
                  checked={checkedItems[item.productCode] || false}
                  onChange={() => handleCheckboxChange(item.productCode)}
                />
                <div>{item.productName}</div>
              </CheckItem>
              <div>{item.productCode}</div>
            </ItemBox>
          </ItemContainer>
        ))}
      </ProductContainer>
      <ProductsContainer>
        {products
          .filter((product) => checkedItems[product.productCode])
          .map((product) => (
            <ProductItem key={product.productCode}>
              <Barcode>{product.productCode}</Barcode>
              <ProductName>{product.productName}</ProductName>
              <span>
                <QuantityButton
                  onClick={() =>
                    handleQuantityChange(
                      product.productCode,
                      (quantities[product.productCode] || 0) - 1,
                    )
                  }
                >
                  -
                </QuantityButton>
                <ProductName>{(quantities[product.productCode] || 0).toString()}</ProductName>
                <QuantityButton
                  onClick={() =>
                    handleQuantityChange(
                      product.productCode,
                      (quantities[product.productCode] || 0) + 1,
                    )
                  }
                >
                  +
                </QuantityButton>
                <Button variant="danger" onClick={() => removeProduct(product.productCode)}>
                  삭제
                </Button>
              </span>
              <div>Price: {product.salePrice}</div>
              <div>
                Total: {((quantities[product.productCode] || 0) * product.salePrice).toString()}
              </div>
            </ProductItem>
          ))}
      </ProductsContainer>
      <ButtonContainer>
        <Button variant="primary" size="lg" onClick={handleSubmit}>
          발주
        </Button>{' '}
        <Button variant="secondary" size="lg" onClick={() => window.location.reload()}>
          초기화
        </Button>
      </ButtonContainer>
      <TotalPriceContainer>Total Order Price: {totalOrderPrice.toString()}</TotalPriceContainer>
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
  flex: 1;
  margin: 0 10px;
`;

const CheckItem = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductsContainer = styled.div`
  margin-top: 10px;
  margin-left: 30px;
  width: 80%;
  max-height: 605px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
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
  padding: 5px 10px;
  border-radius: 5px 0 0 5px;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductName = styled.span`
  padding: 5px 10px;
  border-radius: 5px 0 0 5px;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

const TotalPriceContainer = styled.div`
  margin-top: 20px;
  margin-left: 210px;
  font-size: 1;
`;
