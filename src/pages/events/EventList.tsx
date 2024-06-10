import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Menu from 'components/Header/Menu';
import axiosInstance from 'pages/login/LoginAxios';
import { Link } from 'react-router-dom';

interface eventInfo {
  eventId: number;
  type: 'ONE_PLUS_ONE' | 'MOVIE_GIVEAWAY' | 'DISCOUNT';
  productName: 'string';
  discount: number;
}

const EventList = () => {
  const menuItems = ['이벤트 등록', '진행중인 이벤트'];
  const [eventData, setEventData] = useState<eventInfo[]>([]);

  useEffect(() => {
    const getParcel = async () => {
      try {
        const response = await axiosInstance.get(`/event/events`);
        console.log(response.data);
        const transformedData = response.data.responses.map((item: eventInfo) => ({
          ...item,
          type: parseEventType(item.type),
        }));
        setEventData(transformedData);
      } catch (error) {
        console.log(error);
      }
    };
    getParcel();
  }, []);

  const parseEventType = (type: string): string => {
    switch (type) {
      case 'ONE_PLUS_ONE':
        return '1+1';
      case 'MOVIE_GIVEAWAY':
        return '영화권 증정';
      case 'DISCOUNT':
        return '할인';
      default:
        return type;
    }
  };

  return (
    <Container>
      <Menu items={menuItems} page={'event'} />
      <EventsList>
        {eventData.map((item) => (
          <EventItem key={item.eventId}>
            <StyledLink to={`/event/1/${item.eventId}`}>
              <ParcelId>이벤트 물품: {item.productName}</ParcelId>
              <PhoneNumber>이벤트 타입: {item.type}</PhoneNumber>
            </StyledLink>
          </EventItem>
        ))}
      </EventsList>
    </Container>
  );
};

export default EventList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-left: 180px;
`;

const EventsList = styled.ul`
  width: 80%;
  padding: 0;
  list-style: none;
  margin-top: 20px;
`;

const EventItem = styled.li`
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
