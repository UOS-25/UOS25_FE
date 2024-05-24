import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Menu from '../../../components/Header/Menu';
import axiosInstance from '../../login/LoginAxios';
import { Link } from 'react-router-dom';

interface parcelInfo {
  parcelId: number;
  fromAddress: string;
  toAddress: string;
  fromPhoneNumber: string;
  toPhoneNumber: string;
  weight: number;
  goods: string;
}

const PostList = () => {
  const menuItems = ['택배 발송', '택배 조회'];
  const [parcelData, setParcelData] = useState<parcelInfo[]>([]);

  useEffect(() => {
    const getParcel = async () => {
      try {
        const response = await axiosInstance.get(`/parcel`);
        console.log(response.data);
        setParcelData(response.data.responses);
      } catch (error) {
        console.log(error);
      }
    };
    getParcel();
  }, []);

  return (
    <Container>
      <Menu items={menuItems} page={'etc/Post'} />
      <ParcelList>
        {parcelData.map((item) => (
          <ParcelItem key={item.parcelId}>
            <StyledLink to={`/etc/Post/1/${item.parcelId}`}>
              <ParcelId>택배 ID: {item.parcelId}</ParcelId>
              <PhoneNumber>전화번호: {item.toPhoneNumber}</PhoneNumber>
            </StyledLink>
          </ParcelItem>
        ))}
      </ParcelList>
    </Container>
  );
};

export default PostList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-left: 180px;
`;

const ParcelList = styled.ul`
  width: 80%;
  padding: 0;
  list-style: none;
  margin-top: 20px;
`;

const ParcelItem = styled.li`
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  width: 100%;
`;

const ParcelId = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const PhoneNumber = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 5px;
`;
