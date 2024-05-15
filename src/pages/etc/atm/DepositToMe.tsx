import styled from 'styled-components';
import Menu from 'components/Header/Menu';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

interface depositInfo {
  amount: number;

  bankBookCheck: boolean;
}
const DepositToMe = () => {
  const items = ['입금', '출금', '예금'];
  const [deposit, setDeposit] = useState<depositInfo[]>([]);
  const [amountInput, setAmountInput] = useState<number>(0);

  const [bankBookCheckInput, setBankBookCheckInput] = useState<boolean>(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountInput(parseInt(e.target.value));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankBookCheckInput((prevState) => !prevState);
    console.log(bankBookCheckInput);
  };
  const handleDeposit = () => {
    const newDeposit: depositInfo = {
      amount: amountInput,
      bankBookCheck: bankBookCheckInput,
    };
    if (!bankBookCheckInput) {
      alert('통장이나 카드를 삽입해주세요!');
      console.log(deposit);
      return;
    }
    setDeposit([...deposit, newDeposit]);
    setAmountInput(0);
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
        </Row>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="통장이나 카드를 삽입하고 지폐를 투입했습니다."
            onChange={handleCheckboxChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleDeposit}>
          출금
        </Button>
      </Form>
    </Container>
  );
};

export default DepositToMe;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
