import { ChartDataT, StatsActionsTypes } from "./types";
import { createAsyncAction } from "typesafe-actions";

export const getStatsAsync = createAsyncAction(
  StatsActionsTypes.GET_STATS,
  StatsActionsTypes.GET_STATS_SUCCESS,
  StatsActionsTypes.GET_STATS_ERROR
)<undefined, ChartDataT[], string>();
