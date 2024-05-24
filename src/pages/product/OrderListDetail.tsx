import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axiosInstance from "../login/LoginAxios";


const OrderListDetail = () => {
  const orderId = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [order, setOrder] = useState([])
  useEffect(() => {
    const getOrder = async () => {
      const response = await axiosInstance.get(`/orders/findByOrderNumber/${orderId}`);
      setOrder(response.data);
      setLoading(false);
    };
    getOrder();
  }, [])
  return (
    <div>
        {loading ? (
          <h2>loading..</h2>
        ): (
          <></>
        )}
    </div>
  );
};

export default OrderListDetail;

