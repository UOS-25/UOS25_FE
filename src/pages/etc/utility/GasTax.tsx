import Menu from 'components/Header/Menu';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
interface taxInfo {
  amount: number;
  password: number;
  account: number;
  bankBookCheck: boolean;
}

const GasTax = () => {
  const items = ['수도 요금', '전기 요금', '가스 요금'];
  const [tax, setTax] = useState<taxInfo[]>([]);
  const [amountInput, setAmountInput] = useState<number>(0);
  const [passwordInput, setPasswordInput] = useState<number>(0);
  const [accountInput, setAccountInput] = useState<number>(0);
  const [bankBookCheckInput, setBankBookCheckInput] = useState<boolean>(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountInput(parseInt(e.target.value));
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(parseInt(e.target.value));
  };
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountInput(parseInt(e.target.value));
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankBookCheckInput((prevState) => !prevState);
    console.log(bankBookCheckInput);
  };

  const handleTax = () => {
    const newTax: taxInfo = {
      amount: amountInput,
      password: passwordInput,
      account: accountInput,
      bankBookCheck: bankBookCheckInput,
    };
    if (!bankBookCheckInput) {
      alert('통장이나 카드를 삽입해주세요!');
      console.log(tax);
      return;
    }
    setTax([...tax, newTax]);
    setAmountInput(0);
    setAccountInput(0);
    setPasswordInput(0);
    setBankBookCheckInput(false);
  };
  return (
    <Container>
      <div style={{ marginLeft: '200px' }}>가스 요금</div>
      <Menu items={items} page={'etc/Utility'} />
      <Form style={{ marginTop: '30px' }}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>금액</Form.Label>
            <Form.Control
              type="input"
              placeholder="금액을 입력해주세요."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAmountChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePasswordChange(e)}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>계좌번호</Form.Label>
          <Form.Control
            placeholder="입금하실 계좌번호를 입력해주세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAccountChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="통장이나 카드를 삽입했습니다."
            onChange={handleCheckboxChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleTax}>
          출금
        </Button>
      </Form>
    </Container>
  );
};

export default GasTax;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
