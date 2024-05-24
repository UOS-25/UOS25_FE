import Menu from 'components/Header/Menu';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosInstance from 'pages/login/LoginAxios';
import { Link } from 'react-router-dom';
interface Employee {
  employeeId: number;
  name: 'string';
  gender: 'string';
  title: 'string';
  officeHours: number;
  career: 'string';
  salary: number;
  review: 'string';
}

// 가정된 서버로부터 받아온 데이터

const items = ['직원 현황', '직원 등록'];

const Employee = () => {
  const [employeeData, setEmployeeDataa] = useState<Employee[]>([]);

  useEffect(() => {
    const getParcel = async () => {
      try {
        const response = await axiosInstance.get(`/hr/employees`);
        console.log(response.data);
        setEmployeeDataa(response.data.responses);
      } catch (error) {
        console.log(error);
      }
    };
    getParcel();
  }, []);

  return (
    <Container>
      <Menu items={items} page={'employee'} />
      <ParcelList>
        {employeeData.map((item) => (
          <ParcelItem key={item.employeeId}>
            <StyledLink to={`/employee/0/${item.employeeId}`}>
              <ParcelId>직원 번호: {item.employeeId}</ParcelId>
              <PhoneNumber>이름: {item.name}</PhoneNumber>
            </StyledLink>
          </ParcelItem>
        ))}
      </ParcelList>
    </Container>
  );
};

export default Employee;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-left: 180px;
`;

const ParcelList = styled.ul`
  width: 80%;
  padding: 0;
  list-style: none;
  margin-top: 20px;
`;

const ParcelItem = styled.li`
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
