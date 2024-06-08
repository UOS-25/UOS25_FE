import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Menu from 'components/Header/Menu';
import axiosInstance from 'pages/login/LoginAxios';

type assetType = {
  headPayment: number;
  maintenanceExpense: number;
  personalExpense: number;
  sales: number;
  totalFunds: number;
};

const Asset = () => {
  const [assets, setAssets] = useState<assetType>(null);
  useEffect(() => {
    const getAssets = async () => {
      try {
        const response = await axiosInstance.get(`/funds`);
        console.log(response.data);
        setAssets(response.data);
        // setEmployee(response.data);
        // setLoading(false);
      } catch (error) {
        // console.log(error);
        // setLoading(false);
      }
    };
    getAssets();
  }, []);
  if (!assets) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <Information>
        <InformationRow>매출</InformationRow>
        <div>{assets.sales}원</div>
      </Information>
      <Information>
        <InformationRow>본사 납입금</InformationRow>
        <div>{assets.headPayment}원</div>
      </Information>
      <Information>
        <InformationRow>물건값</InformationRow>
        <div>{assets.sales}원</div>
      </Information>
      <Information>
        <InformationRow>인건비</InformationRow>
        <div>{assets.personalExpense}원</div>
      </Information>
      <Information>
        <InformationRow>유지비</InformationRow>
        <div>{assets.maintenanceExpense}원</div>
      </Information>
      <Information>
        <InformationRow>수익금</InformationRow>
        <div>{assets.totalFunds}원</div>
      </Information>

      {/* <Button>sd</Button> */}
    </Container>
  );
};

export default Asset;
const Container = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-row-gap: 70px;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
`;

const InformationRow = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  width: 70%;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button``;
