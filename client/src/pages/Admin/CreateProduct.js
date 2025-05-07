import React from "react";
import AdminMenu from "./../../components/Layout/AdminMenu";
import Layouts from './../../components/Layout/Layouts';

const CreateProduct = () => {
  return (
    <Layouts title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default CreateProduct;