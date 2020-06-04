export type DataT = {
  item1: string[];
  item2: number[];
};

export type ChartDataT = {
  title: string;
  key: string;
  chartType: string;
  data: DataT;
};

export type StatsStateT = {
  stats: ChartDataT[];
};

export enum StatsActionsTypes {
  GET_STATS = "@@stats/GET_STATS",
  GET_STATS_SUCCESS = "@@stats/GET_STATS_SUCCESS",
  GET_STATS_ERROR = "@@stats/GET_STATS_ERROR",
}
