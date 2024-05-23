import axiosInstance from './LoginAxios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h1>Login</h1>
      <input
        type="password"
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
      <button onClick={() => handleClick('/login/signup')}>Signup</button>
    </div>
  );
};

export default LoginPage;
