import {
  LibGenBookResultSchema,
  LibGenSearchQuerySchema,
} from "./libgen/schemas";
import { InferType } from "yup";

export type LibGenBookResult = InferType<typeof LibGenBookResultSchema>;
export type LibGenSearchQuerySchema = InferType<typeof LibGenSearchQuerySchema>;
