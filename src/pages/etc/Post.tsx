import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Menu from 'components/Header/Menu';
interface Product {
  address: string;
  senderPhone: number;
  recipientPhone: number;
  weight: number;
  senderName: string;
  recipientName: string;
}

const Post = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [addressInput, setAddressInput] = useState<string>('');
  const [senderPhoneInput, setSenderPhoneInput] = useState<number>(0);
  const [recipientPhoneInput, setRecipientPhoneInput] = useState<number>(0);
  const [weightInput, setWeightInput] = useState<number>(0);
  const [senderNameInput, setSenderNameInput] = useState<string>('');
  const [recipientNameInput, setRecipientNameInput] = useState<string>('');

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInput(e.target.value);
  };
  const handleSenderPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenderPhoneInput(parseInt(e.target.value));
    console.log(e.target.value);
  };
  const handlerRecipientPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientPhoneInput(parseInt(e.target.value));
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
  const handleAddProduct = () => {
    const newProduct: Product = {
      address: addressInput,
      senderPhone: senderPhoneInput,
      recipientPhone: recipientPhoneInput,
      weight: weightInput,
      senderName: senderNameInput,
      recipientName: recipientNameInput,
    };
    setProducts([...products, newProduct]);
    console.log('products:', products);
    setAddressInput('');
    setSenderPhoneInput(0);
    setRecipientPhoneInput(0);
    setWeightInput(0);
    setSenderNameInput('');
    setRecipientNameInput('');

    // fetch('/api/products', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newProduct),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success:', data);
    //     setProducts([...products, newProduct]);
    //     setAddressInput('');
    //     setSenderPhoneInput(0);
    //     setRecipientPhoneInput(0);
    //     setWeightInput(0);
    //     setSenderNameInput('');
    //     setRecipientNameInput('');
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlerRecipientPhoneChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="c">
            <Form.Label>받는 이 주소</Form.Label>
            <Form.Control
              placeholder="도로명주소 입력 바랍니다."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAddressChange(e)}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSenderPhoneChange(e)}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="f">
          <Form.Label>보내는 이 주소</Form.Label>
          <Form.Control placeholder="도로명주소 입력 바랍니다." />
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
