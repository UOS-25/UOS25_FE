import axiosInstance from './LoginAxios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleClick = (domain: string) => {
    navigate(domain);
  };
  const [code, setCode] = useState<string>('');

  const handleLogin = async () => {
    try {
      console.log({ code });
      const response = await axiosInstance.post('auth/login', { code });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      console.log('Login successful', response.data);
      navigate('/');
    } catch (error) {
      if (error.response) {
        alert('등록되지 않은 코드입니다.');
        // 서버가 4xx 혹은 5xx 응답을 반환한 경우
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        // 요청이 만들어졌지만 응답을 받지 못한 경우
        console.error('Error request:', error.request);
      } else {
        // 요청을 설정하는 중에 문제가 생긴 경우
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>Login</Title>
        <Input
          type="password"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Input type="password" placeholder="password" />
        <Button onClick={handleLogin}>Login</Button>
        <SignupButton onClick={() => handleClick('/login/signup')}>Signup</SignupButton>
      </LoginBox>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const LoginBox = styled.div`
  width: 400px;
  padding: 40px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const SignupButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;
