import React from "react";
import { UserT } from "../state/ducks/user/types";

type UserCardPropsT = {
  user: UserT;
};

const initialSelectedUser: UserT = {
  idUser: "1",
  firstName: "",
  lastName: "",
  mail: "",
  role: "",
  workingHours: 0,
  currentlyEmployed: false,
  hireDate: ""
};

const UserCard: React.FC<UserCardPropsT> = ({ user }) => {
  return (
    <div className="card card-user">
      <div className="content">
        <p className="title">INFORMATION</p>
        <hr />
        <p>
          <b>Imię </b>
          {user.firstName} {user.lastName}
        </p>
        <p>
          <b>Email </b>
          {user.mail}
        </p>
        <p>
          <b>Role </b>
          {user.role}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
