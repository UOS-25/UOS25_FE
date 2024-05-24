import Menu from 'components/Header/Menu';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
interface Employee {
  id: number;
  name: string;
  position: string;
  status: string;
  salary: number;
}

// 가정된 서버로부터 받아온 데이터
const mockEmployeeData: Employee[] = [
  { id: 1, name: '직원A', position: '매니저', status: '근무중', salary: 10000 },
  // 추가 직원 데이터
];

const items = ['직원 현황', '직원 등록'];

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  useEffect(() => {
    // 여기서 서버로부터 직원 데이터를 받아오는 코드를 구현합니다.
    // 아래는 모의 데이터를 사용하는 예시입니다.
    setEmployees(mockEmployeeData);
  }, []);

  const handleDismiss = (id: number) => {
    // 직원 해고 로직
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <BodyContainer>
      <Menu items={items} page={'employee'} />
      <Container>
        <EmployeeRow style={{ borderBottom: '1px solid lightgrey' }}>
          <div>이름</div>
          <div>직급</div>
          <div>근무 상황</div>
          <div>급여</div>
          <div>해고</div>
        </EmployeeRow>
        {employees.map((employee) => (
          <EmployeeRow key={employee.id}>
            <div>{employee.name}</div>
            <div>{employee.position}</div>
            <Button onClick={() => alert('작성 페이지로 이동')}>작성</Button>
            <div>{employee.salary}</div>
            <Button onClick={() => employee.id}>해고</Button>
          </EmployeeRow>
        ))}
      </Container>
    </BodyContainer>
  );
}

export default App;

const BodyContainer = styled.div`
  // display: flex;
  // flex-direction: row;
`;

const Container = styled.div`
  margin-left: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const EmployeeRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  padding: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
`;
