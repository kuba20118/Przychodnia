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
import { getStatsAsync } from "../../state/ducks/stats/actions";
import { ChartDataT } from "../../state/ducks/stats/types";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  const users: UserT[] | undefined = useSelector(
    ({ user }: IApplicationState) => user.users
  );

  const stats: ChartDataT | undefined = useSelector(
    ({ stats }: IApplicationState) => stats.stats[0]
  );

  useEffect(() => {
    dispatch(fetchAllVacationsAsync.request());
    dispatch(getStatsAsync.request());
  }, []);

  const createBarData = (
    title?: string,
    labels?: string[],
    values?: number[]
  ) => ({
    labels: labels ? labels : [],
    datasets: [
      {
        label: title ? title : "",
        backgroundColor: "#71dce4",
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        data: values ? values : [],
      },
    ],
  });

  console.log(createBarData(stats.title, stats.data?.item1, stats.data?.item2));

  // const allUsersNum = users && users.length;
  const workersNum =
    users && users.filter((user) => user.role === "Pracownik").length;
  const managersNum =
    users && users.filter((user) => user.role === "Kierownik").length;
  const rejestratorsNum =
    users && users.filter((user) => user.role === "Rejestrator").length;
  const adminsNum =
    users && users.filter((user) => user.role === "Admin").length;

  const data = {
    labels: ["Pracownicy", "Kierownicy", "Rejestratorzy", "Admini"],
    datasets: [
      {
        data: [workersNum, managersNum, rejestratorsNum, adminsNum],
        backgroundColor: ["red", "orange", "blue", "purple"],
      },
    ],
  };

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
        <Row className="d-flex justify-content-center">
          <Col md={8}>
            <Card
              title="Wykorzystanie urlopów w danym miesiącu"
              subtitle="Dane dotyczą wszystkich użytkowników w biężącym roku "
              content={
                <Bar
                  data={createBarData(
                    stats.title,
                    stats.data?.item1,
                    stats.data?.item2
                  )}
                  options={{ maintainAspectRatio: true }}
                />
              }
            />
          </Col>
          {
            <Col md={4}>
              <Card
                title="Role użytkowników"
                subtitle="Dane dotyczą wszystkich użytkowników w biężącym roku"
                content={
                  <Doughnut
                    data={data}
                    options={{ maintainAspectRatio: true }}
                  />
                }
              />
            </Col>
          }
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
