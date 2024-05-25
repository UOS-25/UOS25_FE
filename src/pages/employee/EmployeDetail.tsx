import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from 'pages/login/LoginAxios';
import styled from 'styled-components';
import Menu from 'components/Header/Menu';
import Button from 'react-bootstrap/Button';

interface EmployeeInfo {
  employeeId: number;
  name: string;
  title: string;
  gender: string;
  officeHours: string;
  career: string;
  salary: number;
  review: string;
}

const EmployeeListDetail = () => {
  const items = ['직원 현황', '직원 등록'];
  const { employeeId } = useParams<{ employeeId: string }>();
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState<EmployeeInfo>({
    employeeId: 0,
    name: '',
    title: '',
    gender: '',
    officeHours: '',
    career: '',
    salary: 0,
    review: '',
  });
  const navigate = useNavigate();
  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await axiosInstance.get(`/hr/employees/${employeeId}`);
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getEmployee();
  }, [employeeId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleUpdateEmployee = async () => {
    const { employeeId, ...updatedEmployeeData } = employee;
    try {
      const response = await axiosInstance.patch(
        `/hr/employees/${employeeId}`,
        updatedEmployeeData,
      );
      console.log(response.data);
      alert('수정이 완료되었습니다.');
    } catch (error) {
      console.log(error);
      alert('수정 중 오류가 발생했습니다.');
    }
  };
  const handleDeleteEmployee = async () => {
    const confirmDelete = window.confirm('이 직원을 해고하시겠습니까?');
    if (confirmDelete) {
      try {
        const response = await axiosInstance.delete(`/hr/employees/${employeeId}`);
        console.log(response.data);
        alert('직원이 해고되었습니다.');
        navigate(-1);
      } catch (error) {
        console.log(error);
        alert('해고 중 오류가 발생했습니다.');
      }
    }
  };

  const handlePaySalary = async () => {
    const confirmPay = window.confirm('급여를 지급하시겠습니까?');
    if (confirmPay) {
      try {
        const response = await axiosInstance.post(`/hr/employees/${employeeId}/payment`);
        console.log(response.data);
        alert('급여가 지급되었습니다.');
      } catch (error) {
        console.log(error);
        alert('급여 지급 중 오류가 발생했습니다.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employee.employeeId) {
    return <div>No Employee data found.</div>;
  }

  return (
    <Container>
      <Menu items={items} page={'employee'} />
      <InformationRow>
        직원 이름
        <Input name="name" value={employee.name} onChange={handleInputChange} />
      </InformationRow>
      <InformationRow>
        성별
        <Input name="gender" value={employee.gender} onChange={handleInputChange} />
      </InformationRow>
      <InformationRow>
        한줄 근무 평
        <Input name="review" value={employee.review} onChange={handleInputChange} />
      </InformationRow>
      <InformationRow>
        주당 근무 시간
        <Input name="officeHours" value={employee.officeHours} onChange={handleInputChange} />
      </InformationRow>
      <InformationRow>
        경력(개월)
        <Input name="career" value={employee.career} onChange={handleInputChange} />
      </InformationRow>
      <InformationRow>
        시급
        <Input name="salary" value={employee.salary} onChange={handleInputChange} type="number" />
      </InformationRow>
      <InformationRow>
        직급
        <Input name="salary" value={employee.title} onChange={handleInputChange} />
      </InformationRow>
      <ButtonContainer>
        <Button variant="primary" onClick={handleUpdateEmployee} size="sm">
          수정 완료
        </Button>
        <Button variant="danger" onClick={handleDeleteEmployee} size="sm">
          직원 해고
        </Button>
        <Button variant="success" onClick={handlePaySalary} size="sm">
          급여 지불
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default EmployeeListDetail;

const Container = styled.div`
  margin-top: 30px;
  margin-left: 300px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-row-gap: 70px;
  justify-content: center;
  align-items: center;
`;

const InformationRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
`;

const Input = styled.input`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  border: 1px solid lightgray;
  padding: 5px;
  border-radius: 3px;
  margin-top: 5px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 74%;
  margin-top: 20px;
`;
