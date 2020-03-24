import React from "react";
import { Row, Col } from "react-bootstrap";
import WorkingScheduleCalendar from "../components/WorkScheduleCalendar";
import Card from "../components/Card";
import UsersSearch from "../components/UsersSearch";
import { UserT } from "../state/ducks/user/types";

const fakeUsers: UserT[] = [
  {
    id: 1,
    firstName: "Maciek",
    lastName: "Kolos",
    email: "maciekkolos@test.pl",
    password: "xd"
  },
  {
    id: 2,
    firstName: "Irek",
    lastName: "Nowak",
    email: "irek@test.pl",
    password: "xd123"
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
