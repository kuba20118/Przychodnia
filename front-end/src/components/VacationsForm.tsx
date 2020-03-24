import React, { useState, ChangeEvent, useCallback } from "react";
import UsersSearch from "./UsersSearch";
import { Row, Col, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { addDays, subDays } from "date-fns/esm";
import { Button } from "react-bootstrap";
import { UserT } from "../state/ducks/user/types";

const fakeUsers: UserT[] = [
  {
    idUser: 1,
    firstName: "Radek",
    lastName: "Kowalski",
    mail: "kowalski@radek.pl",
    role: "Pracownik",
    workingHours: 8,
    currentlyEmployed: true,
    hireDate: "2020-01-01T00:00:00"
  },
  {
    idUser: 1,
    firstName: "Paweł",
    lastName: "Nowak",
    mail: "nowak@pawel.pl",
    role: "Kierwonik",
    workingHours: 8,
    currentlyEmployed: true,
    hireDate: "2020-01-01T00:00:00"
  }
];

const initialCategories: string[] = [
  "Urlop na żądanie",
  "Urlop bezpłatny",
  "Urlop ojcowski",
  "Urlop macierzyński",
  "Urlop rodzicielski",
  "Urlop szkoleniowy",
  "Zwolnienie lekarskie"
];

const initialSelectedUser: UserT = {
  idUser: 1,
  firstName: "",
  lastName: "",
  mail: "",
  role: "",
  workingHours: 0,
  currentlyEmployed: false,
  hireDate: "2020-01-01T00:00:00"
};

type VacationsFormPropsT = {
  categories?: string[];
  submitChanges: () => void;
};

const VacationsForm: React.FC<VacationsFormPropsT> = ({
  categories = initialCategories,
  submitChanges
}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [category, setCategory] = useState(categories[0]);
  const [selectedUser, setSelectedUser] = useState<UserT>(initialSelectedUser);

  const setCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value);
  };

  // TODO: GET IT FROM REDUX STORE
  const maxHolidaysDays = 14;

  const searchWorkers = useCallback((user: UserT) => {
    setSelectedUser(user);
  }, []);

  return (
    <>
      <Row className="py-2">
        <Col xs={12}>
          <UsersSearch onSearch={searchWorkers} users={fakeUsers} />
        </Col>
      </Row>
      <p>Imię: {selectedUser.firstName}</p>
      <p>Nazwisko: {selectedUser.lastName}</p>
      <p>Email: {selectedUser.mail}</p>
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
              maxDate={addDays(startDate, maxHolidaysDays)}
              inline
            />
          </div>
        </Col>
      </Row>
      <Row></Row>
      <Row className="py-2">
        <Col className="text-right">
          <Button className="btn-primary" onClick={submitChanges}>
            Przydziel urlop
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default VacationsForm;
