import React from "react";
import Card from "../components/Card";
import RegistrationForm from "../components/RegistrationForm";

const Registration: React.FC = () => {
  const registerUser = () => {};

  return (
    <div className="content">
      <Card
        title="Rejestracja"
        content={<RegistrationForm registerUser={registerUser} />}
      ></Card>
    </div>
  );
};

export default Registration;
