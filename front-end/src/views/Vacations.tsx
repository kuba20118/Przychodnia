import React from "react";
import Card from "../components/Card";
import { Row, Col } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";

const Vacations: React.FC = () => {
  return (
    <div className="content">
      <Row className="d-flex align-items-strech">
        <Col xl={7}></Col>
        {/* <Col xl={5}>
          <Card
            title="Pozostały czas urlopu"
            subtitle={`${maxHolidaysDays} dni`}
            content={
              <Doughnut
                data={initialVacationData}
                options={{ maintainAspectRatio: true }}
              />
            }
          />
        </Col> */}
      </Row>
      <Row></Row>
    </div>
  );
};

export default Vacations;
