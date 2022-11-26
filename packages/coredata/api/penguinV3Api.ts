import { useAppSelector } from "../hooks";
import {
  ItemAggregatedDatasetResp,
  StageAggregatedDatasetResp,
} from "@exusiai-dev/rest/v3/dataset";
import { InitResponse } from "@exusiai-dev/rest/v3/init";
import { SiteServers } from "@exusiai-dev/rest/v3/variants";
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
    baseUrl: "http://localhost:9010/api/v3alpha",
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

export const usePreferredGetItemAggregatedDatasetQuery = (
  itemId: ItemAggregatedDatasetQueryArgs["itemId"]
) => {
  const server = useAppSelector((state) => state.preference.server);

  return useGetItemAggregatedDatasetQuery({
    source: "global",
    server,
    itemId,
  });
};

export const usePreferredGetStageAggregatedDatasetQuery = (
  stageId: StageAggregatedDatasetQueryArgs["stageId"]
) => {
  const server = useAppSelector((state) => state.preference.server);

  return useGetStageAggregatedDatasetQuery({
    source: "global",
    server,
    stageId,
  });
};
