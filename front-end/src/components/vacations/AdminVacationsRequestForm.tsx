import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import LoadingButton from "../LoadingButton";
import { ISelectedWorkerVacationRequest } from "../../state/ducks/selected-worker/types";

type AdminVactionRequestFormType = {
  requests: ISelectedWorkerVacationRequest[];
  submitRequest: (answer: boolean) => void;
};

const AdminVacationsRequestForm: React.FC<AdminVactionRequestFormType> = ({
  requests,
  submitRequest,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <Container fluid>
      {requests.map((request, key) => (
        <Row className="py-2" key={key}>
          <Col>{request.fromDate}</Col>
          <Col>{request.toDate}</Col>
          <Col>{request.reason}</Col>
          <Col className="">
            <LoadingButton
              variant="danger"
              defaultText="Anuluj"
              defaultType="button"
              isLoading={isSubmitting}
              onClick={() => submitRequest(false)}
            ></LoadingButton>
          </Col>
          <Col className="text-right">
            <LoadingButton
              variant="primary"
              defaultText="Przydziel"
              defaultType="button"
              isLoading={isSubmitting}
              onClick={() => submitRequest(true)}
            ></LoadingButton>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default AdminVacationsRequestForm;
