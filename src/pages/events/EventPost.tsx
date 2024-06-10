import Menu from 'components/Header/Menu';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axiosInstance from 'pages/login/LoginAxios';
import { format } from 'date-fns'; // 날짜 포맷을 위한 라이브러리 추가

const EventPost = () => {
  const items = ['이벤트 등록', '진행중인 이벤트'];
  const cinemaOptions = ['Cgv', '롯데시네마', '메가박스']; // 예시 영화관 리스트
  const [barcodeInput, setBarcodeInput] = useState<string>('');
  const [onePlusone, setOnePlusOne] = useState<boolean>(false);
  const [ticket, setTicket] = useState<boolean>(false);
  const [discount, setDiscount] = useState<boolean>(false);
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [cinema, setCinema] = useState<string>(''); // cinema 상태 추가

  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarcodeInput(e.target.value);
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
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleDiscountRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountRate(parseInt(e.target.value));
  };
  const handleCinemaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCinema(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const eventData = {
        type: onePlusone ? 'ONE_PLUS_ONE' : ticket ? 'MOVIE_GIVEAWAY' : 'DISCOUNT',
        productCode: barcodeInput,
        discount: discount ? discountRate : null,
        cinema: cinema ? cinema : null,
        startDate: startDate ? format(startDate, 'yyyy-MM-dd') : null, // 날짜 포맷 변경
        endDate: endDate ? format(endDate, 'yyyy-MM-dd') : null, // 날짜 포맷 변경
      };
      const response = await axiosInstance.post('/event', eventData);
      console.log(response.data);
      alert('이벤트가 등록되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Menu items={items} page={'event'} />
      <EventItem>
        <Form>
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
          {ticket && (
            <Form.Group className="mb-3">
              <Form.Label>영화관 선택</Form.Label>
              <Form.Control as="select" value={cinema} onChange={handleCinemaChange}>
                <option value="">영화관을 선택하세요</option>
                {cinemaOptions.map((cinema, index) => (
                  <option key={index} value={cinema}>
                    {cinema}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>시작 날짜</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="시작 날짜를 선택하세요"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>종료 날짜</Form.Label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="종료 날짜를 선택하세요"
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={handleSubmit}>
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
