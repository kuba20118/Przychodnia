import React, { useEffect, useCallback } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { Col } from "react-bootstrap";
import CardStats from "../components/CardStats";
import { useDispatch } from "react-redux";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  // const fetchAllUsers = useCallback(() => dispatch(fetchAllUsers.request()), [dispatch]);

  // useEffect(() => {

  // }

  return (
    <div className="content">
      <Container fluid>
        <Row>
          <Col className="col-lg-3 col-sm-6">
            <CardStats
              text="Pracownicy"
              iconBig="fa fa"
              icon="fa fa-refresh"
              iconText="Przed chwilą odświeżono"
              value="129"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
