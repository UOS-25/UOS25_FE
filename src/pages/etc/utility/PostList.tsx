import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Menu from "../../../components/Header/Menu";
import axiosInstance from "../../login/LoginAxios";
import {Link} from "react-router-dom";


interface ParcelInfo {
  parcelId: number;
  fromPhoneNumber: string;
}



const PostList = () => {
  const menuItems = ['택배 발송', '택배 조회'];
  const [parcelData, setParcelData] = useState<ParcelInfo[]>([]);
  useEffect (() => {
    const getParcel = async () => {
      try{
        const response = await axiosInstance.get(`/parcel`);
        console.log(response.data);
        // const dataArray = Array.isArray(response.data) ? response.data : response.data.data;
        const filteredData: ParcelInfo[] = Object.values(response.data).map(parcel => ({
          parcelId: (parcel as { parcelId: number }).parcelId,
          fromPhoneNumber: (parcel as { fromPhoneNumber: string }).fromPhoneNumber,
        }));
      setParcelData(prevData => [...prevData, ...filteredData]);
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
       {parcelData.map((item: ParcelInfo) => (
           <li key={item.parcelId} style={{marginLeft: '250px'}}>
             <Link to={`/etc/Post/1${item.parcelId}`}>
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