import React from "react";
import UserMenu from "./../components/Layout/UserMenu";
import { useAuth } from "./../context/auth";
import Layouts from './../components/Layout/Layouts';
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layouts title={"Dashboard - Ecommerce App"}>
      <div className="container-flui m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Dashboard;