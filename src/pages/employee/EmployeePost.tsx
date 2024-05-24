import React, { useState } from 'react';
import styled from 'styled-components';
import Menu from 'components/Header/Menu';
import axiosInstance from '../login/LoginAxios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const items = ['직원 현황', '직원 등록'];

interface EmployeeInfo {
  name: string;
  gender: string;
  title: string; // 직급
  officeHours: number;
  career: string;
  salary: number;
}

const EmployeePost = () => {
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo[]>([]);
  const [nameInput, setNameInput] = useState<string>('');
  const [genderInput, setGenderInput] = useState<string>('');
  const [titleInput, setTitleInput] = useState<string>('');
  const [officeHoursInput, setOfficeHoursInput] = useState<number>(0);
  const [careerInput, setCareerInput] = useState<string>('');
  const [salaryInput, setSalaryInput] = useState<number>(0);

  const handleAddEmployee = async () => {
    try {
      const newEmployee: EmployeeInfo = {
        name: nameInput,
        gender: genderInput,
        title: titleInput, // 직급
        officeHours: officeHoursInput,
        career: careerInput,
        salary: salaryInput,
      };
      const response = await axiosInstance.post('/hr', newEmployee);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    // setProducts([...products, newProduct]);
    console.log('employee:', employeeInfo);
    setNameInput('');
    setGenderInput('');
    setTitleInput('');
    setOfficeHoursInput(0);
    setCareerInput('');
    setSalaryInput(0);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenderInput(e.target.value);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };
  const handleOfficeHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfficeHoursInput(parseInt(e.target.value));
  };
  const handleCareerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCareerInput(e.target.value);
  };
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryInput(parseInt(e.target.value));
  };
  return (
    <Container>
      <Menu items={items} page={'employee'} />
      <Form style={{ marginTop: '30px', marginLeft: '250px' }}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="a">
            <Form.Label>이름</Form.Label>
            <Form.Control
              type="text"
              placeholder="신규 직원 이름을 입력해주세요."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNameChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="b">
            <Form.Label>성별</Form.Label>
            <Form.Control
              type="text"
              placeholder="신규 직원의 성별을 입력해주세요."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleGenderChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="c">
            <Form.Label>직급</Form.Label>
            <Form.Control
              placeholder="신규 직원의 직급을 입력해주세요."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(e)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="Career">
            <Form.Label>근무 시간</Form.Label>
            <Form.Control
              type="text"
              placeholder="신규 직원의 일주일 근무 시간을 입력해주세요."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOfficeHoursChange(e)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="d">
            <Form.Label>경력</Form.Label>
            <Form.Control
              type="text"
              placeholder="신규 직원의 경력을 입력해주세요."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCareerChange(e)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="e">
            <Form.Label>급여(시급)</Form.Label>
            <Form.Control
              type="text"
              placeholder="신규 직원의 급여를 입력해주세요."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSalaryChange(e)}
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" onClick={handleAddEmployee}>
          접수
        </Button>
      </Form>
    </Container>
  );
};

export default EmployeePost;
const Container = styled.div`
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
