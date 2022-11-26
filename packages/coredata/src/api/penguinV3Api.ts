import {
  ItemAggregatedDatasetResp,
  StageAggregatedDatasetResp,
} from "@exusiai-dev/rest/v3/dataset";
import { SiteServers } from "@exusiai-dev/rest/v3/i18n";
import { InitResponse } from "@exusiai-dev/rest/v3/init";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AggregatedDatasetQueryArgs {
  source: "global" | "personal";
  server: SiteServers;
}

export interface ItemAggregatedDatasetQueryArgs
  extends AggregatedDatasetQueryArgs {
  itemId: string;
}

export interface StageAggregatedDatasetQueryArgs
  extends AggregatedDatasetQueryArgs {
  stageId: string;
}

export const penguinV3Api = createApi({
  reducerPath: "penguinV3Api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://penguin-stats.io/api/v3alpha",
    prepareHeaders: (headers, { getState }) => {
      // const server = (getState() as RootState).preference.server;
      // headers.set("X-Penguin-Server", server);
      headers.set("Accept", "application/vnd.penguin.v3+json");
      return headers;
    },
  }),
  endpoints: (build) => ({
    getInit: build.query<InitResponse, void>({
      query: () => `/init`,
    }),
    getItemAggregatedDataset: build.query<
      ItemAggregatedDatasetResp,
      ItemAggregatedDatasetQueryArgs
    >({
      query: ({ source, server, itemId }) =>
        `/dataset/aggregated/${source}/${server}/item/${itemId}`,
    }),
    getStageAggregatedDataset: build.query<
      StageAggregatedDatasetResp,
      StageAggregatedDatasetQueryArgs
    >({
      query: ({ source, server, stageId }) =>
        `/dataset/aggregated/${source}/${server}/stage/${stageId}`,
    }),
  }),
});

export const {
  useGetInitQuery,
  useGetItemAggregatedDatasetQuery,
  useGetStageAggregatedDatasetQuery,
} = penguinV3Api;
