import React from "react";
import { UserT } from "../../state/ducks/user/types";
import { ISelectedWorker } from "../../state/ducks/selected-worker/types";
import { format, parseISO } from "date-fns";
import DefaultUserImg from "../../assets/images/default-user.jpg";

type UserCardPropsT = {
  readonly user: UserT | ISelectedWorker;
};

const initialSelectedUser: UserT = {
  idUser: "1",
  firstName: "",
  lastName: "",
  mail: "",
  role: "",
  workingHours: 0,
  currentyEmployed: false,
  hireDate: "",
};

const UserCard: React.FC<UserCardPropsT> = ({ user = initialSelectedUser }) => {
  return (
    <div className="card card-user">
      <div className="content">
        <p className="title">Dane użytkownika</p>
        <hr />
        <div className="info">
          <div className="info__img">
            {/* <FaUserAlt color="#cacaca" size={226} /> */}
            <img src={DefaultUserImg} />
          </div>
          <div className="info__content">
            <p>
              <b>Imię: </b>
              {user!.firstName}
            </p>
            <p>
              <b>Nazwisko: </b>
              {user!.firstName} {user!.lastName}
            </p>
            <p>
              <b>Email: </b>
              {user!.mail}
            </p>
            <p>
              <b>Rola: </b>
              {user!.role}
            </p>
            <p>
              <b>Data zatrudnienia: </b>
              {format(parseISO(user.hireDate!), "dd-MM-yyyy")}
            </p>
            <p>
              <b>Dziennie pracuje: </b>
              {user!.workingHours} godzin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
