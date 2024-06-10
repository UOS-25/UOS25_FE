import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Menu from 'components/Header/Menu';
import axiosInstance from '../login/LoginAxios';
interface Product {
  fromAddress: string;
  toAddress: string;
  toPhoneNumber: string;
  fromPhoneNumber: string;
  weight: number;
  goods: string;
  // senderName: string;
  // recipientName: string;
}

const Post = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [fromAddressInput, setFromAddressInput] = useState<string>('');
  const [toAddressInput, setToAddressInput] = useState<string>('');
  const [toPhoneNumberInput, settoPhoneNumberInput] = useState<string>('');
  const [fromPhoneNumberInput, setfromPhoneNumberInput] = useState<string>('');
  const [weightInput, setWeightInput] = useState<number>(0);
  const [senderNameInput, setSenderNameInput] = useState<string>('');
  const [recipientNameInput, setRecipientNameInput] = useState<string>('');

  const handleFromAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromAddressInput(e.target.value);
  };
  const handleToAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToAddressInput(e.target.value);
  };
  const handletoPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    settoPhoneNumberInput(e.target.value);
    console.log(e.target.value);
  };
  const handlerfromPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfromPhoneNumberInput(e.target.value);
  };
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeightInput(parseInt(e.target.value));
  };
  const handleSenderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenderNameInput(e.target.value);
  };
  const handlerRecipientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientNameInput(e.target.value);
  };
  // useEffect(() => {
  //   console.log('products:', products);
  // }, [products]);
  const handleAddProduct = async () => {
    try {
      const newProduct: Product = {
        fromAddress: fromAdndressInput,
        toAddress: toAddressInput,
        toPhoneNumber: toPhoneNumberInput,
        fromPhoneNumber: fromPhoneNumberInput,
        weight: weightInput,
        goods: 'product',
        // senderName: senderNameInput,
        // recipientName: recipientNameInput,
      };
      console.log(newProduct);
      const response = await axiosInstance.post('/parcel', newProduct);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    // setProducts([...products, newProduct]);
    console.log('products:', products);
    setFromAddressInput('');
    settoPhoneNumberInput('');
    setfromPhoneNumberInput('');
    setWeightInput(0);
    setSenderNameInput('');
    setRecipientNameInput('');
  };

  const items = ['택배 발송', '택배 조회'];
  return (
    <Container>
      <Menu items={items} page={'etc/Post'} />
      <Form style={{ marginTop: '30px', marginLeft: '250px' }}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="a">
            <Form.Label>받는 이</Form.Label>
            <Form.Control
              type="text"
              placeholder="성함"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlerRecipientNameChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="b">
            <Form.Label>전화번호</Form.Label>
            <Form.Control
              type="text"
              placeholder="0100000000"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlerfromPhoneNumberChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="c">
            <Form.Label>받는 이 주소</Form.Label>
            <Form.Control
              placeholder="도로명주소 입력 바랍니다."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFromAddressChange(e)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="weight">
            <Form.Label>물건 무게</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWeightChange(e)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="d">
            <Form.Label>보내는 이</Form.Label>
            <Form.Control
              type="text"
              placeholder="성함"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSenderNameChange(e)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="e">
            <Form.Label>전화번호</Form.Label>
            <Form.Control
              type="text"
              placeholder="0100000000"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handletoPhoneNumberChange(e)}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="f">
          <Form.Label>보내는 이 주소</Form.Label>
          <Form.Control
            placeholder="도로명주소 입력 바랍니다."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleToAddressChange(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleAddProduct}>
          접수
        </Button>
      </Form>
    </Container>
  );
};

export default Post;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;
