import React from "react";

import VerifyEmail from "../components/VerifyEmail";
import Logout from "../components/Logout";

const VerifyEmailPage = () => {
  return (
    <React.Fragment>
      <div className="position-absolute top-0 end-0">
        <Logout />
      </div>
      <VerifyEmail />
    </React.Fragment>
  );
};

export default VerifyEmailPage;
