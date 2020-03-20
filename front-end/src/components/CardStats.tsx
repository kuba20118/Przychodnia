import React from "react";
import { Row, Col } from "react-bootstrap";
import { IconType } from "react-icons/lib/cjs";

type CardStatsPropsT = {
  text: string;
  value: string;
  IconBig: IconType;
  iconBigColor: string;
  Icon: IconType;
  iconText: string;
};

const CardStats: React.FC<CardStatsPropsT> = ({
  text,
  value,
  IconBig,
  iconBigColor,
  Icon,
  iconText
}) => {
  return (
    <div className="card card-stats">
      <div className="content">
        <Row>
          <Col xs={4}>
            <div className="icon-big text-center">
              <IconBig color={iconBigColor} />
            </div>
          </Col>
          <Col xs={8}>
            <div className="numbers">
              <p>{text}</p>
              {value}
            </div>
          </Col>
        </Row>
        <div className="footer">
          <hr />
          <div className="status">
            <Icon />
            {iconText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStats;
