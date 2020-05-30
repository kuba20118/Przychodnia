import React, { useState, useEffect } from "react";
import { Row, Col, Container, FormLabel, FormControl } from "react-bootstrap";
import LoadingButton from "../LoadingButton";
import {
  ISelectedWorkerVacationRequest,
  ISelectedWorker,
} from "../../state/ducks/selected-worker/types";
import {
  VacationRequestSubmitT,
  VacationRequestIdT,
} from "../../state/ducks/vacations/types";
import formatToReadable from "../../state/utils/date/formatToReadable";

type AdminVactionRequestFormType = {
  requests?: ISelectedWorkerVacationRequest[];
  potentialSubs?: ISelectedWorker[];
  acceptRequest: (data: VacationRequestSubmitT) => void;
  cancelRequest: (requestId: VacationRequestIdT) => void;
};

const AdminVacationsRequestForm: React.FC<AdminVactionRequestFormType> = ({
  requests,
  potentialSubs,
  acceptRequest,
  cancelRequest,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [substitutionsIds, setSubstitutionsIds] = useState<string[]>([]);

  useEffect(() => {
    if (requests && potentialSubs && potentialSubs.length) {
      const subsIds = requests.map((req) => potentialSubs[0].idUser);
      setSubstitutionsIds(subsIds);
    }
  }, [potentialSubs]);

  const handleChangeSubInput = (
    e: React.FormEvent<HTMLSelectElement>,
    key: number
  ) => {
    const value = e.currentTarget.value;

    const newSubstitutionsIds = substitutionsIds;
    newSubstitutionsIds[key] = value;
    setSubstitutionsIds(newSubstitutionsIds);
  };

  const handleAcceptRequest = (
    request: ISelectedWorkerVacationRequest,
    key: number
  ) => {
    const vacationRequestData: VacationRequestSubmitT = {
      fromDate: new Date(request.fromDate),
      toDate: new Date(request.toDate),
      idAbsence: request.idAbsence,
      reason: request.reason,
      substitutionId: substitutionsIds[key],
    };

    acceptRequest(vacationRequestData);
  };

  const handleCancelRequest = (requestId: VacationRequestIdT) =>
    cancelRequest(requestId);

  return (
    <Container fluid>
      {requests &&
        requests.map((request, key) => (
          <Row key={key} className="mb-2 align-items-center">
            <Col>
              <p className="m-0">
                <b>Od: </b>
                {request.fromDate
                  ? formatToReadable(new Date(request.fromDate))
                  : ""}
              </p>
              <p className="m-0">
                <b>Do: </b>{" "}
                {request.toDate
                  ? formatToReadable(new Date(request.toDate))
                  : ""}
              </p>
              <p className="m-0">
                <b>Typ: </b> {request.absence}
              </p>
            </Col>
            <Col>
              <FormControl
                as="select"
                name="substitutionId"
                onChange={(e: React.FormEvent<HTMLSelectElement>) =>
                  handleChangeSubInput(e, key)
                }
                style={{ minWidth: "185px" }}
              >
                <option selected={true} disabled>
                  wybierz zastępstwo
                </option>
                {potentialSubs &&
                  potentialSubs.map((sub, key) => (
                    <option key={key} value={sub.idUser}>
                      {sub.firstName} {sub.lastName}
                    </option>
                  ))}
              </FormControl>
            </Col>
            <Col className="text-right p-0">
              <LoadingButton
                variant="danger"
                defaultText="Anuluj"
                defaultType="button"
                isLoading={isSubmitting}
                onClick={() => handleCancelRequest(request.idRequest)}
              ></LoadingButton>
            </Col>
            <Col className="text-right p-0">
              <LoadingButton
                variant="primary"
                defaultText="Przydziel"
                defaultType="button"
                isLoading={isSubmitting}
                onClick={() => handleAcceptRequest(request, key)}
              ></LoadingButton>
            </Col>
          </Row>
        ))}
    </Container>
  );
};

export default AdminVacationsRequestForm;
