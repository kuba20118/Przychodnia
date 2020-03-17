import React from "react";
import { Row, Col } from "react-bootstrap";

type CardStatsPropsT = {
  text: string;
  value: string;
  iconBig: string;
  icon: string;
  iconText: string;
};

const CardStats: React.FC<CardStatsPropsT> = ({
  text,
  value,
  iconBig,
  icon,
  iconText
}) => {
  return (
    <div className="card card-stats">
      <div className="content">
        <Row>
          <Col xs={5}>
            <div className="icon big text-center icon-warning">
              <i className={iconBig}></i>
            </div>
          </Col>
          <Col xs={7}>
            <div className="numbers">
              <p>{text}</p>
              {value}
            </div>
          </Col>
        </Row>
        <div className="footer">
          <hr />
          <div className="status">
            <i className={icon}></i>
            {iconText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStats;
