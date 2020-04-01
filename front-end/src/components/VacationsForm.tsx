import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Button,
  Row,
  Col,
  FormControl,
  FormGroup,
  FormLabel
} from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { addDays, subDays, differenceInCalendarDays } from "date-fns/esm";
import { UserT } from "../state/ducks/user/types";

const initialCategories: string[] = [
  "Urlop na żądanie",
  "Urlop bezpłatny",
  "Urlop ojcowski",
  "Urlop macierzyński",
  "Urlop rodzicielski",
  "Urlop szkoleniowy",
  "Zwolnienie lekarskie"
];

export type VacationsFormDataT = {
  readonly startDate: string;
  readonly endDate: string;
  readonly category: string;
};

type VacationsFormPropsT = {
  readonly categories?: string[];
  readonly potentialSubs?: UserT[];
  readonly leftDays: number;
  readonly onSubmit: (data: VacationsFormDataT) => void;
};

const VacationsForm: React.FC<VacationsFormPropsT> = ({
  categories = initialCategories,
  potentialSubs,
  leftDays = 14,
  onSubmit
}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [category, setCategory] = useState(categories[0]);
  const [subWorkerId, setSubWorkerId] = useState("");

  const setCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value);
  };

  const setSubWorkerIdSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSubWorkerId(e.currentTarget.value);
  };

  const isDateOk = (from: Date, to: Date) => {
    const difference = differenceInCalendarDays(to, from);
    return difference >= 0 && difference <= leftDays;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDateOk(startDate, endDate)) {
      const vacationFormData: VacationsFormDataT = {
        startDate: startDate.toDateString(),
        endDate: endDate.toDateString(),
        category: category
      };

      onSubmit(vacationFormData);
    } else {
      console.log("ERROR");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>Typ urlopu</FormLabel>
              <FormControl
                as="select"
                value={category}
                onChange={setCategorySelect}
              >
                {categories &&
                  categories.map((category, key) => (
                    <option value={category} key={key}>
                      {category}
                    </option>
                  ))}
              </FormControl>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormLabel>Zastępstwo</FormLabel>
            <FormControl
              as="select"
              value={subWorkerId}
              onChange={setSubWorkerIdSelect}
            >
              {potentialSubs &&
                potentialSubs.map((sub, key) => (
                  <option
                    value={sub.idUser}
                    key={key}
                  >{`${sub.firstName} ${sub.lastName}`}</option>
                ))}
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="py-2">
            <div className="block">
              <FormLabel>Start</FormLabel>
              <ReactDatePicker
                title="Wybierz datę początkową"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
              />
            </div>
          </Col>
          <Col md={6} className="py-2">
            <div className="block">
              <FormLabel>Koniec</FormLabel>
              <ReactDatePicker
                title="Wybierz datę końcową"
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                minDate={subDays(startDate, 0)}
                maxDate={addDays(startDate, leftDays)}
              />
            </div>
          </Col>
        </Row>
        <Row></Row>
        <Row className="py-2">
          <Col className="text-right">
            <Button type="submit" className="btn-primary">
              Przydziel urlop
            </Button>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default VacationsForm;
