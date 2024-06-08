import React, { useState, useEffect } from 'react';
import axiosInstance from 'pages/login/LoginAxios';
type stocksInfo = {
  storeId: number;
  productCode: string;
  counts: number;
};

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
    return <div>Loaddddding...</div>;
  }
  return <div>stock</div>;
};

export default Stock;
