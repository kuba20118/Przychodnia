import React from "react";
import { UserT } from "../state/ducks/user/types";
import { ISelectedWorker } from "../state/ducks/selected-worker/types";

type UserCardPropsT = {
  readonly user?: UserT | ISelectedWorker;
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

const UserCard: React.FC<UserCardPropsT> = ({ user = initialSelectedUser }) => {
  return (
    <div className="card card-user">
      <div className="content">
        <p className="title">INFORMACJE</p>
        <hr />
        <p>
          <b>Imię </b>
          {user!.firstName} {user!.lastName}
        </p>
        <p>
          <b>Email </b>
          {user!.mail}
        </p>
        <p>
          <b>Rola </b>
          {user!.role}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
