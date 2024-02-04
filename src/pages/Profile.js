import React from "react";

import UpdateProfile from "../components/UpdateProfile";
import Logout from "../components/Logout";

const ProfilePage = () => {
  return (
    <React.Fragment>
      <div className="position-absolute top-0 end-0">
        <Logout />
      </div>
      <UpdateProfile />
    </React.Fragment>
  );
};

export default ProfilePage;
