import React from "react";
import UserMenu from "./../components/Layout/UserMenu";
import Layouts from './../components/Layout/Layouts';

const Profile = () => {
  return (
    <Layouts title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Your Profile</h1>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Profile;