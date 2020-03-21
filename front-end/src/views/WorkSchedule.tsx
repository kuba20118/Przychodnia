import React from "react";
import { Row, Col } from "react-bootstrap";
import WorkingScheduleCalendar from "../components/WorkScheduleCalendar";
import Card from "../components/Card";
import Search from "../components/Search";

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
                  <Search onSearch={searchWorkers} />
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
