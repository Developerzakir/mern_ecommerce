import React from "react";
import AdminMenu from "./../../components/Layout/AdminMenu";
import Layouts from './../../components/Layout/Layouts';

const CreateCategory = () => {
  return (
    <Layouts title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Category</h1>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default CreateCategory;