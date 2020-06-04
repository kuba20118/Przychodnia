import { StatsActionsTypes, ChartDataT, StatsStateT } from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialStatsState: StatsStateT = {
  stats: [
    {
      title: "",
      chartType: "",
      key: "",
      data: { item1: [], item2: [] },
    },
  ],
};

export const statsReducer = (
  state: StatsStateT = initialStatsState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, ChartDataT[]>
): StatsStateT => {
  switch (action.type) {
    case StatsActionsTypes.GET_STATS: {
      return { ...state };
    }
    case StatsActionsTypes.GET_STATS_SUCCESS: {
      return { ...state, stats: action.payload };
    }
    case StatsActionsTypes.GET_STATS_ERROR: {
      return { ...state };
    }
    default:
      return state;
  }
};
