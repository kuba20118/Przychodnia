import React, { useState, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import WorkingScheduleCalendar from "../components/WorkScheduleCalendar";
import Card from "../components/Card";
import UsersSearch from "../components/UsersSearch";
import { UserT } from "../state/ducks/user/types";

const initialSelectedUser: UserT = {
  idUser: "1",
  firstName: "",
  lastName: "",
  mail: "",
  role: "",
  workingHours: 0,
  currentlyEmployed: false,
  hireDate: "2020-01-01T00:00:00"
};

const WorkSchedule: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<UserT>(initialSelectedUser);

  const searchWorkers = useCallback((user: UserT) => {
    setSelectedUser(user);
  }, []);

  return (
    <div className="content">
      <Row>
        <Col>
          <Card
            title="Edytuj grafik dla pracownika"
            subtitle="Grafik cykliczny"
            content={
              <>
                <div className="pt-2 pb-3">
                  <UsersSearch onSearch={searchWorkers} />
                  <p>Imię: {selectedUser.firstName}</p>
                  <p>Nazwisko: {selectedUser.lastName}</p>
                  <p>E-mail: {selectedUser.mail}</p>
                </div>
                <WorkingScheduleCalendar />
              </>
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default WorkSchedule;
