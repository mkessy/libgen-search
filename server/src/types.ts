import {
  LibGenBookResultSchema,
  LibGenSearchQuerySchema,
  SearchParamsSchema,
  ResponseSchema,
} from "./libgen/schemas";
import { InferType } from "yup";

export type LibGenBookResult = InferType<typeof LibGenBookResultSchema>;
export type LibGenSearchQueryType = InferType<typeof LibGenSearchQuerySchema>;
export type LibGenSearchParamsType = InferType<typeof SearchParamsSchema>;
export type ResponseObjectType = InferType<typeof ResponseSchema>;
