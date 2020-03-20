import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Card from "../components/Card";
import { Row, Col } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { subDays, setHours, setMinutes, addDays } from "date-fns/esm";
import { Button } from "react-bootstrap";

const Holidays: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const setDefaultMinTimeEndDate = () =>
    setHours(setMinutes(startDate, 31), startDate.getHours());
  const setDefaultMaxTimeEndDate = () =>
    setHours(setMinutes(startDate, 30), startDate.getHours() + 8);

  const [minTimeEndDate, setMinTimeEndDateState] = useState<Date | undefined>(
    setDefaultMinTimeEndDate()
  );
  const [maxTimeEndDate, setMaxTimeEndDateState] = useState<Date | undefined>(
    setDefaultMaxTimeEndDate()
  );

  /**
   * @desc Update min max times in the second date picker, when startDate/endDate
   * changes
   */
  useEffect(() => {
    updateMinMaxTimes();
  }, [startDate, endDate]);

  const setMinTimeEndDate = () =>
    setMinTimeEndDateState(
      startDate.getDate() === endDate.getDate()
        ? setDefaultMinTimeEndDate()
        : undefined
    );

  const setMaxTimeEndDate = () =>
    setMaxTimeEndDateState(
      startDate.getDate() === endDate.getDate()
        ? setDefaultMaxTimeEndDate()
        : undefined
    );

  const updateMinMaxTimes = () => {
    setMinTimeEndDate();
    setMaxTimeEndDate();
  };

  // TODO: GET IT FROM REDUX STORE
  const maxHolidaysDays = 14;
  const maxHolidaysHours = 0;

  // TODO ADD SEARCH WORKERS WITH BOUNCE EFFECT
  const searchWorkers = () => {};

  const assignHolidays = () => {};

  return (
    <div className="content">
      <Row>
        <Col xs={12}>
          <Card
            title="Przydziel urlop"
            content={
              <>
                <div className="datepicker-default">
                  <Row className="py-2">
                    <Col xs={4}>
                      <Search onSearch={searchWorkers} />
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col>
                      <p>
                        Pozostały czas: {maxHolidaysDays} dni,{" "}
                        {maxHolidaysHours} godzin.
                      </p>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col lg={6}>
                      <p>Start</p>
                      <ReactDatePicker
                        title="Wybierz datę początkową"
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy, h:mm aa"
                      />
                    </Col>
                    <Col lg={6}>
                      <p>Koniec</p>
                      <ReactDatePicker
                        title="Wybierz datę końcową"
                        selected={endDate}
                        onChange={(date: Date) => setEndDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy, h:mm aa"
                        minDate={subDays(startDate, 0)}
                        maxDate={addDays(startDate, maxHolidaysDays)}
                        minTime={minTimeEndDate}
                        maxTime={maxTimeEndDate}
                        inlineFocusSelectedMonth
                      />
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col>
                      <Button className="btn-primary" onClick={assignHolidays}>
                        Przydziel urlop
                      </Button>
                    </Col>
                  </Row>
                </div>
              </>
            }
          />
        </Col>
      </Row>
      <Row></Row>
    </div>
  );
};

export default Holidays;
