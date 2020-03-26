import React from "react";
import { Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import CardStats from "../components/CardStats";
import { MdPeople, MdRefresh } from "react-icons/md";
import { Doughnut } from "react-chartjs-2";

const Dashboard: React.FC = () => {
  // const fetchAllUsers = useCallback(() => dispatch(fetchAllUsers.request()), [dispatch]);

  // useEffect(() => {

  // }

  var data = {
    labels: ["Wykorzystany urlop", "Pozostały urlop"],
    datasets: [
      {
        data: [40, 60],
        backgroundColor: ["orange", "green"]
      }
    ]
  };

  // var options = {
  //   high: 10,
  //   low: -10,
  //   axisX: {
  //     labelInterpolationFnc: function(value: number, index: number) {
  //       return index % 2 === 0 ? value : null;
  //     }
  //   }
  // };

  // var type = "Bar";

  return (
    <div className="content">
      <Container fluid>
        <Row>
          <Col className="col-xl-3 col-md-6">
            <CardStats
              text="Pracownicy"
              IconBig={MdPeople}
              iconBigColor="red"
              Icon={MdRefresh}
              iconText="Przed chwilą odświeżono"
              value="129"
            />
          </Col>
          <Col className="col-xl-3 col-md-6">
            <CardStats
              text="Rejestratorzy"
              IconBig={MdPeople}
              iconBigColor="orange"
              Icon={MdRefresh}
              iconText="Przed chwilą odświeżono"
              value="8"
            />
          </Col>
          <Col className="col-xl-3 col-md-6">
            <CardStats
              text="Kierownicy"
              IconBig={MdPeople}
              iconBigColor="blue"
              Icon={MdRefresh}
              iconText="Przed chwilą odświeżono"
              value="5"
            />
          </Col>
          <Col className="col-xl-3 col-md-6">
            <CardStats
              text="Admini"
              IconBig={MdPeople}
              iconBigColor="purple"
              Icon={MdRefresh}
              iconText="Przed chwilą odświeżono"
              value="5"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="card">
              <h3 className="text-center">
                Wykorzystanie urlopu przez wszystkich pracowników
              </h3>
              <Doughnut data={data} options={{ maintainAspectRatio: true }} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
