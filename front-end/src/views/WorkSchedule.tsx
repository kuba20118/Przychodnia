import React from "react";
import { Row, Col } from "react-bootstrap";
import WorkingScheduleCalendar from "../components/WorkScheduleCalendar";
import Card from "../components/Card";
import UsersSearch from "../components/UsersSearch";
import { UserT } from "../state/ducks/user/types";

const fakeUsers: UserT[] = [
  {
    idUser: 1,
    firstName: "Radek",
    lastName: "Kowalski",
    mail: "kowalski@radek.pl",
    role: "Pracownik",
    workingHours: 8,
    currentlyEmployed: true,
    hireDate: "2020-01-01T00:00:00"
  },
  {
    idUser: 1,
    firstName: "Paweł",
    lastName: "Nowak",
    mail: "nowak@pawel.pl",
    role: "Kierwonik",
    workingHours: 8,
    currentlyEmployed: true,
    hireDate: "2020-01-01T00:00:00"
  }
];

const WorkSchedule: React.FC = () => {
  const searchWorkers = () => {};

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
                  <UsersSearch onSearch={searchWorkers} users={fakeUsers} />
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
