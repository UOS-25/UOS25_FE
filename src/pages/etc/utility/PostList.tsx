import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Menu from "../../../components/Header/Menu";
import axiosInstance from "../../login/LoginAxios";
import {Link} from "react-router-dom";


interface parcelInfo {
  "parcelId": 0,
  "fromAddress": "string",
  "toAddress": "string",
  "fromPhoneNumber": "string",
  "toPhoneNumber": "string",
  "weight": 0,
  "goods": "string"
}



const PostList = () => {
  const menuItems = ['택배 발송', '택배 조회'];
  const [parcelData, setParcelData] = useState<parcelInfo[]>([]);
  const [test, setTest] = useState<parcelInfo>();
  useEffect (() => {
    const getParcel = async () => {
      try{
        const response = await axiosInstance.get(`/parcel`);
        console.log(response.data);
      setParcelData(response.data.responses);
      } catch(error) {
        console.log(error);
      }
    };
    getParcel();
  }, [])
  return (
   <Container>
     <Menu items={menuItems} page={'etc/Post'}/>
     <ul>
       {parcelData.map((item) => (
           <li key={item.parcelId} style={{marginLeft: '250px'}}>
             <Link to={`/etc/Post/1/${item.parcelId}`}>
               {item.parcelId}
             </Link>
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