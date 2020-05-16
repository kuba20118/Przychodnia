import { VacationsFormDataT, VacationsDataT } from "./types";
import { UserIdT, UserT } from "./../user/types";
import { format } from "date-fns/esm";
import { parseISO } from "date-fns/esm";
import {
  ISelectedWorkerVacations,
  ISelectedWorkerVacationCreateNew,
  ISelectedWorker,
} from "./../selected-worker/types";
import { isFuture, isPast, isToday } from "date-fns";

const createTableDataItem = (
  dataItem: VacationsDataT,
  index: number
): string[] => [
  (index + 1).toString(),
  format(parseISO(dataItem.fromDate), "dd-MM-yyyy"),
  format(parseISO(dataItem.toDate), "dd-MM-yyyy"),
  dataItem.absenceType,
];

export const createCurrentVacationsTableData = (data?: VacationsDataT[]) =>
  data &&
  data
    .filter((item) => {
      return isFuture(new Date(item.toDate)) || isToday(new Date(item.toDate));
    })
    .map((item, index) => createTableDataItem(item, index));

export const createHistoryVacationsTableData = (data?: VacationsDataT[]) =>
  data &&
  data!
    .filter(
      (item) => isPast(new Date(item.toDate)) && !isToday(new Date(item.toDate))
    )
    .map((item, index) => createTableDataItem(item, index));

export const createNewVacationObject = (
  userId: UserIdT,
  data: VacationsFormDataT
): ISelectedWorkerVacationCreateNew => ({
  userId: userId,
  fromDate: data.fromDate,
  toDate: data.toDate,
  absenceId: data.categoryId,
  substitutionId: data.substitutionId,
});

export const getPotentialsSubs = (
  workers?: UserT[],
  currWorker?: UserT
): ISelectedWorker[] | undefined =>
  workers &&
  currWorker &&
  workers.filter(
    (worker) =>
      worker.idUser !== currWorker.idUser && worker.role === currWorker.role
  );

export const createCurrentUserTableData = (userVacations?: VacationsDataT[]) =>
  userVacations &&
  userVacations.map((item, index) => [
    (index + 1).toString(),
    format(new Date(item.fromDate), "dd-MM-yyyy"),
    format(new Date(item.toDate), "dd-MM-yyyy"),
    item.absenceType,
  ]);
