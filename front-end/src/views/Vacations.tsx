import React from "react";
import Card from "../components/Card";
import { Row, Col } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import VacationsForm from "../components/VacationsForm";

const Vacations: React.FC = () => {
  // TODO: GET IT FROM REDUX STORE
  const maxHolidaysDays = 14;

  // TODO ADD SEARCH WORKERS WITH BOUNCE EFFECT
  const searchWorkers = () => {};

  const assignHolidays = () => {};

  const initialVacationData = {
    labels: ["Wykorzystany urlop", "Pozostały urlop"],
    datasets: [
      {
        data: [1, 0],
        backgroundColor: ["lightgrey", "grey"]
      }
    ]
  };

  return (
    <div className="content">
      <Row className="d-flex align-items-strech">
        <Col xl={7}>
          <Card
            title="Przydziel urlop"
            content={<VacationsForm submitChanges={assignHolidays} />}
          />
        </Col>
        <Col xl={5}>
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
        </Col>
      </Row>
      <Row></Row>
    </div>
  );
};

export default Vacations;
