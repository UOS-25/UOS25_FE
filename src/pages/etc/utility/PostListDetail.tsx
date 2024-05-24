import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axiosInstance from '../../login/LoginAxios';
import styled from 'styled-components';
import Menu from '../../../components/Header/Menu';
import Button from 'react-bootstrap/Button';
interface ParcelInfo {
  parcelId: number;
  fromAddress: string;
  toAddress: string;
  fromPhoneNumber: string;
  toPhoneNumber: string;
  weight: number;
  goods: string;
}

interface preparedParcelInfo {
  parcelState: string;
}

const PostListDetail = () => {
  const items = ['택배 발송', '택배 조회'];
  const location = useLocation();
  const menuItems = ['택배 발송', '택배 조회'];
  const { parcelId } = useParams<{ parcelId: string }>();
  const [loading, setLoading] = useState(true); // 초기 로딩 상태를 true로 설정
  const [parcel, setParcel] = useState<ParcelInfo>({
    parcelId: 0,
    fromAddress: '',
    toAddress: '',
    fromPhoneNumber: '',
    toPhoneNumber: '',
    weight: 0,
    goods: '',
  });

  useEffect(() => {
    const getParcel = async () => {
      try {
        const response = await axiosInstance.get(`/parcel/${parcelId}`);
        setParcel(response.data);
        setLoading(false); // 데이터 로딩 완료 후 로딩 상태를 false로 설정
      } catch (error) {
        console.log(error);
        setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정
      }
    };
    getParcel();
  }, [parcelId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!parcel.parcelId) {
    return <div>No parcel data found.</div>;
  }

  const handleParcelPost = async () => {
    const prepared: preparedParcelInfo = {
      parcelState: 'PREPARE',
    };
    try {
      const response = await axiosInstance.patch(`/parcel/${parcelId}`, prepared);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Menu items={items} page={'etc/Post'} />
      <InformationRow>
        받는 이 주소
        <Information>{parcel.toAddress}</Information>
      </InformationRow>
      <InformationRow>
        받는 이 전화번호
        <Information>{parcel.toPhoneNumber}</Information>
      </InformationRow>
      <InformationRow>
        물건 종류
        <Information>{parcel.goods}</Information>
      </InformationRow>
      <InformationRow>
        운송장 번호
        <Information>{parcel.parcelId}</Information>
      </InformationRow>
      <InformationRow>
        보내는 이 주소
        <Information>
          <Information>{parcel.fromAddress}</Information>
        </Information>
      </InformationRow>
      <InformationRow>
        보내는 이 전화번호
        <Information> {parcel.fromPhoneNumber}</Information>
      </InformationRow>
      <Button
        variant="primary"
        onClick={handleParcelPost}
        size="sm"
        style={{ marginRight: '110px' }}
      >
        배송 준비 완료
      </Button>
    </Container>
  );
};

export default PostListDetail;

const Container = styled.div`
  margin-top: 30px;
  margin-left: 300px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-row-gap: 70px;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
`;

const InformationRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
`;

const Information = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid lightgray;
  justify-content: center;
`;
