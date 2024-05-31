import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Menu from 'components/Header/Menu';
import axiosInstance from 'pages/login/LoginAxios';

const Asset = () => {
  useEffect(() => {
    const getAssets = async () => {
      try {
        const response = await axiosInstance.get(`/funds`);
        console.log(response.data);
        // setEmployee(response.data);
        // setLoading(false);
      } catch (error) {
        // console.log(error);
        // setLoading(false);
      }
    };
    getAssets();
  }, []);
  return (
    <Container>
      <Information>
        <InformationRow>매출</InformationRow>
        <div>asdf</div>
      </Information>
      <InformationRow>본사 납입금</InformationRow>
      <InformationRow>물건값</InformationRow>
      <InformationRow>인건비</InformationRow>
      <InformationRow>유지비</InformationRow>
      <InformationRow>수익금</InformationRow>
      <Button>sd</Button>
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
