import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import Layouts from './../../components/Layout/Layouts';
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layouts title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
         {orders?.length > 0 ? (
  orders.map((o, i) => (
    <div className="border shadow" key={o._id}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Status</th>
            <th scope="col">Buyer</th>
            <th scope="col">Date</th>
            <th scope="col">Payment</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{i + 1}</td>
            <td>
              <Select
                onChange={(value) => handleChange(o._id, value)}
                defaultValue={o?.status}
              >
                {status.map((s, idx) => (
                  <Option key={idx} value={s}>
                    {s}
                  </Option>
                ))}
              </Select>
            </td>
            <td>{o?.buyer?.name}</td>
            <td>{moment(o?.createdAt).fromNow()}</td>
            <td>{o?.payment.success ? "Success" : "Failed"}</td>
            <td>{o?.products?.length}</td>
          </tr>
        </tbody>
      </table>
      <div className="container">
        {o?.products?.map((p, idx) => (
          <div className="row mb-2 p-3 card flex-row" key={p._id}>
            <div className="col-md-4">
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                width="100px"
                height="100px"
              />
            </div>
            <div className="col-md-8">
              <p>{p.name}</p>
              <p>{p.description.substring(0, 30)}</p>
              <p>Price: {p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))
) : (
  <p className="text-center">No orders found.</p>
)}
        </div>
      </div>
    </Layouts>
  );
};

export default AdminOrders;