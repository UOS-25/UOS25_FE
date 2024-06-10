import React, { useState, useEffect } from 'react';
import axiosInstance from 'pages/login/LoginAxios';
import Menu from 'components/Header/Menu';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  margin-left: 250px;
  width: 70%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  color: #333;
  padding: 10px;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

const Input = styled.input`
  padding: 5px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

type stocksInfo = {
  storeId: number;
  productCode: string;
  counts: number;
  productName: string;
};
const items = ['발주', '발주 확인', '재고 관리', '폐기 제품 등록'];

const Stock = () => {
  const [stockData, setStockData] = useState<stocksInfo[]>([]);

  useEffect(() => {
    const getStocks = async () => {
      try {
        const response = await axiosInstance.get(`/stocks`);
        console.log(response.data);
        setStockData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStocks();
  }, []);

  if (!stockData) {
    return <div>Loading...</div>;
  }
  const saveStock = async (stock) => {
    try {
      const response = await axiosInstance.post(`/stocks/save`, {
        productCode: stock.productCode,
        productName: stock.productName,
        counts: stock.counts,
      });
      alert('변경되었습니다.');
    } catch (error) {
      alert('변경 중 오류가 발생했습니다.');
    }
  };
  return (
    <Container>
      <Menu items={items} page={'product'} />
      <Table>
        <thead>
          <tr>
            <Th>제품 바코드</Th>
            <Th>제품명</Th>
            <Th>수량</Th>
            <Th>수정</Th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((stock, index) => (
            <tr key={index}>
              <Td>{stock.productCode}</Td>
              <Td>{stock.productName}</Td>
              <Td>
                <Input
                  type="number"
                  defaultValue={stock.counts}
                  onBlur={(e) => {
                    // 여기에 수정 로직 구현
                  }}
                />
              </Td>
              <Td>
                <Button onClick={() => saveStock(stock)}>저장</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Stock;
