import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Card from "../components/Card";
import { Row, Col } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { subDays, setHours, setMinutes, addDays } from "date-fns/esm";
import { Button } from "react-bootstrap";
import { Calendar } from "react-big-calendar";
import { Doughnut } from "react-chartjs-2";

const Vacations: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const setDefaultMinTimeEndDate = () =>
    setHours(setMinutes(startDate, 31), startDate.getHours());
  const setDefaultMaxTimeEndDate = () =>
    setHours(setMinutes(startDate, 30), startDate.getHours() + 8);

  // const [minTimeEndDate, setMinTimeEndDateState] = useState<Date | undefined>(
  //   setDefaultMinTimeEndDate()
  // );
  // const [maxTimeEndDate, setMaxTimeEndDateState] = useState<Date | undefined>(
  //   setDefaultMaxTimeEndDate()
  // );

  /**
   * @desc Update min max times in the second date picker, when startDate/endDate
   * changes
   */
  // useEffect(() => {
  //   updateMinMaxTimes();
  // }, [startDate, endDate]);

  // const setMinTimeEndDate = () =>
  //   setMinTimeEndDateState(
  //     startDate.getDate() === endDate.getDate()
  //       ? setDefaultMinTimeEndDate()
  //       : undefined
  //   );

  // const setMaxTimeEndDate = () =>
  //   setMaxTimeEndDateState(
  //     startDate.getDate() === endDate.getDate()
  //       ? setDefaultMaxTimeEndDate()
  //       : undefined
  //   );

  // const updateMinMaxTimes = () => {
  //   setMinTimeEndDate();
  //   setMaxTimeEndDate();
  // };

  // TODO: GET IT FROM REDUX STORE
  const maxHolidaysDays = 14;

  // TODO ADD SEARCH WORKERS WITH BOUNCE EFFECT
  const searchWorkers = () => {};

  const assignHolidays = () => {};

  const initialVacationData = {
    labels: ["Wykorzystany urlop", "Pozostały urlop"],
    datasets: [
      {
        data: [1, 0],
        backgroundColor: ["lightgrey", "grey"]
      }
    ]
  };

  return (
    <div className="content">
      <Row className="d-flex align-items-strech">
        <Col xl={7}>
          <Card
            title="Przydziel urlop"
            content={
              <>
                <div className="datepicker-default">
                  <Row className="py-2">
                    <Col xs={12}>
                      <Search onSearch={searchWorkers} />
                    </Col>
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
                          // showTimeSelect
                          // timeFormat="HH:mm"
                          // timeIntervals={30}
                          // timeCaption="time"
                          // dateFormat="MMMM d, yyyy, h:mm aa"
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
                          // showTimeSelect
                          // timeFormat="HH:mm"
                          // timeIntervals={30}
                          // timeCaption="time"
                          // dateFormat="MMMM d, yyyy, h:mm aa"

                          // minTime={minTimeEndDate}
                          // maxTime={maxTimeEndDate}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row></Row>
                  <Row className="py-2">
                    <Col className="text-right">
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
        <Col xl={5}>
          <Card
            title="Pozostały czas urlopu"
            subtitle={`${maxHolidaysDays} dni`}
            content={
              <Doughnut
                data={initialVacationData}
                options={{ maintainAspectRatio: true }}
              />
            }
          />
        </Col>
      </Row>
      <Row></Row>
    </div>
  );
};

export default Vacations;
