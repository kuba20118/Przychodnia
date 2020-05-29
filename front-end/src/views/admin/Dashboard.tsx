import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import CardStats from "../../components/card/CardStats";
import { MdPeople, MdRefresh } from "react-icons/md";
import { Bar, Doughnut } from "react-chartjs-2";
import Card from "../../components/card/Card";
import { useSelector, useDispatch } from "react-redux";
import { IApplicationState } from "../../state/ducks";
import { UserT } from "../../state/ducks/user/types";
import { fetchAllVacationsAsync } from "../../state/ducks/vacations/actions";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  const users: UserT[] | undefined = useSelector(
    (state: IApplicationState) => state.user.users
  );

  useEffect(() => {
    dispatch(fetchAllVacationsAsync.request());
  });

  const barData = {
    labels: [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ],
    datasets: [
      {
        label: "Urlop w dniach",
        backgroundColor: "#71dce4",
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        data: [
          { x: 1, y: 245 },
          { x: 2, y: 243 },
          { x: 3, y: 177 },
          { x: 4, y: 87 },
          { x: 5, y: 44 },
          { x: 6, y: 33 },
          { x: 7, y: 240 },
          { x: 8, y: 299 },
          { x: 9, y: 121 },
          { x: 10, y: 55 },
          { x: 11, y: 77 },
          { x: 12, y: 99 },
        ],
      },
    ],
  };

  const data = {
    labels: ["Wykorzystany urlop", "Pozostały urlop"],
    datasets: [
      {
        data: [40, 60],
        backgroundColor: ["orange", "green"],
      },
    ],
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

  // const allUsersNum = users && users.length;
  const workersNum =
    users && users.filter((user) => user.role === "Pracownik").length;
  const managersNum =
    users && users.filter((user) => user.role === "Kierownik").length;
  const rejestratorsNum =
    users && users.filter((user) => user.role === "Rejestrator").length;
  const adminsNum =
    users && users.filter((user) => user.role === "Admin").length;

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
              value={workersNum?.toString() || ""}
            />
          </Col>
          <Col className="col-xl-3 col-md-6">
            <CardStats
              text="Rejestratorzy"
              IconBig={MdPeople}
              iconBigColor="orange"
              Icon={MdRefresh}
              iconText="Przed chwilą odświeżono"
              value={rejestratorsNum?.toString() || ""}
            />
          </Col>
          <Col className="col-xl-3 col-md-6">
            <CardStats
              text="Kierownicy"
              IconBig={MdPeople}
              iconBigColor="blue"
              Icon={MdRefresh}
              iconText="Przed chwilą odświeżono"
              value={managersNum?.toString() || ""}
            />
          </Col>
          <Col className="col-xl-3 col-md-6">
            <CardStats
              text="Admini"
              IconBig={MdPeople}
              iconBigColor="purple"
              Icon={MdRefresh}
              iconText="Przed chwilą odświeżono"
              value={adminsNum?.toString() || ""}
            />
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <Card
              title="Wykorzystanie urlopów w danym miesiącu"
              subtitle="Dane dotyczą wszystkich użytkowników w biężącym roku "
              content={
                <Bar data={barData} options={{ maintainAspectRatio: true }} />
              }
            />
          </Col>
          <Col md={5}>
            <Card
              title="Ogólne wykorzystanie urlopów"
              subtitle="Dane dotyczą wszystkich użytkowników w biężącym roku"
              content={
                <Doughnut data={data} options={{ maintainAspectRatio: true }} />
              }
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
