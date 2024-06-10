import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from 'pages/login/LoginAxios';
import styled from 'styled-components';
import Menu from 'components/Header/Menu';
import Button from 'react-bootstrap/Button';

interface EventInfo {
  eventId: number;
  type: string;
  productName: string;
  discount: number;
}

const EventDetail = () => {
  const items = ['이벤트 등록', '진행중인 이벤트'];
  const { eventId } = useParams<{ eventId: string }>();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<EventInfo>({
    eventId: 0,
    type: '',
    productName: '',
    discount: 0,
  });
  const [parsedType, setParsedType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await axiosInstance.get(`/event/events/${eventId}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getEvent();
  }, [eventId]);

  useEffect(() => {
    let typeString = '';
    switch (event.type) {
      case 'ONE_PLUS_ONE':
        typeString = '1+1';
        break;
      case 'MOVIE_GIVEAWAY':
        typeString = '영화권 증정';
        break;
      case 'DISCOUNT':
        typeString = '할인';
        break;
      default:
        typeString = event.type;
    }
    setParsedType(typeString);
  }, [event.type]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleDeleteEvent = async () => {
    const confirmDelete = window.confirm('이 이벤트를 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        const response = await axiosInstance.delete(`/event/events/${eventId}`);
        console.log(response.data);
        alert('이벤트가 삭제되었습니다.');
        navigate(-1);
      } catch (error) {
        console.log(error);
        alert('이벤트 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event.eventId) {
    return <div>No event data found.</div>;
  }

  return (
    <Container>
      <Menu items={items} page={'event'} />
      <InformationRow>
        이벤트 제품
        <Input name="productName" value={event.productName} onChange={handleInputChange} />
      </InformationRow>
      <InformationRow>
        이벤트 종류
        <Input name="type" value={parsedType} readOnly />
      </InformationRow>
      <InformationRow>
        할인율
        <Input name="discount" value={event.discount} onChange={handleInputChange} />
      </InformationRow>

      <ButtonContainer>
        <Button variant="danger" onClick={handleDeleteEvent} size="sm">
          이벤트 삭제
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default EventDetail;

const Container = styled.div`
  margin-top: 30px;
  margin-left: 300px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-row-gap: 70px;
  justify-content: center;
  align-items: center;
`;

const InformationRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
`;

const Input = styled.input`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  border: 1px solid lightgray;
  padding: 5px;
  border-radius: 3px;
  margin-top: 5px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 74%;
  margin-top: 20px;
`;
