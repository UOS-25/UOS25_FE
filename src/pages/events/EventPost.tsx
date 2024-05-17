import Menu from 'components/Header/Menu';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ChangeEventHandler } from 'react';

const items = ['이벤트 등록', '진행중인 이벤트'];

const EventPost = () => {
  const [barcodeInput, setBarcodeInput] = useState<number>(0);
  const [onePlusone, setOnePlusOne] = useState<boolean>(false);
  const [ticket, setTicket] = useState<boolean>(false);
  const [discount, setDiscount] = useState<boolean>(false);
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [selectedCinema, setSelectedCinema] = useState<string>('');

  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarcodeInput(parseInt(e.target.value));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    switch (name) {
      case 'onePlusone':
        setOnePlusOne(checked);
        setTicket(false);
        setDiscount(false);
        break;
      case 'ticket':
        setTicket(checked);
        setOnePlusOne(false);
        setDiscount(false);
        break;
      case 'discount':
        setDiscount(checked);
        setOnePlusOne(false);
        setTicket(false);
        break;
      default:
        break;
    }
  };
  const handleDiscountRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountRate(parseInt(e.target.value));
  };

  const handleCinemaChange = (e) => {
    setSelectedCinema(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const eventData = {
      barcode: barcodeInput,
      eventType: onePlusone ? '1+1' : ticket ? '영화권 증정' : '가격 할인',
      discountRate: discount ? discountRate : null,
      cinema: ticket ? selectedCinema : null,
    };

    console.log(eventData);

    // try {
    //   await axios.post('/api/events', eventData);
    //   console.log('Event data submitted successfully');
    // } catch (error) {
    //   console.error('Error submitting event data:', error);
    // }
  };
  return (
    <Container>
      <Menu items={items} page={'/event'}></Menu>
      <EventItem>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>이벤트 대상 물품 바코드를 입력해주세요.</Form.Label>
            <Form.Control
              placeholder="바코드를 입력해주세요."
              value={barcodeInput}
              onChange={handleBarcodeChange}
            />
          </Form.Group>
          <div style={{ marginBottom: '10px' }}>이벤트 종류를 선택해주세요.</div>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="1+1"
              name="onePlusone"
              checked={onePlusone}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="영화권 증정"
              name="ticket"
              checked={ticket}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="가격 할인"
              name="discount"
              checked={discount}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
          {ticket && (
            <Form.Group className="mb-3">
              <Form.Label>영화관 선택</Form.Label>
              <Form.Control as="select" value={selectedCinema} onChange={handleCinemaChange}>
                <option value="">선택하세요</option>
                <option value="롯데시네마">롯데시네마</option>
                <option value="메가박스">메가박스</option>
                <option value="CGV">CGV</option>
              </Form.Control>
            </Form.Group>
          )}
          {discount && (
            <Form.Group className="mb-3">
              <Form.Label>할인율 입력</Form.Label>
              <Form.Control
                placeholder="할인율 입력"
                value={discountRate}
                onChange={handleDiscountRateChange}
              />
            </Form.Group>
          )}
          <Button variant="primary" type="submit">
            이벤트 등록
          </Button>
        </Form>
      </EventItem>
    </Container>
  );
};

export default EventPost;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const EventItem = styled.div`
  margin-top: 30px;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  width: 30%; // 부모 컨테이너의 너비를 100%로 설정하여 꽉 차게 만듦
  padding: 10px;
  box-sizing: border-box; // 패딩 포함 너비 계산
  border: 1px solid #ccc;
`;
