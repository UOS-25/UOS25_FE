import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Menu from 'components/Header/Menu';
import axiosInstance from 'pages/login/LoginAxios';
import { Link } from 'react-router-dom';

interface EmployeeInfo {
  employeeId: number;
  name: 'string';
  gender: 'string';
  title: 'string';
  officeHours: 'string';
  career: 'string';
  salary: 0;
  review: string;
}

const PostList = () => {
  const items = ['직원 현황', '직원 등록'];
  const [employeeData, setEmployeeData] = useState<EmployeeInfo[]>([]);
  useEffect(() => {
    const getParcel = async () => {
      try {
        const response = await axiosInstance.get(`/hr/employees`);
        console.log(response.data);
        setEmployeeData(response.data.responses);
      } catch (error) {
        console.log(error);
      }
    };
    getParcel();
  }, []);
  return (
    <Container>
      <Menu items={items} page={'employee'} />
      <ul>
        {employeeData.map((item) => (
          <li key={item.employeeId} style={{ marginLeft: '250px' }}>
            <Link to={`/etc/Post/1/${item.employeeId}`}>{item.employeeId}</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default PostList;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
