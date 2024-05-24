import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const handleClick = (domain: string) => {
    navigate(domain);
  };

  const [code, setCode] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const handleSingup = async () => {
    try {
      console.log({ code, location });
      const response = await axios.post('//localhost:8080/api/v1/auth/signUp', {
        code,
        location,
      }); // api
      console.log(response.data);
      handleClick('/login');
    } catch (error) {
      console.log(error);
      setCode('');
      setLocation('');
    }
  };
  return (
    <div>
      <h1>Signup</h1>

      <input
        type="text"
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input type="button" placeholder="회원가입" onClick={handleSingup} />
    </div>
  );
};

export default Signup;
