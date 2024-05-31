import styled from 'styled-components';
import Menu from 'components/Header/Menu';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axiosInstance from 'pages/login/LoginAxios';

interface depositInfo {
  money: number;
  password: string;
  accountNumber: string;
  accountHolder: string;
}
const ATM = () => {
  const items = ['입금', '출금', '예금'];
  const [deposit, setDeposit] = useState<depositInfo[]>([]);
  const [amountInput, setAmountInput] = useState<number>(0);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [accountInput, setAccountInput] = useState<string>('');
  const [accountHolderInput, setAccountHolderInput] = useState<string>('');
  const [bankBookCheckInput, setBankBookCheckInput] = useState<boolean>(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountInput(parseInt(e.target.value));
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountInput(e.target.value);
  };
  const handleAccountHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountHolderInput(e.target.value);
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankBookCheckInput((prevState) => !prevState);
    console.log(bankBookCheckInput);
  };
  const handleDeposit = async () => {
    if (!bankBookCheckInput) {
      alert('통장이나 카드를 삽입해주세요!');
      console.log(deposit);
      return;
    }
    // setDeposit([...deposit, newDeposit]);
    try {
      const newDeposit: depositInfo = {
        money: amountInput,
        password: passwordInput,
        accountNumber: accountInput,
        accountHolder: accountHolderInput,
      };
      const response = await axiosInstance.post('/atm/deposit', newDeposit);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setAmountInput(0);
    setPasswordInput('');
    setAccountInput('');
    setAccountHolderInput('');
    setBankBookCheckInput(false);
  };
  return (
    <Container>
      <Menu items={items} page={'etc/ATM'} />
      <Form style={{ marginTop: '30px', marginLeft: '250px' }}>
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

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>예금주</Form.Label>
          <Form.Control
            placeholder="해당 계좌의 예금주를 입력해주세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAccountHolderChange(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="통장이나 카드를 삽입했습니다."
            onChange={handleCheckboxChange}
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleDeposit}>
          입금
        </Button>
      </Form>
    </Container>
  );
};

export default ATM;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
