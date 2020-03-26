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
  startDate: string;
  endDate: string;
  category: string;
};

type VacationsFormPropsT = {
  readonly categories?: string[];
  readonly leftDays: number;
  readonly onSubmit: (data: VacationsFormDataT) => void;
};

const VacationsForm: React.FC<VacationsFormPropsT> = ({
  categories = initialCategories,
  leftDays = 14,
  onSubmit
}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [category, setCategory] = useState(categories[0]);

  const setCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value);
  };

  const isDateOk = (from: Date, to: Date) => {
    const difference = differenceInCalendarDays(to, from);
    return difference > 0 && difference <= leftDays;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDateOk(startDate, endDate)) {
      const vacationFormData = {
        startDate: startDate.toString(),
        endDate: endDate.toString(),
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
                {categories.map((category, key) => (
                  <option key={key}>{category}</option>
                ))}
              </FormControl>
            </FormGroup>
          </Col>
          <Col md={6}></Col>
        </Row>
        <Row className="py-2 ">
          <Col md={6} className="">
            <div className="block">
              <p>Start</p>
              <ReactDatePicker
                title="Wybierz datę początkową"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                inline
              />
            </div>
          </Col>
          <Col md={6} className="">
            <div className="block">
              <p>Koniec</p>
              <ReactDatePicker
                title="Wybierz datę końcową"
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                minDate={subDays(startDate, 0)}
                maxDate={addDays(startDate, leftDays)}
                inline
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
